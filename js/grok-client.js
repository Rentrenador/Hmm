/**
 * Client for Grok-powered personalization via Netlify serverless function.
 * Falls back to the local compositional generator when the API is unavailable.
 */
(function (global) {
  'use strict';

  var DEFAULT_API_PATH = '/.netlify/functions/generate-message';

  function getApiUrl(win) {
    var w = win || global;
    if (w.CURIO_GROK_API_URL) {
      return w.CURIO_GROK_API_URL;
    }
    return DEFAULT_API_PATH;
  }

  function isEnabled(win) {
    var w = win || global;
    return w.CURIO_USE_GROK !== false;
  }

  function getGenerator(win) {
    var w = win || global;
    return w.MessageGenerator;
  }

  function buildPayload(profile, options, skeleton) {
    return {
      activity: profile.activity,
      contact: profile.contact,
      seed: options.seed,
      skeleton: {
        subject: skeleton.subject,
        greeting: skeleton.greeting,
        topicId: skeleton.topicId,
        topicHook: skeleton.topicHook,
        topicPrompt: skeleton.topicPrompt,
        activityPhrase: skeleton.activityPhrase,
        archetype: skeleton.archetype,
        domain: skeleton.domain,
        context: skeleton.activityContext
      }
    };
  }

  function requestPersonalization(apiUrl, payload, fetchFn) {
    return fetchFn(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    }).then(function (res) {
      if (!res.ok) {
        return res.text().then(function (text) {
          var err = new Error('Grok API error ' + res.status + (text ? ': ' + text : ''));
          err.status = res.status;
          throw err;
        });
      }
      return res.json();
    });
  }

  /**
   * @param {{ activity: string, contact: string }} profile
   * @param {{ seed?: number }} options
   * @param {{ generateMixedMessage: Function, mergePersonalizedCopy?: Function }} [generator]
   * @param {{ fetch?: Function, window?: Window }} [deps]
   */
  function personalize(profile, options, generator, deps) {
    deps = deps || {};
    options = options || {};
    var win = deps.window || global;
    var fetchFn = deps.fetch || (win && win.fetch);
    var gen = generator || getGenerator(win);
    var merge = gen.mergePersonalizedCopy || function (base, copy) {
      return copy && copy.familiar ? Object.assign({}, base, copy) : base;
    };

    if (!gen || !gen.generateMixedMessage) {
      return Promise.reject(new Error('MessageGenerator not available'));
    }

    var seed = options.seed != null ? options.seed : Date.now();
    var skeleton = gen.generateMixedMessage(profile.activity, {
      seed: seed,
      contactMedium: profile.contact
    });

    if (!isEnabled(win) || !fetchFn) {
      return Promise.resolve(skeleton);
    }

    var apiUrl = getApiUrl(win);
    var payload = buildPayload(profile, { seed: seed }, skeleton);

    return requestPersonalization(apiUrl, payload, fetchFn)
      .then(function (personalized) {
        return merge(skeleton, personalized);
      })
      .catch(function () {
        return skeleton;
      });
  }

  function isAvailable(win) {
    return isEnabled(win || global);
  }

  var api = {
    DEFAULT_API_PATH: DEFAULT_API_PATH,
    isAvailable: isAvailable,
    isEnabled: isEnabled,
    personalize: personalize,
    buildPayload: buildPayload
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = api;
  }
  global.CurioGrokClient = api;
})(typeof window !== 'undefined' ? window : global);