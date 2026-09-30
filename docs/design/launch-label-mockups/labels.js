/* Shared copy and label markup for the three directions.
   One source so the product-page label and the card badge can never drift apart. */

const IMG = {
  prague: 'https://walterin.com/cdn/shop/files/walterin-prague-illustrated-comic-guide-book-cover.jpg',
  tarot:  'https://walterin.com/cdn/shop/files/129d37be-02fa-4a89-8673-a0c2de8850d9.png'
};

/* Wording agreed 30 Sep 2026. A product with no confirmed date says "Coming soon" —
   never a guessed date, and never "Sold out" for something that has not launched. */
const COPY = {
  en: {
    digital: 'Available from October 23rd',
    printed: 'Available from November 10th',
    nodate:  'Coming soon',
    /* Direction 1 splits the sentence: the small letter-spaced half is the kicker, the date is
       what the stamp is for. Saying "Available from" twice would be the redundancy it avoids. */
    from:    'Available from',
    digitalDate: 'October 23rd',
    printedDate: 'November 10th',
    ptitle:  'Walterin Prague — Comic Book',
    lblLang: 'Language', lblFmt: 'Format',
    langA: 'English', langB: 'Czech',
    fmtA: 'Digital Interactive Edition', fmtB: 'Printed Collector’s Edition',
    email: 'Your email address', btn: 'Notify me',
    note: 'One email when it’s ready. That’s all.',
    secCards: 'Product cards — collection, home, “You may also like”',
    cardPrague: 'Walterin Prague', cardTarot: 'Tarot of Consciousness',
    pragueAlt: 'Walterin Prague, the illustrated comic book'
  },
  sk: {
    digital: 'Dostupné od 23. októbra',
    printed: 'Dostupné od 10. novembra',
    nodate:  'Už čoskoro',
    from:    'Dostupné od',
    digitalDate: '23. októbra',
    printedDate: '10. novembra',
    ptitle:  'Walterin Praha — komiksová kniha',
    lblLang: 'Jazyk', lblFmt: 'Formát',
    langA: 'Angličtina', langB: 'Čeština',
    fmtA: 'Digitálne interaktívne vydanie', fmtB: 'Tlačené zberateľské vydanie',
    email: 'Vaša e-mailová adresa', btn: 'Dajte mi vedieť',
    note: 'Jeden e-mail, keď bude hotová. Nič viac.',
    secCards: 'Karty produktov — kolekcia, domov, „Mohlo by sa vám páčiť“',
    cardPrague: 'Walterin Praha', cardTarot: 'Tarot vedomia',
    pragueAlt: 'Walterin Praha, ilustrovaná komiksová kniha'
  }
};

/* The tarot has no date, so it shows the no-date wording in the same design —
   which is the point of designing the label and the fallback together. */
const CARDS = [
  { img: IMG.prague, titleKey: 'cardPrague', price: '€18,99', state: 'digital' },
  { img: IMG.tarot,  titleKey: 'cardTarot',  price: '€39',    state: 'nodate'  }
];

const STAR = '<svg class="st" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 1.5l3 7.2 7.8.6-5.9 5.1 1.8 7.6L12 17.9 5.3 22l1.8-7.6-5.9-5.1 7.8-.6z" fill="#222"/></svg>';

/* `which` is 'digital' | 'printed' | 'nodate', so direction 1 can split the sentence while the
   other two use the whole line. One call site, three shapes. */
function label(dir, text, which) {
  if (dir === 1) {
    const T = COPY[document.documentElement.lang || 'en'];
    const dated = which === 'digital' || which === 'printed';
    const k = dated ? T.from : '';
    const v = dated ? T[which + 'Date'] : text;
    return `<span class="lab1">${k ? `<span class="k">${k}</span>` : ''}<span class="v">${v}</span></span>`;
  }
  if (dir === 2) return `<div class="lab2">${STAR}<span class="v">${text}</span>${STAR}</div>`;
  return `<span class="lab3"><span class="v">${text}</span></span>`;
}

function badge(dir, text) {
  if (dir === 1) return `<span class="bdg1"><span class="v">${text}</span></span>`;
  if (dir === 2) return `<div class="bdg2"><span class="v">${text}</span></div>`;
  return `<span class="bdg3"><span class="v">${text}</span></span>`;
}

const DIRS = {
  1: ['Stamped', 'A date stamp, not a button. Nothing is filled: two ink rules, a letter-spaced kicker, the date large in the display face, the whole thing rotated a degree and a half as if pressed by hand. Yellow appears only as a marker under the date. The quietest of the three, and the one that looks least like a control you could press.'],
  2: ['Marquee', 'A banner across the whole column, the way a comic announces a chapter. Solid yellow, ink rules top and bottom, a star at each end. Loud on purpose: while an edition is unreleased it replaces the price as the thing the eye lands on. On a card it becomes a band across the foot of the image.'],
  3: ['Balloon', 'A speech balloon with its tail pointing down at the email field — the house medium saying the one thing it has to say. Paper fill, ink outline, hard shadow. It reads as the shop talking to you rather than a label stuck on the page, which is the most Walterin of the three.']
};
