/* =========================================================
   profile.js — "Ang Profile Ko".

   - avatar shows whatever the child has equipped
   - nickname can be edited
   - grade can be changed
   - badges show locked / unlocked
   - closet lists owned items; tap to wear, tap again to take off
   ========================================================= */
(function () {
  UI.requireSetup();
  if (!State.isSetUp()) return;

  /* ---------- Stats + nickname + grade ---------- */
  function renderStats() {
    const s = State.get();
    UI.$("#nick-text").textContent = s.nickname;
    UI.$("#nick-input").value = s.nickname;
    UI.$("#stat-barya").textContent = s.barya;
    UI.$("#stat-stars").textContent = Rewards.totalStars();
    UI.$("#stat-rounds").textContent = s.rounds;
    UI.$$(".gpill").forEach((p) => {
      p.setAttribute("aria-pressed", String(Number(p.dataset.grade) === s.grade));
    });
    UI.renderBarya();
  }

  UI.$("#btn-edit").addEventListener("click", () => {
    UI.$("#nick-view").classList.add("hidden");
    UI.$("#nick-edit").classList.remove("hidden");
    UI.$("#nick-input").focus();
    UI.$("#nick-input").select();
  });

  function saveNickname() {
    const value = UI.$("#nick-input").value.trim();
    if (!value) { UI.toast("Isulat ang nickname mo."); return; }
    State.set({ nickname: value });
    UI.$("#nick-edit").classList.add("hidden");
    UI.$("#nick-view").classList.remove("hidden");
    renderStats();
    UI.toast("Na-save ang nickname!");
  }
  UI.$("#btn-save").addEventListener("click", saveNickname);
  UI.$("#nick-input").addEventListener("keydown", (e) => { if (e.key === "Enter") saveNickname(); });

  UI.$$(".gpill").forEach((pill) => {
    pill.addEventListener("click", () => {
      State.set({ grade: Number(pill.dataset.grade) });
      renderStats();
      UI.toast("Grade " + pill.dataset.grade + " na ang mga tanong!");
    });
  });

  /* ---------- Badges ---------- */
  function renderBadges() {
    const box = UI.$("#badges");
    box.textContent = "";
    Rewards.BADGES.forEach((b) => {
      const unlocked = State.get().badges.includes(b.id);
      const el = document.createElement("div");
      el.className = "badge" + (unlocked ? "" : " locked");
      el.title = unlocked ? b.name : b.hint;

      const icon = document.createElement("span");
      icon.className = "icon";
      icon.textContent = unlocked ? b.icon : "🔒";

      const name = document.createElement("strong");
      name.textContent = b.name;

      const hint = document.createElement("span");
      hint.textContent = unlocked ? "Naka-unlock!" : b.hint;

      el.appendChild(icon);
      el.appendChild(name);
      el.appendChild(hint);
      box.appendChild(el);
    });
  }

  /* ---------- Closet (equip / unequip) ---------- */
  function renderCloset() {
    const s = State.get();
    const box = UI.$("#closet");
    box.textContent = "";

    const owned = s.owned.map(getItem).filter((item) => item && item.slot);
    owned.forEach((item) => {
      const equipped = s.equipped[item.slot] === item.id;
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "thing" + (equipped ? " equipped" : "");

      const icon = document.createElement("span");
      icon.className = "icon" + (item.golden ? " golden" : "");
      icon.dataset.src = item.img;
      icon.dataset.fallback = item.icon;

      const name = document.createElement("span");
      name.textContent = item.name;

      btn.appendChild(icon);
      btn.appendChild(name);
      btn.addEventListener("click", () => toggleEquip(item));
      box.appendChild(btn);
    });

    // empty shelf spots so the box never looks bare
    for (let i = owned.length; i < 6; i++) {
      const empty = document.createElement("div");
      empty.className = "thing empty";
      empty.textContent = "Wala pa";
      box.appendChild(empty);
    }
    UI.hydrateAll(box);
  }

  // Wearing an item replaces whatever was in the same slot
  function toggleEquip(item) {
    const equipped = Object.assign({}, State.get().equipped);
    if (equipped[item.slot] === item.id) {
      equipped[item.slot] = null;
      UI.toast("Tinanggal: " + item.name);
    } else {
      equipped[item.slot] = item.id;
      UI.toast("Naisuot: " + item.name);
    }
    State.set({ equipped: equipped });
    UI.renderAvatar(UI.$("#avatar"));
    renderCloset();
  }

  /* ---------- Reset ---------- */
  UI.$("#btn-reset").addEventListener("click", () => UI.openModal("reset"));
  UI.$("#reset-yes").addEventListener("click", () => {
    State.reset();
    location.href = "index.html";
  });

  /* ---------- Go ---------- */
  UI.renderAvatar(UI.$("#avatar"));
  renderStats();
  renderBadges();
  renderCloset();
})();
