'use strict';

var assert = require('assert');
var path = require('path');
var { generateMixedMessage, detectDomain } = require(path.join(__dirname, '..', 'js', 'message-generator.js'));

var MATH_ACTIVITY = 'impartir clases de matemáticas';

function hasFamiliarReference(output, activity) {
  var lower = output.familiar.toLowerCase();
  var activityLower = activity.toLowerCase();
  return lower.includes(activityLower) || lower.includes('matemátic') || lower.includes('matematic');
}

function hasNovelInvestigativeElement(output) {
  var text = (output.novel + output.fullText).toLowerCase();
  return (
    text.includes('investiga') ||
    text.includes('descubre') ||
    text.includes('busca') ||
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

  test('math teaching output contains familiar reference to activity', function () {
    var msg = generateMixedMessage(MATH_ACTIVITY, { seed: 42 });
    assert.ok(hasFamiliarReference(msg, MATH_ACTIVITY), 'familiar section should reference activity');
    assert.ok(msg.familiar.includes(MATH_ACTIVITY), 'familiar should include exact activity text');
  });

  test('math teaching output contains novel investigative element', function () {
    var msg = generateMixedMessage(MATH_ACTIVITY, { seed: 42 });
    assert.ok(hasNovelInvestigativeElement(msg), 'novel section should prompt investigation');
    assert.ok(msg.novel.includes('--- Algo nuevo para investigar ---'), 'novel section header present');
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

  test('general activity still produces familiar + novel', function () {
    var activity = 'pasear al perro por el parque';
    var msg = generateMixedMessage(activity, { seed: 99 });
    assert.ok(msg.familiar.includes(activity));
    assert.ok(hasNovelInvestigativeElement(msg));
    assert.strictEqual(detectDomain(activity), 'general');
  });

  test('subject line is non-empty and references context', function () {
    var msg = generateMixedMessage(MATH_ACTIVITY, { seed: 0 });
    assert.ok(msg.subject.length > 10);
    assert.ok(msg.subject.includes('matemátic') || msg.subject.includes(MATH_ACTIVITY.slice(0, 20)));
  });

  console.log('\n' + passed + ' passed, ' + failed + ' failed');
  if (failed > 0) process.exit(1);
}

runTests();