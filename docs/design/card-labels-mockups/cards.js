/* ---------------------------------------------------------------------------
   Walterin · card label mock-ups — the data and the renderer.
   Mock-ups only. Real product images, real titles, real prices, read from the
   live site on 6 October 2026.
   --------------------------------------------------------------------------- */

const IMG = {
  tarot: 'https://walterin.com/cdn/shop/files/129d37be-02fa-4a89-8673-a0c2de8850d9.png?v=1790172898&width=720',
  stickers: 'https://walterin.com/cdn/shop/files/STICKERS_1.jpg?v=1771592386&width=720',
  prague: 'https://walterin.com/cdn/shop/files/walterin-prague-illustrated-comic-guide-book-cover.jpg?v=1764241286&width=720',
};

/* The call to action has to read naturally for each product, so it is written
   per product rather than assembled from a template. "Buy the deck" is right
   for a tarot and wrong for stickers. */
const PRODUCTS = {
  tarot: {
    img: IMG.tarot,
    en: { title: ['Tarot of Consciousness:', 'A Graphic Journey'], price: '€39,00', cta: 'Buy the deck' },
    sk: { title: ['Komiksový tarot vedomia'],                      price: '€39,00', cta: 'Kúpiť tarot' },
  },
  ebook: {
    img: IMG.prague,
    en: { title: ['Walterin Prague', 'Comic Book'], price: 'From €16,00', cta: 'Buy the e-book' },
    sk: { title: ['Walterin Praha', 'Komiksová kniha'], price: 'Od €16,00', cta: 'Kúpiť e-knihu' },
  },
  book: {
    img: IMG.prague,
    en: { title: ['Walterin Prague', 'Comic Book'], price: '€24,00', cta: 'Buy the comic book' },
    sk: { title: ['Walterin Praha', 'Komiksová kniha'], price: '€24,00', cta: 'Kúpiť komiks' },
  },
  stickers: {
    img: IMG.stickers,
    en: { title: ['Walterin Prague', 'Sticker Set'], price: '€12,50', cta: 'Buy the stickers' },
    sk: { title: ['Walterin Praha', 'Sada nálepiek'], price: '€12,50', cta: 'Kúpiť nálepky' },
  },
};

const WORDS = {
  en: {
    newPill: 'New',
    waiting: 'Coming soon',
    dated: 'Available from October 23rd',
    soldout: 'Sold out',
    soldoutHover: 'Tell me when it is back',
  },
  sk: {
    newPill: 'Nové',
    waiting: 'Už čoskoro',
    dated: 'Dostupné od 23. októbra',
    soldout: 'Vypredané',
    soldoutHover: 'Dajte mi vedieť',
  },
};

/* The four states, in the order a product actually lives through them. */
const STATES = [
  { key: 'waiting', en: 'No confirmed date', sk: 'Bez potvrdeného dátumu',
    note: 'Bar always visible. Never "Sold out" — it has not been for sale yet.' },
  { key: 'dated', en: 'Confirmed date', sk: 'Potvrdený dátum',
    note: 'Bar always visible. The date comes from snippets/launch-date.liquid.' },
  { key: 'buyable', en: 'Buyable', sk: 'Dá sa kúpiť',
    note: 'Bar appears on hover on a desk, always visible on a phone.' },
  { key: 'soldout', en: 'Sold out', sk: 'Vypredané',
    note: 'Stock ran out after launch. The bar offers the notify-me instead.' },
];

function barText(state, product, lang) {
  const w = WORDS[lang];
  if (state === 'waiting') return w.waiting;
  if (state === 'dated') return w.dated;
  if (state === 'buyable') return PRODUCTS[product][lang].cta;
  if (state === 'soldout') return w.soldout;
  return '';
}

function cardHTML({ product, state, lang, isNew }) {
  const p = PRODUCTS[product];
  const d = p[lang];
  const w = WORDS[lang];
  const title = d.title.map((t) => `<span>${t}</span>`).join('');
  const pill = isNew ? `<span class="pill">${w.newPill}</span>` : '';
  const label = barText(state, product, lang);
  const bar = label
    ? `<a class="bar" href="#" data-state="${state}"><span class="bar__label">${label}</span></a>`
    : '';
  return `
    <article class="card" data-state="${state}">
      <div class="card__media">
        <img src="${p.img}" alt="" loading="eager" decoding="sync">
        ${pill}
        ${bar}
      </div>
      <div class="card__text">
        <h3 class="card__title">${title}</h3>
        <p class="card__price">${d.price}</p>
      </div>
    </article>`;
}
