/* =========================================================
   highlight.js — "Kahulugan ng naka-highlight na salita".
   Used by quiz.html?subject=highlight
 
   Each question:
     word     the highlighted word (shown big + highlighted)
     before   text before the word in the sentence ("" if it starts the sentence)
     after    text after the word
     correct  the right meaning
     options  the 3 wrong meanings (quiz.js shuffles all 4)
   ========================================================= */
const HIGHLIGHT_QUESTIONS = {
 
  /* ---------- Grade 1: ---------- */
  1: [
    { word: "Mabango", before: "", after: "ang bulaklak sa hardin.",
      correct: "May magandang amoy", options: ["Walang amoy", "Maasim", "Mapait"] },
    { word: "Matangkad", before: "", after: "ang puno sa likod ng bahay.",
      correct: "Mataas", options: ["Maliit", "Maikli", "Malapad"] },
    { word: "Malinis", before: "", after: "ang aming silid-aralan.",
      correct: "Walang dumi", options: ["Magulo", "Marumi", "Madilim"] },
    { word: "Makitid", before: "", after: "ang daan papunta sa bahay.",
      correct: "Maliit", options: ["Malawak", "Malapad", "Mahaba"] },
    { word: "Matamis", before: "", after: "ang hinog na mangga.",
      correct: "May lasang asukal", options: ["Maasim", "Mapait", "Maalat"] },
    { word: "Mabigat", before: "", after: "ang bag na dala ni Ben.",
      correct: "Maraming timbang", options: ["Madaling buhatin", "Magaan", "Maliit"] },
    { word: "Maingay", before: "", after: "ang mga bata sa palaruan.",
      correct: "Maraming tunog", options: ["Tahimik", "Walang tao", "Malungkot"] },
    { word: "Malambot", before: "", after: "ang unan sa kama.",
      correct: "Madaling idiin", options: ["Magaspang", "Matigas", "Mabigat"] },
    { word: "Mabagal", before: "", after: "maglakad ang pagong.",
      correct: "Mahina kumilos", options: ["Matulin", "Malakas", "Mabilis"] },
    { word: "Makulay", before: "", after: "ang mga laruan sa kahon.",
      correct: "Maraming kulay", options: ["Walang kulay", "Madilim", "Magulo"] },
  ],
 
  /* ---------- Grade 2: ---------- */
  2: [
    { word: "Mapagbigay", before: "", after: "si Rosa sa mga nangangailangan.",
      correct: "Mahilig magbigay", options: ["Madamot", "Makasarili", "Palautos"] },
    { word: "Maingat", before: "", after: "si Leo sa pagtawid sa kalsada.",
      correct: "Nagbibigay-pansin sa kaligtasan", options: ["Padalos-dalos", "Nagmamadali", "Walang pakialam"] },
    { word: "Matapang", before: "", after: "ang bata nang harapin niya ang kaniyang takot.",
      correct: "May lakas ng loob", options: ["Duwag", "Mahina", "Mahiyain"] },
    { word: "Mapagkakatiwalaan", before: "", after: "si Ana dahil tinutupad niya ang kaniyang mga pangako.",
      correct: "Maaasahan", options: ["Sinungaling", "Makakalimutin", "Madaya"] },
    { word: "Masunurin", before: "", after: "ang bata sa kaniyang mga magulang.",
      correct: "Sumusunod sa mga utos", options: ["Matigas ang ulo", "Palautos", "Palaging nagrereklamo"] },
    { word: "Mapagmasid", before: "", after: "si Carlo sa mga nangyayari sa paligid.",
      correct: "Mahilig mag-obserba", options: ["Walang pakialam", "Makulit", "Makakalimutin"] },
    { word: "Masinop", before: "", after: "si Liza sa pag-aayos ng kaniyang mga gamit.",
      correct: "Maayos at organisado", options: ["Makalat", "Pabaya", "Magulo"] },
    { word: "Malikhain", before: "", after: "si Pedro sa paggawa ng mga proyekto.",
      correct: "Maraming bagong ideya", options: ["Walang imahinasyon", "Tamad", "Palaging nangongopya"] },
    { word: "Mapagpasensya", before: "", after: "ang guro sa pagtuturo sa mga bata.",
      correct: "Marunong maghintay at umunawa", options: ["Madaling magalit", "Nagmamadali", "Walang pakialam"] },
    { word: "Maalalahanin", before: "", after: "si Carla sa kaniyang mga kaibigan.",
      correct: "Nagbibigay-pansin sa kapakanan ng iba", options: ["Makakalimutin", "Makasarili", "Walang pakialam"] },
  ],
 
  /* ---------- Grade 3: ---------- */
  3: [
    { word: "Marubdob", before: "", after: "ang pagmamahal niya sa kaniyang pamilya.",
      correct: "Matindi", options: ["Mahina", "Panandalian", "Mabagal"] },
    { word: "Matiwasay", before: "", after: "ang pamumuhay sa kanilang pamayanan.",
      correct: "Mapayapa", options: ["Magulo", "Maingay", "Mapanganib"] },
    { word: "Marangal", before: "", after: "ang kaniyang hanapbuhay at tapat siyang nagtatrabaho.",
      correct: "Kagalang-galang", options: ["Mapanganib", "Madaya", "Walang saysay"] },
    { word: "Masalimuot", before: "", after: "ang suliraning kailangang lutasin ng pangkat.",
      correct: "Magulo at mahirap unawain", options: ["Simple", "Madali", "Karaniwan"] },
    { word: "Maringal", before: "", after: "ang palasyo na kanilang binisita.",
      correct: "Marilag at kahanga-hanga", options: ["Payak", "Marumi", "Maliit"] },
    { word: "Mapanglaw", before: "", after: "ang tanawin sa lugar na iniwan ng mga tao.",
      correct: "Malungkot at walang buhay", options: ["Masigla", "Makulay", "Maaliwalas"] },
    { word: "Masigasig", before: "", after: "ang mga mag-aaral sa kanilang pagsasanay.",
      correct: "Masikap at puno ng sigla", options: ["Walang gana", "Tamad", "Walang interes"] },
    { word: "Maalab", before: "", after: "ang kaniyang paninindigan para sa katarungan.",
      correct: "Matindi at taimtim", options: ["Mahina", "Walang saysay", "Pabago-bago"] },
    { word: "Maalwan", before: "", after: "ang kanilang pamumuhay dahil sapat ang kanilang kinikita.",
      correct: "Maginhawa", options: ["Mahirap", "Magulo", "Malungkot"] },
    { word: "Marubdob", before: "", after: "ang kaniyang hangaring makatulong sa kapwa.",
      correct: "Lubhang matindi", options: ["Mahina", "Panandalian", "Hindi tiyak"] },
  ],
};