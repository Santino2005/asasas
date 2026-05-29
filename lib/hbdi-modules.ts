export type Quadrant = 'A' | 'B' | 'C' | 'D';

export const QUADRANTS: Record<Quadrant, { name: string; label: string; color: string; description: string }> = {
  A: {
    name: 'A - Azul',
    label: 'Analítico / Cuantitativo',
    color: 'bg-blue-500',
    description: 'Preferencia por datos, lógica, análisis, hechos, resultados y resolución racional de problemas.',
  },
  B: {
    name: 'B - Verde',
    label: 'Organizado / Secuencial',
    color: 'bg-green-500',
    description: 'Preferencia por planificación, orden, procedimientos, agendas, detalle y cumplimiento de plazos.',
  },
  C: {
    name: 'C - Rojo',
    label: 'Interpersonal / Emocional',
    color: 'bg-red-500',
    description: 'Preferencia por comunicación, empatía, colaboración, participación y lectura del clima humano.',
  },
  D: {
    name: 'D - Amarillo',
    label: 'Creativo / Conceptual',
    color: 'bg-yellow-500',
    description: 'Preferencia por ideas nuevas, visión global, intuición, exploración, futuro y pensamiento conceptual.',
  },
};

export interface ActivityQuestion {
  id: string;
  prompt: string;
  context: string;
  maxSelections: number;
  items: Array<{ id: string; text: string; quadrant: Quadrant; sourceWords: string }>;
}

export interface CognitiveQuestion {
  id: string;
  prompt: string;
  type: 'single' | 'multi';
  maxSelections?: number;
  options: Array<{ id: string; text: string; quadrant: Quadrant }>;
}

export interface BehaviorQuestion {
  id: string;
  text: string;
  quadrant: Quadrant;
}

export const ACTIVITY_QUESTIONS: ActivityQuestion[] = [
  {
    id: 'project-start',
    context: 'Arranca un proyecto nuevo y todavía hay poca claridad.',
    prompt: '¿Qué forma de empezar te representa más?',
    maxSelections: 1,
    items: [
      { id: 'project-data', text: 'Busco datos, criterios y evidencias para entender el problema.', quadrant: 'A', sourceWords: 'analizar, cuantificar, datos' },
      { id: 'project-plan', text: 'Ordeno tareas, plazos y pasos para que el equipo sepa cómo avanzar.', quadrant: 'B', sourceWords: 'organizar, planificar, plazos' },
      { id: 'project-people', text: 'Escucho a las personas involucradas para entender necesidades y expectativas.', quadrant: 'C', sourceWords: 'sentir, compartir, comunicación' },
      { id: 'project-ideas', text: 'Imagino alternativas nuevas y oportunidades que todavía no se están viendo.', quadrant: 'D', sourceWords: 'teorizar, conceptuar, futuro' },
    ],
  },
  {
    id: 'learning-topic',
    context: 'Tenés que aprender un tema complejo en poco tiempo.',
    prompt: '¿Qué estrategia elegirías primero?',
    maxSelections: 1,
    items: [
      { id: 'learn-facts', text: 'Separar hechos, conceptos clave y evidencia para comprobar si entendí.', quadrant: 'A', sourceWords: 'evaluar teorías, hechos, lógica' },
      { id: 'learn-steps', text: 'Seguir una guía paso a paso con ejemplos ordenados.', quadrant: 'B', sourceWords: 'paso a paso, orientación clara' },
      { id: 'learn-group', text: 'Conversarlo con otras personas y aprender desde ejemplos humanos.', quadrant: 'C', sourceWords: 'compartir ideas, grupo' },
      { id: 'learn-visual', text: 'Armar un mapa visual o una metáfora para ver el cuadro general.', quadrant: 'D', sourceWords: 'imaginación, metáforas, cuadro general' },
    ],
  },
  {
    id: 'team-problem',
    context: 'El equipo está trabado y nadie logra avanzar.',
    prompt: '¿Qué aporte harías naturalmente?',
    maxSelections: 1,
    items: [
      { id: 'team-analyze', text: 'Detectaría la causa concreta del bloqueo y mediría qué está fallando.', quadrant: 'A', sourceWords: 'analizar, evaluar, resultados' },
      { id: 'team-order', text: 'Reorganizaría responsabilidades, prioridades y tiempos.', quadrant: 'B', sourceWords: 'organizar, agrupar, producir' },
      { id: 'team-dialogue', text: 'Abriría una conversación para que todos puedan decir qué necesitan.', quadrant: 'C', sourceWords: 'oír, hablar, compartir' },
      { id: 'team-change', text: 'Propondría cambiar el enfoque y probar una solución distinta.', quadrant: 'D', sourceWords: 'provocar cambios, probar cosas nuevas' },
    ],
  },
  {
    id: 'presentation',
    context: 'Tenés que presentar una idea frente a otras personas.',
    prompt: '¿Qué cuidarías más?',
    maxSelections: 1,
    items: [
      { id: 'presentation-data', text: 'Que los argumentos tengan datos, precisión y solidez.', quadrant: 'A', sourceWords: 'números, estadísticas, técnico' },
      { id: 'presentation-structure', text: 'Que la explicación tenga orden, secuencia y cierre claro.', quadrant: 'B', sourceWords: 'secuencial, preparado, detalles' },
      { id: 'presentation-connection', text: 'Que el mensaje conecte con el público y genere participación.', quadrant: 'C', sourceWords: 'personas, comunicación, equipo' },
      { id: 'presentation-impact', text: 'Que la idea se vea original, visual y con potencial futuro.', quadrant: 'D', sourceWords: 'visual, explorar, futuro' },
    ],
  },
  {
    id: 'uncertain-decision',
    context: 'Tenés que decidir con información incompleta.',
    prompt: '¿Cómo te moverías?',
    maxSelections: 1,
    items: [
      { id: 'decision-evidence', text: 'Reuniría los datos disponibles y compararía riesgos.', quadrant: 'A', sourceWords: 'analizar datos, evaluar' },
      { id: 'decision-method', text: 'Usaría un método claro para decidir sin perder el control.', quadrant: 'B', sourceWords: 'control, métodos comprobados' },
      { id: 'decision-consensus', text: 'Buscaría entender cómo impacta en otros antes de avanzar.', quadrant: 'C', sourceWords: 'personas, emocional, humano' },
      { id: 'decision-risk', text: 'Aceptaría cierto riesgo si abre una oportunidad nueva.', quadrant: 'D', sourceWords: 'arriesgarse, iniciativas' },
    ],
  },
  {
    id: 'organize-event',
    context: 'Hay que organizar una actividad importante para muchas personas.',
    prompt: '¿Qué rol te saldría tomar?',
    maxSelections: 1,
    items: [
      { id: 'event-budget', text: 'Calcular recursos, costos y resultados esperados.', quadrant: 'A', sourceWords: 'cuantificar, números' },
      { id: 'event-logistics', text: 'Armar agenda, checklist y distribución de tareas.', quadrant: 'B', sourceWords: 'agenda, ordenar, planificar' },
      { id: 'event-host', text: 'Cuidar el clima del grupo y que todos se sientan incluidos.', quadrant: 'C', sourceWords: 'equipo, compartir, sentir' },
      { id: 'event-experience', text: 'Diseñar una experiencia distinta, memorable y creativa.', quadrant: 'D', sourceWords: 'descubrir, conceptual, experimental' },
    ],
  },
  {
    id: 'feedback',
    context: 'Recibís una devolución sobre tu trabajo.',
    prompt: '¿Qué tipo de devolución te sirve más?',
    maxSelections: 1,
    items: [
      { id: 'feedback-metrics', text: 'Indicadores concretos de qué funcionó y qué no.', quadrant: 'A', sourceWords: 'resultados, datos' },
      { id: 'feedback-process', text: 'Correcciones ordenadas para mejorar paso a paso.', quadrant: 'B', sourceWords: 'paso a paso, detalles' },
      { id: 'feedback-human', text: 'Una conversación cercana que contemple cómo me sentí.', quadrant: 'C', sourceWords: 'emocional, compartir' },
      { id: 'feedback-vision', text: 'Ideas para llevarlo a un nivel más original o ambicioso.', quadrant: 'D', sourceWords: 'innovar, concepto' },
    ],
  },
  {
    id: 'deadline-pressure',
    context: 'Falta poco para entregar y aparece presión.',
    prompt: '¿Qué priorizás?',
    maxSelections: 1,
    items: [
      { id: 'deadline-critical', text: 'Resolver lo más importante con criterio lógico y foco en resultados.', quadrant: 'A', sourceWords: 'analizar, resultado' },
      { id: 'deadline-order', text: 'Mantener el orden, cerrar pendientes y cumplir el plazo.', quadrant: 'B', sourceWords: 'plazo, orden, producir' },
      { id: 'deadline-team', text: 'Sostener al equipo para que nadie quede aislado o saturado.', quadrant: 'C', sourceWords: 'equipo, personas' },
      { id: 'deadline-adapt', text: 'Adaptar el plan con una solución creativa aunque no sea la prevista.', quadrant: 'D', sourceWords: 'cambios, probar nuevo' },
    ],
  },
];

export const COGNITIVE_QUESTIONS: CognitiveQuestion[] = [
  {
    id: 'favorite-question',
    prompt: 'Cuando querés entender algo, ¿qué pregunta te sale hacer primero?',
    type: 'single',
    options: [
      { id: 'what', text: '¿Qué es? ¿Cuáles son los datos, hechos o resultados?', quadrant: 'A' },
      { id: 'how', text: '¿Cómo se hace? ¿Cuáles son los pasos o el procedimiento?', quadrant: 'B' },
      { id: 'who', text: '¿Quién participa? ¿A quién afecta o involucra?', quadrant: 'C' },
      { id: 'why', text: '¿Por qué ocurre? ¿Cuál es el sentido o la idea general?', quadrant: 'D' },
    ],
  },
  {
    id: 'favorite-actions',
    prompt: '¿Qué acciones disfrutás más hacer?',
    type: 'multi',
    maxSelections: 4,
    options: [
      { id: 'discover', text: 'Descubrir posibilidades nuevas.', quadrant: 'D' },
      { id: 'quantify', text: 'Cuantificar información.', quadrant: 'A' },
      { id: 'group', text: 'Agrupar elementos y clasificarlos.', quadrant: 'B' },
      { id: 'organize', text: 'Organizar tareas o recursos.', quadrant: 'B' },
      { id: 'conceptualize', text: 'Conceptuar o construir una idea general.', quadrant: 'D' },
      { id: 'analyze', text: 'Analizar información con lógica.', quadrant: 'A' },
      { id: 'feel', text: 'Sentir y conectar con el impacto humano.', quadrant: 'C' },
      { id: 'practice', text: 'Practicar hasta dominar una habilidad.', quadrant: 'B' },
      { id: 'theorize', text: 'Teorizar y explicar causas.', quadrant: 'D' },
      { id: 'summarize', text: 'Resumir lo importante.', quadrant: 'A' },
      { id: 'evaluate', text: 'Evaluar calidad, evidencia y resultados.', quadrant: 'A' },
      { id: 'reflect', text: 'Reflexionar sobre lo vivido.', quadrant: 'C' },
      { id: 'process', text: 'Procesar información paso a paso.', quadrant: 'B' },
      { id: 'order', text: 'Ordenar y secuenciar actividades.', quadrant: 'B' },
      { id: 'explore', text: 'Explorar alternativas.', quadrant: 'D' },
      { id: 'share', text: 'Compartir con otros.', quadrant: 'C' },
    ],
  },
  {
    id: 'self-definition',
    prompt: 'Si tuvieras que definir tu forma de actuar, ¿cuál elegirías?',
    type: 'single',
    options: [
      { id: 'like-analyze', text: 'Me gusta analizar.', quadrant: 'A' },
      { id: 'like-organize', text: 'Me gusta organizar.', quadrant: 'B' },
      { id: 'like-share', text: 'Me gusta compartir.', quadrant: 'C' },
      { id: 'like-discover', text: 'Me gusta descubrir.', quadrant: 'D' },
    ],
  },
  {
    id: 'problem-general',
    prompt: 'Cuando tenés que resolver un problema, generalmente...',
    type: 'single',
    options: [
      { id: 'logical-facts', text: 'Analizo los hechos de forma lógica y racional.', quadrant: 'A' },
      { id: 'organized-facts', text: 'Organizo los hechos de forma realista y cronológica.', quadrant: 'B' },
      { id: 'human-impact', text: 'Pienso cómo afecta a todos y trato de resolverlo compartiendo lo que sentimos.', quadrant: 'C' },
      { id: 'global-intuition', text: 'Miro el panorama completo y confío en lo que me dice mi instinto.', quadrant: 'D' },
    ],
  },
  {
    id: 'problem-look-for',
    prompt: 'Cuando buscás una solución, ¿qué visión te resulta más útil?',
    type: 'single',
    options: [
      { id: 'results-view', text: 'Una visión analítica, lógica, racional y orientada a resultados.', quadrant: 'A' },
      { id: 'organized-view', text: 'Una visión organizada, detallada y cronológica.', quadrant: 'B' },
      { id: 'human-view', text: 'Una visión interpersonal, emocional y humana.', quadrant: 'C' },
      { id: 'conceptual-view', text: 'Una visión intuitiva, conceptual, visual y de contexto general.', quadrant: 'D' },
    ],
  },
  {
    id: 'phrases',
    prompt: '¿Qué frases se parecen más a lo que solés decir?',
    type: 'multi',
    maxSelections: 3,
    options: [
      { id: 'key-point', text: 'Vayamos al punto clave del problema.', quadrant: 'A' },
      { id: 'analyze', text: 'Vamos a analizar.', quadrant: 'A' },
      { id: 'result', text: 'Veamos el resultado.', quadrant: 'A' },
      { id: 'same-way', text: 'Siempre hacemos las cosas de esta forma.', quadrant: 'B' },
      { id: 'law-order', text: 'Vamos a mantener la ley y el orden.', quadrant: 'B' },
      { id: 'safe-way', text: 'Es más seguro de esta forma.', quadrant: 'B' },
      { id: 'human-values', text: 'Veamos los valores humanos.', quadrant: 'C' },
      { id: 'team-development', text: 'Veamos el desarrollo del equipo.', quadrant: 'C' },
      { id: 'participate', text: 'Vamos a participar y motivar.', quadrant: 'C' },
      { id: 'big-picture', text: 'Vamos a ver el cuadro general.', quadrant: 'D' },
      { id: 'concept', text: 'Este es el gran concepto.', quadrant: 'D' },
      { id: 'innovate', text: 'Vamos a innovar y crear sinergia.', quadrant: 'D' },
    ],
  },
];

export const BEHAVIOR_QUESTIONS: BehaviorQuestion[] = [
  { id: 'punctual', text: 'Soy puntual y me importa cumplir los plazos acordados.', quadrant: 'B' },
  { id: 'agenda', text: 'Necesito agendas, listas o planificación para trabajar mejor.', quadrant: 'B' },
  { id: 'organized', text: 'Me considero una persona organizada y preparada.', quadrant: 'B' },
  { id: 'details', text: 'Presto atención a los detalles y prefiero evitar improvisaciones.', quadrant: 'B' },
  { id: 'sequence', text: 'Me resulta natural ordenar actividades en una secuencia clara.', quadrant: 'B' },
  { id: 'logic-problems', text: 'Me gusta resolver problemas usando lógica y evidencia.', quadrant: 'A' },
  { id: 'numbers', text: 'Me siento cómodo/a trabajando con números, estadísticas o datos.', quadrant: 'A' },
  { id: 'evaluate', text: 'Suelo evaluar opciones de manera racional antes de decidir.', quadrant: 'A' },
  { id: 'direct', text: 'Soy directo/a cuando necesito ir al punto central de un problema.', quadrant: 'A' },
  { id: 'technical', text: 'Disfruto entender cómo funciona algo desde su parte técnica.', quadrant: 'A' },
  { id: 'new-ideas', text: 'Me abro fácilmente a ideas nuevas y experimentales.', quadrant: 'D' },
  { id: 'future', text: 'Me interesa imaginar escenarios futuros y posibilidades.', quadrant: 'D' },
  { id: 'explorer', text: 'Disfruto explorar alternativas aunque todavía no estén del todo definidas.', quadrant: 'D' },
  { id: 'conceptual', text: 'Me resulta natural pensar en conceptos, metáforas o visiones globales.', quadrant: 'D' },
  { id: 'risk', text: 'Me animo a probar caminos nuevos aunque tengan cierta incertidumbre.', quadrant: 'D' },
  { id: 'empathy', text: 'Percibo con facilidad cómo se sienten otras personas.', quadrant: 'C' },
  { id: 'share', text: 'Me gusta compartir, escuchar y trabajar con otros.', quadrant: 'C' },
  { id: 'human-impact', text: 'Antes de decidir, suelo pensar en el impacto humano de mis acciones.', quadrant: 'C' },
  { id: 'emotional', text: 'Me involucro emocionalmente con los proyectos y las personas.', quadrant: 'C' },
  { id: 'team-energy', text: 'Me sale motivar al grupo y cuidar que todos participen.', quadrant: 'C' },
];

export function emptyScores(): Record<Quadrant, number> {
  return { A: 0, B: 0, C: 0, D: 0 };
}
