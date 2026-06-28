'use strict';

var assert = require('assert');
var path = require('path');
var {
  generateMixedMessage,
  detectDomain,
  extractActivityContext,
  buildFamiliar,
  formatSources
} = require(path.join(__dirname, '..', 'js', 'message-generator.js'));

var MATH_ACTIVITY = 'impartir clases de matemáticas';

var FIRST_GRADE_LABELS = /Nature|Science|PNAS|APA|Lancet|IEEE|ACM|Neuron|Springer|Cell Press|BMJ|AMS|NCTM|American Mathematical Society|Physical Review|Transportation Research|Accident Analysis|Food Chemistry|Frontiers|Psychologische|Scientific American|Proceedings of the National Academy/i;

var FAMILIAR_RESONANCE = /progres|llegad|cuenta|tirando|justo|avance|semana|bien|logro|fluid/i;
var MOTO_ACTIVITY = 'usar la moto para ir y volver del sitio donde trabajo (40 minutos de trayecto)';

function hasNovelInvestigativeElement(output) {
  var text = (output.novel + output.fullText).toLowerCase();
  return (
    text.includes('investiga') ||
    text.includes('lecturas') ||
    text.includes('profundizar') ||
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

  test('familiar section uses derived phrase not literal signup text', function () {
    var msg = generateMixedMessage(MATH_ACTIVITY, { seed: 42 });
    assert.ok(msg.familiar.includes('tus clases de matemáticas'));
    assert.ok(!msg.familiar.includes(MATH_ACTIVITY), 'must not paste literal signup text');
    assert.ok(FAMILIAR_RESONANCE.test(msg.familiar), 'must evoke realistic optimism');
    assert.ok(!/explicar conceptos|corregir ejercicios/i.test(msg.familiar), 'must not invent unstated details');
  });

  test('detectDomain recognizes commute by motorcycle and derives natural phrase', function () {
    assert.strictEqual(detectDomain(MOTO_ACTIVITY), 'desplazamiento');
    var ctx = extractActivityContext(MOTO_ACTIVITY);
    assert.ok(ctx.phrase.includes('moto'));
    assert.ok(/curro|trabajo/.test(ctx.phrase));
    assert.strictEqual(ctx.duration, '40 minutos');
    assert.ok(!ctx.phrase.includes('sitio donde trabajo'));
    var msg = generateMixedMessage(MOTO_ACTIVITY, { seed: 42 });
    assert.ok(msg.familiar.includes(ctx.phrase));
    assert.ok(!msg.familiar.includes(MOTO_ACTIVITY));
    assert.ok(/justos|injustos|trayecto|llegad|progres/i.test(msg.familiar));
  });

  test('familiar moments vary by seed within same domain', function () {
    var a = buildFamiliar(MATH_ACTIVITY, 'matematicas', 1);
    var b = buildFamiliar(MATH_ACTIVITY, 'matematicas', 2);
    assert.notStrictEqual(a, b);
    assert.ok(a.includes('tus clases de matemáticas'));
    assert.ok(b.includes('tus clases de matemáticas'));
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
    assert.ok(msg.novel.includes('tres lecturas'));
    assert.ok(hasNovelInvestigativeElement(msg));
    assert.ok(msg.greeting && msg.closing && msg.deliveryNote);
  });

  test('formatSources renders numbered list with urls', function () {
    var msg = generateMixedMessage(MATH_ACTIVITY, { seed: 0 });
    var formatted = formatSources(msg.sources);
    assert.ok(formatted.includes('1 ·'));
    assert.ok(formatted.includes('2 ·'));
    assert.ok(formatted.includes('3 ·'));
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

  test('different activities produce distinct messages with same seed', function () {
    var moto = generateMixedMessage(MOTO_ACTIVITY, { seed: 100 });
    var math = generateMixedMessage(MATH_ACTIVITY, { seed: 100 });
    var dog = generateMixedMessage('pasear al perro por el parque', { seed: 100 });
    assert.notStrictEqual(moto.familiar, math.familiar);
    assert.notStrictEqual(moto.familiar, dog.familiar);
    assert.notStrictEqual(math.familiar, dog.familiar);
    assert.notStrictEqual(moto.topicId, math.topicId);
    assert.notStrictEqual(moto.subject, math.subject);
  });

  test('general activity still produces resonant familiar + sourced novel', function () {
    var activity = 'pasear al perro por el parque';
    var msg = generateMixedMessage(activity, { seed: 99 });
    assert.ok(msg.familiar.includes('tus paseos con el perro por el parque'));
    assert.ok(!msg.familiar.includes(activity));
    assert.ok(FAMILIAR_RESONANCE.test(msg.familiar));
    assert.strictEqual(msg.sources.length, 3);
    assert.strictEqual(detectDomain(activity), 'general');
  });

  test('subject line is evocative and paloma-themed', function () {
    var msg = generateMixedMessage(MATH_ACTIVITY, { seed: 0 });
    assert.ok(msg.subject.length > 10);
    assert.ok(/paloma|pizarra|clases|matemáticas|rutina/i.test(msg.subject));
  });

  console.log('\n' + passed + ' passed, ' + failed + ' failed');
  if (failed > 0) process.exit(1);
}

runTests();