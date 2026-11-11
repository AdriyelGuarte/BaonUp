/* =========================================================
   home.js — the lunchbox homepage.

   Cards are plain links (Reading, Math, Profile, Store), so they
   work without JS. This file fills in what changes per child:
   name, grade, Barya, avatar, and the Parol Festival progress.
   ========================================================= */
(function () {
  UI.requireSetup();
  if (!State.isSetUp()) return;

  const s = State.get();

  /* ---------- Header + greeting ---------- */
  UI.$("#grade-label").textContent = s.grade;
  UI.$("#greeting").textContent = "Kumusta, " + s.nickname + "! Ano'ng lalaruin natin ngayon?";
  UI.$("#home-nickname").textContent = s.nickname;
  UI.renderAvatar(UI.$("#home-avatar"));

  /* ---------- Grade picker ---------- */
  UI.$("#grade-btn").addEventListener("click", () => {
    UI.$$(".grade-big").forEach((btn) => {
      btn.classList.toggle("current", Number(btn.dataset.grade) === State.get().grade);
    });
    UI.openModal("level");
  });

  UI.$$(".grade-big").forEach((btn) => {
    btn.addEventListener("click", () => {
      const grade = Number(btn.dataset.grade);
      State.set({ grade: grade });
      UI.$("#grade-label").textContent = grade;
      UI.closeModal("level");
      UI.toast("Grade " + grade + " na ang mga tanong!");
    });
  });

  /* ---------- Parol Festival tile ---------- */
  const needed = Festival.CONFIG.needed;
  const active = Festival.isActive();
  const pieces = Festival.progress();
  const golden = State.has(Festival.CONFIG.itemId);

  // draw the 10 lanterns (lit = collected)
  const row = UI.$("#pieces");
  for (let i = 0; i < needed; i++) {
    const lantern = document.createElement("span");
    lantern.className = "piece" + (i < pieces ? " on" : "");
    lantern.textContent = "🏵️";
    row.appendChild(lantern);
  }
  UI.$("#pieces-label").textContent = golden ? "Kumpleto! 🎉" : pieces + " / " + needed + " piraso";

  const eventText = UI.$("#event-text");
  const eventTag = UI.$("#event-tag");
  const body = UI.$("#festival-body");

  if (active) {
    eventText.textContent = "Double Barya at parol sa bawat tamang sagot!";
    body.textContent = golden
      ? "Kumpleto na ang parol mo! Nasa Tindahan na ang Gintong Parol, sa iyo na ito habang buhay."
      : "Sa bawat tamang sagot, may double Barya at isang piraso ng parol. Kumpletuhin ang " + needed +
        " piraso para makuha ang Gintong Parol! Mayroon ka nang " + pieces + ".";
  } else {
    UI.$("#event").classList.add("ended");
    eventTag.textContent = "TAPOS NA";
    eventText.textContent = golden ? "Nasa iyo ang Gintong Parol!" : "Hindi na available";
    body.textContent = golden
      ? "Salamat sa paglahok! Sa iyo na ang Gintong Parol habang buhay."
      : "Tapos na ang Parol Festival. Ang Gintong Parol ay makukuha lang tuwing Parol Festival.";
    UI.$("#festival-play").classList.add("hidden");
  }

  // The event tile opens the info pop-up instead of leaving the page
  UI.$("#event").addEventListener("click", (event) => {
    event.preventDefault();
    UI.openModal("festival");
  });

  /* ---------- Side widgets ---------- */

  // Tarsier: greeting by time of day
  const hour = new Date().getHours();
  const hello =
    hour < 12 ? "Magandang umaga!" :
    hour < 18 ? "Magandang hapon!" :
                "Magandang gabi!";
  UI.$("#tarsier-greeting").textContent = hello;

  // Salita ng Araw: one word per day, same all day
  const WORDS = [
    { word: "Bahay",    meaning: "House",     sentence: "Malaki ang bahay namin." },
    { word: "Aklat",    meaning: "Book",      sentence: "Binasa ko ang aklat kagabi." },
    { word: "Kaibigan", meaning: "Friend",    sentence: "Mabait ang kaibigan ko." },
    { word: "Masaya",   meaning: "Happy",     sentence: "Masaya akong maglaro." },
    { word: "Paaralan", meaning: "School",    sentence: "Pumunta kami sa paaralan." },
    { word: "Pagkain",  meaning: "Food",      sentence: "Masarap ang pagkain ni Nanay." },
    { word: "Araw",     meaning: "Sun / Day", sentence: "Maliwanag ang araw ngayon." },
  ];
  const dayNumber = Math.floor(new Date().setHours(0, 0, 0, 0) / 86400000);
  const pick = WORDS[dayNumber % WORDS.length];
  UI.$("#word").textContent = pick.word;
  UI.$("#word-meaning").textContent = pick.meaning;
  UI.$("#word-sentence").textContent = pick.sentence;
})();