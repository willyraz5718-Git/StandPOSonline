// sw.js — Service Worker désactivé (mode online-only)
// Ce fichier est intentionnellement vide pour que les anciens SWs
// enregistrés dans les navigateurs se désinstallent proprement
// lors de leur prochaine mise à jour.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (event) => {
  event.waitUntil(
    // Supprimer tous les caches hérités de l'ancienne version offline-first
    caches.keys().then((cacheNames) =>
      Promise.all(cacheNames.map((name) => caches.delete(name)))
    ).then(() => self.clients.claim())
  );
});
