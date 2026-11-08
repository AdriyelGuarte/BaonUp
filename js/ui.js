/* =========================================================
   ui.js — small helpers every page uses.

   UI.$("#id") / UI.$$(".class")   find elements
   UI.hydrateAll()                 load pictures marked data-src (with fallback)
   UI.renderBarya()                show the Barya number everywhere
   UI.toast("Hello")               little message at the bottom
   UI.openModal("id") / closeModal("id")
   UI.renderAvatar(el)             draw the child + equipped items
   UI.beep("good" | "bad" | "win") tiny sound effects
   ========================================================= */
(function () {
  const $ = (selector, root) => (root || document).querySelector(selector);
  const $$ = (selector, root) => Array.from((root || document).querySelectorAll(selector));

  /* ---------- Pictures with a fallback ----------
     Put the real image in `src`. If the file is missing, the fallback
     text/emoji is shown instead, so the page never looks broken. */
  function hydrate(el, src, fallback) {
    el.classList.add("art");
    el.textContent = "";
    const img = new Image();
    img.alt = "";
    img.draggable = false;
    img.onerror = function () {
      img.remove();
      el.classList.add("fallback");
      el.textContent = fallback || "";
    };
    img.src = src;
    el.appendChild(img);
  }

  // In HTML:  <span data-src="assets/images/barya.png" data-fallback="₱"></span>
  function hydrateAll(root) {
    $$("[data-src]", root).forEach((el) => {
      if (el.dataset.ready) return;
      el.dataset.ready = "1";
      hydrate(el, el.dataset.src, el.dataset.fallback);
    });
  }

  /* ---------- Barya ---------- */
  function renderBarya() {
    $$(".barya-count").forEach((el) => { el.textContent = State.get().barya; });
  }
  function bumpBarya() {
    $$(".barya-count").forEach((el) => {
      el.classList.remove("bump");
      void el.offsetWidth;            // restart the animation
      el.classList.add("bump");
    });
  }

  /* ---------- Toast ---------- */
  let toastTimer;
  function toast(message, ms) {
    let el = $("#toast");
    if (!el) {
      el = document.createElement("div");
      el.id = "toast";
      el.className = "toast";
      document.body.appendChild(el);
    }
    el.textContent = message;
    el.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove("show"), ms || 2000);
  }

  /* ---------- Modals ----------
     A modal is <div class="modal" id="x">. Any element inside with
     data-close closes it; so does clicking the dark background. */
  function openModal(id) { const m = document.getElementById(id); if (m) m.classList.add("open"); }
  function closeModal(id) { const m = document.getElementById(id); if (m) m.classList.remove("open"); }

  document.addEventListener("click", (event) => {
    const modal = event.target.closest(".modal");
    if (!modal) return;
    if (event.target === modal || event.target.closest("[data-close]")) modal.classList.remove("open");
  });

  /* ---------- Avatar ---------- */
  function renderAvatar(el) {
    const s = State.get();
    el.classList.add("avatar");
    el.textContent = "";

    const face = document.createElement("span");
    face.className = "avatar-face";
    hydrate(face, "assets/images/profilepic.jpg", "🧒");
    el.appendChild(face);

    ["head", "body", "badge"].forEach((slot) => {
      const item = s.equipped[slot] && getItem(s.equipped[slot]);
      if (!item) return;
      const span = document.createElement("span");
      span.className = "slot slot-" + slot + (item.golden ? " golden" : "");
      hydrate(span, item.img, item.icon);
      el.appendChild(span);
    });

    const frame = s.equipped.frame && getItem(s.equipped.frame);
    el.style.setProperty("--frame", frame ? frame.color : "#ffcf5c");
  }

  /* ---------- Misc ---------- */
  // Send first-time visitors to the landing page
  function requireSetup() {
    if (!State.isSetUp()) location.replace("index.html");
  }

  // Today as "YYYY-MM-DD" in the child's own time zone
  function today() {
    const d = new Date();
    const pad = (n) => String(n).padStart(2, "0");
    return d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate());
  }

  /* ---------- Sound (made in code, no files needed) ---------- */
  let audio;
  function tone(freq, start, length, type) {
    const osc = audio.createOscillator();
    const gain = audio.createGain();
    osc.type = type || "sine";
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0.18, audio.currentTime + start);
    gain.gain.exponentialRampToValueAtTime(0.001, audio.currentTime + start + length);
    osc.connect(gain);
    gain.connect(audio.destination);
    osc.start(audio.currentTime + start);
    osc.stop(audio.currentTime + start + length);
  }
  function beep(kind) {
    try {
      audio = audio || new (window.AudioContext || window.webkitAudioContext)();
      if (kind === "good") { tone(660, 0, 0.12); tone(880, 0.1, 0.2); }
      else if (kind === "bad") { tone(220, 0, 0.25, "triangle"); }
      else if (kind === "win") { tone(523, 0, 0.14); tone(659, 0.12, 0.14); tone(784, 0.24, 0.14); tone(1047, 0.36, 0.3); }
    } catch (err) { /* sound is optional */ }
  }

  window.UI = {
    $, $$, hydrate, hydrateAll,
    renderBarya, bumpBarya, toast,
    openModal, closeModal,
    renderAvatar, requireSetup, today, beep,
  };

  document.addEventListener("DOMContentLoaded", () => { hydrateAll(); renderBarya(); });
})();
