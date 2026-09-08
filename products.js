/*
  ============================================================
  COCOCHET — PRODUCT LIST
  ============================================================
  Yeh file hi tumhara "catalogue" hai. Website ka look kabhi
  chhedne ki zarurat nahi — bas neeche di list mein items
  ADD / REMOVE / EDIT karo, save karo, aur naya price ya item
  turant site pe dikhega.

  HAR ITEM EK BLOCK HAI:
  {
    name: "Item ka naam",       -> jo user ko dikhega
    price: 149,                  -> sirf number likhna, ₹ apne aap lag jayega
    category: "Keychains",       -> jis category mein dikhana hai
    image: "images/xyz.jpeg"      -> image ka file naam (images folder ke andar)
  },

  --------------------------------------------------------------
  NAYA ITEM ADD KARNA HO:
  2. Neeche list mein sabse last item ke baad ek naya block { } bana lo
     (bilkul jaise doosre items bane hain, comma { }, lagana mat bhoolna)
  3. Save kar do — bas ho gaya.

  ITEM HATANA HO:
  - Us item ka poora block { ... }, delete kar do.

  PRICE / NAAM BADALNA HO:
  - Sirf uss item ke andar "name" ya "price" ki value badal do.

  NAYI CATEGORY BANANI HO (jaise "Bouquets", "Phone Charms" etc):
  - Bas kisi bhi item ki "category" mein woh naya naam likh do,
    category apne aap navbar mein dikhne lagegi. Alag se kahin
    aur kuch likhne ki zarurat nahi.
  --------------------------------------------------------------
*/

window.PRODUCTS = [
  { name: "Avocado Keychain", price: 90, category: "Keychains", image: "images/avacado.jpeg" },

  { name: "Minion Keychain", price: 100, category: "Keychains", image: "images/minion.jpeg" },

  { name: "Octopus Keychain", price: 80, category: "Keychains", image: "images/octupas-group.jpeg" },

  { name: "Strawberry Keychain", price: 80, category: "Keychains", image: "images/strawberry.jpeg" },

  { name: "Pineapple Keychain", price: 70, category: "Keychains", image: "images/pineapple.jpeg" },

  { name: "Evil Eye Keychain", price: 60, category: "Keychains", image: "images/evil-eye-2.jpg" },

  { name: "Bee Keychain", price: 80, category: "Keychains", image: "images/bees.jpeg" },

  { name: "Star Keychain", price: 80, category: "Keychains", image: "images/star.jpeg" },

  { name: "Mushroom Keychain", price: 60, category: "Keychains", image: "images/mushroom.jpeg" },

  { name: "Chick Keychain", price: 100, category: "Keychains", image: "images/chick.jpeg" },

  { name: "Strawberry Bouquet Keychain", price: 120, category: "Keychains", image: "images/strawberry-bouquet-Keychain.jpeg" },

  { name: "Volleyball Keychain", price: 80, category: "Keychains", image: "images/volleyball.jpg" },

  { name: "Burger Keychain", price: 80, category: "Keychains", image: "images/burger.jpg" },

  { name: "Capsule Keychain", price: 80, category: "Keychains", image: "images/capsules.jpg" },

  { name: "Coffee Mug Keychain", price: 80, category: "Keychains", image: "images/coffee-mug.jpg" },

  { name: "Rose Keychain", price: 100, category: "Keychains", image: "images/rose.jpg" },

  { name: "Watermelon & Lemon Slice Keychain", price: 50, category: "Keychains", image: "images/watermelon-lemon-keychain.jpeg" },

  { name: "Spiderman Face Keychain", price: 60, category: "Keychains", image: "images/spiderman-face-keychain.jpeg" },
  { name: "Dolphin", price: 60, category: "Keychains", image: "images/dolphin.jpeg" },

  { name: "Baby Mushroom Keychain", price: 120, category: "Keychains", image: "images/baby-mushroom-keychain.jpeg" },

  { name: "Teddy Bear Keychain", price: 200, category: "Keychains", image: "images/teddy-bear-keychain.jpeg" },

  { name: "Strawberry & Cigarette Keychain", price: 120, category: "Keychains", image: "images/strawberry-cig.jpeg" },

  { name: "Tomato", price: 120, category: "Keychains", image: "images/tomato.jpeg" },

  { name: "Tulip Potted Plant", price: 300, category: "Home Decor", image: "images/tulip-potted-plant.jpg" },

  { name: "Sunflower Stem - Single", price: 120, category: "Home Decor", image: "images/sunflower-stem.jpeg" },

  { name: "Photo Holder - Single", price: 200, category: "Photo-Holder", image: "images/photo-holder.jpeg" },

  { name: "Spider Man", price: 250, category: "Charms", image: "images/spider-man.jpeg" },

];

