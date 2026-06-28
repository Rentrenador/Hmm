/**
 * UI glue: signup, profile storage, message preview, simulated delivery.
 * Loaded in browser and exercised in jsdom/puppeteer tests.
 */
(function (global) {
  'use strict';

  var STORAGE_KEY = 'curiorutina_profile';
  var sendCounter = 0;
  var simulateInterval = null;
  var generationBusy = false;

  function getStorage(win) {
    return (win || global).localStorage;
  }

  function getGenerator(win) {
    var w = win || global;
    return w.MessageGenerator;
  }

  function getGrokClient(win) {
    var w = win || global;
    return w.CurioGrokClient;
  }

  function loadProfile(storage) {
    storage = storage || getStorage();
    try {
      var raw = storage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  }

  function saveProfile(profile, storage) {
    storage = storage || getStorage();
    storage.setItem(STORAGE_KEY, JSON.stringify(profile));
    return profile;
  }

  function buildAckMessage(profile) {
    return (
      'Listo — tu primer mensaje de la paloma está preparado para ' + profile.contact +
      '. Lo verás abajo, llegado con detalle. Rutina: "' + profile.activity +
      '". (Por ahora se simula aquí, sin envío real a tu email.)'
    );
  }

  function formatLetterDate(date) {
    return date.toLocaleDateString('es-ES', {
      weekday: 'long',
      day: 'numeric',
      month: 'long'
    });
  }

  function formatLetterTime(date) {
    return date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
  }

  function formatNovelParagraphs(text) {
    return String(text).split(/\n\n+/).map(function (para) {
      return '<p>' + escapeHtml(para.trim()) + '</p>';
    }).join('');
  }

  function showAck(text, doc) {
    doc = doc || global.document;
    var ack = doc.getElementById('ack');
    ack.textContent = text;
    ack.classList.remove('hidden');
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function setLoading(doc, isLoading) {
    doc = doc || global.document;
    var loading = doc.getElementById('paloma-loading');
    var generateBtn = doc.getElementById('generate-btn');
    var simulateBtn = doc.getElementById('simulate-btn');
    var submitBtn = doc.querySelector('#signup-form button[type="submit"]');

    if (loading) {
      loading.classList.toggle('hidden', !isLoading);
    }
    if (generateBtn) generateBtn.disabled = !!isLoading;
    if (simulateBtn) simulateBtn.disabled = !!isLoading;
    if (submitBtn) submitBtn.disabled = !!isLoading;
    generationBusy = !!isLoading;
  }

  function renderMessage(msg, doc, options) {
    doc = doc || global.document;
    options = options || {};
    var preview = doc.getElementById('message-preview');
    var deliveredAt = options.deliveredAt || new Date();
    var recipient = options.recipient || msg.contactMedium || 'ti';
    var greeting = msg.greeting || 'Hola,';
    var closing = msg.closing || 'Con cariño,\nCurioRutina';
    var deliveryNote = msg.deliveryNote || 'Mensaje de la paloma para tu rutina';
    var sourcesHtml = '';

    if (msg.sources && msg.sources.length) {
      sourcesHtml =
        '<div class="paloma-sources">' +
          '<p class="paloma-sources-lead">Si quieres profundizar, estas lecturas van directo al grano:</p>' +
          '<ul class="paloma-source-list">' +
          msg.sources.map(function (src) {
            return '<li><strong>' + escapeHtml(src.label) + '</strong> — ' +
              escapeHtml(src.title) +
              ' <a href="' + escapeHtml(src.url) + '" target="_blank" rel="noopener">leer</a></li>';
          }).join('') +
          '</ul>' +
        '</div>';
    }

    preview.innerHTML =
      '<div class="paloma-delivery paloma-reveal">' +
        '<div class="paloma-seal" aria-hidden="true">🕊️</div>' +
        '<div class="paloma-tag">' + escapeHtml(deliveryNote) + '</div>' +
        '<div class="paloma-meta">' +
          '<span class="paloma-for">Para: ' + escapeHtml(recipient) + '</span>' +
          '<span class="paloma-when">' + escapeHtml(formatLetterDate(deliveredAt)) +
            ' · ' + escapeHtml(formatLetterTime(deliveredAt)) + '</span>' +
        '</div>' +
        '<div class="paloma-subject">Asunto: ' + escapeHtml(msg.subject) + '</div>' +
        '<article class="paloma-letter">' +
          '<p class="paloma-greeting">' + escapeHtml(greeting) + '</p>' +
          '<section class="paloma-part familiar-part">' +
            '<p class="paloma-lead familiar-label">Tu semana, en perspectiva</p>' +
            '<p class="paloma-text">' + escapeHtml(msg.familiar) + '</p>' +
          '</section>' +
          '<section class="paloma-part novel-part">' +
            '<p class="paloma-lead novel-label">Algo nuevo para ti</p>' +
            '<div class="paloma-novel-text">' + formatNovelParagraphs(msg.novelIntro || msg.novel) + '</div>' +
          '</section>' +
          sourcesHtml +
          '<p class="paloma-closing">' + escapeHtml(closing).replace(/\n/g, '<br>') + '</p>' +
        '</article>' +
      '</div>';

    preview.classList.remove('hidden');
    preview.classList.add('paloma-open');
    return preview.textContent;
  }

  function simulateDelivery(msg, medium, doc, win) {
    doc = doc || global.document;
    win = win || global;
    sendCounter += 1;
    var record = {
      id: sendCounter,
      medium: medium,
      subject: msg.subject,
      familiar: msg.familiar,
      novel: msg.novel,
      deliveredAt: new Date().toISOString(),
      simulated: true,
      personalizedByGrok: !!msg.personalizedByGrok
    };
    var log = doc.getElementById('send-log');
    var now = new Date();
    var line = '🕊️ Mensaje de la paloma #' + sendCounter +
      ' · ' + formatLetterTime(now) +
      ' · Para: ' + medium +
      ' · "' + msg.subject + '"';
    log.textContent = line + '\n' + log.textContent;
    if (win.console && win.console.log) {
      win.console.log('[CurioRutina] Simulated send #' + sendCounter, record);
    }
    return record;
  }

  function normalizePromise(value) {
    if (value && typeof value.then === 'function') {
      return value;
    }
    return Promise.resolve(value);
  }

  function generateForProfile(profile, seed, deps) {
    deps = deps || {};
    var generator = deps.generator || getGenerator(deps.window);
    var grokClient = deps.grokClient !== undefined ? deps.grokClient : getGrokClient(deps.window);
    var options = {
      seed: seed != null ? seed : Date.now(),
      contactMedium: profile.contact
    };

    if (grokClient && grokClient.isAvailable && grokClient.isAvailable(deps.window)) {
      return grokClient.personalize(profile, options, generator, {
        window: deps.window || global,
        fetch: deps.fetch
      });
    }

    return generator.generateMixedMessage(profile.activity, options);
  }

  function deliverMessage(profile, msg, deps) {
    var doc = deps.document || global.document;
    var win = deps.window || global;
    var deliveredAt = new Date();
    renderMessage(msg, doc, { recipient: profile.contact, deliveredAt: deliveredAt });
    var delivery = simulateDelivery(msg, profile.contact, doc, win);
    return { profile: profile, message: msg, delivery: delivery };
  }

  function requestMessage(profile, deps, seed) {
    deps = deps || {};
    var doc = deps.document || global.document;
    setLoading(doc, true);
    return normalizePromise(generateForProfile(profile, seed, deps))
      .then(function (msg) {
        setLoading(doc, false);
        return deliverMessage(profile, msg, deps);
      })
      .catch(function () {
        setLoading(doc, false);
        var generator = deps.generator || getGenerator(deps.window);
        var fallback = generator.generateMixedMessage(profile.activity, {
          seed: seed != null ? seed : Date.now(),
          contactMedium: profile.contact
        });
        return deliverMessage(profile, fallback, deps);
      });
  }

  function handleSignupSubmit(e, deps) {
    deps = deps || {};
    var doc = deps.document || global.document;
    var storage = deps.storage || getStorage(deps.window);
    e.preventDefault();
    var contact = doc.getElementById('contact').value.trim();
    var activity = doc.getElementById('activity').value.trim();
    var profile = {
      contact: contact,
      activity: activity,
      signedUpAt: new Date().toISOString()
    };
    saveProfile(profile, storage);
    showAck(buildAckMessage(profile), doc);
    doc.getElementById('demo-section').classList.remove('hidden');
    var seed = deps.seed != null ? deps.seed : Date.now();
    return requestMessage(profile, deps, seed);
  }

  function handleGenerateClick(deps) {
    deps = deps || {};
    var storage = deps.storage || getStorage(deps.window);
    var profile = loadProfile(storage);
    if (!profile) return Promise.resolve(null);
    var seed = deps.seed != null ? deps.seed : Date.now();
    return requestMessage(profile, deps, seed);
  }

  function handleSimulateClick(deps) {
    deps = deps || {};
    var doc = deps.document || global.document;
    var storage = deps.storage || getStorage(deps.window);
    var win = deps.window || global;
    var profile = loadProfile(storage);
    if (!profile) return Promise.resolve(null);
    var btn = doc.getElementById('simulate-btn');
    if (simulateInterval) {
      win.clearInterval(simulateInterval);
      simulateInterval = null;
      btn.textContent = 'Mensajes de la paloma periódicos';
      return Promise.resolve({ stopped: true });
    }
    btn.textContent = 'Detener mensajes de la paloma';
    var tick = 0;
    var intervalMs = deps.intervalMs || 5000;
    simulateInterval = win.setInterval(function () {
      if (generationBusy) return;
      tick += 1;
      requestMessage(profile, deps, Date.now() + tick);
    }, intervalMs);
    return Promise.resolve({ started: true, intervalMs: intervalMs });
  }

  function initApp(deps) {
    deps = deps || {};
    var doc = deps.document || global.document;
    var storage = deps.storage || getStorage(deps.window);
    doc.getElementById('signup-form').addEventListener('submit', function (e) {
      handleSignupSubmit(e, deps);
    });
    doc.getElementById('generate-btn').addEventListener('click', function () {
      handleGenerateClick(deps);
    });
    doc.getElementById('simulate-btn').addEventListener('click', function () {
      handleSimulateClick(deps);
    });
    var profile = loadProfile(storage);
    if (profile) {
      doc.getElementById('contact').value = profile.contact;
      doc.getElementById('activity').value = profile.activity;
      showAck('Perfil cargado para ' + profile.contact + ' — "' + profile.activity + '". Recibe un mensaje de la paloma cuando quieras.', doc);
      doc.getElementById('demo-section').classList.remove('hidden');
    }
  }

  function resetState() {
    sendCounter = 0;
    simulateInterval = null;
    generationBusy = false;
  }

  function getSendCounter() {
    return sendCounter;
  }

  function isGenerationBusy() {
    return generationBusy;
  }

  var api = {
    STORAGE_KEY: STORAGE_KEY,
    loadProfile: loadProfile,
    saveProfile: saveProfile,
    buildAckMessage: buildAckMessage,
    formatLetterDate: formatLetterDate,
    formatLetterTime: formatLetterTime,
    formatNovelParagraphs: formatNovelParagraphs,
    showAck: showAck,
    escapeHtml: escapeHtml,
    setLoading: setLoading,
    renderMessage: renderMessage,
    simulateDelivery: simulateDelivery,
    generateForProfile: generateForProfile,
    requestMessage: requestMessage,
    handleSignupSubmit: handleSignupSubmit,
    handleGenerateClick: handleGenerateClick,
    handleSimulateClick: handleSimulateClick,
    initApp: initApp,
    resetState: resetState,
    getSendCounter: getSendCounter,
    isGenerationBusy: isGenerationBusy
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = api;
  }
  global.CurioRutinaApp = api;
})(typeof window !== 'undefined' ? window : global);