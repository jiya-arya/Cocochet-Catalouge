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
    image: "images/xyz.jpg"      -> image ka file naam (images folder ke andar)
  },

  --------------------------------------------------------------
  NAYA ITEM ADD KARNA HO:
  1. Uski photo "images" folder mein daal do (jaise: images/rose-bouquet.jpg)
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
  { name: "Avocado Duo Keychain", price: 149, category: "Keychains", image: "images/avocado-duo-keychain.jpg" },
  { name: "Minion Keychain", price: 149, category: "Keychains", image: "images/minion-keychain.jpg" },
  { name: "Frog & Octopus Duo Keychain", price: 149, category: "Keychains", image: "images/frog-octopus-duo-keychain.jpg" },
  { name: "Strawberry Keychain", price: 149, category: "Keychains", image: "images/strawberry-keychain.jpg" },
  { name: "Snow Buddies Duo Keychain", price: 149, category: "Keychains", image: "images/snow-duo-keychain.jpg" },
  { name: "Lemon Duo Keychain", price: 149, category: "Keychains", image: "images/lemon-duo-keychain.jpg" },
  { name: "Radish Duo Keychain", price: 149, category: "Keychains", image: "images/radish-duo-keychain.jpg" },
  { name: "Bee Duo Keychain", price: 149, category: "Keychains", image: "images/bee-duo-keychain.jpg" },
  { name: "Star Keychain", price: 129, category: "Keychains", image: "images/star-keychain.jpg" },
  { name: "Orange Duo Keychain", price: 149, category: "Keychains", image: "images/orange-duo-keychain.jpg" },
  { name: "Mushroom Duo Keychain", price: 149, category: "Keychains", image: "images/mushroom-duo-keychain.jpg" },
  { name: "Penguin Duo Keychain", price: 149, category: "Keychains", image: "images/penguin-duo-keychain.jpg" },
  { name: "Chick Keychain", price: 129, category: "Keychains", image: "images/chick-keychain.jpg" },
  { name: "Chick with Bow Duo Keychain", price: 149, category: "Keychains", image: "images/chick-bow-duo-keychain.jpg" },
  { name: "Volleyball Duo Keychain", price: 149, category: "Keychains", image: "images/volleyball-duo-keychain.jpg" },
  { name: "Watermelon & Lemon Slice Keychain", price: 149, category: "Keychains", image: "images/watermelon-lemon-keychain.jpg" },
  { name: "Spiderman Keychain", price: 149, category: "Keychains", image: "images/spiderman-keychain.jpg" },
  { name: "Mushroom Trio Keychain", price: 199, category: "Keychains", image: "images/mushroom-trio-keychain.jpg" },
  { name: "Teddy Bear Keychain", price: 149, category: "Keychains", image: "images/teddy-bear-keychain.jpg" },

  { name: "Daisy Flower Keychain", price: 179, category: "Bouquets", image: "images/daisy-flower-keychain.jpg" },
  { name: "Strawberry Bouquet Charm", price: 249, category: "Bouquets", image: "images/strawberry-bouquet-charm.jpg" },
  { name: "Tulip Potted Plant", price: 349, category: "Bouquets", image: "images/tulip-potted-plant.jpg" },

  { name: "Chocolate Bag Charm", price: 199, category: "Charms", image: "images/star.jpeg" },
];

