/**
 * Service Worker pour StandPOS PWA
 *
 * Lifecycle:
 *  - install  : self.skipWaiting()
 *  - activate : self.clients.claim()
 *
 * Stratégies:
 *  - Navigation (HTML) : Cache-First avec fallback index.html pour SPA routing offline
 *  - Assets (JS, CSS, images) : Cache-First avec mise en cache dynamique
 *  - API Supabase : Network-First avec fallback cache
 */

const CACHE_NAME     = 'standpos-v2';
const API_CACHE_NAME = 'standpos-api-v2';
const IMG_CACHE_NAME = 'standpos-img-v2';

const PRECACHE_URLS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icon.png',
  '/standpos-logo.png'
];

// ── Installation : précacher l'app shell + skipWaiting ──────────────────────
self.addEventListener('install', (event) => {
  console.log('[SW] Installation...');
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_URLS).catch((err) => {
        console.warn('[SW] Précache partiel:', err);
      });
    })
  );
});

// ── Activation : clients.claim + nettoyage anciens caches ───────────────────
self.addEventListener('activate', (event) => {
  console.log('[SW] Activation...');
  event.waitUntil(
    Promise.all([
      self.clients.claim(),
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter(name => ![CACHE_NAME, API_CACHE_NAME, IMG_CACHE_NAME].includes(name))
            .map(name => {
              console.log('[SW] Suppression ancien cache:', name);
              return caches.delete(name);
            })
        );
      })
    ])
  );
});

// ── Interception des requêtes ─────────────────────────────────────────────────
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Ignorer WebSockets (Supabase Realtime)
  if (request.url.startsWith('ws://') || request.url.startsWith('wss://')) return;

  // Ignorer requêtes non-GET
  if (request.method !== 'GET') return;

  // Ignorer API Supabase (y compris avec custom domain)
  if (url.pathname.startsWith('/rest/v1') || 
      url.pathname.startsWith('/auth/v1') || 
      url.pathname.startsWith('/storage/v1') || 
      url.pathname.startsWith('/functions/v1')) {
    return;
  }

  // Ignorer extensions chrome ou schémas non http(s)
  if (url.protocol !== 'http:' && url.protocol !== 'https:') return;

  // Ignorer Vite HMR en dev
  if (url.pathname.includes('/@vite/') || url.pathname.includes('/@react-refresh')) return;

  // 1. Requêtes de navigation (SPA Router: /pos, /stock, /dashboard, etc.)
  if (request.mode === 'navigate') {
    event.respondWith(handleNavigation(request));
    return;
  }

  // 2. Images : Cache-First
  if (request.destination === 'image' || url.pathname.match(/\.(png|jpg|jpeg|svg|gif|webp|ico)$/i)) {
    event.respondWith(cacheFirst(request, IMG_CACHE_NAME));
    return;
  }

  // 3. API Supabase : Network-First avec fallback cache
  if (url.hostname.includes('supabase')) {
    event.respondWith(networkFirst(request, API_CACHE_NAME));
    return;
  }

  // 4. Assets statiques (JS, CSS, fonts) : Cache-First avec cache dynamique
  event.respondWith(cacheFirst(request, CACHE_NAME));
});

// ── Navigation SPA (Fallback index.html quand offline) ───────────────────────
async function handleNavigation(request) {
  try {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) return cachedResponse;

    const networkResponse = await fetch(request);
    if (networkResponse && networkResponse.ok) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, networkResponse.clone());
      return networkResponse;
    }
  } catch (err) {
    console.log('[SW] Navigation offline fallback pour:', request.url);
  }

  const cache = await caches.open(CACHE_NAME);
  const indexHtml = (await cache.match('/index.html')) || (await cache.match('/'));
  if (indexHtml) return indexHtml;

  return new Response(
    '<!DOCTYPE html><html><head><title>StandPOS Offline</title></head><body><div id="root"></div></body></html>',
    { headers: { 'Content-Type': 'text/html' } }
  );
}

// ── Stratégie Cache-First avec dynamique ─────────────────────────────────────
async function cacheFirst(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);
  if (cached) return cached;

  try {
    const response = await fetch(request);
    if (response && response.status === 200) {
      cache.put(request, response.clone());
    }
    return response;
  } catch (err) {
    if (request.mode === 'navigate') {
      const indexHtml = (await cache.match('/index.html')) || (await cache.match('/'));
      if (indexHtml) return indexHtml;
    }
    throw err;
  }
}

// ── Stratégie Network-First avec fallback ────────────────────────────────────
async function networkFirst(request, cacheName) {
  const cache = await caches.open(cacheName);
  try {
    const response = await fetch(request);
    if (response && response.status === 200) {
      cache.put(request, response.clone());
    }
    return response;
  } catch (err) {
    const cached = await cache.match(request);
    if (cached) return cached;
    throw err;
  }
}

// ── Message Listener ──────────────────────────────────────────────────────────
self.addEventListener('message', (event) => {
  if (event.data?.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
