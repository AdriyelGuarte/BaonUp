/* =========================================================
   rewards.js — Barya, stars and badges.

   Rewards.award(10)      give Barya (doubled during the festival)
   Rewards.spend(30)      take Barya; false if not enough
   Rewards.starsFor(8,10) how many stars for a score
   Rewards.checkBadges()  unlock any badges just earned
   ========================================================= */
(function () {
  const BADGES = [
    { id: "first",   icon: "🥇", name: "Unang Laro",   hint: "Tapusin ang first game" },
    { id: "perfect", icon: "🌟", name: "Perpekto",     hint: "Makakuha ng 3 stars" },
    { id: "streak",  icon: "⚡", name: "5 Sunod",      hint: "5 tama streak eyy" },
    { id: "rich",    icon: "💰", name: "Mayaman",      hint: "Mag-ipon ng 100 Barya" },
    { id: "shop",    icon: "🛍️", name: "Mamimili",     hint: "Bumili sa tindahan" },
    { id: "parol",   icon: "🏵️", name: "Parol Master", hint: "Kunin ang Gintong Parol" },
  ];

  // Give Barya. Returns the real amount given (2x during the festival).
  function award(base) {
    const amount = Festival.isActive() ? base * 2 : base;
    State.set({ barya: State.get().barya + amount });
    return amount;
  }

  function spend(price) {
    const s = State.get();
    if (s.barya < price) return false;
    State.set({ barya: s.barya - price });
    return true;
  }

  // 3 stars = perfect, 2 = 8 or more, 1 = 5 or more
  function starsFor(correct, total) {
    if (correct >= total) return 3;
    if (correct >= 8) return 2;
    if (correct >= 5) return 1;
    return 0;
  }

  // Total stars = the best score of every set added together
  function totalStars() {
    return Object.values(State.get().bestStars).reduce((sum, n) => sum + n, 0);
  }

  // Remember the best stars for one set, e.g. key = "reading2"
  function saveStars(key, stars) {
    const best = State.get().bestStars;
    if ((best[key] || 0) < stars) State.set({ bestStars: Object.assign({}, best, { [key]: stars }) });
  }

  // Unlock badges whose condition is now true. Returns the new ones.
  function checkBadges() {
    const s = State.get();
    const earned = {
      first: s.rounds >= 1,
      perfect: s.perfectRounds >= 1,
      streak: s.bestStreak >= 5,
      rich: s.barya >= 100,
      shop: s.owned.some((id) => id !== "gintongParol"),
      parol: s.owned.includes("gintongParol"),
    };
    const fresh = BADGES.filter((b) => earned[b.id] && !s.badges.includes(b.id));
    if (fresh.length) State.set({ badges: s.badges.concat(fresh.map((b) => b.id)) });
    return fresh;
  }

  window.Rewards = { BADGES, award, spend, starsFor, totalStars, saveStars, checkBadges };
})();
