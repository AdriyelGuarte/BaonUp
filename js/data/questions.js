/* =========================================================
   data/questions.js — READING question bank (conversational type).

   3 grade sets (1, 2, 3) × 10 questions. Each set mixes 3 types:
     word     fill the blank with the right word
     grammar  pick the right grammar / polite word
     meaning  opposites, same meaning, slang (GenZ)

   One question looks like this:
     {
       type: "word",
       msg: "What the teacher says (left bubble)",
       before: "Start of the child's sentence",
       after: "End of the child's sentence",
       correct: "the right word",
       options: ["wrong 1", "wrong 2", "wrong 3"]
     }
   The quiz shuffles the 4 choices, so the order here does not matter.
   To add a question, copy one and edit it. Keep exactly 10 per grade.
   ========================================================= */
const READING_QUESTIONS = {
  1: [
    { type: "word", msg: "Anong oras ka umalis kanina?",
      before: "Umalis ako kaninang", after: ".",
      correct: "umaga", options: ["masarap", "malaki", "kumain"] },

    { type: "meaning", msg: "Ano ang kasalungat ng 'malaki'?",
      before: "Ang kasalungat nito ay", after: ".",
      correct: "maliit", options: ["mataba", "mabilis", "masaya"] },

    { type: "word", msg: "Anong hayop ang tumatahol?",
      before: "Ang", after: "ay tumatahol.",
      correct: "aso", options: ["pusa", "isda", "ibon"] },

    { type: "grammar", msg: "Sino ang kasama mo sa bahay?",
      before: "Kasama ko si", after: "sa bahay.",
      correct: "Nanay", options: ["mangga", "lapis", "upuan"] },

    { type: "word", msg: "Ano ang isinusuot mo sa paa?",
      before: "Isinusuot ko ang", after: "sa paa.",
      correct: "sapatos", options: ["sumbrero", "payong", "kamiseta"] },

    { type: "meaning", msg: "Ano ang kasalungat ng 'umaga'?",
      before: "Ang kasalungat nito ay", after: ".",
      correct: "gabi", options: ["tanghali", "kanina", "bukas"] },

    { type: "word", msg: "What do you drink when you are thirsty?",
      before: "I drink", after: ".",
      correct: "water", options: ["rice", "shoes", "chair"] },

    { type: "word", msg: "Ano ang gamit mo sa pagsulat?",
      before: "Sumusulat ako gamit ang", after: ".",
      correct: "lapis", options: ["kutsara", "sipilyo", "walis"] },

    { type: "grammar", msg: "May nagbigay sa iyo ng regalo. Ano ang sasabihin mo?",
      before: "Sasabihin ko ay", after: "!",
      correct: "Salamat po", options: ["Paalam po", "Pasensya po", "Tulong po"] },

    { type: "word", msg: "Anong kulay ang hinog na saging?",
      before: "Ang hinog na saging ay kulay", after: ".",
      correct: "dilaw", options: ["asul", "lila", "rosas"] },
  ],

  2: [
    { type: "word", msg: "Saan ka pumapasok tuwing Lunes?",
      before: "Pumapasok ako sa", after: ".",
      correct: "paaralan", options: ["kusina", "ilog", "kama"] },

    { type: "meaning", msg: "Ano ang kasingkahulugan ng 'masaya'?",
      before: "Ang kasingkahulugan nito ay", after: ".",
      correct: "maligaya", options: ["malungkot", "galit", "pagod"] },

    { type: "grammar", msg: "Ano ang ginagawa mo ngayon?",
      before: "Ako ay", after: "ng libro.",
      correct: "nagbabasa", options: ["masarap", "maputi", "maliit"] },

    { type: "word", msg: "What do you use to cut paper?",
      before: "I use", after: "to cut paper.",
      correct: "scissors", options: ["spoons", "pillows", "umbrellas"] },

    { type: "meaning", msg: "Ano ang kasalungat ng 'mabilis'?",
      before: "Ang kasalungat nito ay", after: ".",
      correct: "mabagal", options: ["malakas", "mataas", "matalino"] },

    { type: "grammar", msg: "Sino ang bumisita sa bahay natin?",
      before: "Bumisita", after: "Ana at Ben.",
      correct: "sina", options: ["si", "ang", "ni"] },

    { type: "word", msg: "Anong buwan ang Pasko?",
      before: "Ang Pasko ay sa buwan ng", after: ".",
      correct: "Disyembre", options: ["Enero", "Hunyo", "Marso"] },

    { type: "meaning", msg: "Sabi ng kaibigan mo, 'Lodi kita!' Ano ang ibig niyang sabihin?",
      before: "Ibig niyang sabihin, ang tingin niya sa akin ay isang", after: ".",
      correct: "idol", options: ["kaaway", "alaga", "bisita"] },

    { type: "word", msg: "Ano ang tawag sa tubig na bumabagsak mula sa langit?",
      before: "Ang bumabagsak mula sa langit ay", after: ".",
      correct: "ulan", options: ["lupa", "apoy", "hangin"] },

    { type: "grammar", msg: "Saan nakalagay ang libro?",
      before: "Ang libro ay nasa ibabaw", after: "mesa.",
      correct: "ng", options: ["sa", "si", "na"] },
  ],

  3: [
    { type: "word", msg: "Ano ang ginagawa ng mga magsasaka sa palayan?",
      before: "Ang mga magsasaka ay", after: "ng palay.",
      correct: "nag-aani", options: ["naglalaba", "nagluluto", "naglalaro"] },

    { type: "meaning", msg: "Ano ang ibig sabihin ng 'matulungin'?",
      before: "Ang taong matulungin ay laging", after: "sa iba.",
      correct: "tumutulong", options: ["nang-aaway", "natutulog", "nagtatago"] },

    { type: "grammar", msg: "Kailan ka magsisimulang mag-aral?",
      before: "Mag-aaral ako", after: "pagkatapos kumain.",
      correct: "mamaya", options: ["kahapon", "kanina", "dati"] },

    { type: "word", msg: "What is the opposite of 'hot'?",
      before: "The opposite of hot is", after: ".",
      correct: "cold", options: ["warm", "soft", "loud"] },

    { type: "meaning", msg: "Sabi ng kaibigan mo, 'Sana all!' Ano ang nararamdaman niya?",
      before: "Medyo siya ay", after: "dahil gusto rin niya ng ganoon.",
      correct: "naiinggit", options: ["natutulog", "nagugutom", "naliligo"] },

    { type: "grammar", msg: "Paano tumakbo si Migo?",
      before: "Tumakbo siya", after: "mabilis.",
      correct: "nang", options: ["ng", "sa", "si"] },

    { type: "word", msg: "Ano ang tawag sa taong gumagamot ng may sakit?",
      before: "Ang gumagamot sa may sakit ay ang", after: ".",
      correct: "doktor", options: ["pulis", "guro", "tindero"] },

    { type: "meaning", msg: "Ano ang kasalungat ng 'mapagbigay'?",
      before: "Ang kasalungat nito ay", after: ".",
      correct: "madamot", options: ["masipag", "mabait", "matapang"] },

    { type: "word", msg: "Ano ang pambansang prutas ng Pilipinas?",
      before: "Ang pambansang prutas ay", after: ".",
      correct: "mangga", options: ["saging", "pinya", "papaya"] },

    { type: "grammar", msg: "Bakit tayo nagsasabi ng 'po' at 'opo'?",
      before: "Ginagamit natin ito para magpakita ng", after: ".",
      correct: "paggalang", options: ["galit", "takot", "pagod"] },
  ],
};
