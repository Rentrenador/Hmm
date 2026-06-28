'use strict';

var fs = require('fs');
var path = require('path');

var SCRATCH = process.env.SCRATCH || path.join(
  process.env.LOCALAPPDATA || '',
  'Temp',
  'grok-goal-06daad863805',
  'implementer'
);

var ROOT = path.join(__dirname, '..');
var INDEX = path.join(ROOT, 'index.html');
var GENERATOR = path.join(ROOT, 'js', 'message-generator.js');
var { generateMixedMessage } = require(GENERATOR);

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
    { label: 'loads real generator script', ok: /js\/message-generator\.js/i.test(html) }
  ];
  var failed = checks.filter(function (c) { return !c.ok; });
  return { checks: checks, failed: failed };
}

function runFlow() {
  var activity = 'impartir clases de matemáticas';
  var contact = 'profesor@ejemplo.com';
  var profile = { contact: contact, activity: activity };

  var msg1 = generateMixedMessage(profile.activity, { seed: 1001, contactMedium: profile.contact });
  var msg2 = generateMixedMessage(profile.activity, { seed: 1002, contactMedium: profile.contact });

  return { profile: profile, msg1: msg1, msg2: msg2 };
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

  log('-- Landing page gating --');
  var landing = verifyLandingPage();
  landing.checks.forEach(function (c) {
    log((c.ok ? '[OK]' : '[FAIL]') + ' ' + c.label);
  });
  if (landing.failed.length) {
    process.exit(1);
  }

  log('');
  log('-- Signup + generate flow (Node invocation of real generator) --');
  var flow = runFlow();
  log('Profile stored (simulated): ' + JSON.stringify(flow.profile));
  log('');
  log('--- Message sample #1 (post-signup) ---');
  log('Subject: ' + flow.msg1.subject);
  log(flow.msg1.fullText);
  log('');
  log('--- Message sample #2 (simulated periodic send) ---');
  log('Subject: ' + flow.msg2.subject);
  log(flow.msg2.fullText);

  var samplePath = path.join(SCRATCH, 'message-sample.txt');
  var sampleContent = [
    'CurioRutina — generated message sample',
    'Profile: ' + JSON.stringify(flow.profile),
    '',
    '=== Message #1 (initial) ===',
    'Subject: ' + flow.msg1.subject,
    '',
    flow.msg1.fullText,
    '',
    '=== Message #2 (periodic simulation) ===',
    'Subject: ' + flow.msg2.subject,
    '',
    flow.msg2.fullText,
    ''
  ].join('\n');
  fs.writeFileSync(samplePath, sampleContent, 'utf8');
  log('');
  log('Wrote ' + samplePath);

  var launchLogPath = path.join(SCRATCH, 'launch.log');
  fs.writeFileSync(launchLogPath, logLines.join('\n') + '\n', 'utf8');
  log('Wrote ' + launchLogPath);

  var familiarOk = flow.msg1.familiar.includes(flow.profile.activity);
  var novelOk = /investiga/i.test(flow.msg1.novel);
  if (!familiarOk || !novelOk) {
    console.error('Message structure validation failed');
    process.exit(1);
  }
  log('');
  log('All verification checks passed.');
}

main();