'use strict';

var fs = require('fs');
var path = require('path');
var puppeteer = require('puppeteer');

var SCRATCH = process.env.SCRATCH || path.join(
  process.env.LOCALAPPDATA || '',
  'Temp',
  'grok-goal-06daad863805',
  'implementer'
);

var ROOT = path.join(__dirname, '..');
var INDEX = path.join(ROOT, 'index.html');
var CONTACT = 'profesor@ejemplo.com';
var ACTIVITY = 'impartir clases de matemáticas';

function fileUrl(filePath) {
  return 'file:///' + filePath.replace(/\\/g, '/');
}

async function runBrowserFlow() {
  if (!fs.existsSync(SCRATCH)) {
    fs.mkdirSync(SCRATCH, { recursive: true });
  }

  var logs = [];
  var log = function (line) {
    logs.push(line);
    console.log(line);
  };

  log('=== Browser verification (real index.html entry point) ===');
  log('Opening: ' + fileUrl(INDEX));

  var browser = await puppeteer.launch({
    headless: true,
    args: ['--allow-file-access-from-files', '--disable-web-security']
  });

  try {
    var page = await browser.newPage();
    page.on('console', function (msg) {
      log('[browser-console] ' + msg.type() + ': ' + msg.text());
    });
    page.on('pageerror', function (err) {
      log('[browser-error] ' + err.message);
    });

    await page.goto(fileUrl(INDEX), { waitUntil: 'networkidle0', timeout: 30000 });

    var headline = await page.$eval('h1', function (el) { return el.textContent; });
    log('[check] headline: ' + headline);
    assertContains(headline, 'CurioRutina', 'headline');

    await page.evaluate(function () { localStorage.clear(); });
    await page.reload({ waitUntil: 'networkidle0' });

    await page.waitForSelector('#signup-form');
    await page.type('#contact', CONTACT);
    await page.type('#activity', ACTIVITY);
    await page.click('button[type="submit"]');

    await page.waitForFunction(function () {
      var ack = document.getElementById('ack');
      return ack && !ack.classList.contains('hidden') && ack.textContent.length > 0;
    });

    var ack = await page.$eval('#ack', function (el) { return el.textContent; });
    log('[check] ack after signup: ' + ack);
    assertContains(ack, ACTIVITY, 'ack activity');
    assertContains(ack, 'simulan', 'ack simulation honesty');

    await page.waitForSelector('#message-preview:not(.hidden)');
    var previewAfterSignup = await page.$eval('#message-preview', function (el) { return el.textContent; });
    log('[check] preview after signup length: ' + previewAfterSignup.length);
    assertContains(previewAfterSignup, 'Parte familiar', 'preview familiar label');
    assertContains(previewAfterSignup, 'Parte nueva', 'preview novel label');
    assertContains(previewAfterSignup, ACTIVITY, 'preview activity');
    assertMatch(previewAfterSignup, /investiga/i, 'preview investigative');

    var storedProfile = await page.evaluate(function () {
      return JSON.parse(localStorage.getItem('curiorutina_profile'));
    });
    log('[check] stored profile: ' + JSON.stringify(storedProfile));
    assertEqual(storedProfile.contact, CONTACT, 'stored contact');
    assertEqual(storedProfile.activity, ACTIVITY, 'stored activity');

    var sendLogAfterSignup = await page.$eval('#send-log', function (el) { return el.textContent; });
    log('[check] send log after signup: ' + sendLogAfterSignup.trim());
    assertMatch(sendLogAfterSignup, /Simulación #1/, 'initial simulated send');

    await page.click('#generate-btn');
    await page.waitForFunction(function () {
      return document.getElementById('send-log').textContent.indexOf('Simulación #2') !== -1;
    });
    var sendLogAfterGenerate = await page.$eval('#send-log', function (el) { return el.textContent; });
    log('[check] send log after generate: ' + sendLogAfterGenerate.trim());

    var previewAfterGenerate = await page.$eval('#message-preview', function (el) { return el.textContent; });
    assertContains(previewAfterGenerate, ACTIVITY, 'generate preview activity');

    var launchLogPath = path.join(SCRATCH, 'launch.log');
    var browserSection = logs.join('\n');
    var existing = fs.existsSync(launchLogPath) ? fs.readFileSync(launchLogPath, 'utf8') + '\n' : '';
    fs.writeFileSync(launchLogPath, existing + browserSection + '\n', 'utf8');

    var samplePath = path.join(SCRATCH, 'message-sample.txt');
    fs.writeFileSync(samplePath, [
      'CurioRutina — browser-captured message sample',
      'Profile: ' + JSON.stringify(storedProfile),
      '',
      '=== Preview after signup ===',
      previewAfterSignup,
      '',
      '=== Preview after generate ===',
      previewAfterGenerate,
      '',
      '=== Send log ===',
      sendLogAfterGenerate
    ].join('\n'), 'utf8');

    log('Wrote ' + launchLogPath);
    log('Wrote ' + samplePath);
    log('Browser verification passed.');
  } finally {
    await browser.close();
  }
}

function assertContains(value, needle, label) {
  if (!String(value).includes(needle)) {
    throw new Error(label + ' expected to contain "' + needle + '" but got: ' + value);
  }
}

function assertMatch(value, pattern, label) {
  if (!pattern.test(String(value))) {
    throw new Error(label + ' expected to match ' + pattern + ' but got: ' + value);
  }
}

function assertEqual(actual, expected, label) {
  if (actual !== expected) {
    throw new Error(label + ' expected ' + expected + ' but got ' + actual);
  }
}

runBrowserFlow().catch(function (err) {
  console.error('Browser verification failed:', err.message);
  process.exit(1);
});