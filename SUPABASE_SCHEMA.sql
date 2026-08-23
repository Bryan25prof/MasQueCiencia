-- ================================================================
-- MÁSQUECIENCIA — MQC ANALYTICS v1.0
-- SUPABASE_SCHEMA.sql
-- ================================================================
-- Ejecutar completo, de una sola vez, en el SQL Editor de tu proyecto
-- de Supabase (Dashboard → SQL Editor → New query → pegar todo → Run).
-- Es seguro volver a ejecutarlo (usa IF NOT EXISTS / OR REPLACE donde
-- corresponde), pero no lo ejecutes sobre una base de datos que ya
-- tenga datos reales de producción sin revisar primero.
--
-- ── DECISIÓN DE DISEÑO MÁS IMPORTANTE DE TODO ESTE ARCHIVO ──
-- MásQueCiencia NO tiene cuentas de estudiante (es una decisión de
-- diseño explícita y documentada del proyecto: "SIN cuentas, SIN
-- login, SIN servidores"). Eso significa que, desde el punto de vista
-- de Supabase, TODOS los estudiantes son el mismo rol anónimo
-- ("anon") — no hay forma de que Postgres verifique criptográficamente
-- que "esta escritura viene realmente del perfil MQC-A82F31C9 y no de
-- otro". Cualquier diseño que le diera al rol "anon" permiso de
-- UPDATE o DELETE sobre filas existentes sería, en la práctica,
-- permiso para que cualquier persona con las herramientas de
-- desarrollador de su navegador modifique o borre el progreso de
-- CUALQUIER estudiante, no solo el propio.
--
-- Por eso todas las tablas alimentadas por el frontend estudiantil
-- son APEND-ONLY (solo INSERT, nunca UPDATE ni DELETE) para el rol
-- "anon". Cuando un estudiante mejora su nota en una unidad, no se
-- actualiza una fila existente — se inserta una fila nueva con la
-- marca de tiempo actual. El panel del docente siempre lee "la fila
-- más reciente por perfil" a través de las vistas `v_*` definidas al
-- final de este archivo, nunca la tabla cruda directamente.
--
-- Esto cuesta un poco más de espacio en disco (filas históricas que
-- ya no son "la mejor nota") pero a cambio el rol "anon" nunca
-- necesita permiso de UPDATE/DELETE sobre nada — la superficie de
-- ataque más peligrosa (que un estudiante pueda alterar o borrar el
-- historial de otro) queda estructuralmente eliminada, no solo
-- restringida por una política que podría tener un error.
-- ================================================================

-- ────────────────────────────────────────────────────────────────
-- 0. EXTENSIONES NECESARIAS
-- ────────────────────────────────────────────────────────────────
create extension if not exists "pgcrypto"; -- para gen_random_uuid(), si hiciera falta

-- ────────────────────────────────────────────────────────────────
-- 1. TABLA: admins
-- ────────────────────────────────────────────────────────────────
-- Lista blanca de quién puede autenticarse como docente/administrador.
-- Un usuario de Supabase Auth (creado por vos desde el Dashboard →
-- Authentication → Users, con su email real) SOLO tiene permisos de
-- lectura ampliada si su auth.uid() aparece en esta tabla. Sin esto,
-- cualquier persona que lograra crear una cuenta de Supabase Auth
-- (si el proyecto tuviera signup público habilitado) NO tendría
-- automáticamente acceso de administrador.
create table if not exists admins (
  user_id    uuid primary key references auth.users(id) on delete cascade,
  email      text not null,
  created_at timestamptz not null default now()
);

comment on table admins is
  'Lista blanca de administradores. Un usuario autenticado de Supabase Auth '
  'solo obtiene permisos de docente si su user_id aparece aquí. Agregar filas '
  'manualmente desde el SQL Editor tras crear el usuario en Authentication → Users.';

-- ────────────────────────────────────────────────────────────────
-- 2. TABLA: students  (registro append-only de metadatos de perfil)
-- ────────────────────────────────────────────────────────────────
create table if not exists students (
  id          bigint generated always as identity primary key,
  profile_id  text not null,              -- 'MQC-A82F31C9', ver profiles.js
  alias       text not null,
  grupo       text,                        -- '10-1', '11-2', etc. NULL = "Grupo pendiente"
  grado       text,                        -- '10' | '11' | null (perfil multigrado)
  event_id    text not null unique,         -- dedup de la cola de sincronización (Sección 21)
  created_at  timestamptz not null default now()
);

create index if not exists idx_students_profile_id  on students (profile_id);
create index if not exists idx_students_created_at  on students (profile_id, created_at desc);

comment on table students is
  'Append-only: cada creación de perfil o cambio de alias/grupo inserta una fila '
  'nueva. Usar la vista v_students_latest para el estado actual de cada perfil.';

-- ────────────────────────────────────────────────────────────────
-- 3. TABLA: unit_exam_results  (append-only, un evento por intento)
-- ────────────────────────────────────────────────────────────────
create table if not exists unit_exam_results (
  id          bigint generated always as identity primary key,
  profile_id  text not null,
  grado       text not null check (grado in ('10','11')),
  unidad      text not null,               -- 'unit-01'..'unit-09' | 'g11-u01'..'g11-u04'
  nota        numeric not null check (nota >= 0 and nota <= 100),
  intentos    integer not null default 0,
  aprobado    boolean generated always as (nota >= 70) stored,
  event_id    text not null unique,
  created_at  timestamptz not null default now()
);

create index if not exists idx_uer_profile          on unit_exam_results (profile_id);
create index if not exists idx_uer_profile_unidad    on unit_exam_results (profile_id, unidad, created_at desc);

comment on table unit_exam_results is
  'Append-only: cada mejora de nota en un examen de unidad (10.º o 11.º) inserta '
  'una fila. Usar la vista v_unit_exam_best para la mejor nota vigente por perfil+unidad.';

-- ────────────────────────────────────────────────────────────────
-- 4. TABLA: pne_attempts  (Sección 13 — nunca se sobrescribe)
-- ────────────────────────────────────────────────────────────────
create table if not exists pne_attempts (
  attempt_id          text primary key,     -- generado en el cliente, único por intento
  profile_id          text not null,
  grupo               text,                  -- snapshot del grupo al momento del intento
  nota_presentacion   numeric not null check (nota_presentacion >= 0 and nota_presentacion <= 60),
  aciertos            integer not null check (aciertos >= 0 and aciertos <= 60),
  nota_pne            numeric not null,
  aprobado            boolean not null,
  biologia_aciertos   integer not null check (biologia_aciertos >= 0 and biologia_aciertos <= 20),
  fisica_aciertos     integer not null check (fisica_aciertos >= 0 and fisica_aciertos <= 20),
  quimica_aciertos    integer not null check (quimica_aciertos >= 0 and quimica_aciertos <= 20),
  proyeccion_final    numeric not null,
  fecha               timestamptz not null default now(),
  created_at          timestamptz not null default now()
);

create index if not exists idx_pne_attempts_profile on pne_attempts (profile_id, fecha desc);
create index if not exists idx_pne_attempts_grupo    on pne_attempts (grupo);

comment on table pne_attempts is
  'Un intento del Simulacro PNE = una fila. attempt_id es la clave primaria '
  '(generada en el cliente) — al ser PK, un reintento de sincronización con el '
  'mismo attempt_id se ignora automáticamente (ON CONFLICT DO NOTHING desde el '
  'cliente), cumpliendo la Sección 21 (evitar duplicados) sin lógica adicional.';

-- ────────────────────────────────────────────────────────────────
-- 5. TABLA: pne_answers  (Sección 14 — una fila por pregunta respondida)
-- ────────────────────────────────────────────────────────────────
create table if not exists pne_answers (
  id               bigint generated always as identity primary key,
  attempt_id       text not null references pne_attempts(attempt_id) on delete cascade,
  profile_id       text not null,           -- denormalizado a propósito: simplifica RLS y consultas
  item_id          text not null,           -- 'PNE-2023-D01-Q-001'
  ciencia          text not null check (ciencia in ('Biología','Física','Química')),
  tema             text not null,
  opcion_elegida   text,                     -- 'originalA'..'originalC' | 'mqcD' | null si no respondió
  opcion_correcta  text not null,
  es_correcta      boolean not null default false,
  event_id         text not null unique
);

create index if not exists idx_pne_answers_attempt   on pne_answers (attempt_id);
create index if not exists idx_pne_answers_item       on pne_answers (item_id);
create index if not exists idx_pne_answers_ciencia    on pne_answers (ciencia, tema);

comment on table pne_answers is
  'Una fila por cada pregunta respondida en un intento de PNE. Alimenta el '
  'análisis de ítems (Secciones 10-11): dificultad, distractor dominante, etc.';

-- ================================================================
-- 6. VISTAS — lo único que debería consultar el panel de administración
-- ================================================================

-- Último alias/grupo conocido por perfil (colapsa el log append-only de `students`)
create or replace view v_students_latest as
select distinct on (profile_id)
  profile_id, alias, grupo, grado, created_at as last_update
from students
order by profile_id, created_at desc;

-- Mejor nota vigente por perfil + unidad (colapsa el log append-only de `unit_exam_results`)
create or replace view v_unit_exam_best as
select distinct on (profile_id, unidad)
  profile_id, grado, unidad, nota, intentos, aprobado, created_at as last_update
from unit_exam_results
order by profile_id, unidad, nota desc, created_at desc;

-- Resumen por estudiante: exámenes aprobados de 10.º/11.º + mejor PNE + intentos
create or replace view v_seguimiento_academico as
select
  s.profile_id,
  s.alias,
  s.grupo,
  s.grado,
  coalesce((select count(*) from v_unit_exam_best b
            where b.profile_id = s.profile_id and b.grado = '10' and b.aprobado), 0) as examenes_10_aprobados,
  coalesce((select count(*) from v_unit_exam_best b
            where b.profile_id = s.profile_id and b.grado = '11' and b.aprobado), 0) as examenes_11_aprobados,
  (select count(*) from pne_attempts p where p.profile_id = s.profile_id) as pne_intentos,
  (select max(nota_pne) from pne_attempts p where p.profile_id = s.profile_id) as pne_mejor_nota,
  (select bool_or(aprobado) from pne_attempts p where p.profile_id = s.profile_id) as pne_aprobada
from v_students_latest s;

comment on view v_seguimiento_academico is
  'Vista principal para la Sección 5 del ticket (tabla "Seguimiento Académico"). '
  'X/9 y X/4 se calculan en el cliente admin a partir de examenes_10_aprobados '
  'y examenes_11_aprobados (los totales 9 y 4 son fijos, definidos por el plan '
  'de estudios, no por la base de datos).';

-- Resultados agregados por grupo/sección (Sección 8)
create or replace view v_resultados_por_seccion as
select
  coalesce(s.grupo, 'Grupo pendiente') as grupo,
  count(distinct s.profile_id)                                   as estudiantes,
  count(p.attempt_id)                                             as intentos,
  count(p.attempt_id) filter (where p.aprobado)                   as aprobados,
  count(p.attempt_id) filter (where not p.aprobado)               as no_aprobados,
  round(
    100.0 * count(p.attempt_id) filter (where p.aprobado)
    / nullif(count(p.attempt_id), 0)
  , 1)                                                             as pct_aprobacion,
  round(avg(p.nota_pne), 1)                                        as promedio_pne
from v_students_latest s
left join pne_attempts p on p.profile_id = s.profile_id
group by coalesce(s.grupo, 'Grupo pendiente');

-- Rendimiento por ciencia, global y por grupo (Sección 9)
create or replace view v_rendimiento_por_ciencia as
select
  coalesce(s.grupo, 'Grupo pendiente') as grupo,
  round(100.0 * avg(a.biologia_aciertos) / 20, 1) as biologia_pct,
  round(100.0 * avg(a.fisica_aciertos)  / 20, 1) as fisica_pct,
  round(100.0 * avg(a.quimica_aciertos) / 20, 1) as quimica_pct
from v_students_latest s
join pne_attempts a on a.profile_id = s.profile_id
group by coalesce(s.grupo, 'Grupo pendiente');

-- Análisis de ítems: dificultad (Sección 10)
create or replace view v_analisis_items as
select
  item_id,
  ciencia,
  tema,
  count(*)                                          as intentos,
  count(*) filter (where es_correcta)                as correctas,
  count(*) filter (where not es_correcta)             as incorrectas,
  round(100.0 * count(*) filter (where not es_correcta) / nullif(count(*),0), 1) as pct_error
from pne_answers
group by item_id, ciencia, tema
order by pct_error desc nulls last;

comment on view v_analisis_items is
  'Sección 10: "NO considerar suficientemente representativo un ítem con muy '
  'pocos intentos" — el panel debe filtrar en el cliente por `intentos` antes '
  'de resaltar un ítem como "de mayor dificultad" (se sugiere un mínimo de 5).';

-- Distribución de opciones por ítem — para "distractor más elegido" (Sección 11)
create or replace view v_distribucion_opciones as
select
  item_id,
  opcion_elegida,
  count(*) as veces_elegida,
  round(100.0 * count(*) / sum(count(*)) over (partition by item_id), 1) as pct
from pne_answers
where opcion_elegida is not null
group by item_id, opcion_elegida;

-- ================================================================
-- 7. ROW LEVEL SECURITY
-- ================================================================

alter table admins             enable row level security;
alter table students           enable row level security;
alter table unit_exam_results  enable row level security;
alter table pne_attempts       enable row level security;
alter table pne_answers        enable row level security;

-- ── admins: nadie escribe desde el frontend, ni siquiera el propio admin.
--    Se administra a mano desde el SQL Editor (INSERT manual tras crear
--    el usuario en Authentication → Users). Un admin puede leer la lista
--    (para que el panel pueda mostrar "sesión iniciada como fulano@...").
create policy admins_select_self on admins
  for select
  using (auth.uid() = user_id);

-- ── Función auxiliar: ¿el usuario autenticado actual es administrador? ──
create or replace function is_admin()
returns boolean
language sql
security definer
stable
as $$
  select exists (select 1 from admins where user_id = auth.uid());
$$;

-- ── students ──
-- El rol anon (estudiantes, sin login) SOLO puede insertar filas nuevas.
create policy students_insert_anon on students
  for insert
  to anon
  with check (true);

-- Un administrador autenticado puede leer todo (para el panel).
create policy students_select_admin on students
  for select
  to authenticated
  using (is_admin());

-- (Intencionalmente NO hay policy de UPDATE ni DELETE para "anon" ni para
--  "authenticated" que no sea admin — con RLS activo y sin una policy que
--  lo permita explícitamente, la operación queda bloqueada por defecto.)

-- ── unit_exam_results ──
create policy uer_insert_anon on unit_exam_results
  for insert
  to anon
  with check (true);

create policy uer_select_admin on unit_exam_results
  for select
  to authenticated
  using (is_admin());

-- ── pne_attempts ──
create policy pne_attempts_insert_anon on pne_attempts
  for insert
  to anon
  with check (true);

create policy pne_attempts_select_admin on pne_attempts
  for select
  to authenticated
  using (is_admin());

-- ── pne_answers ──
create policy pne_answers_insert_anon on pne_answers
  for insert
  to anon
  with check (true);

create policy pne_answers_select_admin on pne_answers
  for select
  to authenticated
  using (is_admin());

-- ================================================================
-- 8. PERMISOS SOBRE LAS VISTAS
-- ================================================================
-- Las vistas heredan RLS de las tablas subyacentes, pero por defecto
-- Postgres no concede SELECT sobre vistas nuevas a nadie: hay que
-- otorgarlo explícitamente. Se otorga solo a "authenticated" (nunca a
-- "anon"), y la función is_admin() sigue aplicando dentro de cada vista
-- porque las vistas no son SECURITY DEFINER (corren con los permisos
-- de quien consulta, así que la policy select_admin de cada tabla se
-- respeta igual al consultar a través de la vista).
grant select on v_students_latest        to authenticated;
grant select on v_unit_exam_best         to authenticated;
grant select on v_seguimiento_academico  to authenticated;
grant select on v_resultados_por_seccion to authenticated;
grant select on v_rendimiento_por_ciencia to authenticated;
grant select on v_analisis_items         to authenticated;
grant select on v_distribucion_opciones  to authenticated;

-- ================================================================
-- 9. CÓMO AGREGAR EL PRIMER ADMINISTRADOR (vos)
-- ================================================================
-- 1. Dashboard de Supabase → Authentication → Users → Add user
--    (creá tu propio usuario con tu email real y una contraseña).
-- 2. Copiá el UUID que Supabase le asignó a ese usuario (columna "UID").
-- 3. Ejecutá esta línea aquí en el SQL Editor, reemplazando los valores:
--
--    insert into admins (user_id, email) values
--      ('PEGAR-EL-UUID-AQUI', 'tu-email@ejemplo.com');
--
-- Sin esta fila, aunque inicies sesión correctamente en el panel, la
-- función is_admin() devuelve false y no vas a poder ver ningún dato
-- (comportamiento esperado y seguro, no un error).
-- ================================================================
