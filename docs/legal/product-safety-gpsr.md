# Product safety information (GPSR): data sheet

Regulation (EU) 2023/988 (GPSR), Art. 19: for online sales, each product listing must show clearly and visibly:
(a) the manufacturer's name, registered trade name or trademark, postal and electronic address;
(b) if the manufacturer is outside the EU: the responsible person in the EU (not applicable, Walterin is in the EU);
(c) information to identify the product, incl. its picture, type and any other identifier;
(d) warnings or safety information in a language easily understood by consumers, as required by EU or national law.

**Built in the draft theme:** section "Legal info" (`sections/walterin-legal-info.liquid`) on every product template. It shows (a) and (c) automatically. It shows (d) only from the product metafield `custom.safety_info`, so nothing is invented.

## Fixed data (confirmed)
- Manufacturer: Walterin s. r. o., Ľubochnianska 4, 831 04 Bratislava – Nové Mesto, Slovakia, support@walterin.com (SK: Výrobca … Slovensko)
- Identifier: product title + variant (edition) + SKU/EAN once they exist (SKU scheme pending Pack4you)

## Per product: to fill (Walter / printer), then enter in the metafield `custom.safety_info`
| Product | Safety notes EN | Safety notes SK | Source |
|---|---|---|---|
| Comics Tarot of Consciousness | [TO FILL, e.g. age warning if any, material] | [DOPLNIŤ] | printer's product data |
| Walterin Prague (printed) | [TO FILL] | [DOPLNIŤ] | printer |
| Sticker set | [TO FILL – e.g. small-parts / not a toy, if the printer says so] | [DOPLNIŤ] | printer |
| T-shirt | [TO FILL – material composition (Textile Reg. 1007/2011), care] | [DOPLNIŤ] | supplier |

Don't guess. If the printer confirms no warnings are required, enter "No special safety warnings." / "Bez osobitných bezpečnostných upozornení." (only once confirmed).

Note: the metafield `custom.safety_info` (type: multi-line text) still has to be created in admin (Settings → Custom data → Products). That's a store write, so it's in the approval list.
