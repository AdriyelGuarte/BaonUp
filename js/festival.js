/* =========================================================
   festival.js — the Parol Festival (limited-time event).

   While it is active:
     - every correct answer earns a parol piece
     - every Barya reward is doubled (see rewards.js)
     - after 10 pieces the Gintong Parol is unlocked, kept forever

   Change the dates in CONFIG. To test without waiting, open any page
   with  ?festival=on   or   ?festival=off   in the URL
   (and ?festival=auto to go back to the real dates).
   ========================================================= */
(function () {
  const CONFIG = {
    name: "Parol Festival",
    start: "2026-11-01",
    end: "2026-11-30",
    needed: 10,
    itemId: "gintongParol",
  };
  const OVERRIDE_KEY = "baonup.festival";

  // Read ?festival=on|off|auto once, remember it
  try {
    const param = new URLSearchParams(location.search).get("festival");
    if (param === "on" || param === "off") localStorage.setItem(OVERRIDE_KEY, param);
    if (param === "auto") localStorage.removeItem(OVERRIDE_KEY);
  } catch (err) { /* ignore */ }

  function isActive() {
    let override = null;
    try { override = localStorage.getItem(OVERRIDE_KEY); } catch (err) { /* ignore */ }
    if (override === "on") return true;
    if (override === "off") return false;

    const now = new Date();
    const start = new Date(CONFIG.start + "T00:00:00");
    const end = new Date(CONFIG.end + "T23:59:59");
    return now >= start && now <= end;
  }

  function progress() {
    return Math.min(State.get().parolPieces, CONFIG.needed);
  }

  // Call this on every correct answer.
  // Returns { earned, pieces, completed }
  function earnPiece() {
    const s = State.get();
    if (!isActive() || s.parolPieces >= CONFIG.needed) {
      return { earned: false, pieces: progress(), completed: false };
    }

    const pieces = s.parolPieces + 1;
    const changes = { parolPieces: pieces };
    let completed = false;

    if (pieces >= CONFIG.needed && !s.owned.includes(CONFIG.itemId)) {
      changes.owned = s.owned.concat(CONFIG.itemId);   // unlock Gintong Parol
      completed = true;
    }
    State.set(changes);
    return { earned: true, pieces, completed };
  }

  window.Festival = { CONFIG, isActive, progress, earnPiece };
})();
