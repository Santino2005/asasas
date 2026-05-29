import { CardData } from './types';

// Cards organized in 3 groups of 4
export const PREFERENCE_CARDS: CardData[] = [
  // GROUP 1 - Individual Project Start
  {
    id: 'g1-card1',
    text: 'Armo una lista de tareas, organizo los días y preparo mis carpetas para tener todo ordenado antes de escribir.',
    group: 1,
    order: 1,
  },
  {
    id: 'g1-card2',
    text: 'Busco la información central y los datos más importantes para entender el tema a fondo de una y no perder tiempo.',
    group: 1,
    order: 2,
  },
  {
    id: 'g1-card3',
    text: 'Preparo el lugar para estar cómodo, pongo música que me motive y busco la forma de disfrutar lo que voy a hacer.',
    group: 1,
    order: 3,
  },
  {
    id: 'g1-card4',
    text: 'Me pongo a imaginar ideas originales para el diseño, el título o el enfoque general de cómo quiero que quede el resultado final.',
    group: 1,
    order: 4,
  },
  // GROUP 2 - Working on Details in Group
  {
    id: 'g2-card1',
    text: 'Me pongo a revisar la información recolectada a fondo para analizar qué datos sirven y cuáles no tienen sustento.',
    group: 2,
    order: 1,
  },
  {
    id: 'g2-card2',
    text: 'Me fijo en cómo están divididas las tareas, cómo se siente el equipo y si alguno está trabado le doy una mano.',
    group: 2,
    order: 2,
  },
  {
    id: 'g2-card3',
    text: 'Me encanta conectar ideas colgadas que tiraron los demás y encontrar una solución o un concepto que sea original.',
    group: 2,
    order: 3,
  },
  {
    id: 'g2-card4',
    text: 'Me encargo de que se respeten las pautas del proyecto, el formato y las fechas de entrega acordadas.',
    group: 2,
    order: 4,
  },
  // GROUP 3 - Finishing the Project
  {
    id: 'g3-card1',
    text: 'Lo único que me importa en el tirón final es testear que el resultado funcione bien y cumpla de manera efectiva con el objetivo.',
    group: 3,
    order: 1,
  },
  {
    id: 'g3-card2',
    text: 'Prefiero proponer un cambio creativo o un remate innovador que sorprenda a todos.',
    group: 3,
    order: 2,
  },
  {
    id: 'g3-card3',
    text: 'Trato de animar al grupo en la etapa final, motivando a todos para que participen y terminemos.',
    group: 3,
    order: 3,
  },
  {
    id: 'g3-card4',
    text: 'Reviso que todo esté cerrado según el plan inicial para ir a lo seguro y no tener que andar improvisando a último momento.',
    group: 3,
    order: 4,
  },
];

export const CONTEXT_SCREENS = {
  context1: {
    message: 'Cuando arranco un proyecto individual',
    subtitle: 'Reflexiona sobre cómo inicias tus proyectos personales',
  },
  context2: {
    message: 'A la hora de ponernos a trabajar en los detalles en grupo',
    subtitle: 'Explora tu rol cuando colaboras en equipo',
  },
  context3: {
    message: 'Cuando estamos terminando el proyecto',
    subtitle: 'Descubre cómo cierras tus procesos',
  },
};

export const REFINEMENT_MESSAGE = 'De todas las situaciones que sentiste cercanas a vos, ¿cuáles representan más profundamente tu forma de pensar?';

// Spatial Interaction Screens - Premium drag-to-corner experience
export interface SpatialQuestion {
  id: string;
  title: string;
  subtitle: string;
  corners: {
    topLeft: { label: string; definition: string; id: string };
    topRight: { label: string; definition: string; id: string };
    bottomLeft: { label: string; definition: string; id: string };
    bottomRight: { label: string; definition: string; id: string };
  };
}

export const SPATIAL_QUESTIONS: SpatialQuestion[] = [
  {
    id: 'spatial-1',
    title: '¿Qué tipo de pregunta te representa más?',
    subtitle: 'Arrastrá el círculo "VOS" hacia la opción con la que más te identificás.',
    corners: {
      topLeft: {
        label: '¿Qué?',
        definition: 'Me interesa saber qué es algo o cuál es el tema.',
        id: 'what',
      },
      topRight: {
        label: '¿Cómo?',
        definition: 'Me interesa entender cómo funciona o cómo se hace.',
        id: 'how',
      },
      bottomLeft: {
        label: '¿Por qué?',
        definition: 'Me interesa descubrir las causas o razones detrás de algo.',
        id: 'why',
      },
      bottomRight: {
        label: '¿Quién?',
        definition: 'Me interesa saber quién lo hace, quién participa o quién está involucrado.',
        id: 'who',
      },
    },
  },
  {
    id: 'spatial-2',
    title: '¿Cómo definís tu comportamiento?',
    subtitle: 'Arrastrá el círculo "VOS" hacia la opción con la que más te identificás.',
    corners: {
      topLeft: {
        label: 'Me gusta Organizar',
        definition: 'Me gusta planificar, ordenar y tener las cosas bajo control.',
        id: 'organize',
      },
      topRight: {
        label: 'Me gusta Compartir',
        definition: 'Me gusta colaborar, conectar con otros y trabajar en equipo.',
        id: 'share',
      },
      bottomLeft: {
        label: 'Me gusta Analizar',
        definition: 'Me gusta analizar datos, evaluar información y buscar precisión.',
        id: 'analyze',
      },
      bottomRight: {
        label: 'Me gusta Descubrir',
        definition: 'Me gusta explorar ideas nuevas, ser creativo y encontrar posibilidades.',
        id: 'discover',
      },
    },
  },
];

export function getCardsByGroup(group: 1 | 2 | 3): CardData[] {
  return PREFERENCE_CARDS.filter(card => card.group === group).sort((a, b) => a.order - b.order);
}

// 16 Cognitive Profiles - Herrmann Brain Dominance Model
export interface CognitiveProfile {
  id: string;
  quadrant: 'A' | 'B' | 'C' | 'D'; // A=Analytical, B=Organized, C=Interpersonal, D=Creative
  position: number; // 1-4 within each quadrant
  title: string;
  description: string;
  color: string; // hex or gradient
  characteristics: string[];
}

export const COGNITIVE_PROFILES: CognitiveProfile[] = [
  // QUADRANT A - ANALYTICAL (Blue/Cool)
  {
    id: 'a1',
    quadrant: 'A',
    position: 1,
    title: 'Analítico Desarmador',
    description: 'Me sale natural desarmar un problema en partes para entender a fondo cómo funciona',
    color: 'from-blue-500 to-blue-600',
    characteristics: [
      'Pensamiento sistemático',
      'Resolución de problemas',
      'Comprensión profunda',
      'Análisis de procesos',
    ],
  },
  {
    id: 'a2',
    quadrant: 'A',
    position: 2,
    title: 'Lógico Racional',
    description: 'Me baso en la razón y en los hechos; si algo no tiene coherencia o sustento, lo descarto',
    color: 'from-blue-600 to-cyan-500',
    characteristics: [
      'Toma decisiones basada en hechos',
      'Rechazo a lo irracional',
      'Pensamiento crítico',
      'Exigencia de coherencia',
    ],
  },
  {
    id: 'a3',
    quadrant: 'A',
    position: 3,
    title: 'Cuantificador de Datos',
    description: 'Prefiero los datos exactos, los números y las mediciones antes que las opiniones o suposiciones.',
    color: 'from-cyan-500 to-teal-500',
    characteristics: [
      'Medición precisa',
      'Preferencia por números',
      'Rechazo a suposiciones',
      'Análisis cuantitativo',
    ],
  },
  {
    id: 'a4',
    quadrant: 'A',
    position: 4,
    title: 'Teórico Fundamentalista',
    description: 'Me gusta entender las leyes, modelos o teorías detrás de las cosas antes de ponerme a actuar.',
    color: 'from-teal-500 to-teal-600',
    characteristics: [
      'Comprensión teórica',
      'Fundamentación rigurosa',
      'Aprendizaje de principios',
      'Pensamiento deductivo',
    ],
  },

  // QUADRANT B - ORGANIZED (Green/Earth)
  {
    id: 'b1',
    quadrant: 'B',
    position: 1,
    title: 'Organizador de Estructuras',
    description: 'Mantengo mis cosas, archivos y tareas bajo una estructura clara y un orden que me resulte cómodo.',
    color: 'from-green-600 to-green-500',
    characteristics: [
      'Organización metódica',
      'Sistemas personales',
      'Orden y método',
      'Clasificación clara',
    ],
  },
  {
    id: 'b2',
    quadrant: 'B',
    position: 2,
    title: 'Metodista Paso a Paso',
    description: 'Prefiero avanzar paso a paso, terminando una tarea antes de arrancar la siguiente, sin saltarme etapas',
    color: 'from-green-500 to-emerald-500',
    characteristics: [
      'Enfoque secuencial',
      'Completitud de tareas',
      'Respeto por procesos',
      'Ausencia de saltos',
    ],
  },
  {
    id: 'b3',
    quadrant: 'B',
    position: 3,
    title: 'Planificador Preventivo',
    description: 'Me anticipo a los problemas; me gusta planificar con tiempo para saber qué hacer si algo sale mal.',
    color: 'from-emerald-500 to-emerald-600',
    characteristics: [
      'Planificación preventiva',
      'Previsión de riesgos',
      'Gestión proactiva',
      'Preparación contingente',
    ],
  },
  {
    id: 'b4',
    quadrant: 'B',
    position: 4,
    title: 'Perfeccionista de Detalles',
    description: 'Soy muy atento a los detalles; me sale fácil revisar y encontrar fallas o cosas para corregir en un trabajo',
    color: 'from-emerald-600 to-teal-600',
    characteristics: [
      'Atención a detalles',
      'Detección de errores',
      'Búsqueda de excelencia',
      'Revisión meticulosa',
    ],
  },

  // QUADRANT C - INTERPERSONAL (Red/Warm)
  {
    id: 'c1',
    quadrant: 'C',
    position: 1,
    title: 'Intuitivo Emocional',
    description: 'Me guío mucho por lo que siento en el momento y conecto con los estados de ánimo de la gente',
    color: 'from-red-500 to-pink-500',
    characteristics: [
      'Inteligencia emocional',
      'Empatía inmediata',
      'Conexión afectiva',
      'Guía intuitiva',
    ],
  },
  {
    id: 'c2',
    quadrant: 'C',
    position: 2,
    title: 'Guardián de Vínculos',
    description: 'Valoro mucho los recuerdos, los vínculos afectivos y el lado humano de las experiencias',
    color: 'from-pink-500 to-rose-500',
    characteristics: [
      'Valoración de vínculos',
      'Preservación de relaciones',
      'Enfoque humanista',
      'Conexión histórica',
    ],
  },
  {
    id: 'c3',
    quadrant: 'C',
    position: 3,
    title: 'Lector de Ambientes',
    description: 'Me doy cuenta al momento de las intenciones de los demás y del ambiente que hay en un lugar sin que me digan nada',
    color: 'from-rose-500 to-orange-400',
    characteristics: [
      'Lectura del ambiente',
      'Detección de intenciones',
      'Percepción social',
      'Sensibilidad contextual',
    ],
  },
  {
    id: 'c4',
    quadrant: 'C',
    position: 4,
    title: 'Catalizador Grupal',
    description: 'Tengo mucha energía y capacidad para realizar los proyectos grupales',
    color: 'from-orange-400 to-orange-500',
    characteristics: [
      'Energía grupal',
      'Facilitación colectiva',
      'Movilización de equipos',
      'Liderazgo participativo',
    ],
  },

  // QUADRANT D - CREATIVE (Purple/Imaginative)
  {
    id: 'd1',
    quadrant: 'D',
    position: 1,
    title: 'Explorador de Caminos Nuevos',
    description: 'Me encanta probar caminos nuevos, experimentar opciones raras y salirme de la rutina',
    color: 'from-purple-500 to-violet-500',
    characteristics: [
      'Experimentación constante',
      'Búsqueda de novedad',
      'Riesgo calculado',
      'Salida de rutinas',
    ],
  },
  {
    id: 'd2',
    quadrant: 'D',
    position: 2,
    title: 'Aprendiz Hacedor',
    description: 'Prefiero aprender haciendo, rompiendo cosas o probando en la práctica antes que leer un manual',
    color: 'from-violet-500 to-purple-600',
    characteristics: [
      'Aprendizaje experiencial',
      'Prototipado rápido',
      'Prueba y error',
      'Conocimiento kinestésico',
    ],
  },
  {
    id: 'd3',
    quadrant: 'D',
    position: 3,
    title: 'Tejedor de Conexiones',
    description: 'Me resulta fácil asociar ideas re distintas, entender metáforas y encontrar el sentido global de las cosas.',
    color: 'from-purple-600 to-indigo-500',
    characteristics: [
      'Pensamiento lateral',
      'Conexiones metafóricas',
      'Visión sistémica',
      'Síntesis creativa',
    ],
  },
  {
    id: 'd4',
    quadrant: 'D',
    position: 4,
    title: 'Saltador de Conclusiones',
    description: 'Voy directo a la idea central o a la solución creativa sin dar vueltas ni trabarme en los procesos.',
    color: 'from-indigo-500 to-indigo-600',
    characteristics: [
      'Pensamiento directo',
      'Visión de soluciones',
      'Eficiencia conceptual',
      'Síntesis rápida',
    ],
  },
];

export function getProfilesByQuadrant(quadrant: 'A' | 'B' | 'C' | 'D'): CognitiveProfile[] {
  return COGNITIVE_PROFILES.filter(p => p.quadrant === quadrant).sort(
    (a, b) => a.position - b.position
  );
}

export function getProfileById(id: string): CognitiveProfile | undefined {
  return COGNITIVE_PROFILES.find(p => p.id === id);
}
