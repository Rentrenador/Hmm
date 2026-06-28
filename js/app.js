/**
 * UI glue: signup, profile storage, message preview, simulated delivery.
 * Loaded in browser and exercised in jsdom/puppeteer tests.
 */
(function (global) {
  'use strict';

  var STORAGE_KEY = 'curiorutina_profile';
  var sendCounter = 0;
  var simulateInterval = null;

  function getStorage(win) {
    return (win || global).localStorage;
  }

  function getGenerator(win) {
    var w = win || global;
    return w.MessageGenerator;
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
      '¡Inscrito! Perfil guardado para ' + profile.contact +
      '. Rutina: "' + profile.activity +
      '". Los mensajes se simulan en esta página (sin envío real a tu email).'
    );
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

  function renderMessage(msg, doc) {
    doc = doc || global.document;
    var preview = doc.getElementById('message-preview');
    var sourcesHtml = '';
    if (msg.sources && msg.sources.length) {
      sourcesHtml =
        '<div class="section-label novel-label" style="margin-top:1rem;">Fuentes científicas</div>' +
        '<ul style="margin:0.5rem 0 0 1rem;padding:0;">' +
        msg.sources.map(function (src) {
          return '<li style="margin-bottom:0.5rem;"><strong>' + escapeHtml(src.label) + '</strong>: ' +
            escapeHtml(src.title) + ' — <a href="' + escapeHtml(src.url) + '" target="_blank" rel="noopener" style="color:#5b8def;">investigar</a></li>';
        }).join('') +
        '</ul>';
    }
    preview.innerHTML =
      '<div class="section-label familiar-label">Asunto: ' + escapeHtml(msg.subject) + '</div>' +
      '<div class="section-label familiar-label">Parte familiar — tu rutina repetitiva</div>' +
      '<div>' + escapeHtml(msg.familiar) + '</div>' +
      '<div class="section-label novel-label" style="margin-top:1rem;">Parte nueva — investiga</div>' +
      '<div>' + escapeHtml(msg.novel) + '</div>' +
      sourcesHtml;
    preview.classList.remove('hidden');
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
      simulated: true
    };
    var log = doc.getElementById('send-log');
    var line = '[' + new Date().toLocaleTimeString() + '] Simulación #' + sendCounter +
      ' → ' + medium + ' | ' + msg.subject;
    log.textContent = line + '\n' + log.textContent;
    if (win.console && win.console.log) {
      win.console.log('[CurioRutina] Simulated send #' + sendCounter, record);
    }
    return record;
  }

  function generateForProfile(profile, seed, generator) {
    generator = generator || getGenerator();
    return generator.generateMixedMessage(profile.activity, {
      seed: seed,
      contactMedium: profile.contact
    });
  }

  function handleSignupSubmit(e, deps) {
    deps = deps || {};
    var doc = deps.document || global.document;
    var storage = deps.storage || getStorage(deps.window);
    var generator = deps.generator || getGenerator(deps.window);
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
    var msg = generateForProfile(profile, deps.seed != null ? deps.seed : Date.now(), generator);
    renderMessage(msg, doc);
    var delivery = simulateDelivery(msg, contact, doc, deps.window || global);
    return { profile: profile, message: msg, delivery: delivery };
  }

  function handleGenerateClick(deps) {
    deps = deps || {};
    var doc = deps.document || global.document;
    var storage = deps.storage || getStorage(deps.window);
    var generator = deps.generator || getGenerator(deps.window);
    var profile = loadProfile(storage);
    if (!profile) return null;
    var msg = generateForProfile(profile, deps.seed != null ? deps.seed : Date.now(), generator);
    renderMessage(msg, doc);
    var delivery = simulateDelivery(msg, profile.contact, doc, deps.window || global);
    return { profile: profile, message: msg, delivery: delivery };
  }

  function handleSimulateClick(deps) {
    deps = deps || {};
    var doc = deps.document || global.document;
    var storage = deps.storage || getStorage(deps.window);
    var generator = deps.generator || getGenerator(deps.window);
    var win = deps.window || global;
    var profile = loadProfile(storage);
    if (!profile) return null;
    var btn = doc.getElementById('simulate-btn');
    if (simulateInterval) {
      win.clearInterval(simulateInterval);
      simulateInterval = null;
      btn.textContent = 'Simular envío periódico';
      return { stopped: true };
    }
    btn.textContent = 'Detener simulación';
    var tick = 0;
    var intervalMs = deps.intervalMs || 5000;
    simulateInterval = win.setInterval(function () {
      tick += 1;
      var msg = generateForProfile(profile, Date.now() + tick, generator);
      renderMessage(msg, doc);
      simulateDelivery(msg, profile.contact, doc, win);
    }, intervalMs);
    return { started: true, intervalMs: intervalMs };
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
      showAck('Perfil cargado: ' + profile.contact + ' — "' + profile.activity + '"', doc);
      doc.getElementById('demo-section').classList.remove('hidden');
    }
  }

  function resetState() {
    sendCounter = 0;
    simulateInterval = null;
  }

  function getSendCounter() {
    return sendCounter;
  }

  var api = {
    STORAGE_KEY: STORAGE_KEY,
    loadProfile: loadProfile,
    saveProfile: saveProfile,
    buildAckMessage: buildAckMessage,
    showAck: showAck,
    escapeHtml: escapeHtml,
    renderMessage: renderMessage,
    simulateDelivery: simulateDelivery,
    generateForProfile: generateForProfile,
    handleSignupSubmit: handleSignupSubmit,
    handleGenerateClick: handleGenerateClick,
    handleSimulateClick: handleSimulateClick,
    initApp: initApp,
    resetState: resetState,
    getSendCounter: getSendCounter
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = api;
  }
  global.CurioRutinaApp = api;
})(typeof window !== 'undefined' ? window : global);