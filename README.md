# Cocochet Catalogue — Kaise Use Kare

Yeh ek simple website hai (sirf HTML, CSS, JS — koi build tool nahi chahiye)
jisme tumhare saare keychains/bouquets/charms category ke hisaab se dikhte hain
with name aur price.

## Files kya karti hain

- `index.html` → page ka structure (isko chhedne ki zarurat nahi)
- `styles.css` → look & feel / design (isko bhi chhedne ki zarurat nahi)
- `script.js` → categories aur cards khud-ba-khud banata hai (isko bhi mat chhedo)
- `products.js` → **yehi ek file hai jo tumhe baar baar edit karni hai**
- `images/` → saari product photos yahin rakhni hai

## Naya item add karna

1. Photo ko `images` folder mein copy karo (chhota, clear photo — phone se
   khinchi hui bhi chalegi, JPG ya PNG dono chalega).
2. `products.js` file kholo, sabse neeche wale item ke baad ek naya block
   jodo, jaise:

```js
{ name: "Rose Bouquet Charm", price: 249, category: "Bouquets", image: "images/rose-bouquet-charm.jpg" },
```

3. Save karo. Bas — website apne aap update ho jayegi.

## Price ya naam change karna

`products.js` mein us item ki line dhundo aur `name` ya `price` badal do.

## Item hatana

Uska poora block `{ ... }` delete kar do.

## Nayi category banani ho (jaise "Phone Charms")

Bas kisi item ki `category: "Charms"` ko `category: "Phone Charms"` kar do —
navbar mein woh naya category button apne aap aa jayega. Alag se kahin
kuch add karne ki zarurat nahi.

## GitHub Pages pe host karna (free, live link milega)

1. GitHub par ek naya repository banao (public), jaise `cocochet-catalogue`.
2. Is poore folder (`index.html`, `styles.css`, `script.js`, `products.js`,
   `images/`) ko us repository mein upload kar do.
   - Website (github.com) par "Add file" → "Upload files" se seedha
     drag-drop kar sakti ho, koi command line zarurat nahi.
3. Repository ke **Settings → Pages** mein jao.
4. "Branch" mein `main` select karo, folder `/ (root)` rakho, aur **Save**
   dabao.
5. 1-2 minute mein GitHub ek live link de dega, kuch aisa:
   `https://<username>.github.io/cocochet-catalogue/`
6. Jab bhi `products.js` mein koi change karke seedha GitHub par save
   (commit) karogi, wahi live link apne aap update ho jayega — dobara upload
   ya deploy karne ki zarurat nahi.

## Photo tips (taaki site fast aur clean lage)

- Photo ko square crop rakhna best rehta hai (item center mein).
- Bahut badi photo (5-10 MB wali) daalne se pehle usko chhota kar lo —
  1000px chaudi photo bhi kaafi clear dikhti hai aur site fast load hoti hai.
