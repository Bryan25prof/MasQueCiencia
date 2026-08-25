/* ================================================================
   MÁSQUECIENCIA — js/shared/analytics-config.js
   ================================================================
   Config de MQC Analytics v1.0. Este archivo es público (vive en
   GitHub Pages) — eso es seguro porque la "anon key" de Supabase está
   diseñada para ser pública (su seguridad depende de Row Level
   Security, no de mantenerla en secreto). Lo que NUNCA debe pegarse
   aquí es la "service_role key" (ver MQC_ANALYTICS_SECURITY.md).

   Con enabled:false (valor de entrega de esta primera versión), toda
   la capa de Analytics queda inactiva: no se intenta ninguna conexión,
   no aparece ningún error, y MásQueCiencia funciona exactamente igual
   que antes de esta fase (Sección 20 del ticket).

   Para activarlo: ver README_ANALYTICS_SETUP.md.
================================================================ */
window.MQC_ANALYTICS_CONFIG = {
  enabled: true,

  // Pegar aquí los valores reales desde tu Dashboard de Supabase:
  // Project Settings → API → Project URL / anon public key.
  supabaseUrl: 'https://ebdyfcgchfdnihutvzuc.supabase.co',
  supabaseAnonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImViZHlmY2djaGZkbmlodXR2enVjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc0MTIwMzgsImV4cCI6MjEwMjk4ODAzOH0.UVCHIkkNQ73WjYGxHD3xxW6mSO1QIHKjDF4DgD2I0Fs',

  // Nombre de las tablas remotas (coincide con SUPABASE_SCHEMA.sql).
  tablas: {
    students: 'students',
    unitExamResults: 'unit_exam_results',
    pneAttempts: 'pne_attempts',
    pneAnswers: 'pne_answers'
    profileDeletions: 'profile_deletions'
  }
};
