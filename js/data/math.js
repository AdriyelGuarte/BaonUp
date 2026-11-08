/* =========================================================
   data/math.js — MATH question bank (same conversational layout).

   3 grade sets (1, 2, 3) × 10 questions. Each set mixes 3 types:
     ops      an equation (+, −, ×, ÷)
     story    a short word problem
     pattern  what comes next / which number is missing

   Same format as the reading questions. "correct" and "options" are
   strings (e.g. "7"). The quiz shuffles the 4 choices.
   ========================================================= */
const MATH_QUESTIONS = {
  1: [
    { type: "ops", msg: "Ano ang 3 + 4?",
      before: "Ang sagot ay", after: ".", correct: "7", options: ["6", "8", "9"] },

    { type: "ops", msg: "Ano ang 9 − 5?",
      before: "Ang sagot ay", after: ".", correct: "4", options: ["3", "5", "6"] },

    { type: "story", msg: "May 5 mangga si Ana. Binigyan siya ng 3 pa. Ilan na ang mangga niya?",
      before: "May", after: "mangga na siya.", correct: "8", options: ["7", "9", "2"] },

    { type: "pattern", msg: "Ano ang kasunod ng 2, 4, 6, ___?",
      before: "Ang kasunod ay", after: ".", correct: "8", options: ["7", "9", "10"] },

    { type: "ops", msg: "Ano ang 6 + 6?",
      before: "Ang sagot ay", after: ".", correct: "12", options: ["10", "11", "14"] },

    { type: "story", msg: "May 10 itlog sa basket. 4 ang nabasag. Ilan ang natira?",
      before: "Natira ang", after: "itlog.", correct: "6", options: ["5", "7", "14"] },

    { type: "pattern", msg: "Ano ang kasunod ng 5, 10, 15, ___?",
      before: "Ang kasunod ay", after: ".", correct: "20", options: ["18", "25", "16"] },

    { type: "ops", msg: "Ano ang 8 − 3?",
      before: "Ang sagot ay", after: ".", correct: "5", options: ["4", "6", "11"] },

    { type: "story", msg: "May 2 pusa at 5 aso sa bakuran. Ilan lahat ang hayop?",
      before: "May", after: "hayop lahat.", correct: "7", options: ["3", "8", "10"] },

    { type: "ops", msg: "Ano ang 10 + 5?",
      before: "Ang sagot ay", after: ".", correct: "15", options: ["14", "16", "5"] },
  ],

  2: [
    { type: "ops", msg: "Ano ang 25 + 17?",
      before: "Ang sagot ay", after: ".", correct: "42", options: ["32", "41", "43"] },

    { type: "ops", msg: "Ano ang 50 − 28?",
      before: "Ang sagot ay", after: ".", correct: "22", options: ["32", "12", "78"] },

    { type: "story", msg: "May 24 lapis si Ben. Nagbigay siya ng 9. Ilan ang natira?",
      before: "Natira ang", after: "lapis.", correct: "15", options: ["14", "16", "33"] },

    { type: "pattern", msg: "Ano ang kasunod ng 10, 20, 30, ___?",
      before: "Ang kasunod ay", after: ".", correct: "40", options: ["35", "50", "31"] },

    { type: "story", msg: "May 3 mansanas sa bawat bag. Ilan lahat ang mansanas sa 4 na bag?",
      before: "May", after: "mansanas lahat.", correct: "12", options: ["7", "9", "15"] },

    { type: "ops", msg: "Ano ang 36 + 28?",
      before: "Ang sagot ay", after: ".", correct: "64", options: ["54", "62", "74"] },

    { type: "pattern", msg: "Ano ang kasunod ng 3, 6, 9, 12, ___?",
      before: "Ang kasunod ay", after: ".", correct: "15", options: ["14", "16", "18"] },

    { type: "story", msg: "May 45 estudyante sa klase. 18 ang lalaki. Ilan ang babae?",
      before: "May", after: "babae sa klase.", correct: "27", options: ["63", "26", "37"] },

    { type: "ops", msg: "Ano ang 100 − 40?",
      before: "Ang sagot ay", after: ".", correct: "60", options: ["50", "70", "140"] },

    { type: "pattern", msg: "Anong numero ang nawawala? 5, 10, ___, 20",
      before: "Ang nawawala ay", after: ".", correct: "15", options: ["12", "25", "17"] },
  ],

  3: [
    { type: "ops", msg: "Ano ang 6 × 7?",
      before: "Ang sagot ay", after: ".", correct: "42", options: ["36", "48", "49"] },

    { type: "ops", msg: "Ano ang 56 ÷ 8?",
      before: "Ang sagot ay", after: ".", correct: "7", options: ["6", "8", "9"] },

    { type: "story", msg: "May 8 kahon. May 5 lapis sa bawat kahon. Ilan lahat ang lapis?",
      before: "May", after: "lapis lahat.", correct: "40", options: ["13", "35", "45"] },

    { type: "ops", msg: "Ano ang 345 + 278?",
      before: "Ang sagot ay", after: ".", correct: "623", options: ["613", "633", "523"] },

    { type: "pattern", msg: "Ano ang kasunod ng 4, 8, 16, ___?",
      before: "Ang kasunod ay", after: ".", correct: "32", options: ["24", "20", "30"] },

    { type: "ops", msg: "Ano ang 500 − 168?",
      before: "Ang sagot ay", after: ".", correct: "332", options: ["342", "432", "322"] },

    { type: "story", msg: "May 36 kendi. Hahatiin ito nang pantay sa 4 na bata. Ilan ang kay bawat bata?",
      before: "Bawat bata ay may", after: "kendi.", correct: "9", options: ["8", "12", "32"] },

    { type: "ops", msg: "Ano ang 9 × 9?",
      before: "Ang sagot ay", after: ".", correct: "81", options: ["72", "90", "99"] },

    { type: "pattern", msg: "Ano ang kasunod ng 100, 90, 80, ___?",
      before: "Ang kasunod ay", after: ".", correct: "70", options: ["60", "75", "110"] },

    { type: "story", msg: "May 120 mangga si Mang Tonyo. Nagbenta siya ng 45. Ilan ang natira?",
      before: "Natira ang", after: "mangga.", correct: "75", options: ["65", "85", "165"] },
  ],
};
