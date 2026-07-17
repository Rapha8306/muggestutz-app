/* ===========================================================
   MUGGESTUTZ FAMILIEN-APP — app.js
   Einzige JS-Datei: Datenstrukturen + komplette App-Logik
   =========================================================== */

/* -----------------------------------------------------------
   1. DATENSTRUKTUR AUSFLUGSZIELE (erweiterbar)
   ----------------------------------------------------------- */
const DESTINATIONS = {
  hasliberg: {
    id: "hasliberg",
    name: "Hasliberg – Muggestutz Zwergenwege",
    ort: "Hasliberg, Berner Oberland",
    start: { name: "Ametsbergstrasse, Gossau ZH", lat: 47.3466, lon: 8.7995 },
    ziele: {
      weg1: {
        id: "weg1",
        titel: "Mägisalp – Bidmi (Original)",
        start: { name: "Bergstation Mägisalp", lat: 46.7563, lon: 8.1602, hoehe: 1710 },
        ziel: { name: "Mittelstation Bidmi", lat: 46.7627, lon: 8.1706, hoehe: 1423 },
        laengeKm: 5,
        dauerMin: 120,
        aufstiegHm: 110,
        abstiegHm: 400,
        alter: "ca. 3–10 Jahre",
        kinderwagen: false,
        hinweis: "Unebener Waldboden, Trage für Kleinkinder empfohlen.",
        saison: "23. Mai – 25. Oktober 2026 (Sommersaison)",
        link: "https://meiringen-hasliberg.ch/2/zwergenweg-magisalp-bidmi",
        talstation: "Hasliberg Reuti",
        tickets: [
          { ab: "Hasliberg Reuti", erw: 34, halbtax: 24, kind: 17 },
          { ab: "Meiringen", erw: 44, halbtax: 29, kind: 22 }
        ],
        stationen: [
          { name: "Tannzapfentröchni", emoji: "🌲" },
          { name: "Adlerschaukel", emoji: "🦅" },
          { name: "Zwergenhöhle", emoji: "🕳️" },
          { name: "Hängebrücke", emoji: "🌉" },
          { name: "Zwergenhäuser", emoji: "🏠" },
          { name: "Wasserrad", emoji: "💧" },
          { name: "Bauernhof-Pause (Glace)", emoji: "🍦" },
          { name: "Zwergenspielplatz Bidmi", emoji: "🛝" }
        ]
      },
      weg2: {
        id: "weg2",
        titel: "Käserstatt – Lischen (\"Bannwald\")",
        start: { name: "Bergstation Käserstatt", lat: 46.7691, lon: 8.1795, hoehe: 1840 },
        ziel: { name: "Mittelstation Lischen", lat: 46.7649, lon: 8.1739, hoehe: 1480 },
        laengeKm: 3,
        dauerMin: 90,
        aufstiegHm: 0,
        abstiegHm: 360,
        alter: "ca. 5–12 Jahre",
        kinderwagen: false,
        hinweis: "Führt durch Hochmoore, mehrere Feuerstellen zum Bräteln.",
        saison: "23. Mai – 25. Oktober 2026 (Sommersaison)",
        link: "https://meiringen-hasliberg.ch/4/zwergenweg-kaserstatt-lischen",
        talstation: "Hasliberg Wasserwendi",
        tickets: [
          { ab: "Hasliberg Twing (2-Zonen-Wandertageskarte)", erw: 30, halbtax: 20, kind: 15 }
        ],
        stationen: [
          { name: "Moorchnorzenhäuschen", emoji: "🌿" },
          { name: "Zwergenhäuschen", emoji: "🏡" },
          { name: "Seilbahn", emoji: "🚡" },
          { name: "Hängebrücke", emoji: "🌉" },
          { name: "Wildbach-Station", emoji: "🏞️" },
          { name: "Balisalp-Rast (Alprestaurant Balis)", emoji: "🍽️" },
          { name: "Feuerstelle Bannwald", emoji: "🔥" }
        ]
      }
    },
    spielplatz: {
      name: "Zwergenspielplatz Bidmi",
      beschreibung: "Klettergarten, Rutschbahn, Federwippen, Seilbähnli, Baumpfad mit Baumhäusern, Kugelweg. Kinderwagentauglich, Picknickplätze, Brätelstelle, rollstuhlgängige Toilette. Aussicht auf Wetterhorngruppe und Bidmiseeli.",
      erreichbar: "Zu Fuss über Weg 1 oder direkt per Gondelbahn ab Meiringen/Hasliberg Reuti.",
      link: "https://meiringen-hasliberg.ch/3/zwergenspielplatz-bidmi"
    },
    betrieb: {
      saison: "Sommersaison 2026: ca. 23. Mai – 25. Oktober 2026, Gondelbahnen täglich in Betrieb.",
      telefon: "+41 33 550 50 50",
      link: "https://meiringen-hasliberg.ch/Infos/heute-offen"
    },
    rundstreckeKm: 180,
    zeitplanVorlage: [
      { zeit: "08:00", titel: "Abfahrt Gossau ZH", beschreibung: "Los geht's Richtung Berner Oberland — ca. 1.5–2 Std. Fahrzeit." },
      { zeit: "09:45", titel: "Ankunft Talstation", beschreibung: "Parkplatz, Tickets lösen, Gondelbahn besteigen." },
      { zeit: "10:15", titel: "Start Zwergenweg", beschreibung: "Los geht die Wanderung mit Mugi dem Zwerg." },
      { zeit: "12:15", titel: "Picknick-Pause", beschreibung: "Rastplatz mit Feuerstelle für ein gemütliches Picknick." },
      { zeit: "13:30", titel: "Zwergenspielplatz Bidmi", beschreibung: "Klettern, Rutschen, Spielen bis Kräfte reichen." },
      { zeit: "15:30", titel: "Talfahrt & Rückreise", beschreibung: "Gondelbahn zurück ins Tal, Heimfahrt nach Gossau ZH." }
    ]
  }
  // Weitere Ziele einfach hier ergänzen, z.B.:
  // zoo_zuerich: { id: "zoo_zuerich", name: "Zoo Zürich", ort: "Zürich", ... }
};

/* -----------------------------------------------------------
   2. STANDARD-PACKLISTE
   ----------------------------------------------------------- */
const DEFAULT_PACKLISTE = [
  { id: "sonnencreme", label: "Sonnencreme", emoji: "🧴" },
  { id: "huete", label: "Hüte / Caps", emoji: "🧢" },
  { id: "getraenke", label: "Getränke", emoji: "🥤" },
  { id: "picknick", label: "Picknick / Snacks", emoji: "🥪" },
  { id: "ersatzkleider", label: "Ersatzkleider", emoji: "👕" },
  { id: "windeln", label: "Windeln", emoji: "🧷" },
  { id: "feuchttuecher", label: "Feuchttücher", emoji: "🧻" },
  { id: "apotheke", label: "Mini-Apotheke", emoji: "🩹" },
  { id: "kamera", label: "Kamera / Handy", emoji: "📷" },
  { id: "wanderschuhe", label: "Wanderschuhe", emoji: "🥾" },
  { id: "regenjacke", label: "Regenjacke", emoji: "🧥" },
  { id: "trage", label: "Kindertrage", emoji: "🎒" }
];

/* -----------------------------------------------------------
   3. STATE & STORAGE HELPERS
   ----------------------------------------------------------- */
const STORAGE_KEYS = {
  scores: "muggestutz_scores_v1",
  kalender: "muggestutz_kalender_v1",
  tagebuch: "muggestutz_tagebuch_v1",
  packliste: "muggestutz_packliste_v1",
  activeDest: "muggestutz_active_dest_v1",
  activeWeg: "muggestutz_active_weg_v1"
};

function loadJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (e) {
    console.warn("Storage read error", key, e);
    return fallback;
  }
}
function saveJSON(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.warn("Storage write error", key, e);
  }
}

const state = {
  tab: "dashboard",
  activeDestId: loadJSON(STORAGE_KEYS.activeDest, "hasliberg"),
  activeWegId: loadJSON(STORAGE_KEYS.activeWeg, "weg1"),
  scores: loadJSON(STORAGE_KEYS.scores, {}), // { wegId: { foundStations: [ids] } }
  kalender: loadJSON(STORAGE_KEYS.kalender, []),
  tagebuch: loadJSON(STORAGE_KEYS.tagebuch, []),
  packliste: loadJSON(STORAGE_KEYS.packliste, DEFAULT_PACKLISTE.map(i => ({ ...i, checked: false }))),
  weather: null,
  weatherError: false
};

function activeDest() { return DESTINATIONS[state.activeDestId]; }
function activeWeg() { return activeDest().ziele[state.activeWegId]; }

/* -----------------------------------------------------------
   4. UTILITIES
   ----------------------------------------------------------- */
function el(html) {
  const t = document.createElement("template");
  t.innerHTML = html.trim();
  return t.content.firstElementChild;
}
function fmtDate(d) {
  return new Date(d).toLocaleDateString("de-CH", { day: "2-digit", month: "2-digit", year: "numeric" });
}
function isPast(dateStr) {
  const d = new Date(dateStr);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return d < today;
}
function toast(msg) {
  const t = document.getElementById("toast");
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => t.classList.remove("show"), 2200);
}
function isIOS() {
  return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
}

/* -----------------------------------------------------------
   5. NAVIGATION / MAPS
   ----------------------------------------------------------- */
function openNavigation() {
  const dest = activeDest();
  const ziel = activeWeg() ? activeWeg().start : null;
  const lat = ziel ? ziel.lat : dest.start.lat;
  const lon = ziel ? ziel.lon : dest.start.lon;
  const label = encodeURIComponent(ziel ? ziel.name : dest.name);
  let url;
  if (isIOS()) {
    url = `https://maps.apple.com/?daddr=${lat},${lon}&q=${label}&dirflg=d`;
  } else {
    url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lon}&travelmode=driving`;
  }
  window.open(url, "_blank");
}

/* -----------------------------------------------------------
   6. WETTER (Open-Meteo, kein API-Key)
   ----------------------------------------------------------- */
async function fetchWeather() {
  const weg = activeWeg();
  const lat = weg ? weg.ziel.lat : activeDest().start.lat;
  const lon = weg ? weg.ziel.lon : activeDest().start.lon;
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,precipitation,wind_speed_10m,weather_code&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=Europe%2FZurich`;
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("Wetter-API Fehler");
    const data = await res.json();
    state.weather = data;
    state.weatherError = false;
  } catch (e) {
    console.warn("Wetter offline/fehlgeschlagen", e);
    state.weatherError = true;
  }
  if (state.tab === "dashboard") renderApp();
}

function weatherIcon(code) {
  if (code === 0) return "☀️";
  if ([1, 2].includes(code)) return "🌤️";
  if (code === 3) return "☁️";
  if ([45, 48].includes(code)) return "🌫️";
  if ([51, 53, 55, 56, 57].includes(code)) return "🌦️";
  if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return "🌧️";
  if ([71, 73, 75, 77, 85, 86].includes(code)) return "❄️";
  if ([95, 96, 99].includes(code)) return "⛈️";
  return "🌡️";
}
function weatherTips(current) {
  const tips = [];
  if (!current) return tips;
  if (current.precipitation > 0 || [51,53,55,61,63,65,80,81,82,95,96,99].includes(current.weather_code)) {
    tips.push({ emoji: "🧥", label: "Regenjacke mitnehmen" });
  }
  if (current.temperature_2m >= 20 && current.weather_code <= 3) {
    tips.push({ emoji: "🧴", label: "Sonnencreme auftragen" });
  }
  if (current.wind_speed_10m >= 25) {
    tips.push({ emoji: "🌬️", label: "Windjacke einpacken" });
  }
  if (current.temperature_2m <= 10) {
    tips.push({ emoji: "🧣", label: "Warme Schicht dazu" });
  }
  if (tips.length === 0) {
    tips.push({ emoji: "👍", label: "Ideales Ausflugswetter" });
  }
  return tips;
}

/* -----------------------------------------------------------
   7. AKKURECHNER (Peugeot e-308)
   ----------------------------------------------------------- */
const CAR = { batteryKwh: 54, consumptionPer100: 18 };
function calcBattery(startRangeKm) {
  const dest = activeDest();
  const roundTrip = dest.rundstreckeKm || 180;
  const remaining = startRangeKm - roundTrip;
  const reservePercent = Math.round((remaining / (CAR.batteryKwh * 100 / CAR.consumptionPer100)) * 100);
  return { roundTrip, remaining, reservePercent };
}

/* -----------------------------------------------------------
   8. TAB RENDERING
   ----------------------------------------------------------- */
function renderApp() {
  const main = document.getElementById("main-content");
  main.innerHTML = "";
  const renderers = {
    dashboard: renderDashboard,
    tagesplan: renderTagesplan,
    zwergenweg: renderZwergenweg,
    kids: renderKidsMode,
    kalender: renderKalender,
    tagebuch: renderTagebuch,
    packliste: renderPackliste
  };
  (renderers[state.tab] || renderDashboard)(main);
  updateTabbar();
  document.getElementById("main-content").scrollTop = 0;
}

function updateTabbar() {
  document.querySelectorAll(".tab-btn").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.tab === state.tab);
  });
}

/* ---------- 8.1 DASHBOARD ---------- */
function renderDashboard(main) {
  const dest = activeDest();
  main.appendChild(el(`
    <div class="card card-forest">
      <div class="flex-between">
        <h2>📍 ${dest.name}</h2>
      </div>
      <p class="muted">Ab ${dest.start.name}</p>
      <button class="btn btn-primary btn-block" id="nav-btn">🧭 Navigation starten</button>
    </div>
  `));

  // Wetter Card
  const weatherCard = el(`<div class="card card-sky" id="weather-card"><h2>🌦️ Live-Wetter</h2></div>`);
  main.appendChild(weatherCard);
  renderWeatherInto(weatherCard);

  // Akkurechner
  const battCard = el(`
    <div class="card">
      <h2>🔋 Akkurechner Peugeot e-308</h2>
      <div class="slider-wrap">
        <label>Start-Reichweite: <b id="range-val">280</b> km</label>
        <input type="range" id="range-slider" min="50" max="320" value="280" step="5">
      </div>
      <div class="battery-result" id="battery-result"></div>
    </div>
  `);
  main.appendChild(battCard);
  updateBatteryDisplay(280);

  // Karte
  main.appendChild(el(`
    <div class="card">
      <h2>🗺️ Route</h2>
      <div id="leaflet-map"></div>
    </div>
  `));

  document.getElementById("nav-btn").addEventListener("click", openNavigation);
  document.getElementById("range-slider").addEventListener("input", (e) => {
    document.getElementById("range-val").textContent = e.target.value;
    updateBatteryDisplay(Number(e.target.value));
  });

  initLeafletMap();
}

function renderWeatherInto(card) {
  if (state.weatherError && !state.weather) {
    card.appendChild(el(`<p class="muted">⚠️ Wetterdaten offline nicht verfügbar. Sobald du wieder online bist, aktualisiert sich das automatisch.</p>`));
    return;
  }
  if (!state.weather) {
    card.appendChild(el(`<p class="muted">Lade Wetterdaten…</p>`));
    return;
  }
  const c = state.weather.current;
  const daily = state.weather.daily;
  const tips = weatherTips(c);
  const wrap = el(`
    <div>
      <div class="weather-row">
        <div class="weather-icon">${weatherIcon(c.weather_code)}</div>
        <div>
          <div class="weather-temp">${Math.round(c.temperature_2m)}°C</div>
          <div class="muted">Wind ${Math.round(c.wind_speed_10m)} km/h · Niederschlag ${c.precipitation} mm</div>
        </div>
      </div>
      <p class="muted mt-8">Heute: ${Math.round(daily.temperature_2m_min[0])}° – ${Math.round(daily.temperature_2m_max[0])}° · Regenwahrscheinlichkeit ${daily.precipitation_probability_max[0]}%</p>
      <div class="weather-tips">
        ${tips.map(t => `<span class="tip-chip">${t.emoji} ${t.label}</span>`).join("")}
      </div>
    </div>
  `);
  card.appendChild(wrap);
}

function updateBatteryDisplay(startRange) {
  const r = calcBattery(startRange);
  const box = document.getElementById("battery-result");
  if (!box) return;
  const warn = r.remaining < 40;
  box.innerHTML = `
    <div class="battery-stat">
      <div class="val">${r.roundTrip} km</div>
      <div class="lbl">Rundstrecke</div>
    </div>
    <div class="battery-stat ${warn ? "warn" : ""}">
      <div class="val">${r.remaining} km</div>
      <div class="lbl">Reserve am Ende</div>
    </div>
  `;
}

let leafletMapInstance = null;
function initLeafletMap() {
  const mapEl = document.getElementById("leaflet-map");
  if (!mapEl || typeof L === "undefined") return;
  const dest = activeDest();
  const weg = activeWeg();
  const startPt = [dest.start.lat, dest.start.lon];
  const endPt = weg ? [weg.start.lat, weg.start.lon] : [dest.start.lat, dest.start.lon];

  if (leafletMapInstance) { leafletMapInstance.remove(); leafletMapInstance = null; }
  leafletMapInstance = L.map(mapEl, { zoomControl: false, attributionControl: false }).fitBounds([startPt, endPt], { padding: [30, 30] });
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 18,
    attribution: "&copy; OpenStreetMap"
  }).addTo(leafletMapInstance);

  L.marker(startPt).addTo(leafletMapInstance).bindPopup("Start: " + dest.start.name);
  L.marker(endPt).addTo(leafletMapInstance).bindPopup("Ziel: " + (weg ? weg.start.name : dest.name));
  L.polyline([startPt, endPt], { color: "#e8546b", weight: 3, dashArray: "6 6" }).addTo(leafletMapInstance);
}

/* ---------- 8.2 TAGESPLAN ---------- */
function renderTagesplan(main) {
  const dest = activeDest();
  main.appendChild(el(`<h2 class="section-title">🗓️ Tagesplan — ${dest.name}</h2>`));
  const card = el(`<div class="card"><div class="timeline" id="timeline"></div></div>`);
  main.appendChild(card);
  const timeline = card.querySelector("#timeline");
  dest.zeitplanVorlage.forEach(item => {
    timeline.appendChild(el(`
      <div class="timeline-item">
        <div class="timeline-time">${item.zeit}</div>
        <div class="timeline-title">${item.titel}</div>
        <div class="timeline-desc">${item.beschreibung}</div>
      </div>
    `));
  });
}

/* ---------- 8.3 ZWERGENWEG INFOS ---------- */
function renderZwergenweg(main) {
  const dest = activeDest();
  const wege = dest.ziele;

  // Umschalter
  const toggle = el(`
    <div class="toggle-group">
      ${Object.values(wege).map(w => `
        <button class="toggle-option ${w.id === state.activeWegId ? "active" : ""}" data-weg="${w.id}">${w.titel.split(" (")[0]}</button>
      `).join("")}
    </div>
  `);
  main.appendChild(toggle);
  toggle.querySelectorAll(".toggle-option").forEach(btn => {
    btn.addEventListener("click", () => {
      state.activeWegId = btn.dataset.weg;
      saveJSON(STORAGE_KEYS.activeWeg, state.activeWegId);
      renderApp();
      fetchWeather();
    });
  });

  const weg = activeWeg();

  main.appendChild(el(`
    <div class="card card-forest">
      <h2>🚏 ${weg.titel}</h2>
      <div class="info-grid">
        <div class="info-item"><div class="lbl">Start</div><div class="val">${weg.start.name} · ${weg.start.hoehe} m</div></div>
        <div class="info-item"><div class="lbl">Ziel</div><div class="val">${weg.ziel.name} · ${weg.ziel.hoehe} m</div></div>
        <div class="info-item"><div class="lbl">Länge</div><div class="val">${weg.laengeKm} km</div></div>
        <div class="info-item"><div class="lbl">Dauer</div><div class="val">ca. ${Math.round(weg.dauerMin/60*10)/10} Std.</div></div>
        <div class="info-item"><div class="lbl">Abstieg</div><div class="val">${weg.abstiegHm} Hm</div></div>
        <div class="info-item"><div class="lbl">Altersempfehlung</div><div class="val">${weg.alter}</div></div>
      </div>
      <p class="muted">${weg.kinderwagen ? "🛒 Kinderwagentauglich" : "🚫 Nicht kinderwagentauglich"} — ${weg.hinweis}</p>
      <p class="muted">📅 Saison: ${weg.saison}</p>
      <div class="link-row mt-8">
        <a href="${weg.link}" target="_blank" rel="noopener">Offizielle Wegseite ↗</a>
      </div>
    </div>
  `));

  // Tickets
  const ticketRows = weg.tickets.map(t => `
    <tr>
      <td>${t.ab}</td>
      <td>CHF ${t.erw}.–</td>
      <td>CHF ${t.halbtax}.–</td>
      <td>CHF ${t.kind}.–</td>
    </tr>
  `).join("");
  main.appendChild(el(`
    <div class="card card-sand">
      <h2>🎟️ Ticketpreise</h2>
      <table class="price-table">
        <thead><tr><th>Ab</th><th>Erwachsene</th><th>Halbtax/GA</th><th>Kinder 6–16</th></tr></thead>
        <tbody>${ticketRows}</tbody>
      </table>
      <p class="muted mt-8">Unter 6 Jahren gratis · Geburtstagskind jeden Alters gratis (mit Ausweis)</p>
    </div>
  `));

  // Spielplatz
  const sp = dest.spielplatz;
  main.appendChild(el(`
    <div class="card">
      <h2>🛝 ${sp.name}</h2>
      <p>${sp.beschreibung}</p>
      <p class="muted">${sp.erreichbar}</p>
      <div class="link-row mt-8"><a href="${sp.link}" target="_blank" rel="noopener">Mehr erfahren ↗</a></div>
    </div>
  `));

  // Betriebsstatus
  const b = dest.betrieb;
  main.appendChild(el(`
    <div class="card card-sky">
      <div class="flex-between">
        <h2>ℹ️ Betriebsstatus</h2>
        <span class="badge badge-live">Saison aktiv</span>
      </div>
      <p class="muted">${b.saison}</p>
      <p class="muted">📞 ${b.telefon}</p>
      <div class="link-row mt-8"><a href="${b.link}" target="_blank" rel="noopener">Heute offen? ↗</a></div>
    </div>
  `));
}

/* ---------- 8.4 KINDER-MODUS ---------- */
function renderKidsMode(main) {
  const weg = activeWeg();
  const wegScore = state.scores[weg.id] || { foundStations: [] };
  const points = wegScore.foundStations.length * 10;

  main.appendChild(el(`
    <div class="score-badge">
      <span>⭐ Zwergenpunkte — ${weg.titel.split(" (")[0]}</span>
      <span class="points">${points} P</span>
    </div>
  `));

  const grid = el(`<div id="stations-grid"></div>`);
  main.appendChild(grid);

  weg.stationen.forEach((s, idx) => {
    const found = wegScore.foundStations.includes(idx);
    const btn = el(`
      <button class="zwerg-btn ${found ? "found" : ""}" data-idx="${idx}">
        <span><span class="icon">${s.emoji}</span> ${s.name}</span>
        ${!found ? '<span class="muted">antippen</span>' : ""}
      </button>
    `);
    btn.addEventListener("click", () => toggleStation(weg.id, idx, btn));
    grid.appendChild(btn);
  });

  main.appendChild(el(`
    <button class="btn btn-ghost btn-block mt-14" id="reset-score">↺ Punkte für diesen Weg zurücksetzen</button>
  `));
  document.getElementById("reset-score").addEventListener("click", () => {
    if (confirm("Punkte für diesen Zwergenweg wirklich zurücksetzen?")) {
      state.scores[weg.id] = { foundStations: [] };
      saveJSON(STORAGE_KEYS.scores, state.scores);
      renderApp();
    }
  });
}

function toggleStation(wegId, idx, btnEl) {
  if (!state.scores[wegId]) state.scores[wegId] = { foundStations: [] };
  const arr = state.scores[wegId].foundStations;
  const pos = arr.indexOf(idx);
  if (pos === -1) {
    arr.push(idx);
    btnEl.classList.add("found", "just-found");
    toast("Zwerg gefunden! +10 Punkte 🎉");
    setTimeout(() => btnEl.classList.remove("just-found"), 400);
  } else {
    arr.splice(pos, 1);
    btnEl.classList.remove("found");
  }
  saveJSON(STORAGE_KEYS.scores, state.scores);
  // update score badge without full rerender for smoothness
  const points = arr.length * 10;
  const badge = document.querySelector(".score-badge .points");
  if (badge) badge.textContent = points + " P";
  const label = btnEl.querySelector("span.muted");
  if (pos === -1) { if (label) label.remove(); }
}

/* ---------- 8.5 FAMILIENKALENDER ---------- */
function renderKalender(main) {
  main.appendChild(el(`<h2 class="section-title">🗓️ Familienkalender</h2>`));

  const destOptions = Object.values(DESTINATIONS).map(d => `<option value="${d.name}">${d.name}</option>`).join("");
  const form = el(`
    <div class="card">
      <h2>➕ Neuer Ausflug</h2>
      <div class="field">
        <label>Ziel</label>
        <select id="kal-ziel">
          ${destOptions}
          <option value="__custom">Anderes Ziel…</option>
        </select>
      </div>
      <div class="field" id="kal-ziel-custom-wrap" style="display:none;">
        <label>Ziel (frei)</label>
        <input type="text" id="kal-ziel-custom" placeholder="z.B. Technorama Winterthur">
      </div>
      <div class="field">
        <label>Datum</label>
        <input type="date" id="kal-datum">
      </div>
      <div class="field">
        <label>Notizen</label>
        <textarea id="kal-notizen" placeholder="z.B. Picknick nicht vergessen"></textarea>
      </div>
      <button class="btn btn-primary btn-block" id="kal-add">Ausflug speichern</button>
    </div>
  `);
  main.appendChild(form);

  form.querySelector("#kal-ziel").addEventListener("change", (e) => {
    form.querySelector("#kal-ziel-custom-wrap").style.display = e.target.value === "__custom" ? "block" : "none";
  });
  form.querySelector("#kal-add").addEventListener("click", () => {
    let ziel = form.querySelector("#kal-ziel").value;
    if (ziel === "__custom") ziel = form.querySelector("#kal-ziel-custom").value.trim();
    const datum = form.querySelector("#kal-datum").value;
    const notizen = form.querySelector("#kal-notizen").value.trim();
    if (!ziel || !datum) { toast("Bitte Ziel und Datum angeben"); return; }
    state.kalender.push({ id: Date.now(), ziel, datum, notizen });
    state.kalender.sort((a, b) => new Date(a.datum) - new Date(b.datum));
    saveJSON(STORAGE_KEYS.kalender, state.kalender);
    toast("Ausflug gespeichert 🎉");
    renderApp();
  });

  main.appendChild(el(`<h2 class="section-title">📋 Geplante & vergangene Ausflüge</h2>`));
  if (state.kalender.length === 0) {
    main.appendChild(el(`<div class="empty-state"><span class="emoji">🗺️</span>Noch keine Ausflüge geplant.</div>`));
    return;
  }
  const list = el(`<div></div>`);
  main.appendChild(list);
  state.kalender.forEach(item => {
    const past = isPast(item.datum);
    const row = el(`
      <div class="list-item ${past ? "past" : ""}">
        <div>
          <div class="title">${item.ziel}</div>
          <div class="meta">${fmtDate(item.datum)}${item.notizen ? " · " + item.notizen : ""}</div>
        </div>
        <button class="delete-btn" data-id="${item.id}">🗑️</button>
      </div>
    `);
    row.querySelector(".delete-btn").addEventListener("click", () => {
      state.kalender = state.kalender.filter(x => x.id !== item.id);
      saveJSON(STORAGE_KEYS.kalender, state.kalender);
      renderApp();
    });
    list.appendChild(row);
  });
}

/* ---------- 8.6 FOTO-TAGEBUCH ---------- */
function renderTagebuch(main) {
  main.appendChild(el(`<h2 class="section-title">📖 Foto-Tagebuch</h2>`));

  let currentRating = 5;
  const form = el(`
    <div class="card">
      <h2>➕ Neuer Eintrag</h2>
      <div class="field">
        <label>Datum</label>
        <input type="date" id="tb-datum">
      </div>
      <div class="field">
        <label>Ziel</label>
        <input type="text" id="tb-ziel" placeholder="z.B. Mägisalp – Bidmi">
      </div>
      <div class="field">
        <label>Schönster Moment</label>
        <textarea id="tb-text" placeholder="Was hat euch heute am meisten gefreut?"></textarea>
      </div>
      <div class="field">
        <label>Bewertung</label>
        <div class="stars" id="tb-stars"></div>
      </div>
      <button class="btn btn-primary btn-block" id="tb-add">Eintrag speichern</button>
    </div>
  `);
  main.appendChild(form);

  const starsWrap = form.querySelector("#tb-stars");
  function drawStars() {
    starsWrap.innerHTML = "";
    for (let i = 1; i <= 5; i++) {
      const s = el(`<span class="star ${i <= currentRating ? "filled" : ""}">★</span>`);
      s.addEventListener("click", () => { currentRating = i; drawStars(); });
      starsWrap.appendChild(s);
    }
  }
  drawStars();

  form.querySelector("#tb-add").addEventListener("click", () => {
    const datum = form.querySelector("#tb-datum").value;
    const ziel = form.querySelector("#tb-ziel").value.trim();
    const text = form.querySelector("#tb-text").value.trim();
    if (!datum || !ziel) { toast("Bitte Datum und Ziel angeben"); return; }
    state.tagebuch.unshift({ id: Date.now(), datum, ziel, text, rating: currentRating });
    saveJSON(STORAGE_KEYS.tagebuch, state.tagebuch);
    toast("Erinnerung gespeichert 📖");
    renderApp();
  });

  main.appendChild(el(`<h2 class="section-title">📚 Erinnerungen</h2>`));
  if (state.tagebuch.length === 0) {
    main.appendChild(el(`<div class="empty-state"><span class="emoji">📷</span>Noch keine Erinnerungen gespeichert.</div>`));
    return;
  }
  const list = el(`<div></div>`);
  main.appendChild(list);
  state.tagebuch.forEach(entry => {
    const row = el(`
      <div class="card">
        <div class="flex-between">
          <div class="title">${entry.ziel}</div>
          <button class="delete-btn" data-id="${entry.id}">🗑️</button>
        </div>
        <div class="meta muted">${fmtDate(entry.datum)} · ${"★".repeat(entry.rating)}${"☆".repeat(5 - entry.rating)}</div>
        ${entry.text ? `<p class="mt-8">${entry.text}</p>` : ""}
      </div>
    `);
    row.querySelector(".delete-btn").addEventListener("click", () => {
      state.tagebuch = state.tagebuch.filter(x => x.id !== entry.id);
      saveJSON(STORAGE_KEYS.tagebuch, state.tagebuch);
      renderApp();
    });
    list.appendChild(row);
  });
}

/* ---------- 8.7 PACKLISTE ---------- */
function renderPackliste(main) {
  main.appendChild(el(`<h2 class="section-title">🎒 Packliste</h2>`));
  const done = state.packliste.filter(i => i.checked).length;
  const pct = Math.round((done / state.packliste.length) * 100);

  const progressCard = el(`
    <div class="card card-sand">
      <div class="flex-between">
        <b>${done} / ${state.packliste.length} gepackt</b>
        <span>${pct}%</span>
      </div>
      <div class="progress-bar"><div class="progress-bar-fill" style="width:${pct}%"></div></div>
    </div>
  `);
  main.appendChild(progressCard);

  const list = el(`<div></div>`);
  main.appendChild(list);
  state.packliste.forEach(item => {
    const row = el(`
      <div class="check-item ${item.checked ? "checked" : ""}" data-id="${item.id}">
        <input type="checkbox" ${item.checked ? "checked" : ""}>
        <span class="check-label">${item.emoji} ${item.label}</span>
      </div>
    `);
    row.addEventListener("click", (e) => {
      item.checked = !item.checked;
      saveJSON(STORAGE_KEYS.packliste, state.packliste);
      renderApp();
    });
    list.appendChild(row);
  });

  main.appendChild(el(`<button class="btn btn-ghost btn-block mt-14" id="reset-pack">↺ Packliste zurücksetzen</button>`));
  document.getElementById("reset-pack").addEventListener("click", () => {
    state.packliste.forEach(i => i.checked = false);
    saveJSON(STORAGE_KEYS.packliste, state.packliste);
    renderApp();
  });
}

/* -----------------------------------------------------------
   9. TABBAR SETUP
   ----------------------------------------------------------- */
const TABS = [
  { id: "dashboard", label: "Start", icon: "🏠" },
  { id: "tagesplan", label: "Tagesplan", icon: "🗓️" },
  { id: "zwergenweg", label: "Zwergenweg", icon: "🧝" },
  { id: "kids", label: "Kinder", icon: "⭐" },
  { id: "kalender", label: "Kalender", icon: "📅" },
  { id: "tagebuch", label: "Tagebuch", icon: "📖" },
  { id: "packliste", label: "Packliste", icon: "🎒" }
];

function buildTabbar() {
  const nav = document.getElementById("tabbar");
  nav.innerHTML = "";
  TABS.forEach(t => {
    const btn = el(`
      <button class="tab-btn" data-tab="${t.id}">
        <span class="tab-icon">${t.icon}</span>
        <span>${t.label}</span>
      </button>
    `);
    btn.addEventListener("click", () => {
      state.tab = t.id;
      renderApp();
    });
    nav.appendChild(btn);
  });
}

/* -----------------------------------------------------------
   10. OFFLINE DETECTION
   ----------------------------------------------------------- */
function updateOnlineStatus() {
  const banner = document.getElementById("offline-banner");
  if (!navigator.onLine) {
    banner.textContent = "📡 Du bist offline — gespeicherte Inhalte sind weiterhin verfügbar.";
    banner.classList.add("show");
  } else {
    banner.classList.remove("show");
  }
}

/* -----------------------------------------------------------
   11. SERVICE WORKER REGISTRATION
   ----------------------------------------------------------- */
function registerServiceWorker() {
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("./service-worker.js").catch(err => {
        console.warn("Service Worker Registrierung fehlgeschlagen:", err);
      });
    });
  }
}

/* -----------------------------------------------------------
   12. INIT
   ----------------------------------------------------------- */
function init() {
  buildTabbar();
  renderApp();
  fetchWeather();
  updateOnlineStatus();
  window.addEventListener("online", updateOnlineStatus);
  window.addEventListener("offline", updateOnlineStatus);
  registerServiceWorker();
}

document.addEventListener("DOMContentLoaded", init);
