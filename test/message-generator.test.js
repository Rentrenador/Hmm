'use strict';

var assert = require('assert');
var path = require('path');
var {
  generateMixedMessage,
  detectDomain,
  buildFamiliar,
  formatSources
} = require(path.join(__dirname, '..', 'js', 'message-generator.js'));

var MATH_ACTIVITY = 'impartir clases de matemáticas';

var FIRST_GRADE_LABELS = /Nature|Science|PNAS|APA|Lancet|IEEE|ACM|Neuron|Springer|Cell Press|BMJ|AMS|NCTM/i;

var BOREDOM_RESONANCE = /déjà vu|automático|repetir|monoton|otra vez|mismo|aburrim|piloto|bucle|rutina|memoria/i;

function hasNovelInvestigativeElement(output) {
  var text = (output.novel + output.fullText).toLowerCase();
  return (
    text.includes('investiga') ||
    text.includes('fuentes científicas') ||
    text.includes('algo nuevo')
  );
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

  console.log('message-generator tests\n');

  test('detectDomain recognizes math teaching', function () {
    assert.strictEqual(detectDomain(MATH_ACTIVITY), 'matematicas');
  });

  test('generateMixedMessage requires dailyActivity', function () {
    assert.throws(function () {
      generateMixedMessage('');
    }, /dailyActivity is required/);
  });

  test('familiar section resonates with repetitive boredom and includes activity', function () {
    var msg = generateMixedMessage(MATH_ACTIVITY, { seed: 42 });
    assert.ok(msg.familiar.includes(MATH_ACTIVITY), 'must include user activity');
    assert.ok(BOREDOM_RESONANCE.test(msg.familiar), 'must evoke repetitive boredom');
    assert.ok(!/explicar conceptos|corregir ejercicios/i.test(msg.familiar), 'must not invent unstated details');
  });

  test('familiar moments vary by seed within same domain', function () {
    var a = buildFamiliar(MATH_ACTIVITY, 'matematicas', 1);
    var b = buildFamiliar(MATH_ACTIVITY, 'matematicas', 2);
    assert.notStrictEqual(a, b);
    assert.ok(a.includes(MATH_ACTIVITY));
    assert.ok(b.includes(MATH_ACTIVITY));
  });

  test('novel section includes three first-grade scientific sources', function () {
    var msg = generateMixedMessage(MATH_ACTIVITY, { seed: 42 });
    assert.ok(Array.isArray(msg.sources));
    assert.strictEqual(msg.sources.length, 3);
    msg.sources.forEach(function (src) {
      assert.ok(src.label && FIRST_GRADE_LABELS.test(src.label), 'source label must be first-grade: ' + src.label);
      assert.ok(src.title && src.title.length > 5);
      assert.ok(src.url && src.url.startsWith('http'));
    });
    assert.ok(msg.novel.includes('Tres fuentes científicas de primer grado'));
    assert.ok(hasNovelInvestigativeElement(msg));
  });

  test('formatSources renders numbered list with urls', function () {
    var msg = generateMixedMessage(MATH_ACTIVITY, { seed: 0 });
    var formatted = formatSources(msg.sources);
    assert.ok(formatted.includes('1.'));
    assert.ok(formatted.includes('2.'));
    assert.ok(formatted.includes('3.'));
    assert.ok(formatted.includes('http'));
  });

  test('fullText combines familiar and novel', function () {
    var msg = generateMixedMessage(MATH_ACTIVITY, { seed: 7 });
    assert.ok(msg.fullText.includes(msg.familiar));
    assert.ok(msg.fullText.includes(msg.novel));
    assert.notStrictEqual(msg.familiar, msg.novel);
  });

  test('different seeds produce varied novel content', function () {
    var a = generateMixedMessage(MATH_ACTIVITY, { seed: 1 });
    var b = generateMixedMessage(MATH_ACTIVITY, { seed: 2 });
    assert.notStrictEqual(a.novel, b.novel);
  });

  test('general activity still produces resonant familiar + sourced novel', function () {
    var activity = 'pasear al perro por el parque';
    var msg = generateMixedMessage(activity, { seed: 99 });
    assert.ok(msg.familiar.includes(activity));
    assert.ok(BOREDOM_RESONANCE.test(msg.familiar));
    assert.strictEqual(msg.sources.length, 3);
    assert.strictEqual(detectDomain(activity), 'general');
  });

  test('subject line is evocative and references context', function () {
    var msg = generateMixedMessage(MATH_ACTIVITY, { seed: 0 });
    assert.ok(msg.subject.length > 10);
    assert.ok(msg.subject.includes(MATH_ACTIVITY.slice(0, 15)));
  });

  console.log('\n' + passed + ' passed, ' + failed + ' failed');
  if (failed > 0) process.exit(1);
}

runTests();