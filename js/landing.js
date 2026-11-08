/* =========================================================
   landing.js — the first page.
   The child types a nickname, picks a grade (1-3) and starts.
   Both are saved in State, then we go to home.html.
   ========================================================= */
(function () {
  const input = UI.$("#nickname");
  const pills = UI.$$(".grade-pill");
  const startBtn = UI.$("#start");
  const hint = UI.$("#hint");

  const saved = State.get();
  let grade = saved.grade;            // 1, 2, 3 or null

  // Returning player? Fill in what we already know.
  input.value = saved.nickname || "";
  if (State.isSetUp()) startBtn.textContent = "Ituloy!";

  function nickname() { return input.value.trim(); }

  // Highlight the chosen grade and enable/disable the Start button
  function refresh() {
    pills.forEach((pill) => {
      pill.setAttribute("aria-pressed", String(Number(pill.dataset.grade) === grade));
    });

    const ready = nickname().length > 0 && grade !== null;
    startBtn.disabled = !ready;

    if (nickname().length === 0) hint.textContent = "Isulat ang nickname mo.";
    else if (grade === null) hint.textContent = "Piliin ang grade mo.";
    else hint.textContent = "";
  }

  pills.forEach((pill) => {
    pill.addEventListener("click", () => {
      grade = Number(pill.dataset.grade);
      refresh();
    });
  });

  input.addEventListener("input", refresh);

  function start() {
    if (startBtn.disabled) return;
    State.set({ nickname: nickname(), grade: grade });
    location.href = "home.html";
  }

  startBtn.addEventListener("click", start);
  input.addEventListener("keydown", (event) => { if (event.key === "Enter") start(); });

  refresh();
  input.focus();
})();
