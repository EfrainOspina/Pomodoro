// Fuente única de verdad del sitio.
// Todo dato aquí proviene de abogadobrett.com (auditoría 2026-11-04) o es configuración.
// Los valores marcados PENDIENTE deben ser confirmados por el propietario (ver docs/PENDIENTES.md).

export const site = {
  name: 'Abogado Brett',
  person: 'Johan Brett',
  personFull: 'Johan Brett Giuntoli', // usado en firma de un informe del blog (15 may 2025)
  firm: 'Brett Giuntoli & Asociados',
  url: 'https://www.abogadobrett.com',
  locale: 'es',
  ogImage: '/assets/img/og-default.jpg',

  // Contacto verificado en el sitio actual
  whatsapp: '584146412391', // +58 414-641-2391 (único número publicado)
  whatsappDisplay: '+58 414 641 2391',
  email: 'abogadobrett@gmail.com',
  emailDocuments: 'gestoriasbg@gmail.com', // publicado para búsqueda de documentos en Italia

  calendly: {
    consulta: 'https://calendly.com/abogadobrett/reunion-de-60-minutos-con-abogadobrett-por-zoom',
    mentoria: 'https://calendly.com/abogadobrett/rapido-60-minutos-de-consulta-con-el-abogado-brett-mentorias',
  },

  social: {
    instagram: 'https://www.instagram.com/abogadobrett/',
    youtube: 'https://www.youtube.com/Abogadobrett',
    facebook: 'https://www.facebook.com/AbogadoBrett/',
  },

  // Países mencionados en el sitio actual como red de aliados/colaboradores
  allies: ['Venezuela', 'Italia', 'España', 'Alemania', 'Portugal', 'Argentina', 'Panamá', 'Costa Rica', 'México', 'EE. UU.'],

  // ---- Configuración de integraciones (vacía = desactivada; nada se simula) ----
  config: {
    // Endpoint propio que reenvía el lead a GoHighLevel (netlify/functions/lead.mjs).
    // Si responde con error o no existe, el formulario ofrece enviar el resumen por WhatsApp o correo.
    leadEndpoint: '/api/lead',
    gtmId: '', // p. ej. 'GTM-XXXXXXX'. Solo se carga tras aceptar cookies de analítica.
  },
};

export const waLink = (text) =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;
