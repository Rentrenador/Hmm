'use strict';

var assert = require('assert');
var path = require('path');
var grokClient = require(path.join(__dirname, '..', 'js', 'grok-client.js'));
var messageGen = require(path.join(__dirname, '..', 'js', 'message-generator.js'));

var MATH_ACTIVITY = 'impartir clases de matemáticas';
var CONTACT = 'profesor@ejemplo.com';

async function runTests() {
  var passed = 0;
  var failed = 0;

  async function test(name, fn) {
    try {
      await fn();
      console.log('  ✓ ' + name);
      passed += 1;
    } catch (err) {
      console.error('  ✗ ' + name);
      console.error('    ' + err.message);
      failed += 1;
    }
  }

  console.log('grok client tests\n');

  await test('buildPayload includes skeleton topic and context', function () {
    var skeleton = messageGen.generateMixedMessage(MATH_ACTIVITY, { seed: 42, contactMedium: CONTACT });
    var payload = grokClient.buildPayload(
      { activity: MATH_ACTIVITY, contact: CONTACT },
      { seed: 42 },
      skeleton
    );

    assert.strictEqual(payload.activity, MATH_ACTIVITY);
    assert.strictEqual(payload.skeleton.topicId, skeleton.topicId);
    assert.ok(payload.skeleton.topicHook);
    assert.ok(payload.skeleton.context.phrase);
  });

  await test('personalize merges Grok copy into local skeleton', async function () {
    var generator = {
      generateMixedMessage: messageGen.generateMixedMessage,
      mergePersonalizedCopy: messageGen.mergePersonalizedCopy
    };
    var fetchCalls = 0;
    var fetchFn = function () {
      fetchCalls += 1;
      return Promise.resolve({
        ok: true,
        json: function () {
          return Promise.resolve({
            familiar: 'Semana docente con ritmo propio: tus clases de matemáticas han ido tirando con buen humor.',
            novelIntro: 'Pensando en esa pizarra, el problema de Königsberg encaja de forma inesperada.\n\n¿Qué puente repetitivo podrías ver como grafo?',
            subject: 'La paloma y tu semana de matemáticas'
          });
        }
      });
    };

    var result = await grokClient.personalize(
      { activity: MATH_ACTIVITY, contact: CONTACT },
      { seed: 42 },
      generator,
      { fetch: fetchFn }
    );

    assert.strictEqual(fetchCalls, 1);
    assert.ok(result.personalizedByGrok);
    assert.ok(result.familiar.includes('Semana docente'));
    assert.ok(result.novelIntro.includes('Königsberg'));
    assert.strictEqual(result.subject, 'La paloma y tu semana de matemáticas');
    assert.ok(result.sources.length === 3);
  });

  await test('personalize returns local skeleton when fetch fails', async function () {
    var generator = {
      generateMixedMessage: messageGen.generateMixedMessage,
      mergePersonalizedCopy: messageGen.mergePersonalizedCopy
    };
    var fetchFn = function () {
      return Promise.resolve({ ok: false, status: 503, text: function () { return Promise.resolve('down'); } });
    };

    var result = await grokClient.personalize(
      { activity: MATH_ACTIVITY, contact: CONTACT },
      { seed: 7 },
      generator,
      { fetch: fetchFn }
    );

    assert.ok(!result.personalizedByGrok);
    assert.ok(result.familiar.includes('tus clases de matemáticas'));
  });

  console.log('\n' + passed + ' passed, ' + failed + ' failed');
  if (failed > 0) process.exit(1);
}

runTests();