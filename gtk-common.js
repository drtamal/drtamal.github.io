(function () {
  const root = document.documentElement;
  const themeKey = "ui-theme";

  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    const toggle = document.getElementById("themeSwitch");
    if (toggle) toggle.checked = theme === "dark";
    try { localStorage.setItem(themeKey, theme); } catch (e) {}
  }

  function initThemeToggle() {
    const bar = document.querySelector(".cde-taskbar") || document.querySelector(".taskbar");
    if (!bar || document.getElementById("themeSwitch")) return;

    const wrap = document.createElement("div");
    wrap.className = "theme-toggle-wrap";
    wrap.innerHTML = '<label class="theme-toggle" for="themeSwitch">dark <input id="themeSwitch" type="checkbox" aria-label="Toggle dark mode"></label>';
    bar.appendChild(wrap);

    const saved = (function () {
      try { return localStorage.getItem(themeKey); } catch (e) { return null; }
    })();
    applyTheme(saved === "dark" ? "dark" : "light");

    const toggle = document.getElementById("themeSwitch");
    toggle.addEventListener("change", function () {
      applyTheme(toggle.checked ? "dark" : "light");
    });
  }

  function ensureEnvBox() {
    const bar = document.querySelector(".cde-taskbar") || document.querySelector(".taskbar");
    if (!bar) return null;

    const oldClock = document.getElementById("clock") || document.getElementById("taskbar-clock") || document.getElementById("cde-clock");
    const oldWeather = document.getElementById("weather") || document.getElementById("cde-weather");
    if (oldClock) oldClock.style.display = "none";
    if (oldWeather) oldWeather.style.display = "none";

    let box = document.getElementById("envBox");
    if (!box) {
      box = document.createElement("div");
      box.id = "envBox";
      box.className = "env-box";
      box.innerHTML = '<span class="env-time" id="envTime">--:--:--</span><span class="env-place" id="envPlace">Kolkata</span><span class="env-weather" id="envWeather">Loading...</span>';
      const themeWrap = bar.querySelector(".theme-toggle-wrap");
      if (themeWrap) {
        bar.insertBefore(box, themeWrap);
      } else {
        bar.appendChild(box);
      }
    }
    return box;
  }

  function updateClock() {
    const t = new Date().toLocaleTimeString("en-IN", { hour12: false });
    ["clock", "cde-clock", "taskbar-clock", "envTime"].forEach(function (id) {
      const el = document.getElementById(id);
      if (el) el.textContent = t;
    });
  }

  async function fetchWeather() {
    const city = "Kolkata,IN";
    const apiKey = "e739bc586a5e8b97f5844b552468f47c";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    try {
      const r = await fetch(url, { cache: "no-store" });
      const d = await r.json();
      if (d && Number(d.cod) === 200 && d.main && d.weather && d.weather[0]) {
        const text = `${d.main.temp.toFixed(1)} C - ${d.weather[0].description}`;
        ["cde-weather", "weather", "weather-inline", "envWeather"].forEach(function (id) {
          const el = document.getElementById(id);
          if (el) el.textContent = text;
        });
        return;
      }
    } catch (e) {}

    ["cde-weather", "weather", "weather-inline", "envWeather"].forEach(function (id) {
      const el = document.getElementById(id);
      if (el) el.textContent = "Weather unavailable";
    });
  }

  function applyContrastClasses() {
    document.querySelectorAll('a[href*="doi.org"], a[href*="slides/"], a[href$=".pdf"]').forEach(function (a) {
      a.classList.add("link-contrast");
    });
    document.querySelectorAll('span[onclick*="openModal"]').forEach(function (s) {
      s.classList.add("slide-contrast");
      s.setAttribute("role", "button");
      s.setAttribute("tabindex", "0");
      s.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          s.click();
        }
      });
    });
  }

  window.openModal = function (id) {
    const el = document.getElementById(id);
    if (el) el.style.display = "block";
  };

  window.closeModal = function (id) {
    const el = document.getElementById(id);
    if (el) el.style.display = "none";
  };

  window.addEventListener("click", function (e) {
    document.querySelectorAll(".modal").forEach(function (m) {
      if (e.target === m) m.style.display = "none";
    });
  });

  initThemeToggle();
  ensureEnvBox();
  applyContrastClasses();
  updateClock();
  fetchWeather();
  setInterval(updateClock, 1000);
  setInterval(fetchWeather, 600000);
})();
