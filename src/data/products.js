/* ==========================================================================
   THE ONLY FILE YOU EDIT TO ADD PRODUCTS
   --------------------------------------------------------------------------
   1. Drop your square Canva export into  src/assets/
      Rules for the filename: lowercase, hyphens, no spaces, no accents.
      Good:  tazra-coral-01.jpg      Bad:  WhatsApp Image 2026 (1).jpeg
   2. Add an `import` line at the top of this file.
   3. Add an object to the `products` array below.
   That's it — the gallery, the filter chips and the counter all update.

   `category` must be one of the ids in `categories` further down.
   `images` takes 1..n frames. If you give it more than one, the card turns
   into a swipeable carousel with dots, exactly like an Instagram post.
   ========================================================================== */

import chokerEnamel from '../assets/choker-enamel.jpg'
import coralNecklace from '../assets/coral-necklace.jpg'
import kaftanSaffron from '../assets/kaftan-saffron.jpg'
import baboucheP0mpom from '../assets/babouche-pompom.jpg'
import collectionFlatlay from '../assets/collection-flatlay.jpg'

export const categories = [
  { id: 'all', label: 'Everything' },
  { id: 'silver', label: 'Silver' },
  { id: 'dress', label: 'Dress' },
  { id: 'leather', label: 'Leather' },
]

export const products = [
  {
    id: 'tazra-enamel-choker',
    name: 'Tazra enamel choker',
    tifinagh: 'ⵜⴰⵣⵔⴰ',
    category: 'silver',
    origin: 'Tiznit',
    price: 1450,
    note: 'Cloisonné enamel in green and coral over hand-raised silver, hung with old coin drops.',
    images: [chokerEnamel],
  },
  {
    id: 'coral-bead-necklace',
    name: 'Coral and silver bead necklace',
    tifinagh: 'ⵜⴰⵣⵍⴰⴳⵜ',
    category: 'silver',
    origin: 'Anti-Atlas',
    price: 980,
    note: 'Mediterranean coral strung with silver capsules, stamped coins and two horn charms.',
    images: [coralNecklace],
  },
  {
    id: 'saffron-tamlhaft',
    name: 'Saffron tamlhaft',
    tifinagh: 'ⵜⴰⵎⵍⵃⴰⴼⵜ',
    category: 'dress',
    origin: 'Souss valley',
    price: 1290,
    note: 'Marigold crepe with sfifa braid running the full length of the placket and wool pompoms.',
    images: [kaftanSaffron],
  },
  {
    id: 'belgha-pompom',
    name: 'Belgha with wool pompoms',
    tifinagh: 'ⵉⴷⵓⴽⴰⵏ',
    category: 'leather',
    origin: 'Taroudant',
    price: 640,
    note: 'Goat leather, embroidered by hand over four days, on a stacked sole dyed in the tannery.',
    images: [baboucheP0mpom],
  },
  {
    id: 'tamghra-set',
    name: 'The tamghra wedding set',
    tifinagh: 'ⵜⴰⵎⵖⵔⴰ',
    category: 'dress',
    origin: 'Made to order',
    price: 7800,
    note: 'Eight pieces: two kaftans, the velvet head veil, the belt, and the full silver parure.',
    images: [collectionFlatlay],
  },
  {
    id: 'tazerzitt-fibula',
    name: 'Tazerzitt fibula, pair',
    tifinagh: 'ⵜⴰⵣⵔⵣⵉⵜ',
    category: 'silver',
    origin: 'Tiznit',
    price: 2100,
    note: 'The brooch the shop is named after. Two triangular plates joined by a coral chain.',
    images: [collectionFlatlay, chokerEnamel],
  },
]

/* fr-MA's Intl output renders as "1.450 MAD", which reads like a decimal.
   Thin-space grouping is unambiguous at a glance. Change 'MAD' to 'EUR' /
   'USD' here if you sell in another currency. */
export const formatPrice = (value) =>
  `${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '\u2009')} MAD`
