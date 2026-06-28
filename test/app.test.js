'use strict';

var assert = require('assert');
var fs = require('fs');
var path = require('path');
var { JSDOM } = require('jsdom');
var app = require(path.join(__dirname, '..', 'js', 'app.js'));
var { generateMixedMessage } = require(path.join(__dirname, '..', 'js', 'message-generator.js'));

var ROOT = path.join(__dirname, '..');
var INDEX = path.join(ROOT, 'index.html');

var MATH_ACTIVITY = 'impartir clases de matemáticas';
var CONTACT = 'profesor@ejemplo.com';

function createMemoryStorage() {
  var data = {};
  return {
    getItem: function (key) {
      return Object.prototype.hasOwnProperty.call(data, key) ? data[key] : null;
    },
    setItem: function (key, value) {
      data[key] = String(value);
    },
    removeItem: function (key) {
      delete data[key];
    },
    clear: function () {
      data = {};
    }
  };
}

function buildDom() {
  var html = fs.readFileSync(INDEX, 'utf8');
  var bodyMatch = html.match(/<body[^>]*>([\s\S]*)<\/body>/i);
  var bodyHtml = bodyMatch ? bodyMatch[1] : html;
  bodyHtml = bodyHtml.replace(/<script[\s\S]*?<\/script>/gi, '');

  var dom = new JSDOM('<!DOCTYPE html><html><body>' + bodyHtml + '</body></html>', {
    url: 'http://curiorutina.local/',
    pretendToBeVisual: true
  });

  var window = dom.window;
  var document = window.document;
  var storage = createMemoryStorage();
  window.console = { log: function () {} };

  var generator = { generateMixedMessage: generateMixedMessage };

  return { dom: dom, window: window, document: document, storage: storage, generator: generator };
}

function deps(ctx, extra) {
  return Object.assign({
    document: ctx.document,
    storage: ctx.storage,
    window: ctx.window,
    generator: ctx.generator,
    seed: 42
  }, extra || {});
}

function runTests() {
  var passed = 0;
  var failed = 0;

  function test(name, fn) {
    try {
      fn();
      console.log('  ✓ ' + name);
      passed += 1;
    } catch (err) {
      console.error('  ✗ ' + name);
      console.error('    ' + err.message);
      failed += 1;
    }
  }

  console.log('app glue tests\n');

  test('handleSignupSubmit stores profile in localStorage', function () {
    var ctx = buildDom();
    app.resetState();
    ctx.document.getElementById('contact').value = CONTACT;
    ctx.document.getElementById('activity').value = MATH_ACTIVITY;

    var result = app.handleSignupSubmit({ preventDefault: function () {} }, deps(ctx));

    var stored = app.loadProfile(ctx.storage);
    assert.deepStrictEqual(stored.contact, CONTACT);
    assert.deepStrictEqual(stored.activity, MATH_ACTIVITY);
    assert.ok(stored.signedUpAt);
    assert.strictEqual(result.profile.contact, CONTACT);
  });

  test('handleSignupSubmit renders three scientific source links', function () {
    var ctx = buildDom();
    app.resetState();
    ctx.document.getElementById('contact').value = CONTACT;
    ctx.document.getElementById('activity').value = MATH_ACTIVITY;

    app.handleSignupSubmit({ preventDefault: function () {} }, deps(ctx));

    var previewHtml = ctx.document.getElementById('message-preview').innerHTML;
    assert.ok(previewHtml.includes('Fuentes científicas'));
    assert.ok((previewHtml.match(/investigar/g) || []).length >= 3);
  });

  test('handleSignupSubmit ack is honest about simulated delivery', function () {
    var ctx = buildDom();
    app.resetState();
    ctx.document.getElementById('contact').value = CONTACT;
    ctx.document.getElementById('activity').value = MATH_ACTIVITY;

    app.handleSignupSubmit({ preventDefault: function () {} }, deps(ctx));

    var ack = ctx.document.getElementById('ack').textContent;
    assert.ok(/simulan en esta página/i.test(ack));
    assert.ok(!/Recibirás mensajes en/i.test(ack));
    assert.ok(ack.includes(MATH_ACTIVITY));
  });

  test('handleSignupSubmit renders familiar + novel message preview', function () {
    var ctx = buildDom();
    app.resetState();
    ctx.document.getElementById('contact').value = CONTACT;
    ctx.document.getElementById('activity').value = MATH_ACTIVITY;

    var result = app.handleSignupSubmit({ preventDefault: function () {} }, deps(ctx));

    var preview = ctx.document.getElementById('message-preview');
    assert.ok(!preview.classList.contains('hidden'));
    assert.ok(preview.textContent.includes('Parte familiar'));
    assert.ok(preview.textContent.includes('Parte nueva'));
    assert.ok(preview.textContent.includes(MATH_ACTIVITY));
    assert.ok(/investiga|fuentes científicas/i.test(preview.textContent));
    assert.ok(result.message.familiar.includes(MATH_ACTIVITY));
    assert.ok(result.message.sources.length === 3);
    assert.ok(/repetir|automático|déjà vu|monoton|otra vez/i.test(result.message.familiar));
  });

  test('simulateDelivery records simulated send without external delivery', function () {
    var ctx = buildDom();
    app.resetState();
    var msg = generateMixedMessage(MATH_ACTIVITY, { seed: 7 });
    var record = app.simulateDelivery(msg, CONTACT, ctx.document, ctx.window);

    assert.strictEqual(record.simulated, true);
    assert.strictEqual(record.medium, CONTACT);
    assert.ok(ctx.document.getElementById('send-log').textContent.includes('Simulación #1'));
  });

  test('handleGenerateClick uses stored profile and updates preview', function () {
    var ctx = buildDom();
    app.resetState();
    app.saveProfile({ contact: CONTACT, activity: MATH_ACTIVITY }, ctx.storage);

    var first = app.handleGenerateClick(deps(ctx, { seed: 10 }));
    var second = app.handleGenerateClick(deps(ctx, { seed: 11 }));

    assert.ok(first.message.familiar.includes(MATH_ACTIVITY));
    assert.notStrictEqual(first.message.novel, second.message.novel);
    assert.strictEqual(app.getSendCounter(), 2);
  });

  test('initApp wires signup form submit through real handler', function () {
    var ctx = buildDom();
    app.resetState();
    app.initApp(deps(ctx, { seed: 99 }));

    ctx.document.getElementById('contact').value = CONTACT;
    ctx.document.getElementById('activity').value = MATH_ACTIVITY;
    ctx.document.getElementById('signup-form').dispatchEvent(
      new ctx.window.Event('submit', { bubbles: true, cancelable: true })
    );

    var stored = app.loadProfile(ctx.storage);
    assert.strictEqual(stored.activity, MATH_ACTIVITY);
    assert.ok(!ctx.document.getElementById('demo-section').classList.contains('hidden'));
    assert.ok(ctx.document.getElementById('message-preview').textContent.includes(MATH_ACTIVITY));
  });

  test('handleSimulateClick starts and stops periodic simulation', function () {
    var ctx = buildDom();
    app.resetState();
    app.saveProfile({ contact: CONTACT, activity: MATH_ACTIVITY }, ctx.storage);

    var timers = [];
    ctx.window.setInterval = function (fn, ms) {
      var id = timers.length + 1;
      timers.push({ id: id, fn: fn, ms: ms });
      return id;
    };
    ctx.window.clearInterval = function () {};

    var started = app.handleSimulateClick(deps(ctx, { intervalMs: 100 }));
    assert.strictEqual(started.started, true);
    assert.strictEqual(timers.length, 1);

    timers[0].fn();
    assert.ok(ctx.document.getElementById('send-log').textContent.includes('Simulación #1'));

    var stopped = app.handleSimulateClick(deps(ctx));
    assert.strictEqual(stopped.stopped, true);
  });

  console.log('\n' + passed + ' passed, ' + failed + ' failed');
  if (failed > 0) process.exit(1);
}

runTests();