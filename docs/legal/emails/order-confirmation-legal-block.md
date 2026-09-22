# Order confirmation: legal block (EN + SK)

> DRAFT for legal review. **Where:** Shopify admin → Settings → Notifications → Customer notifications → **Order confirmation** → Edit code. Paste the EN block at the end of the email body, just above the footer. **SK:** paste the SK block into the Slovak translation of the same notification (Translate & Adapt → Notifications, or the language switcher in the notification editor). [TO CONFIRM: how the SK translation of notifications is set up in this store]
> Shopify notifications can't be written by API, so Veronka pastes these by hand.
> **Why:** § 17(12) of 108/2024: confirmation of the contract on a durable medium, incl. withdrawal info and, for eBooks, the consent confirmation (§ 17(12)(b), a condition for § 19(1)(m)). A link alone is risky (CJEU C-49/11), so the withdrawal instructions and form are included as full text.

## EN block

```liquid
<table class="row"><tr><td style="padding-top:24px;font-size:14px;line-height:1.5;color:#222;">

<p><strong>Your contract with Walterin</strong><br>
This email confirms your order and the contract between you and Walterin s. r. o., Ľubochnianska 4, 831 04 Bratislava – Nové Mesto, Slovakia, IČO 57297991, support@walterin.com, +421 905 549 907. Our Terms and Conditions apply in the version valid on {{ created_at | date: "%-d %B %Y" }}: <a href="{{ shop.url }}/policies/terms-of-service">{{ shop.url }}/policies/terms-of-service</a>.</p>

{%- if attributes['eBook consent'] -%}
<p><strong>eBook: your consent</strong><br>
Before checkout you gave this declaration: “{{ attributes['eBook consent'] }}”<br>
This confirms your express consent to delivery of the eBook starting before the end of the withdrawal period, and your acknowledgement that you thereby lose your right of withdrawal for the eBook(s) in this order (§ 19(1)(m) of Act No. 108/2024 Coll.). Your right of withdrawal for physical goods in this order is not affected.</p>
{%- endif -%}

<p><strong>Right of withdrawal</strong><br>
You have the right to withdraw from this contract within 14 days without giving any reason. For goods, the period expires 14 days after the day on which you, or a third party other than the carrier and indicated by you, acquire physical possession of the goods (for several goods delivered separately: of the last good). For an eBook, it expires 14 days after the conclusion of the contract.<br>
To withdraw, inform us (Walterin s. r. o., Ľubochnianska 4, 831 04 Bratislava – Nové Mesto, Slovakia, +421 905 549 907, support@walterin.com) of your decision by an unequivocal statement (e.g. a letter sent by post or email). You may use the model withdrawal form below, but it is not obligatory. You can also withdraw online at <a href="{{ shop.url }}/pages/withdrawal">{{ shop.url }}/pages/withdrawal</a> ("Withdraw from contract here" in the footer of the store). If you use this online feature, we will send you an acknowledgement of receipt on a durable medium (e.g. by email), including its content and the date and time of its submission, without undue delay. To meet the deadline, it is sufficient to send your communication before the withdrawal period has expired.</p>

<p><strong>Effects of withdrawal</strong><br>
If you withdraw from this contract, we shall reimburse to you all payments received from you, including the costs of delivery (with the exception of the supplementary costs resulting from your choice of a type of delivery other than the least expensive type of standard delivery offered by us), without undue delay and in any event not later than 14 days from the day on which we are informed about your decision to withdraw. We will use the same means of payment as you used for the initial transaction, unless you have expressly agreed otherwise; you will not incur any fees. We may withhold reimbursement until we have received the goods back or you have supplied evidence of having sent back the goods, whichever is the earliest. You shall send back the goods to [TO CONFIRM – return address] without undue delay and in any event not later than 14 days from the day on which you communicate your withdrawal to us. The deadline is met if you send back the goods before the 14 days have expired. You will have to bear the direct cost of returning the goods. You are only liable for any diminished value of the goods resulting from handling other than what is necessary to establish the nature, characteristics and functioning of the goods.</p>

<p><strong>Model withdrawal form</strong> (complete and return only if you wish to withdraw)<br>
— To: Walterin s. r. o., Ľubochnianska 4, 831 04 Bratislava – Nové Mesto, Slovakia, support@walterin.com<br>
— I/We (*) hereby give notice that I/We (*) withdraw from my/our (*) contract of sale of the following goods (*)/for the supply of the following digital content (*): …<br>
— Ordered on (*)/received on (*): …<br>
— Name of consumer(s): …<br>
— Address of consumer(s): …<br>
— Signature of consumer(s) (only if this form is notified on paper): …<br>
— Date: …<br>
(*) Delete as appropriate.</p>

<p><strong>Legal guarantee</strong><br>
We are liable for defects in goods that appear within 24 months of delivery (eBooks: 24 months from supply). Claims: support@walterin.com. Details: <a href="{{ shop.url }}/policies/refund-policy">{{ shop.url }}/policies/refund-policy</a>.</p>

</td></tr></table>
```

## SK block

```liquid
<table class="row"><tr><td style="padding-top:24px;font-size:14px;line-height:1.5;color:#222;">

<p><strong>Vaša zmluva s Walterin</strong><br>
Tento e-mail potvrdzuje vašu objednávku a zmluvu medzi vami a spoločnosťou Walterin s. r. o., Ľubochnianska 4, 831 04 Bratislava – Nové Mesto, IČO 57297991, support@walterin.com, +421 905 549 907. Platia naše Všeobecné obchodné podmienky v znení platnom ku dňu {{ created_at | date: "%-d. %-m. %Y" }}: <a href="{{ shop.url }}/sk/policies/terms-of-service">{{ shop.url }}/sk/policies/terms-of-service</a>.</p>

{%- if attributes['eBook consent'] -%}
<p><strong>E-kniha: váš súhlas</strong><br>
Pred prechodom do pokladne ste urobili toto vyhlásenie: „{{ attributes['eBook consent'] }}“<br>
Týmto potvrdzujeme váš výslovný súhlas so začatím dodania e-knihy pred uplynutím lehoty na odstúpenie od zmluvy a vaše vyhlásenie, že ste boli poučení, že tým strácate právo na odstúpenie od zmluvy pri e-knihách v tejto objednávke (§ 19 ods. 1 písm. m) zákona č. 108/2024 Z. z.). Vaše právo na odstúpenie pri fyzickom tovare v tejto objednávke tým nie je dotknuté.</p>
{%- endif -%}

<p><strong>Právo na odstúpenie od zmluvy</strong><br>
Máte právo odstúpiť od tejto zmluvy bez uvedenia dôvodu v lehote 14 dní. Pri tovare lehota uplynie po 14 dňoch odo dňa, keď Vy alebo Vami určená tretia osoba okrem dopravcu prevezmete tovar (pri viacerých tovaroch dodaných oddelene: tovar dodaný ako posledný). Pri e-knihe uplynie po 14 dňoch odo dňa uzavretia zmluvy.<br>
Pri uplatnení práva na odstúpenie od zmluvy nás informujte o svojom rozhodnutí odstúpiť od tejto zmluvy jednoznačným vyhlásením (napríklad listom zaslaným poštou alebo e-mailom) na adrese: Walterin s. r. o., Ľubochnianska 4, 831 04 Bratislava – Nové Mesto, telefón +421 905 549 907, e-mail support@walterin.com. Na tento účel môžete použiť vzorový formulár nižšie, jeho použitie však nie je povinné. Právo na odstúpenie od zmluvy môžete uplatniť aj online na adrese <a href="{{ shop.url }}/sk/pages/withdrawal">{{ shop.url }}/sk/pages/withdrawal</a> (odkaz „Odstúpiť od zmluvy tu“ v pätičke obchodu). Ak využijete túto možnosť, potvrdenie o doručení odstúpenia od zmluvy vrátane jeho obsahu, dátumu a času jeho odoslania Vám bezodkladne poskytneme na trvanlivom médiu (napríklad e-mailom). Lehota na odstúpenie od zmluvy je zachovaná, ak zašlete oznámenie o uplatnení práva na odstúpenie od zmluvy pred tým, ako uplynie lehota na odstúpenie od zmluvy.</p>

<p><strong>Dôsledky odstúpenia od zmluvy</strong><br>
Po odstúpení od zmluvy Vám vrátime všetky platby, ktoré ste uhradili v súvislosti s uzavretím zmluvy, vrátane nákladov na doručenie tovaru k Vám. To sa nevzťahuje na dodatočné náklady, ak ste si zvolili iný druh doručenia, ako je najlacnejší bežný spôsob doručenia, ktorý ponúkame. Platby Vám budú vrátené najneskôr do 14 dní odo dňa, keď nám bude doručené Vaše oznámenie o odstúpení od tejto zmluvy. Úhrada bude uskutočnená rovnakým spôsobom, aký ste použili pri Vašej platbe, ak ste výslovne nesúhlasili s iným spôsobom úhrady, a to bez účtovania akýchkoľvek ďalších poplatkov. S vrátením platby môžeme čakať do vrátenia tovaru späť na našu adresu alebo do preukázania, že ste tovar odoslali späť, podľa toho, čo nastane skôr. Zašlite nám tovar späť alebo ho prineste na našu adresu [NA POTVRDENIE – adresa na vrátenie] najneskôr do 14 dní odo dňa uplatnenia práva na odstúpenie od zmluvy. Lehota sa považuje za zachovanú, ak tovar odošlete späť pred uplynutím 14-dňovej lehoty. Priame náklady na vrátenie tovaru znášate Vy. Zodpovedáte len za akékoľvek zníženie hodnoty tovaru v dôsledku zaobchádzania s ním iným spôsobom, aký je potrebný na zistenie povahy, vlastností a funkčnosti tovaru.</p>

<p><strong>Vzorový formulár na odstúpenie od zmluvy</strong> (vyplňte a zašlite, len ak si želáte odstúpiť od zmluvy)<br>
– Komu: Walterin s. r. o., Ľubochnianska 4, 831 04 Bratislava – Nové Mesto, support@walterin.com<br>
– Týmto oznamujem/oznamujeme*, že odstupujem/odstupujeme* od zmluvy o dodaní alebo poskytnutí tohto produktu: …<br>
– Dátum objednania/dátum prijatia*: …<br>
– Meno a priezvisko spotrebiteľa/spotrebiteľov*: …<br>
– Adresa spotrebiteľa/spotrebiteľov*: …<br>
– Podpis spotrebiteľa/spotrebiteľov* (ak sa tento formulár podáva v listinnej podobe): …<br>
– Dátum: …<br>
* Nehodiace sa prečiarknite.</p>

<p><strong>Zákonná záruka</strong><br>
Za vady tovaru zodpovedáme 24 mesiacov od prevzatia (e-knihy 24 mesiacov od dodania). Reklamácie: support@walterin.com. Podrobnosti: <a href="{{ shop.url }}/sk/policies/refund-policy">{{ shop.url }}/sk/policies/refund-policy</a>.</p>

</td></tr></table>
```

## After pasting
- Send a test notification (Shopify: "Send test email") in EN and SK and check that the block renders.
- Test with a real test order that contains an eBook, to check that `attributes['eBook consent']` shows up (it only exists on real orders placed through the draft theme's cart).
