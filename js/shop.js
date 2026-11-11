/* =========================================================
   shop.js — the Sari-Sari Store.

   - ITEMS (js/data/items.js) are drawn as a 3×3 shelf
   - tap an item → confirm → Barya is taken and the item is owned
   - "Libreng Baon" is free once a day
   - "Gintong Parol" can only be earned in the Parol Festival
   - Aling Nena reacts with her speech bubble
   ========================================================= */
(function () {
  UI.requireSetup();
  if (!State.isSetUp()) return;

  const grid = UI.$("#items");
  const speech = UI.$("#speech");
  let pending = null;                 // the item waiting for "Oo, bilhin!"

  function say(text) { speech.textContent = text; }

  /* ---------- Draw the shelf ---------- */
  function render() {
    grid.textContent = "";
    ITEMS.forEach((item) => grid.appendChild(card(item)));
    UI.hydrateAll(grid);
    UI.renderBarya();
  }

  // Build one shelf cell and decide what its label says
  function card(item) {
    const s = State.get();
    const owned = State.has(item.id);
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "item";

    let label;                         // the pill under the name

    if (item.kind === "daily") {
      const claimed = s.lastDaily === UI.today();
      if (claimed) btn.classList.add("claimed");
      label = claimed ? "Bukas ulit" : "Free Daily";
    } else if (item.kind === "festival") {
      btn.classList.add("festival");
      if (owned) { btn.classList.add("owned"); label = "Nasa iyo na!"; }
      else if (Festival.isActive()) label = Festival.progress() + "/" + Festival.CONFIG.needed + " parol";
      else { btn.classList.add("gone"); label = "Hindi na available"; }
    } else if (owned) {
      btn.classList.add("owned");
      label = "Nabili na";
    } else {
      if (s.barya < item.price) btn.classList.add("cant");
    }

    const art = document.createElement("span");
    art.className = "item-art";
    art.dataset.src = item.img;
    art.dataset.fallback = item.icon;

    const name = document.createElement("span");
    name.className = "item-name";
    name.textContent = item.name;

    const pill = document.createElement("span");
    if (label) {
      pill.className = "price text";
      pill.textContent = label;
    } else {
      pill.className = "price";
      const coin = document.createElement("span");
      coin.className = "coin";
      coin.dataset.src = "assets/images/barya.png";
      coin.dataset.fallback = "₱";
      pill.appendChild(coin);
      pill.appendChild(document.createTextNode(String(item.price)));
    }

    btn.appendChild(art);
    btn.appendChild(name);
    btn.appendChild(pill);
    btn.addEventListener("click", () => onItem(item));
    return btn;
  }

  /* ---------- Tapping an item ---------- */
  function onItem(item) {
    const s = State.get();

    if (item.kind === "daily") { claimDaily(item); return; }

    if (item.kind === "festival") {
      if (State.has(item.id)) say("Ang ganda ng Gintong Parol mo! Isuot mo sa Profile.");
      else if (Festival.isActive()) say("Kumpletuhin mo ang " + Festival.CONFIG.needed + " piraso ng parol sa mga laro! " + Festival.progress() + " pa lang.");
      else say("Hindi na available ang Gintong Parol. Makukuha lang ito tuwing Parol Festival.");
      return;
    }

    if (State.has(item.id)) {
      say("Nasa iyo na ang " + item.name + "! Isuot mo sa Profile.");
      return;
    }

    if (s.barya < item.price) {
      say("Naku, kulang pa ang Barya mo. Maglaro ka muna!");
      UI.toast("Kulang ang Barya", 1600);
      return;
    }

    // ask first, so a mis-tap does not spend Barya
    pending = item;
    UI.hydrate(UI.$("#confirm-art"), item.img, item.icon);
    UI.$("#confirm-text").textContent = item.name + " para sa " + item.price + " Barya?";
    UI.openModal("confirm");
  }

  /* ---------- Buy ---------- */
  UI.$("#confirm-yes").addEventListener("click", () => {
    UI.closeModal("confirm");
    if (!pending) return;
    const item = pending;
    pending = null;

    if (!Rewards.spend(item.price)) { say("Naku, kulang ang Barya mo."); render(); return; }

    State.set({ owned: State.get().owned.concat(item.id) });
    say("Salamat sa pagbili ng " + item.name + "! Ingatan mo, ha.");
    UI.toast("Nabili: " + item.name + " (−" + item.price + ")");
    UI.beep("good");

    const badges = Rewards.checkBadges();
    if (badges.length) UI.toast("Bagong badge: " + badges[0].icon + " " + badges[0].name, 2600);
    render();
    UI.bumpBarya();
  });

  /* ---------- Free daily item ---------- */
  function claimDaily(item) {
    if (State.get().lastDaily === UI.today()) {
      say("Naibigay ko na ang libre mo ngayon, anak. Balik ka bukas!");
      return;
    }
    State.set({ barya: State.get().barya + DAILY_REWARD, lastDaily: UI.today() });
    say("O heto ang " + item.name + "! May dagdag na " + DAILY_REWARD + " Barya ka.");
    UI.toast("+" + DAILY_REWARD + " Barya (libre ngayong araw)");
    UI.beep("good");
    const badges = Rewards.checkBadges();
    if (badges.length) UI.toast("Bagong badge: " + badges[0].icon + " " + badges[0].name, 2600);
    render();
    UI.bumpBarya();
  }

  /* ---------- Go ---------- */
  render();
})();
