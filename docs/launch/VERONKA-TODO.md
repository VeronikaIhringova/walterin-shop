# Veronka – čo musíš urobiť sama (v tomto poradí)

1. **Schváliť zoznam zápisov:** prečítaj `docs/launch/APPROVAL-LIST.md` a odpíš „OK all“ alebo čísla položiek.
2. **Účtovník:** pošli e-mail z `docs/launch/accountant.md` (doplň dátum `[DÁTUM]`). Odpovede posielaj mne, zapracujem ich.
3. **Stripe naostro:** Shopify admin → Settings → Payments → Stripe → skontroluj, že nie je zapnutý testovací režim, výplaty idú na firemný účet a na výpise sa zobrazuje „WALTERIN“.
4. **Revolut a PayPal ikonky:** Settings → Payments → skontroluj, prečo sa v pätičke zobrazujú ikonky Revolut a PayPal. Vypni, čo nepoužívaš.
5. **PayPal:** Settings → Payments → Add payment methods → PayPal → dokonči nastavenie. Potom mi daj vedieť a doplním PayPal do textov.
6. **Aplikácia na odstúpenie od zmluvy:** Apps → Shopify App Store → nainštaluj „Revoq – EU Withdrawal Button“ (free plan). Ja potom prepojím odkaz v pätičke a doplním aplikáciu do zásad ochrany osobných údajov.
7. **Walter / tlačiareň:** údaje o bezpečnosti výrobku (varovania, materiál) pre karty, knihu, nálepky a tričko, ďalej rozmery, papier a hmotnosti, a pri tričku veľkosti a zloženie. Tabuľka je v `docs/legal/product-safety-gpsr.md`.
8. **Prečiarknutá cena pri Prahe:** Products → Walterin Prague → pri variantoch skontroluj „Compare-at price“ (35 €, „SAVE 45%“). Buď ho zmaž, alebo si over, že 35 € bola najnižšia cena za posledných 30 dní.
9. **Digital Products:** Apps → Digital Products → skontroluj, že každý variant e-knihy (Praha, Paríž; PDF + EPUB) má priložený súbor. Nastav počet stiahnutí a pošli mi, aké je to nastavenie.
10. **E-maily:** Settings → Notifications → Order confirmation → Edit code → vlož blok z `docs/legal/emails/order-confirmation-legal-block.md` (EN, a SK do slovenského prekladu). Potom „Send test email“.
11. **E-mail so stiahnutím:** Apps → Digital Products → Email → vlož texty z `docs/legal/emails/digital-download-email.md`.
12. **Odosielateľ e-mailov:** Settings → Notifications → Sender email → nastav support@walterin.com a over doménu (SPF/DKIM).
13. **Opustené košíky:** Settings → Checkout → Abandoned checkouts → „Send to: Customers subscribed to marketing“ (kým to nepotvrdí právnik).
14. **Právnik:** pošli mu `docs/legal/vop.sk.md`, `refund-policy.sk.md`, `withdrawal-instructions-and-form.sk.md`, `privacy-policy.sk.md`, `emails/`, `withdrawal-function-plan.md`. Otázky sú v hranatých zátvorkách [NA POTVRDENIE].
15. **Pack4you (keď bude aktuálne):** pošli `docs/launch/pack4you.md`.
16. **Publikovať draft tému:** Online Store → Themes → „Walterin Draft (Claude)“ → Publish. Až po bodoch 6, 7 a 10 a po mojom finálnom teste. Predtým mi napíš, pripravím texty s funkciou odstúpenia a stránku „withdrawal“.
17. **Publikovať slovenčinu:** Settings → Languages → Slovak → Publish. Spolu s draft témou, keď budú preložené texty sekcií.
18. **Testovacia objednávka:** Settings → Payments → Stripe test mode (alebo 100 % zľavový kód) → objednaj fyzický tovar, e-knihu aj oboje spolu, v EN aj SK. Skontroluj e-maily, súhlas pri e-knihe a odstúpenie cez pätičku. Potom vypni test mode.
