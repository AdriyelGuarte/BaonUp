# BaonUp

Learning game for Grades 1 to 3: Reading and Math in a chat-style quiz, a
Sari-Sari Store, a profile with badges, and the Parol Festival event.
Plain HTML, CSS and JavaScript (no frameworks, no build step).

## How to run

Double-click `index.html`, or use VS Code "Live Server" for auto-reload.
Speech features are not used, so any modern browser works.

## Pages

| Page | CSS | JS | What it does |
|---|---|---|---|
| `index.html` | `landing.css` | `landing.js` | Nickname + grade, saved, then goes to home |
| `home.html` | `homepage.css` | `home.js` | The lunchbox: Reading, Math, Profile, Store, Parol Festival |
| `quiz.html?subject=reading` / `?subject=math` | `quiz.css` | `quiz.js` | Conversational quiz, 10 questions |
| `shop.html` | `shop.css` | `shop.js` | Sari-Sari Store, buy items with Barya |
| `profile.html` | `profile.css` | `profile.js` | Avatar, badges, equip items |

Shared: `css/base.css` (colors, fonts, buttons, modal, Barya pill) and
`js/state.js`, `js/ui.js`, `js/rewards.js`, `js/festival.js`.

## Where to edit things

| I want to... | Edit |
|---|---|
| Add or change Reading questions | `js/data/questions.js` |
| Add or change Math questions | `js/data/math.js` |
| Change shop items or prices | `js/data/items.js` |
| Change Parol Festival dates | `CONFIG` in `js/festival.js` |
| Change colors or fonts | `:root` in `css/base.css` |
| Change how many Barya a correct answer gives | `Rewards.award(...)` calls in `js/quiz.js` |

Each grade has exactly 10 questions mixing 3 types
(Reading: salita / balarila / kahulugan, Math: operasyon / kuwento / pattern).

## Pictures to add

Put these in `assets/images/`. Every one is optional: if a file is missing,
a placeholder (letter, emoji or gradient) shows instead, so nothing breaks.

| File | Used for |
|---|---|
| `bamboo-bg.png` | Quiz and profile background (blurred automatically) |
| `store-bg.png` | Store background |
| `tarsier.png` | Teacher Tarsi (quiz + Reading card) |
| `eagle.png`, `tamaraw.png` | Teachers Agila and Tamaraw |
| `barya.png` | Coin icon next to every Barya number |
| `landing-mascot.png` | Boy with the flag on the landing page |
| `aling-nena.png` | Store vendor |
| `profilepic.jpg` | Default avatar face |
| `items/<id>.png` | Item pictures: `salakot`, `barong`, `baro`, `parol`, `frameG`, `frameB`, `sampaguita`, `baon`, `gintongParol` |

## Testing tips

Open the browser console (F12) on any page:

```js
State.set({ barya: 500 })   // get Barya to test the shop
State.reset()               // start over
```

Parol Festival: add `?festival=on` or `?festival=off` to any page URL to force
it on or off. `?festival=auto` goes back to the real dates.
