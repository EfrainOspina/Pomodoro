// Preguntas de calificación por línea de servicio (paso 2 del formulario progresivo).
// Principio: solo lo necesario para una evaluación preliminar. Nunca pedimos documentos,
// números de identidad ni datos sensibles en el primer contacto.
// type: radio | select | text | textarea   ·   required por defecto salvo optional: true

export const formSets = {
  ciudadania: [
    { id: 'linea', label: '¿Por qué línea familiar proviene tu ascendencia italiana?', type: 'radio',
      options: ['Paterna', 'Materna', 'Ambas', 'No estoy seguro'] },
    { id: 'antepasado', label: '¿Quién es tu antepasado italiano más cercano?', type: 'radio',
      options: ['Padre o madre', 'Abuelo o abuela', 'Bisabuelo o bisabuela', 'Tatarabuelo o anterior', 'No lo sé todavía'] },
    { id: 'nacio_italia', label: '¿Ese antepasado nació en Italia?', type: 'radio',
      options: ['Sí', 'No, nació fuera de Italia', 'No lo sé'] },
    { id: 'naturalizacion', label: '¿Sabes si ese antepasado se naturalizó en otro país o renunció a la ciudadanía italiana?', type: 'radio',
      options: ['Sí', 'No', 'No lo sé'] },
    { id: 'tramite_previo', label: '¿Tú o algún familiar ha iniciado antes un trámite de ciudadanía italiana?', type: 'radio',
      options: ['No', 'Sí, yo', 'Sí, un familiar ya fue reconocido', 'No lo sé'] },
    { id: 'objetivo', label: '¿Cuál es tu objetivo principal?', type: 'select',
      options: ['Vivir o trabajar en Europa', 'Emprender en Europa', 'Estudiar en Europa', 'Transmitir la ciudadanía a mis hijos', 'Tener el pasaporte por seguridad o movilidad', 'Otro'] },
  ],
  matrimonio: [
    { id: 'residencia_pareja', label: '¿Dónde residen actualmente como pareja?', type: 'radio',
      options: ['En Italia', 'Fuera de Italia'] },
    { id: 'anios_matrimonio', label: '¿Cuánto tiempo llevan casados?', type: 'radio',
      options: ['Menos de 2 años', 'Entre 2 y 3 años', 'Más de 3 años'] },
    { id: 'hijos', label: '¿Tienen hijos en común?', type: 'radio', options: ['Sí', 'No'] },
    { id: 'conyuge', label: 'Tu cónyuge es ciudadano italiano…', type: 'radio',
      options: ['Por nacimiento en Italia', 'Reconocido por descendencia', 'Por otra vía', 'No lo sé'] },
    { id: 'estado', label: '¿En qué punto estás?', type: 'radio',
      options: ['Apenas me estoy informando', 'Estoy reuniendo documentos', 'Ya presenté la solicitud'] },
  ],
  mentoria: [
    { id: 'perfil', label: '¿Cuál es tu perfil?', type: 'radio',
      options: ['Descendiente de italianos', 'Cónyuge de italiano/a', 'Italiano nacido en el exterior ya reconocido'] },
    { id: 'etapa', label: '¿En qué etapa del trámite estás?', type: 'radio',
      options: ['Empezando', 'Reuniendo documentos', 'Listo para presentar', 'Ya presenté y necesito seguimiento'] },
    { id: 'apoyo', label: '¿En qué necesitas más apoyo?', type: 'select',
      options: ['Saber si califico', 'Revisar documentos', 'Elegir consulado o vía', 'Preparar la presentación', 'Trámites posteriores (AIRE, pasaporte, CIE)'] },
  ],
  migracion: [
    { id: 'destino', label: '¿A qué país te gustaría migrar o emprender?', type: 'select',
      options: ['Italia', 'España', 'Alemania', 'Portugal', 'Otro país de la Unión Europea', 'Aún no lo sé'] },
    { id: 'motivo', label: '¿Cuál es el motivo principal?', type: 'radio',
      options: ['Trabajar', 'Emprender o abrir una empresa', 'Estudiar', 'Reunificación familiar', 'Asilo o protección internacional', 'Otro'] },
    { id: 'ciudadanias', label: '¿Qué ciudadanías tienes actualmente?', type: 'text', placeholder: 'Ej.: venezolana e italiana' },
    { id: 'profesion', label: 'Profesión u oficio', type: 'text', placeholder: 'Ej.: ingeniera civil', optional: true },
    { id: 'personas', label: '¿Cuántas personas migrarían contigo (incluyéndote)?', type: 'select',
      options: ['1', '2', '3', '4', '5 o más'] },
    { id: 'plazo', label: '¿En qué plazo quieres hacerlo?', type: 'radio',
      options: ['En menos de 6 meses', 'Entre 6 y 12 meses', 'Más de 12 meses', 'Solo me estoy informando'] },
  ],
  documentos: [
    { id: 'gestion', label: '¿Qué necesitas?', type: 'radio',
      options: ['Buscar un acta de un antepasado en Italia', 'Legalizar o apostillar documentos', 'Traducción oficial', 'Búsqueda de bienes o empresas en Italia', 'Otro'] },
    { id: 'lugar', label: 'Comune o región de origen (si la conoces)', type: 'text', placeholder: 'Ej.: Cosenza, Calabria', optional: true },
    { id: 'epoca', label: 'Año o época aproximada del documento (si la conoces)', type: 'text', placeholder: 'Ej.: alrededor de 1890', optional: true },
    { id: 'para', label: '¿Para qué trámite es?', type: 'select',
      options: ['Ciudadanía por descendencia', 'Ciudadanía por matrimonio', 'Trámite migratorio', 'Otro'] },
  ],
  otro: [],
};

export const serviceOptions = [
  ['ciudadania', 'Ciudadanía italiana por descendencia', 'Soy hijo, nieto o descendiente de italianos'],
  ['matrimonio', 'Ciudadanía italiana por matrimonio', 'Estoy casado/a con un ciudadano italiano'],
  ['mentoria', 'Mentoría de 12 meses', 'Quiero hacer mi trámite con guía profesional'],
  ['migracion', 'Migrar o emprender en Europa', 'Visas, residencia, empresa o reunificación'],
  ['documentos', 'Documentos en Italia', 'Actas, apostillas, traducciones'],
  ['otro', 'Otro / no estoy seguro', 'Cuéntanos tu caso y te orientamos'],
];
