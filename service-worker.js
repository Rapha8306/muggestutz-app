/* Muggestutz Familien-App — Service Worker */
const CACHE_VERSION = "muggestutz-v1.0.0";
const CACHE_NAME = "muggestutz-cache-" + CACHE_VERSION;

const APP_SHELL = [
  "./",
  "./index.html",
  "./style.css",
  "./app.js",
  "./manifest.json",
  "./icons/icon-192.svg",
  "./icons/icon-512.svg"
];

// Install: App-Shell cachen
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL))
  );
  self.skipWaiting();
});

// Activate: alte Caches entfernen
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key.startsWith("muggestutz-cache-") && key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

// Fetch-Strategie:
// - HTML-Shell (index.html / navigation requests): network-first, damit Updates ankommen
// - Map-Tiles (OpenStreetMap): cache-first für Offline-Ansicht
// - Alles andere (CSS/JS/Icons/Leaflet): cache-first mit Netzwerk-Fallback
// - Wetter-API (Open-Meteo): nie cachen, graceful degradation im app.js selbst
self.addEventListener("fetch", (event) => {
  const req = event.request;
  const url = new URL(req.url);

  // Wetter-API nie über den Service Worker cachen
  if (url.hostname.includes("api.open-meteo.com")) {
    return; // Browser regelt das direkt, app.js fängt Fehler ab
  }

  // Navigation / HTML-Shell: network-first
  if (req.mode === "navigate" || (req.method === "GET" && url.pathname.endsWith("index.html"))) {
    event.respondWith(
      fetch(req)
        .then((res) => {
          const resClone = res.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(req, resClone));
          return res;
        })
        .catch(() => caches.match(req).then((cached) => cached || caches.match("./index.html")))
    );
    return;
  }

  // OpenStreetMap Tiles: cache-first (fürs Offline-Kartenbild)
  if (url.hostname.includes("tile.openstreetmap.org")) {
    event.respondWith(
      caches.match(req).then((cached) => {
        if (cached) return cached;
        return fetch(req).then((res) => {
          const resClone = res.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(req, resClone));
          return res;
        }).catch(() => cached);
      })
    );
    return;
  }

  // Alles andere: cache-first, Netzwerk-Fallback, danach in Cache legen
  event.respondWith(
    caches.match(req).then((cached) => {
      if (cached) return cached;
      return fetch(req)
        .then((res) => {
          if (res && res.status === 200 && (res.type === "basic" || res.type === "cors")) {
            const resClone = res.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(req, resClone));
          }
          return res;
        })
        .catch(() => cached);
    })
  );
});
