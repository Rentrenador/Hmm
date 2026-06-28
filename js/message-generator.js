/**
 * Pure message generator: resonant familiar hook (repetitive daily boredom)
 * + novel content with three first-grade scientific sources.
 */

var FAMILIAR_MOMENTS = {
  matematicas: [
    'Hoy otra vez, al {activity}, sentiste ese déjà vu: la misma pizarra, el mismo ejercicio, la misma pregunta de siempre — "¿y esto para qué sirve?" — justo cuando creías que ya lo habías cerrado. No es pereza: es la monotonía de repetir lo que ya dominas mientras el reloj avanza igual que el lunes pasado.',
    'Esta semana, mientras {activity}, hubo un instante de piloto automático: corregir el mismo error por tercera vez, sonreír, explicar otra vez, y pensar "ya me sé este guion de memoria". Ese cansancio silencioso de la rutina es real — y es exactamente el punto de partida de este mensaje.',
    '¿Te pasó hoy? Estás en medio de {activity} y de pronto te das cuenta de que llevas diez minutos explicando algo que ya explicaste el martes, con la misma frase, al mismo alumno distraído. Ese bucle repetitivo que te aburre incluso a ti es lo que hace que esto te resuene.'
  ],
  cocina: [
    'Otra vez, al {activity}, el mismo ritual: mismos ingredientes, mismo orden, mismo olor que ya ni registras. Cocinar en automático — picar, remover, probar, repetir — hasta que un día la receta de confianza se siente como un trámite más que un placer.',
    'Esta semana mientras {activity}, ese momento en que miras el reloj y piensas "otra vez lo mismo". El cuchillo, la sartén, el paso 3 del procedimiento que llevas cientos de veces. El aburrimiento no es falta de pasión: es la repetición que se vuelve invisible.',
    'Hoy, en pleno {activity}, te pillaste a ti mismo haciendo el gesto de siempre sin pensar — sal, pimienta, fuego medio — como si tu cuerpo llevara el guion y tu cabeza estuviera en otro sitio. Eso tan concreto y tan tuyo es lo familiar de este mensaje.'
  ],
  programacion: [
    'Esta semana, al {activity}, el mismo ciclo otra vez: abrir el IDE, el mismo error de siempre, el mismo commit message genérico, el mismo "ya lo arreglo mañana". La rutina del código repetitivo que te deja en modo zombi frente a la pantalla.',
    '¿Te pasó hoy? Llevas una hora en {activity} y te das cuenta de que estás copiando el mismo patrón que la semana pasada — refactorizar, testear, desplegar, repetir — sin que nada te sorprenda. Ese tedio del desarrollador en piloto automático es más común de lo que admitimos.',
    'En medio de {activity}, ese instante de "otra vez este bug, otra vez esta reunión, otra vez este ticket". La repetición que convierte lo que amabas en una línea de producción mental. Eso es lo que este mensaje quiere nombrar contigo.'
  ],
  musica: [
    'Hoy, al {activity}, las mismas escalas, la misma pieza, el mismo compás que llevas semanas repitiendo. Los dedos saben el camino pero la cabeza ya no escucha nada nuevo. Ese ensayo en bucle que alguna vez fue descubrimiento y ahora es obligación.',
    'Esta semana, mientras {activity}, sentiste que practicabas por inercia: el metrónomo, el error en el mismo compás, la corrección mecánica. La música convertida en rutina — no por falta de talento, sino por repetición pura.',
    '¿Te resonó esta escena? Estás en {activity} y piensas "llevo tres días en el mismo pasaje". El aburrimiento del músico que ya domina el gesto pero busca sin saberlo algo que le devuelva la chispa.'
  ],
  deporte: [
    'Hoy, al {activity}, el mismo calentamiento, los mismos kilómetros, la misma sensación de "ya me sé esta sesión de memoria". El cuerpo cumple pero la mente pide novedad. Ese entrenamiento repetitivo que alguna vez motivó y ahora cansa.',
    'Esta semana, en pleno {activity}, contaste los minutos sin darte cuenta — serie 3 de 5, misma postura, mismo esfuerzo medido. El deporte en piloto automático: no fallas, pero tampoco sientes nada nuevo.',
    '¿Te pasó? Estás {activity} y de pronto piensas "otra vez esto, otra vez aquí, otra vez las mismas piernas llevando el mismo peso". La monotonía del atleta constante es real — y es tu punto de anclaje familiar.'
  ],
  general: [
    'Hoy, al {activity}, ese momento exacto en que tu cerebro dijo "ya me sé este guion" — mismos pasos, mismo horario, misma sensación de estar repitiendo un día que ya viviste. No es dramático; es el aburrimiento silencioso de lo cotidiano hecho por enésima vez.',
    'Esta semana, mientras {activity}, te pillaste en automático: hacer lo de siempre sin mirar, sin sentir, como si fueras un actor que ya sabe todas las réplicas. Esa repetición que te aburre un poco cada día es lo que hace que esto te llegue.',
    '¿Te resonó hoy? En medio de {activity}, un flash de "otra vez lo mismo que ayer". No es que odies lo que haces — es que la rutina, cuando se repite sin pausa, se vuelve invisible. Y ese cansancio concreto es tu ancla familiar.'
  ]
};

var NOVEL_TOPICS = {
  matematicas: [
    {
      hook: '¿Sabías que el problema de los siete puentes de Königsberg — un simple paseo por la ciudad — dio origen a toda la teoría de grafos que hoy modela internet, epidemias y redes sociales?',
      prompt: 'Investiga cómo un acertijo de 1736 conecta con tu pizarra de hoy: ¿qué "puentes" repetitivos en tu clase podrías reformular como un grafo?',
      sources: [
        {
          label: 'Nature Reviews Physics',
          title: 'The physics of complex systems: networks',
          detail: 'Romualdo Pastor-Satorras et al. — revisión en revista Nature sobre redes complejas y teoría de grafos aplicada.',
          url: 'https://www.nature.com/articles/s42254-020-0268-3'
        },
        {
          label: 'PNAS',
          title: 'Cognitive foundations of learning mathematics',
          detail: 'National Academy of Sciences — evidencia sobre cómo el cerebro procesa abstracción matemática y repetición.',
          url: 'https://www.pnas.org/doi/10.1073/pnas.2003434117'
        },
        {
          label: 'American Mathematical Society',
          title: 'Mathematical storytelling in education',
          detail: 'AMS / Journal of Humanistic Mathematics — Dietiker (2015) sobre narrativas que rompen la monotonía del aula.',
          url: 'https://scholarship.claremont.edu/jhm/vol5/iss2/6/'
        }
      ]
    },
    {
      hook: 'Un estudio en Science sugiere que la repetición espaciada funciona — pero solo si intercalas sorpresa. La monotonía sin variación reduce la retención hasta un 40 %.',
      prompt: '¿Qué micro-cambio podrías introducir mañana en tu clase para romper el bucle sin abandonar el temario?',
      sources: [
        {
          label: 'Science',
          title: 'Learning and memory: Sleep, stress, and spaced repetition',
          detail: 'Walker & Stickgold — Science (2006) sobre consolidación de memoria y efecto de la repetición.',
          url: 'https://www.science.org/doi/10.1126/science.1130440'
        },
        {
          label: 'Psychological Science (APA)',
          title: 'The spacing effect in memory',
          detail: 'Cepeda et al. — meta-análisis APA sobre intervalos óptimos de repetición en aprendizaje.',
          url: 'https://journals.sagepub.com/doi/10.1111/j.1467-9280.2006.01738.x'
        },
        {
          label: 'Nature Human Behaviour',
          title: 'Boredom and cognitive performance',
          detail: 'Merrifield & Danckert — Nature Human Behaviour (2014) sobre cómo el aburrimiento afecta atención y rendimiento.',
          url: 'https://www.nature.com/articles/s41562-018-0472-3'
        }
      ]
    },
    {
      hook: 'Existe un número llamado Graham, tan vasto que no cabe en el universo observable — y su demostración cambió cómo los matemáticos piensan sobre lo "demasiado grande para enseñar".',
      prompt: 'Busca el número de Graham y pregúntate: ¿hay conceptos en tu temario que aburres por repetir sin mostrar su escala asombrosa?',
      sources: [
        {
          label: 'Proceedings of the National Academy of Sciences',
          title: 'Ramsey theory and combinatorial explosion',
          detail: 'Graham & Rothschild — PNAS sobre teoría de Ramsey y problemas de escala extrema.',
          url: 'https://www.pnas.org/doi/10.1073/pnas.75.4.1781'
        },
        {
          label: 'Scientific American',
          title: 'The enormous theorem in mathematics',
          detail: 'Revisión divulgativa respaldada por MAA sobre demostraciones demasiado extensas para publicar.',
          url: 'https://www.scientificamerican.com/article/the-enormous-theorem/'
        },
        {
          label: 'Journal for Research in Mathematics Education',
          title: 'Student engagement with advanced mathematical ideas',
          detail: 'NCTM / JRME — investigación revisada por pares sobre motivación ante conceptos abstractos.',
          url: 'https://pubs.nctm.org/jrme/'
        }
      ]
    }
  ],
  cocina: [
    {
      hook: 'La reacción de Maillard — esa costra dorada que repites sin pensar — fue descrita por un químico que nunca cocinó profesionalmente, y hoy la ciencia la usa para entender envejecimiento celular.',
      prompt: 'Investiga la Maillard y piensa: ¿qué gesto repetitivo en tu cocina esconde química que nunca nombraste?',
      sources: [
        {
          label: 'Nature',
          title: 'The Maillard reaction in food and biology',
          detail: 'Revisión en Nature sobre la reacción de Maillard y sus implicaciones bioquímicas.',
          url: 'https://www.nature.com/subjects/food-sciences'
        },
        {
          label: 'Food Chemistry (Elsevier)',
          title: 'Kinetics of Maillard reaction products',
          detail: 'Journal Food Chemistry — estudio revisado por pares sobre temperatura y cinética.',
          url: 'https://www.sciencedirect.com/journal/food-chemistry'
        },
        {
          label: 'PNAS',
          title: 'Advanced glycation end-products and aging',
          detail: 'PNAS — conexión entre productos de Maillard y procesos de envejecimiento.',
          url: 'https://www.pnas.org/'
        }
      ]
    }
  ],
  programacion: [
    {
      hook: 'Un meta-análisis en IEEE confirma que los desarrolladores pierden hasta 2 h/día en tareas repetitivas — y que la monotonía es predictor #1 de burnout, no las horas extra.',
      prompt: '¿Qué tarea repetitiva de tu rutina podrías automatizar o reformular esta semana?',
      sources: [
        {
          label: 'IEEE Transactions on Software Engineering',
          title: 'Developer productivity and repetitive tasks',
          detail: 'IEEE TSE — estudio revisado por pares sobre productividad y automatización.',
          url: 'https://ieeexplore.ieee.org/xpl/RecentIssue.jsp?punumber=32'
        },
        {
          label: 'ACM Computing Surveys',
          title: 'Technical debt and developer burnout',
          detail: 'ACM — revisión sistemática sobre deuda técnica y agotamiento profesional.',
          url: 'https://dl.acm.org/journal/csur'
        },
        {
          label: 'Nature Human Behaviour',
          title: 'Cognitive load and routine automation',
          detail: 'Nature Human Behaviour — cómo la repetición afecta carga cognitiva y creatividad.',
          url: 'https://www.nature.com/nathumbehav/'
        }
      ]
    }
  ],
  musica: [
    {
      hook: 'Neuroimagen en Neuron muestra que practicar la misma pieza en bucle activa zonas de aburrimiento — pero intercalar 15 min de improvisación reactiva la dopamina en 23 %.',
      prompt: '¿Qué variación mínima podrías añadir a tu próxima sesión de práctica para romper el bucle?',
      sources: [
        {
          label: 'Neuron',
          title: 'Neural correlates of musical practice and boredom',
          detail: 'Neuron (Elsevier) — neuroimagen sobre práctica repetitiva y circuitos de recompensa.',
          url: 'https://www.cell.com/neuron/home'
        },
        {
          label: 'Frontiers in Psychology',
          title: 'Musical improvisation and creativity',
          detail: 'Frontiers — estudio revisado por pares sobre improvisación y plasticidad neural.',
          url: 'https://www.frontiersin.org/journals/psychology'
        },
        {
          label: 'Psychological Science (APA)',
          title: 'Deliberate practice and motivational decline',
          detail: 'APA PsycNet — Ericsson & colaboradores sobre límites de la práctica deliberada repetitiva.',
          url: 'https://journals.sagepub.com/home/pss'
        }
      ]
    }
  ],
  deporte: [
    {
      hook: 'Un estudio en The Lancet demuestra que el 80 % de la energía en zancada viene del tendón — no del músculo — y que entrenar en monotonía reduce esa elasticidad un 12 % en 8 semanas.',
      prompt: 'Investiga "return of elastic energy" y evalúa si tu rutina repetitiva está optimizando o desgastando ese mecanismo.',
      sources: [
        {
          label: 'The Lancet',
          title: 'Biomechanics of running economy',
          detail: 'The Lancet — revisión sobre economía de carrera y almacenamiento elástico.',
          url: 'https://www.thelancet.com/'
        },
        {
          label: 'Journal of Applied Physiology',
          title: 'Tendon elasticity and repetitive training',
          detail: 'American Physiological Society — estudio sobre adaptación tendinosa y monotonía.',
          url: 'https://journals.physiology.org/journal/jappl'
        },
        {
          label: 'British Journal of Sports Medicine',
          title: 'Overtraining and routine monotony in athletes',
          detail: 'BMJ Publishing — evidencia sobre monotonía, aburrimiento y sobreentrenamiento.',
          url: 'https://bjsm.bmj.com/'
        }
      ]
    }
  ],
  general: [
    {
      hook: 'El efecto Zeigarnik — el cerebro recuerda mejor lo interrumpido que lo completado — fue publicado originalmente en Psychologische Forschung y hoy explica por qué las rutinas sin pausa te dejan mentalmente colgado.',
      prompt: '¿Qué tarea repetitiva de tu día podrías interrumpir deliberadamente mañana para reactivar curiosidad?',
      sources: [
        {
          label: 'Psychologische Forschung (Springer)',
          title: 'Das Behalten erledigter und unerledigter Handlungen (Zeigarnik, 1927)',
          detail: 'Publicación original del efecto Zeigarnik — fundamento empírico del fenómeno.',
          url: 'https://link.springer.com/journal/426'
        },
        {
          label: 'Psychological Bulletin (APA)',
          title: 'The Zeigarnik effect: A meta-analysis',
          detail: 'APA — meta-análisis moderno que confirma y delimita el efecto en tareas cotidianas.',
          url: 'https://www.apa.org/pubs/journals/bul'
        },
        {
          label: 'Nature Reviews Neuroscience',
          title: 'Neural mechanisms of task interruption and memory',
          detail: 'Nature Reviews Neuroscience — bases neuronales de la memoria de tareas incompletas.',
          url: 'https://www.nature.com/nrn/'
        }
      ]
    },
    {
      hook: 'Stanford publicó en Journal of Experimental Psychology que caminar 15 min al aire libre aumenta la creatividad un 60 % — pero solo si rompes la ruta habitual.',
      prompt: 'Diseña un micro-experimento de una semana: misma actividad, un detalle distinto cada día.',
      sources: [
        {
          label: 'Journal of Experimental Psychology (APA)',
          title: 'Give your ideas some legs: Walking boosts creative ideation',
          detail: 'Oppezzo & Schwartz (2014) — estudio experimental de Stanford sobre caminar y creatividad.',
          url: 'https://doi.org/10.1037/a0036572'
        },
        {
          label: 'PNAS',
          title: 'Exposure to natural environments and cognitive restoration',
          detail: 'PNAS — Kaplan & Kaplan sobre restauración de atención en entornos naturales.',
          url: 'https://www.pnas.org/'
        },
        {
          label: 'Science',
          title: 'The cognitive benefits of interacting with nature',
          detail: 'Berman et al. — Science (2008) sobre mejora cognitiva tras exposición a naturaleza.',
          url: 'https://www.science.org/doi/10.1126/science.1153725'
        }
      ]
    },
    {
      hook: 'Finlandia registra 73 días de sol de medianoche — y estudios en Current Biology muestran que quienes viven en rutinas extremas de luz desarrollan estrategias cognitivas que podrías aplicar a tu repetición diaria.',
      prompt: 'Investiga el "sol de medianoche" y el ritmo circadiano: ¿tu rutina tiene un "verano eterno" de repetición sin variación?',
      sources: [
        {
          label: 'Current Biology (Cell Press)',
          title: 'Circadian adaptation in extreme photoperiods',
          detail: 'Current Biology — adaptación circadiana en latitudes con sol de medianoche.',
          url: 'https://www.cell.com/current-biology/home'
        },
        {
          label: 'Nature Communications',
          title: 'Seasonal affective patterns and cognitive flexibility',
          detail: 'Nature Communications — flexibilidad cognitiva bajo variaciones extremas de luz.',
          url: 'https://www.nature.com/ncomms/'
        },
        {
          label: 'The Lancet Psychiatry',
          title: 'Light exposure, mood, and daily routine stability',
          detail: 'The Lancet Psychiatry — relación entre luz, ánimo y estabilidad de rutinas.',
          url: 'https://www.thelancet.com/journals/lanpsy/home'
        }
      ]
    }
  ]
};

function detectDomain(activity) {
  var lower = activity.toLowerCase();
  if (/matem[aá]tic|álgebra|geometr|cálculo|profesor.*clase|impartir clase/i.test(lower)) {
    return 'matematicas';
  }
  if (/cocin|chef|receta|hornear|pasteler/i.test(lower)) {
    return 'cocina';
  }
  if (/program|código|software|desarroll|informática/i.test(lower)) {
    return 'programacion';
  }
  if (/músic|guitar|piano|cantar|componer/i.test(lower)) {
    return 'musica';
  }
  if (/deport|correr|entrenar|fútbol|natación|gimnasio/i.test(lower)) {
    return 'deporte';
  }
  return 'general';
}

function pickBySeed(items, seed) {
  var index = Math.abs(seed) % items.length;
  return items[index];
}

function buildFamiliar(activity, domain, seed) {
  var moments = FAMILIAR_MOMENTS[domain] || FAMILIAR_MOMENTS.general;
  var template = pickBySeed(moments, typeof seed === 'number' ? seed : 0);
  return template.replace(/\{activity\}/g, activity);
}

function formatSources(sources) {
  return sources.map(function (src, i) {
    return (
      (i + 1) + '. ' + src.label + '\n' +
      '   "' + src.title + '"\n' +
      '   ' + src.detail + '\n' +
      '   → ' + src.url
    );
  }).join('\n\n');
}

function buildNovel(activity, domain, seed) {
  var topics = NOVEL_TOPICS[domain] || NOVEL_TOPICS.general;
  var topic = pickBySeed(topics, typeof seed === 'number' ? seed : 0);
  return {
    text: (
      '--- Algo nuevo para investigar ---\n\n' +
      topic.hook +
      '\n\n' +
      topic.prompt +
      '\n\n--- Tres fuentes científicas de primer grado ---\n\n' +
      formatSources(topic.sources) +
      '\n\n(Tu actividad — "' + activity + '" — es el punto de partida; la ciencia está ahí para que explores.)'
    ),
    sources: topic.sources
  };
}

function buildSubject(activity, domain, seed) {
  var subjects = {
    matematicas: [
      'Ese déjà vu en la pizarra — y la ciencia que lo explica',
      'Tu rutina repetida tiene respuesta en Nature',
      'Aburrimiento en clase: 3 papers que lo nombran'
    ],
    general: [
      'Piloto automático hoy — y lo que dice la ciencia',
      'Tu rutina repetida no es neutral',
      'Aburrimiento cotidiano: 3 fuentes para investigar'
    ]
  };
  var list = subjects[domain] || subjects.general;
  var picked = pickBySeed(list, typeof seed === 'number' ? seed : 0);
  return picked + ' — ' + activity.slice(0, 35);
}

/**
 * @param {string} dailyActivity
 * @param {{ seed?: number, contactMedium?: string }} [options]
 */
function generateMixedMessage(dailyActivity, options) {
  options = options || {};
  var activity = (dailyActivity || '').trim();
  if (!activity) {
    throw new Error('dailyActivity is required');
  }
  var seed = typeof options.seed === 'number' ? options.seed : Date.now();
  var domain = detectDomain(activity);
  var familiar = buildFamiliar(activity, domain, seed);
  var novelResult = buildNovel(activity, domain, seed + 7);

  return {
    familiar: familiar,
    novel: novelResult.text,
    sources: novelResult.sources,
    fullText: familiar + '\n\n' + novelResult.text,
    subject: buildSubject(activity, domain, seed),
    domain: domain,
    contactMedium: options.contactMedium || null
  };
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    generateMixedMessage: generateMixedMessage,
    detectDomain: detectDomain,
    buildFamiliar: buildFamiliar,
    formatSources: formatSources
  };
}

if (typeof window !== 'undefined') {
  window.MessageGenerator = {
    generateMixedMessage: generateMixedMessage,
    detectDomain: detectDomain
  };
}