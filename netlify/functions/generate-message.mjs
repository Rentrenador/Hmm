const XAI_API_URL = 'https://api.x.ai/v1/chat/completions';
const MODEL = process.env.XAI_MODEL || 'grok-3-mini';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS'
};

function jsonResponse(status, body) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      ...CORS_HEADERS,
      'Content-Type': 'application/json'
    }
  });
}

function buildSystemPrompt() {
  return [
    'Eres CurioRutina: escribes mensajes cálidos en español (España) para una app que mezcla lo familiar con curiosidad científica.',
    'Responde SOLO con JSON válido, sin markdown, con esta forma exacta:',
    '{"familiar":"...","novelIntro":"...","subject":"..."}',
    '',
    'Reglas para "familiar":',
    '- Un párrafo de 3-5 frases sobre la semana de la persona.',
    '- Debe sonar escrito para ESA rutina concreta, no para cualquiera.',
    '- Tono realista, optimista, humor ligero; nunca robótico ni plantilla genérica.',
    '- No copies literalmente la actividad del formulario; reinterpreta con naturalidad.',
    '- No uses la palabra "regalo".',
    '',
    'Reglas para "novelIntro":',
    '- 2-3 párrafos separados por \\n\\n.',
    '- Debe enlazar de forma natural con lo que acabas de escribir en "familiar".',
    '- Introduce el tema científico dado (hook + prompt) como curiosidad personal, no como artículo.',
    '- No incluyas enlaces ni lista de fuentes (van aparte).',
    '',
    'Reglas para "subject":',
    '- Asunto breve y personal (máx. 70 caracteres), coherente con familiar y novelIntro.'
  ].join('\n');
}

function buildUserPrompt(body) {
  const { activity, contact, seed, skeleton } = body;
  const ctx = skeleton?.context || {};
  const lines = [
    'Actividad del usuario (texto original del formulario):',
    activity || '(sin actividad)',
    '',
    'Medio de contacto: ' + (contact || 'desconocido'),
    'Semilla de variedad: ' + (seed != null ? seed : 'aleatoria'),
    '',
    'Contexto interpretado:',
    '- Dominio: ' + (skeleton?.domain || ctx.domain || 'general'),
    '- Arquetipo: ' + (skeleton?.archetype || ctx.archetype || 'general'),
    '- Frase natural: ' + (skeleton?.activityPhrase || ctx.phrase || ''),
    '',
    'Tema científico seleccionado (id: ' + (skeleton?.topicId || 'n/a') + '):',
    'Hook: ' + (skeleton?.topicHook || ''),
    'Pregunta/invitación: ' + (skeleton?.topicPrompt || ''),
    '',
    'Asunto sugerido (puedes mejorarlo): ' + (skeleton?.subject || ''),
    'Saludo sugerido (no lo incluyas en la respuesta): ' + (skeleton?.greeting || 'Hola,')
  ];

  if (ctx.vehicle) lines.push('- Vehículo: ' + ctx.vehicle);
  if (ctx.destination) lines.push('- Destino: ' + ctx.destination);
  if (ctx.duration) lines.push('- Duración habitual: ' + ctx.duration);

  return lines.join('\n');
}

function extractJsonObject(text) {
  const trimmed = String(text || '').trim();
  try {
    return JSON.parse(trimmed);
  } catch (_) {
    const start = trimmed.indexOf('{');
    const end = trimmed.lastIndexOf('}');
    if (start >= 0 && end > start) {
      return JSON.parse(trimmed.slice(start, end + 1));
    }
    throw new Error('Invalid JSON from model');
  }
}

async function callGrok(apiKey, userPrompt) {
  const response = await fetch(XAI_API_URL, {
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + apiKey,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: MODEL,
      temperature: 0.85,
      response_format: { type: 'json_object' },
      messages: [
        { role: 'system', content: buildSystemPrompt() },
        { role: 'user', content: userPrompt }
      ]
    })
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error('xAI request failed: ' + response.status + ' ' + detail.slice(0, 300));
  }

  const data = await response.json();
  const content = data?.choices?.[0]?.message?.content;
  const parsed = extractJsonObject(content);

  if (!parsed.familiar || !parsed.novelIntro) {
    throw new Error('Model response missing familiar or novelIntro');
  }

  return {
    familiar: String(parsed.familiar).trim(),
    novelIntro: String(parsed.novelIntro).trim(),
    subject: parsed.subject ? String(parsed.subject).trim() : undefined
  };
}

export default async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: CORS_HEADERS });
  }

  if (req.method !== 'POST') {
    return jsonResponse(405, { error: 'Method not allowed' });
  }

  const apiKey = process.env.XAI_API_KEY;
  if (!apiKey) {
    return jsonResponse(503, { error: 'XAI_API_KEY not configured' });
  }

  let body;
  try {
    body = await req.json();
  } catch (_) {
    return jsonResponse(400, { error: 'Invalid JSON body' });
  }

  if (!body?.activity || !body?.skeleton) {
    return jsonResponse(400, { error: 'activity and skeleton are required' });
  }

  try {
    const personalized = await callGrok(apiKey, buildUserPrompt(body));
    return jsonResponse(200, personalized);
  } catch (err) {
    return jsonResponse(502, { error: err.message || 'Grok generation failed' });
  }
};