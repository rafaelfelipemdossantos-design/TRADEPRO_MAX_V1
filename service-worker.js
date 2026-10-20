/* TradePro Performance — Service Worker
   Guarda o app no aparelho para abrir rápido e funcionar offline.
   Ao publicar uma nova versão, aumente o número em CACHE_VERSION. */
const CACHE_VERSION = 'v3';
const CACHE = `tradepro-${CACHE_VERSION}`;

const SHELL = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './icon-maskable-192.png',
  './icon-maskable-512.png',
  './apple-touch-icon-180.png',
  './apple-touch-icon-152.png',
  './apple-touch-icon-120.png',
  './favicon.ico',
  './favicon-32.png'
];

// Não guardar rastreamento
const BYPASS = ['googletagmanager.com', 'google-analytics.com', 'analytics.google.com'];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE).then(c => Promise.allSettled(SHELL.map(u => c.add(u)))).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k.startsWith('tradepro-') && k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (BYPASS.some(h => url.hostname.endsWith(h))) return;

  // Abertura do app: tenta a rede (versão nova) e cai para o cache se estiver offline
  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req)
        .then(res => { const copy = res.clone(); caches.open(CACHE).then(c => c.put('./index.html', copy)); return res; })
        .catch(() => caches.match('./index.html').then(r => r || caches.match('./')))
    );
    return;
  }

  // Demais arquivos (ícones, React, Tailwind, fontes...): usa o cache e atualiza em segundo plano
  event.respondWith(
    caches.match(req).then(cached => {
      const network = fetch(req)
        .then(res => {
          if (res && (res.ok || res.type === 'opaque')) { const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); }
          return res;
        })
        .catch(() => cached);
      return cached || network;
    })
  );
});
