/**
 * Pure message generator: blends familiar (user's daily activity) with novel
 * content designed to prompt investigation.
 */

var NOVEL_TOPICS = {
  matematicas: [
    {
      hook: '¿Sabías que el problema de los siete puentes de Königsberg, que parece un simple paseo por la ciudad, dio origen a toda la teoría de grafos?',
      prompt: 'Investiga cómo Euler resolvió este acertijo en 1736 y qué tiene que ver con las redes que usas cada día (internet, mapas, logística).'
    },
    {
      hook: 'Existe un número llamado Graham que es tan grande que ni siquiera cabe en el universo observable si lo escribieras dígito a dígito.',
      prompt: 'Busca "número de Graham" y descubre por qué los matemáticos lo usan en combinatoria — y qué significa que una demostración sea "demasiado grande para publicarse".'
    },
    {
      hook: 'Un estudio reciente sugiere que enseñar matemáticas con "micro-historias" (narrar el origen de un teorema) mejora la retención más que repetir fórmulas.',
      prompt: 'Investiga la técnica de "mathematical storytelling" y prueba a contarle a un alumno la historia detrás del teorema de Pitágoras en lugar de solo la fórmula.'
    }
  ],
  cocina: [
    {
      hook: 'La reacción de Maillard — esa costra dorada en el pan y la carne — fue descrita por un químico francés que ni siquiera era cocinero.',
      prompt: 'Investiga qué temperatura activa la Maillard y por qué el azúcar carameliza a un punto distinto.'
    }
  ],
  programacion: [
    {
      hook: 'El primer "bug" informático documentado era literalmente una polilla atrapada en un relé del Mark II en 1947.',
      prompt: 'Investiga la historia del término "debugging" y cómo Grace Hopper popularizó la anécdota.'
    }
  ],
  musica: [
    {
      hook: 'La frecuencia de 440 Hz como estándar de la nota La solo se acordó internacionalmente en 1955 — antes, cada orquesta afinaba distinto.',
      prompt: 'Investiga el "diapasón de Stuttgart" y el debate entre afinación histórica y temperamento igual.'
    }
  ],
  deporte: [
    {
      hook: 'Los corredores de élite recuperan el 80 % de su energía en cada zancada gracias a la elasticidad del tendón de Aquiles — no solo a la fuerza muscular.',
      prompt: 'Investiga "return of elastic energy" en biomecánica y qué cambia en tu técnica si lo aplicas conscientemente.'
    }
  ],
  general: [
    {
      hook: 'El efecto Zeigarnik demuestra que el cerebro recuerda mejor las tareas interrumpidas que las completadas.',
      prompt: 'Investiga cómo usar tareas a medias (deliberadamente) para mantener la curiosidad activa en lo que haces cada día.'
    },
    {
      hook: 'Hay un archipiélago en Finlandia donde el sol no se pone durante 73 días seguidos en verano.',
      prompt: 'Investiga el "sol de medianoche" y cómo afecta al ritmo circadiano de quienes viven allí — ¿aplica a tu rutina diaria?'
    },
    {
      hook: 'Un estudio de la Universidad de Stanford mostró que caminar al aire libre aumenta la creatividad un 60 % frente a sentarse.',
      prompt: 'Investiga el paper de Oppezzo & Schwartz (2014) y diseña un experimento de una semana con tu actividad habitual.'
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

function buildFamiliar(activity) {
  return (
    'Sabemos que en tu día a día haces esto: ' + activity +
    '. Esa rutina es la parte familiar de estos mensajes — lo que ya te pertenece y conecta contigo.'
  );
}

function buildNovel(activity, domain, seed) {
  var topics = NOVEL_TOPICS[domain] || NOVEL_TOPICS.general;
  var topic = pickBySeed(topics, typeof seed === 'number' ? seed : 0);
  return (
    '--- Algo nuevo para investigar ---\n\n' +
    topic.hook +
    '\n\n' +
    topic.prompt +
    '\n\n(Tu actividad — "' +
    activity +
    '" — es el punto de partida; lo nuevo está ahí fuera esperando que lo explores.)'
  );
}

function buildSubject(activity, domain, seed) {
  var subjects = {
    matematicas: ['Un puente, un teorema y tu pizarra', 'El número que no cabe en el universo', 'Historias que enseñan mejor que las fórmulas'],
    general: ['Algo interrumpido que no olvidarás', '73 días sin anochecer', 'Caminar para pensar mejor']
  };
  var list = subjects[domain] || subjects.general;
  var picked = pickBySeed(list, typeof seed === 'number' ? seed : 0);
  return picked + ' — para quien hace: ' + activity.slice(0, 40);
}

/**
 * @param {string} dailyActivity - User's stated day-to-day activity
 * @param {{ seed?: number, contactMedium?: string }} [options]
 * @returns {{ familiar: string, novel: string, fullText: string, subject: string, domain: string }}
 */
function generateMixedMessage(dailyActivity, options) {
  options = options || {};
  var activity = (dailyActivity || '').trim();
  if (!activity) {
    throw new Error('dailyActivity is required');
  }
  var seed = typeof options.seed === 'number' ? options.seed : Date.now();
  var domain = detectDomain(activity);
  var familiar = buildFamiliar(activity);
  var novel = buildNovel(activity, domain, seed);

  return {
    familiar: familiar,
    novel: novel,
    fullText: familiar + '\n\n' + novel,
    subject: buildSubject(activity, domain, seed),
    domain: domain,
    contactMedium: options.contactMedium || null
  };
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    generateMixedMessage: generateMixedMessage,
    detectDomain: detectDomain
  };
}

if (typeof window !== 'undefined') {
  window.MessageGenerator = {
    generateMixedMessage: generateMixedMessage,
    detectDomain: detectDomain
  };
}