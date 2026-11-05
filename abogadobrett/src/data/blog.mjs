// Artículos reales publicados en abogadobrett.com (títulos y URLs verificados en la auditoría).
// Los artículos siguen sirviéndose desde WordPress en sus URLs actuales (ver README, "Publicación").
// cat: ciudadania | matrimonio | guia | actualidad | migracion

const B = 'https://www.abogadobrett.com';

export const posts = [
  { date: '2026-07-27', cat: 'actualidad', title: 'Sentencia 24045/2026: las Sezioni Unite resuelven la «minor issue»', url: `${B}/sentencia-24045-2026-minor-issue-ciudadania-italiana/` },
  { date: '2026-07-26', cat: 'actualidad', title: 'Ley 74/2025 ante la CGUE: plazos para el iure sanguinis', url: `${B}/ley-74-2025-cgue-plazos-iure-sanguinis/` },
  { date: '2026-07-23', cat: 'actualidad', title: 'Ciudadanía italiana 2026: la Corte Constitucional remite la Ley 74/2025 a la Justicia europea', url: `${B}/ciudadania-italiana-ley-74-2025-cgue-ordenanza-147-2026/` },
  { date: '2026-05-21', cat: 'matrimonio', title: 'Ciudadanía italiana por matrimonio 2026: Sentencia 195/2022 y DDL 1450', url: `${B}/ciudadania-italiana-por-matrimonio-2026-sentencia-195-2022-ddl-1450/` },
  { date: '2026-01-27', cat: 'ciudadania', title: 'Ciudadanía italiana 2025–2026: lo que cambió, lo que rige hoy y lo que viene', url: `${B}/ciudadania-italiana-2025-2026-lo-que-cambio-lo-que-rige-hoy-y-lo-que-viene-iure-sanguinis-y-matrimonio/` },
  { date: '2026-01-20', cat: 'ciudadania', title: 'Ciudadanía italiana para hijos menores nacidos en el extranjero: cambios desde 2026', url: `${B}/ciudadania-italiana-para-hijos-menores-nacidos-en-el-extranjero-cambios-desde-2026/` },
  { date: '2025-12-08', cat: 'migracion', title: 'Guía 2025–2026: cómo trabajar y vivir en Italia si eres descendiente de italianos', url: `${B}/como-trabajar-y-vivir-en-italia-si-eres-descendiente-de-italianos-via-especial/` },
  { date: '2025-09-24', cat: 'guia', title: 'Los 5 errores más comunes al preparar los documentos para tu ciudadanía italiana', url: `${B}/top-5-errores-mas-comunes-al-preparar-los-documentos-para-tu-ciudadania-italiana-y-como-evitarlos/` },
  { date: '2025-09-10', cat: 'guia', title: 'Ciudadanía italiana: vía judicial frente a vía administrativa', url: `${B}/ciudadania-italiana-via-judicial-vs-via-administrativa/` },
  { date: '2025-08-27', cat: 'guia', title: 'Cómo inscribirse en el registro A.I.R.E.: guía paso a paso', url: `${B}/como-inscribirse-en-el-registro-italiano-a-i-r-e-guia-paso-a-paso/` },
  { date: '2025-08-11', cat: 'guia', title: 'Guía completa de la Cédula de Identidad Electrónica (CIE) de Italia', url: `${B}/guia-completa-cedula-de-identidad-electronica-cie-de-italia/` },
  { date: '2024-09-16', cat: 'matrimonio', title: 'Guía para completar el formulario de ciudadanía por matrimonio del Ministerio del Interior', url: `${B}/guia-para-completar-el-formulario-de-ciudadania-italiana-por-matrimonio-en-la-pagina-del-ministerio-del-interno-italiano/` },
];

export const categories = {
  actualidad: 'Actualidad jurídica',
  ciudadania: 'Ciudadanía por descendencia',
  matrimonio: 'Ciudadanía por matrimonio',
  guia: 'Guías prácticas',
  migracion: 'Vivir en Europa',
};

export const blogArchive = `${B}/Blog`;
