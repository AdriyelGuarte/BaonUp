/* =========================================================
   data/items.js — everything sold (or earned) in the Sari-Sari Store.

   To change an item: edit it here. The shop, profile and avatar all
   read from this one list.

   Fields
     id     unique name (no spaces)
     name   what the child sees
     icon   emoji placeholder, shown until the picture file exists
     img    optional picture: assets/images/items/<id>.png
     price  Barya cost (normal items only)
     slot   where it goes on the avatar: head | body | badge | frame
     color  (frames only) ring color
     kind   normal (default) | daily | festival
   ========================================================= */
const ITEMS = [
  { id: "salakot",   name: "Salakot", img: "assets/images/items/salakot.png",   price: 30, slot: "head" },
  { id: "barong",    name: "Barong Tagalog", img: "assets/images/items/barong.png",    price: 50, slot: "body" },
  { id: "baro",      name: "Baro't Saya", img: "assets/images/items/baro.png",      price: 50, slot: "body" },
  { id: "parol",     name: "Parol Sticker", img: "assets/images/items/parol.png",     price: 20, slot: "frame" },
  { id: "frameG",    name: "gunting ni bryne", img: "assets/images/items/gunting.png",    price: 40, slot: "badge", color: "#ffcf5c" },
  { id: "frameB",    name: "campfire cookie", img: "assets/images/items/cookie.png",    price: 85, slot: "badge", color: "#4495ff" },
  { id: "sampaguita", name: "correction tape ni Abi", img: "assets/images/items/ctape.png", price: 15, slot: "badge" },

  // Free once per day: gives DAILY_REWARD Barya
  { id: "baon",      name: "1/4 Ni Kobie", img: "assets/images/items/papel.png",      kind: "daily" },

  // Only earned during the Parol Festival (10 parol pieces). Kept forever.
  { id: "gintongParol", name: "Gintong Parol", img: "assets/images/items/gintongParol.png", slot: "badge", kind: "festival", golden: true },
];

const DAILY_REWARD = 10;

function getItem(id) {
  return ITEMS.find((item) => item.id === id);
}
