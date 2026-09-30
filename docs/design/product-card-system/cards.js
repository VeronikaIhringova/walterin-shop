/* Walterin product card system — data, copy and markup.
   One builder for every state, so a card can never be assembled two different ways. */

const IMG = {
  prague: 'https://walterin.com/cdn/shop/files/walterin-prague-illustrated-comic-guide-book-cover.jpg',
  tarot:  'https://walterin.com/cdn/shop/files/129d37be-02fa-4a89-8673-a0c2de8850d9.png'
};

const COPY = {
  en: {
    from: 'from', availableFrom: 'Available from', comingSoon: 'Coming soon',
    newLabel: 'New', soldOut: 'Sold out', ebook: 'eBook',
    oct: 'October 23rd', nov: 'November 10th',
    catPrague: 'Prague', catTarot: 'Tarot', catParis: 'Paris',
    tPrague: 'Walterin Prague', tTarot: 'Tarot of Consciousness',
    tStickers: 'Prague sticker set', tParis: 'Walterin Paris',
    email: 'Your email address', notify: 'Notify me', addToCart: 'Add to cart',
    note: 'One email when it’s ready. That’s all.',
    srNew: 'New product', srSold: 'Sold out', srEbook: 'Digital edition',
    lang: 'Language', fmt: 'Format', english: 'English', czech: 'Czech',
    digital: 'Digital Interactive Edition', printed: 'Printed Collector’s Edition'
  },
  sk: {
    from: 'od', availableFrom: 'Dostupné od', comingSoon: 'Už čoskoro',
    newLabel: 'Novinka', soldOut: 'Vypredané', ebook: 'E-kniha',
    oct: '23. októbra', nov: '10. novembra',
    catPrague: 'Praha', catTarot: 'Tarot', catParis: 'Paríž',
    tPrague: 'Walterin Praha', tTarot: 'Tarot vedomia',
    tStickers: 'Sada nálepiek Praha', tParis: 'Walterin Paríž',
    email: 'Vaša e-mailová adresa', notify: 'Dajte mi vedieť', addToCart: 'Do košíka',
    note: 'Jeden e-mail, keď bude hotová. Nič viac.',
    srNew: 'Nový produkt', srSold: 'Vypredané', srEbook: 'Digitálne vydanie',
    lang: 'Jazyk', fmt: 'Formát', english: 'Angličtina', czech: 'Čeština',
    digital: 'Digitálne interaktívne vydanie', printed: 'Tlačené zberateľské vydanie'
  }
};

/* Every card state we actually need. Nothing here is a claim we cannot stand behind:
   no discounts, no ratings, no "bestseller". */
const STATES = [
  { id:'default',  label:'Default — buyable',        img:'prague', cat:'catPrague', title:'tPrague',  price:'€18,99' },
  { id:'hover',    label:'Hover / focus (dated card)',img:'prague', cat:'catPrague', title:'tPrague',  price:'€18,99', force:true, bar:'oct' },
  { id:'dated',    label:'Available from [date]',    img:'prague', cat:'catPrague', title:'tPrague',  price:'€18,99', bar:'oct' },
  { id:'soon',     label:'Coming soon — no date',    img:'tarot',  cat:'catTarot',  title:'tTarot',   price:'€39',    bar:'soon' },
  { id:'new',      label:'New',                      img:'prague', cat:'catPrague', title:'tPrague',  price:'€18,99', status:'new' },
  { id:'sold',     label:'Sold out',                 img:'tarot',  cat:'catTarot',  title:'tTarot',   price:'€39',    status:'sold', sold:true, bar:'soldbar' },
  { id:'ebook',    label:'Digital only',             img:'prague', cat:'catPrague', title:'tPrague',  price:'€18,99', status:'ebook' },
  { id:'fromprice',label:'Digital + printed',        img:'prague', cat:'catPrague', title:'tPrague',  price:'€18,99', from:true },
  { id:'nocat',    label:'No category yet',          img:'tarot',  cat:null,        title:'tTarot',   price:'€39' }
];

function statusText(kind, T){
  if (kind === 'new')   return { txt:T.newLabel, sr:T.srNew };
  if (kind === 'sold')  return { txt:T.soldOut,  sr:T.srSold };
  if (kind === 'ebook') return { txt:T.ebook,    sr:T.srEbook };
  return null;
}
function barText(kind, T){
  if (kind === 'oct')  return T.availableFrom + ' ' + T.oct;
  if (kind === 'nov')  return T.availableFrom + ' ' + T.nov;
  if (kind === 'soon') return T.comingSoon;
  if (kind === 'soldbar') return T.soldOut;
  return null;
}

/* One builder. `v` is the variation (1–3); `s` is a state object. */
function card(v, s, lang){
  const T = COPY[lang];
  const st = statusText(s.status, T);
  const bar = barText(s.bar, T);
  const price = (s.from ? `<span class="from">${T.from}</span> ` : '') + s.price;
  return `<a class="pc pc--v${v}${s.force?' is-forced':''}" href="#"${s.sold?' data-sold':''}>
    <div class="pc__media">
      <img src="${IMG[s.img]}" alt="">
      ${s.cat ? `<span class="pc__cat">${T[s.cat]}</span>` : ''}
      ${st ? `<span class="pc__status">${st.txt}<span class="sr"> — ${st.sr}</span></span>` : ''}
      ${bar ? `<span class="pc__bar">${bar}</span>` : ''}
    </div>
    <div class="pc__foot">
      <p class="pc__title">${T[s.title]}</p>
      <p class="pc__price">${price}</p>
    </div>
  </a>`;
}

const VARIATIONS = {
  1: ['Quiet', 'Paper on paper. The bar is a framed strip, the status pill is outlined, nothing is filled. The closest to the reference’s restraint, and the version that stays calmest on a page full of cards.'],
  2: ['Marker', 'The house yellow does the work, so the labels need no border — the yellow is the label. Fully rounded, like the reference bar, and the media keeps its hard shadow. The warmest and the most obviously Walterin.'],
  3: ['Ink', 'Ink fill, paper text. The highest contrast and the quietest use of colour: yellow is kept for actions only, so a grid of cards never competes with the buttons on the page.']
};
