/* ================================================================
   MÁSQUECIENCIA — js/data/plan-biologia11.js
   "Congelamiento" de la estructura de Biología 11.º — SOLO METADATOS
   ================================================================
   Este archivo NO se incluye todavía en index.html y NO se conecta a
   ningún Router, AccessControl ni bandera de publicación. Es
   deliberadamente inerte: cero riesgo, cero cambio de comportamiento
   para nadie. Es el registro "congelado" de qué unidades tendrá
   Biología 11.º y de dónde sale cada una, para construirlas después
   una por una — exactamente como se hizo con BIO10-U01 — nunca
   contenido real todavía.

   FUENTE: MEP, "Programa de Estudio de Biología, Educación
   Diversificada" (Undécimo Año de Educación Académica / Duodécimo
   Educación Técnica), páginas 61-77 y Anexo 1 (tabla de distribución
   de lecciones, página 82-84). Esta es una fuente DISTINTA del libro
   privado usado para BIO10-U01 — es el programa oficial del MEP, no
   un libro de texto. El programa oficial organiza Undécimo en 3 Ejes
   Temáticos con 5 sub-temas (viii a xii en el Anexo 1); cada sub-tema
   se congela aquí como una unidad, mismo criterio de granularidad que
   ya se usó para Décimo (donde el libro privado subdivide esos mismos
   ejes oficiales en unidades más finas).

   Décimo, para contraste y verificación (ya confirmado contra el
   mismo programa oficial, páginas 29-60 y Anexo 1 i-vii): BIO10-U01
   (ya construida) corresponde al sub-tema "i" del Eje I oficial
   (campo de estudio + adaptaciones + entorno biofísico) — coincide
   correctamente. Las unidades BIO10-U02 a BIO10-U09, ya declaradas
   como "Próximamente" en biologia10.js, cubren entre todas el resto
   de los sub-temas oficiales de Décimo (ii a vii: biodiversidad/
   población, nicho/hábitat, crecimiento poblacional, variabilidad
   genética, herencia, evolución) — no hace falta agregar ni renombrar
   ninguna unidad de Décimo.
================================================================ */
const BIOLOGIA11_UNIDADES_DATA = [
  { id: 'bio11-u01', num: 1, status: 'coming',
    icon: '🤝', color: 'var(--green)',
    title: 'Interacciones entre poblaciones',
    subtitle: null,
    description: 'Próximamente: relaciones intraespecíficas e interespecíficas entre poblaciones — simbiosis, depredación, parasitismo y competencia.',
    fuente: 'Eje temático I, sub-tema viii (programa oficial MEP, pág. 61-64)',
    topics: [], simulators: [], game: { levels: 0 }, exam: { perExam: 20, pass: 70 }
  },
  { id: 'bio11-u02', num: 2, status: 'coming',
    icon: '🍃', color: 'var(--green)',
    title: 'Relaciones tróficas y flujo de energía',
    subtitle: null,
    description: 'Próximamente: cadenas y redes alimenticias, pirámides de energía y el flujo de materia y energía en los ecosistemas.',
    fuente: 'Eje temático I, sub-tema ix (programa oficial MEP, pág. 65-67)',
    topics: [], simulators: [], game: { levels: 0 }, exam: { perExam: 20, pass: 70 }
  },
  { id: 'bio11-u03', num: 3, status: 'coming',
    icon: '♻️', color: 'var(--green)',
    title: 'Ciclos biogeoquímicos y sostenibilidad',
    subtitle: null,
    description: 'Próximamente: los ciclos del carbono, el nitrógeno, el fósforo y el agua, la fotosíntesis y la respiración celular, y la huella ecológica.',
    fuente: 'Eje temático II, sub-tema x (programa oficial MEP, pág. 68-72)',
    topics: [], simulators: [], game: { levels: 0 }, exam: { perExam: 20, pass: 70 }
  },
  { id: 'bio11-u04', num: 4, status: 'coming',
    icon: '🌱', color: 'var(--green)',
    title: 'Sucesión y restauración de ecosistemas',
    subtitle: null,
    description: 'Próximamente: los cambios secuenciales de las comunidades y los procesos de recuperación y restauración de los ecosistemas.',
    fuente: 'Eje temático III, sub-tema xi (programa oficial MEP, pág. 73-74)',
    topics: [], simulators: [], game: { levels: 0 }, exam: { perExam: 20, pass: 70 }
  },
  { id: 'bio11-u05', num: 5, status: 'coming',
    icon: '🌍', color: 'var(--green)',
    title: 'Desarrollo sostenible y cambio climático',
    subtitle: null,
    description: 'Próximamente: la transformación hacia el desarrollo sostenible, la mitigación del cambio climático y los proyectos de responsabilidad ambiental.',
    fuente: 'Eje temático III, sub-tema xii (programa oficial MEP, pág. 75-77)',
    topics: [], simulators: [], game: { levels: 0 }, exam: { perExam: 20, pass: 70 }
  }
];
