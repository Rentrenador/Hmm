'use strict';

var fs = require('fs');
var path = require('path');
var { spawnSync } = require('child_process');

var SCRATCH = process.env.SCRATCH || path.join(
  process.env.LOCALAPPDATA || '',
  'Temp',
  'grok-goal-06daad863805',
  'implementer'
);

var ROOT = path.join(__dirname, '..');
var INDEX = path.join(ROOT, 'index.html');

function ensureScratch() {
  if (!fs.existsSync(SCRATCH)) {
    fs.mkdirSync(SCRATCH, { recursive: true });
  }
}

function verifyLandingPage() {
  var html = fs.readFileSync(INDEX, 'utf8');
  var checks = [
    { label: 'headline/service name', ok: /CurioRutina/i.test(html) },
    { label: 'familiar concept', ok: /familiar/i.test(html) },
    { label: 'novel/investigate concept', ok: /investigar|nueva|nuevo/i.test(html) },
    { label: 'contact medium field', ok: /type="email"/i.test(html) && /contact/i.test(html) },
    { label: 'daily activity field', ok: /activity/i.test(html) && /textarea/i.test(html) },
    { label: 'signup form', ok: /signup-form/i.test(html) },
    { label: 'generate control', ok: /generate-btn/i.test(html) },
    { label: 'simulate send control', ok: /simulate-btn/i.test(html) },
    { label: 'loads real generator script', ok: /js\/message-generator\.js/i.test(html) },
    { label: 'loads real app glue script', ok: /js\/app\.js/i.test(html) }
  ];
  return { checks: checks, failed: checks.filter(function (c) { return !c.ok; }) };
}

function runNode(scriptName) {
  var scriptPath = path.join(__dirname, scriptName);
  var result = spawnSync(process.execPath, [scriptPath], {
    cwd: ROOT,
    env: Object.assign({}, process.env, { SCRATCH: SCRATCH }),
    encoding: 'utf8'
  });
  return result;
}

function main() {
  ensureScratch();
  var logLines = [];
  var log = function (line) {
    logLines.push(line);
    console.log(line);
  };

  log('=== CurioRutina launch verification ===');
  log('');

  log('-- Step 1: Landing page gating --');
  var landing = verifyLandingPage();
  landing.checks.forEach(function (c) {
    log((c.ok ? '[OK]' : '[FAIL]') + ' ' + c.label);
  });
  if (landing.failed.length) {
    process.exit(1);
  }

  log('');
  log('-- Step 2: Unit tests (generator + app glue) --');
  var generatorTests = runNode(path.join('..', 'test', 'message-generator.test.js'));
  if (generatorTests.stdout) log(generatorTests.stdout.trim());
  if (generatorTests.stderr) log(generatorTests.stderr.trim());
  if (generatorTests.status !== 0) process.exit(1);

  var appTests = runNode(path.join('..', 'test', 'app.test.js'));
  if (appTests.stdout) log(appTests.stdout.trim());
  if (appTests.stderr) log(appTests.stderr.trim());
  if (appTests.status !== 0) process.exit(1);

  log('');
  log('-- Step 3: Browser entry point (index.html signup + generate) --');
  var browserVerify = runNode('browser-verify.js');
  if (browserVerify.stdout) log(browserVerify.stdout.trim());
  if (browserVerify.stderr) log(browserVerify.stderr.trim());
  if (browserVerify.status !== 0) process.exit(1);

  var launchLogPath = path.join(SCRATCH, 'launch.log');
  var prefix = logLines.join('\n') + '\n';
  var browserLog = fs.existsSync(launchLogPath) ? fs.readFileSync(launchLogPath, 'utf8') : '';
  if (!browserLog.includes('Browser verification (real index.html entry point)')) {
    console.error('Browser section missing from launch.log');
    process.exit(1);
  }
  fs.writeFileSync(launchLogPath, prefix + browserLog, 'utf8');

  log('');
  log('Wrote ' + launchLogPath);
  log('All verification checks passed.');
}

main();