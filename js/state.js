/* =========================================================
   state.js — the one object that remembers the child's progress.

   Everything is saved in the browser's localStorage, so it survives
   a refresh. Every page reads from here, nobody keeps its own copy.

   Use it like this:
     State.get().barya              read a value
     State.set({ barya: 50 })       change values (and save)
     State.has("salakot")           does the child own this item?
     State.reset()                  wipe everything (testing)

   Handy while testing (browser console):
     State.set({ barya: 500 })
   ========================================================= */
(function () {
  const KEY = "baonup.v1";

  // What a brand-new player looks like
  function defaults() {
    return {
      nickname: "",
      grade: null,                // 1, 2 or 3 (null = not chosen yet)
      barya: 0,                   // money
      rounds: 0,                  // finished rounds
      perfectRounds: 0,
      bestStreak: 0,              // most right-in-a-row on first try
      bestStars: {},              // e.g. { reading1: 3, math2: 2 }
      owned: [],                  // item ids bought or earned
      equipped: { head: null, body: null, badge: null, frame: null },
      badges: [],                 // badge ids unlocked
      parolPieces: 0,             // Parol Festival progress (0-10)
      lastDaily: null,            // "YYYY-MM-DD" of the last free claim
    };
  }

  function load() {
    try {
      const raw = localStorage.getItem(KEY);
      if (!raw) return defaults();
      const saved = JSON.parse(raw);
      const base = defaults();
      return Object.assign(base, saved, {
        equipped: Object.assign(base.equipped, saved.equipped || {}),
      });
    } catch (err) {
      return defaults();          // broken or blocked storage: start fresh
    }
  }

  let data = load();

  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(data)); } catch (err) { /* ignore */ }
  }

  window.State = {
    get() { return data; },
    set(changes) { Object.assign(data, changes); save(); },
    save,
    reset() { data = defaults(); save(); },
    has(itemId) { return data.owned.includes(itemId); },
    isSetUp() { return Boolean(data.nickname) && Boolean(data.grade); },
  };
})();
