/* =========================================================
   quiz.js — the conversational quiz (Reading and Math).

   Open it as  quiz.html?subject=reading  or  quiz.html?subject=math
   It picks the 10 questions for the child's grade, then loops:

     1. render()        draw the teacher's message, the blank, 4 choices
     2. selectChoice()  the child taps a choice (fills the blank)
     3. onCheck()       Check: right → Barya, wrong → try once more
     4. goNext()        next question, or showResults() after 10

   Barya is saved after every answer, so quitting never loses it.
   ========================================================= */
(function () {
  UI.requireSetup();
  if (!State.isSetUp()) return;

  /* ---------- Setup ---------- */
  const params = new URLSearchParams(location.search);
  const subject = params.get("subject") === "math" ? "math" : "reading";
  const grade = State.get().grade;
  const bank = (subject === "math" ? MATH_QUESTIONS : READING_QUESTIONS)[grade] || [];

  const TYPE_LABELS = {
    word: "SALITA", grammar: "BALARILA", meaning: "KAHULUGAN",    // reading
    ops: "OPERASYON", story: "KUWENTO", pattern: "PATTERN",       // math
  };

  // The 3 teachers take turns. Put their pictures in assets/images/
  const TEACHERS = [
    { name: "Tarsi",   img: "assets/images/tarsier.png", letter: "Ts", color: "#ffe6bd" },
    { name: "Agila",   img: "assets/images/eagle.png",   letter: "Ag", color: "#cfe5fb" },
    { name: "Tamaraw", img: "assets/images/tamaraw.png", letter: "Tm", color: "#d9f0c2" },
  ];

  function shuffle(list) {
    const copy = list.slice();
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  // Add the teacher and shuffle the 4 choices for each question
  const questions = bank.map((q, i) => Object.assign({}, q, {
    teacher: TEACHERS[i % TEACHERS.length],
    choices: shuffle([q.correct].concat(q.options)),
  }));

  /* ---------- Round state ---------- */
  const S = {
    index: 0,
    selected: null,       // index of the tapped choice
    attempts: 0,          // 0 = first try, 1 = already retried
    locked: false,        // true once the answer is final
    correct: 0,           // right on the FIRST try
    streak: 0,
    bestStreak: 0,
    earned: 0,            // Barya earned this round
    pieces: 0,            // parol pieces earned this round
    finished: false,
  };

  const stage = UI.$("#stage");
  const footer = UI.$("#footer");
  const feedback = UI.$("#feedback");
  const checkBtn = UI.$("#check");

  /* ---------- Tiny DOM helper ---------- */
  function make(tag, className, text) {
    const el = document.createElement(tag);
    if (className) el.className = className;
    if (text !== undefined) el.textContent = text;
    return el;
  }

  /* ---------- 1. Draw a question ---------- */
  function render() {
    const q = questions[S.index];
    stage.textContent = "";

    UI.$("#counter").textContent = (S.index + 1) + "/" + questions.length;
    UI.$("#fill").style.width = (S.index / questions.length * 100) + "%";

    stage.appendChild(make("span", "q-tag", TYPE_LABELS[q.type] || "TANONG"));

    // chat: teacher on the left ...
    const chat = make("div", "chat");
    const teacherRow = make("div", "msg msg-teacher");
    const avatar = make("div", "teacher");
    avatar.style.background = q.teacher.color;
    avatar.title = q.teacher.name;
    UI.hydrate(avatar, q.teacher.img, q.teacher.letter);
    teacherRow.appendChild(avatar);
    teacherRow.appendChild(make("div", "bubble bubble-teacher", q.msg));
    chat.appendChild(teacherRow);

    // ... the child's reply on the right, with the blank
    const meRow = make("div", "msg msg-me");
    const meBubble = make("div", "bubble bubble-me");
    meBubble.appendChild(document.createTextNode(q.before + " "));
    meBubble.appendChild(make("span", "blank"));
    if (q.after) meBubble.appendChild(document.createTextNode(" " + q.after));
    meBubble.querySelector(".blank").id = "blank";
    meRow.appendChild(meBubble);
    chat.appendChild(meRow);
    stage.appendChild(chat);

    // four choices
    const choices = make("div", "choices");
    q.choices.forEach((text, i) => {
      const btn = make("button", "choice", text);
      btn.type = "button";
      btn.dataset.i = i;
      btn.addEventListener("click", () => selectChoice(i));
      choices.appendChild(btn);
    });
    stage.appendChild(choices);

    // reset the bottom bar
    footer.className = "q-footer";
    feedback.textContent = "Piliin ang tamang sagot.";
    setCheck("Check", false);
  }

  /* ---------- 2. Tap a choice ---------- */
  function selectChoice(i) {
    if (S.locked) return;
    const buttons = UI.$$(".choice");
    if (buttons[i].disabled) return;

    S.selected = i;
    buttons.forEach((b) => b.classList.remove("selected"));
    buttons[i].classList.add("selected");

    const blank = UI.$("#blank");
    blank.textContent = questions[S.index].choices[i];
    blank.classList.add("filled");

    setCheck("Check", true);
  }

  /* ---------- 3. Check button ---------- */
  function onCheck() {
    if (S.finished) return;
    if (S.locked) { goNext(); return; }       // after answering, the button says Next
    if (S.selected === null) return;

    const q = questions[S.index];
    const buttons = UI.$$(".choice");
    const picked = buttons[S.selected];
    const isRight = q.choices[S.selected] === q.correct;

    if (isRight) {
      picked.classList.remove("selected");
      picked.classList.add("correct");
      buttons.forEach((b) => { b.disabled = true; });
      S.locked = true;

      // Barya: 10 on the first try, 5 on the retry (doubled in the festival)
      const got = Rewards.award(S.attempts === 0 ? 10 : 5);
      S.earned += got;
      UI.renderBarya();
      UI.bumpBarya();

      // streak counts first-try answers only
      if (S.attempts === 0) {
        S.correct++;
        S.streak++;
        S.bestStreak = Math.max(S.bestStreak, S.streak);
      } else {
        S.streak = 0;
      }

      // Parol Festival: a piece for every correct answer
      const piece = Festival.earnPiece();
      let sub = "+" + got + " Barya";
      if (piece.earned) {
        S.pieces++;
        sub += "  ·  +1 parol (" + piece.pieces + "/" + Festival.CONFIG.needed + ")";
      }
      if (Festival.isActive()) sub += "  ·  Double Barya!";

      UI.beep("good");
      showFeedback("good", "Tama!", sub);
      setCheck(isLast() ? "Tingnan ang resulta" : "Next", true, "next");
      if (piece.completed) { UI.openModal("golden"); UI.beep("win"); }
      return;
    }

    // Wrong answer
    picked.classList.remove("selected");
    picked.classList.add("wrong");
    picked.disabled = true;
    UI.beep("bad");

    if (S.attempts === 0) {
      // first miss: one more try
      S.attempts = 1;
      S.selected = null;
      UI.$("#blank").textContent = "";
      UI.$("#blank").classList.remove("filled");
      showFeedback("try", "Subukan ulit!", "Pumili ulit ng sagot.");
      setCheck("Check", false);
      return;
    }

    // second miss: show the right answer
    S.streak = 0;
    S.locked = true;
    buttons.forEach((b) => {
      b.disabled = true;
      if (b.textContent === q.correct) b.classList.add("correct");
    });
    const blank = UI.$("#blank");
    blank.textContent = q.correct;
    blank.classList.add("filled");
    showFeedback("bad", "Hindi tama.", "Ang tamang sagot ay: " + q.correct);
    setCheck(isLast() ? "Tingnan ang resulta" : "Next", true, "next");
  }

  function isLast() { return S.index === questions.length - 1; }

  /* ---------- 4. Next question ---------- */
  function goNext() {
    if (isLast()) { showResults(); return; }
    S.index++;
    S.selected = null;
    S.attempts = 0;
    S.locked = false;
    render();
  }

  /* ---------- Bottom bar helpers ---------- */
  function showFeedback(kind, title, sub) {
    footer.className = "q-footer " + kind;
    feedback.textContent = "";
    feedback.appendChild(make("span", "title", title));
    feedback.appendChild(make("span", "sub", sub));
  }

  function setCheck(label, enabled, extra) {
    checkBtn.textContent = label;
    checkBtn.disabled = !enabled;
    checkBtn.className = "btn check" + (enabled ? (extra ? " " + extra : " ready") : "");
  }

  /* ---------- Results ---------- */
  function showResults() {
    S.finished = true;
    const total = questions.length;
    const stars = Rewards.starsFor(S.correct, total);

    // save the round
    const s = State.get();
    State.set({
      rounds: s.rounds + 1,
      perfectRounds: s.perfectRounds + (stars === 3 ? 1 : 0),
      bestStreak: Math.max(s.bestStreak, S.bestStreak),
    });
    Rewards.saveStars(subject + grade, stars);
    const newBadges = Rewards.checkBadges();

    // draw
    UI.$("#fill").style.width = "100%";
    UI.$("#counter").textContent = total + "/" + total;
    footer.classList.add("hidden");
    stage.textContent = "";

    const card = make("section", "results");
    const starRow = make("div", "stars");
    [1, 2, 3].forEach((n) => starRow.appendChild(make("span", n <= stars ? "" : "off", "⭐")));
    card.appendChild(starRow);

    const heading = stars === 3 ? "Perpekto!" : stars > 0 ? "Magaling!" : "Subukan ulit!";
    card.appendChild(make("h2", "", heading));
    card.appendChild(make("p", "summary", S.correct + " / " + total + " tama sa unang subok  ·  +" + S.earned + " Barya"));
    if (S.pieces > 0) card.appendChild(make("p", "festival-note", "🏮 +" + S.pieces + " piraso ng parol"));
    if (newBadges.length) {
      card.appendChild(make("p", "festival-note", "Bagong badge: " + newBadges.map((b) => b.icon + " " + b.name).join(", ")));
    }
    card.appendChild(make("p", "rule", "1 bituin: 5 o higit pa  ·  2 bituin: 8 o higit pa  ·  3 bituin: perpekto"));

    const actions = make("div", "actions");
    const again = make("button", "btn btn-green", "Ulitin");
    again.type = "button";
    again.addEventListener("click", () => location.reload());
    const home = make("a", "btn", "Home");
    home.href = "home.html";
    const shop = make("a", "btn btn-gold", "Tindahan");
    shop.href = "shop.html";
    actions.appendChild(again);
    actions.appendChild(home);
    actions.appendChild(shop);
    card.appendChild(actions);
    stage.appendChild(card);

    UI.beep(stars > 0 ? "win" : "bad");
  }

  /* ---------- Controls ---------- */
  checkBtn.addEventListener("click", onCheck);
  UI.$("#btn-close").addEventListener("click", () => UI.openModal("quit"));

  // keyboard: 1-4 pick a choice, Enter checks / goes next
  document.addEventListener("keydown", (event) => {
    if (S.finished || document.querySelector(".modal.open")) return;
    if (event.key >= "1" && event.key <= "4") selectChoice(Number(event.key) - 1);
    if (event.key === "Enter" && !checkBtn.disabled) onCheck();
  });

  /* ---------- Go ---------- */
  if (questions.length === 0) {
    stage.appendChild(make("p", "bubble bubble-teacher", "Walang tanong para sa grade na ito."));
    footer.classList.add("hidden");
  } else {
    render();
  }
})();
