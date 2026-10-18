/* Service worker checks, with the browser's cache and fetch faked.
   No Node needed: run from this folder with
   /System/Library/Frameworks/JavaScriptCore.framework/Versions/A/Helpers/jsc tests/sw-test.js  */
var listeners = {}, stores = {}, failing = {}, log = [];
var self = {
  addEventListener: function (n, f) { listeners[n] = f; },
  skipWaiting: function () { return Promise.resolve(); },
  clients: { claim: function () { return Promise.resolve(); } }
};
function Request(url, opts) { this.url = url; this.method = 'GET'; }
var caches = {
  open: function (name) {
    stores[name] = stores[name] || {};
    return Promise.resolve({
      add: function (r) { if (failing[r.url]) return Promise.reject(new Error('404')); stores[name][r.url] = 1; return Promise.resolve(); },
      put: function (r) { stores[name][r.url] = 1; return Promise.resolve(); },
      match: function (r) { return Promise.resolve(stores[name][r.url] ? { from: name } : undefined); }
    });
  },
  keys: function () { return Promise.resolve(Object.keys(stores)); },
  delete: function (k) { delete stores[k]; return Promise.resolve(true); },
  match: function () { throw new Error('must not search every cache'); }
};
var Response = { error: function () { return { error: true }; } };
var fetch = function () { return Promise.reject(new Error('offline')); };

load('sw.js');

var failed = 0;
function check(name, ok) { print((ok ? 'ok   ' : 'FAIL ') + name); if (!ok) failed++; }
function wait(p, then) { var done = false, val; p.then(function (v) { val = v; done = true; }); drainMicrotasks(); then(done, val); }

/* install: one missing file must not stop the others being saved */
failing['./voices.mp3'] = true;
var ev = { waitUntil: function (p) { this.p = p; } };
listeners.install(ev);
wait(ev.p, function () {
  var saved = Object.keys(stores['jelly-splat-v12'] || {});
  check('install saves the files that exist even if one is missing', saved.indexOf('./index.html') >= 0 && saved.indexOf('./voices.mp3') < 0);
});

/* activate: delete only this app's old caches */
stores['jelly-splat-v11'] = {}; stores['jelly-blocks-v2'] = {};
ev = { waitUntil: function (p) { this.p = p; } };
listeners.activate(ev);
wait(ev.p, function () {
  check('activate removes the old Jelly Splat cache', !('jelly-splat-v11' in stores));
  check('activate leaves the maths app cache alone', 'jelly-blocks-v2' in stores);
});

/* fetch: own cache only, and a clean failure offline */
stores['jelly-splat-v12']['./a'] = 1;
ev = { request: { url: './a', method: 'GET' }, respondWith: function (p) { this.p = p; } };
listeners.fetch(ev);
wait(ev.p, function (d, v) { check('fetch answers from its own cache', d && v && v.from === 'jelly-splat-v12'); });
ev = { request: { url: './never-saved', method: 'GET' }, respondWith: function (p) { this.p = p; } };
listeners.fetch(ev);
wait(ev.p, function (d, v) { check('fetch fails cleanly when offline and not saved', d && v && v.error === true); });

if (failed) { print(failed + ' failed'); quit(1); } else print('all passed');
