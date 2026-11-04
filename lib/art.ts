// Real project imagery from public/work, in scroll order for the Stage.
export const STAGE_IMAGES = [
  'eldorado-real-estate', 'qwampay', 'leave-your-legacy', 'ennylytics', 'motoka',
  'skin-essential-plus', 'solar-explainer', 'avanti-ristorante', 'banking-api', 'interior-concept',
  'stonechat', 'dortunez-atelier', 'cream-product-animation', 'salt-sapphire-advert', 'one-bedroom-interior',
].map((f) => `/work/${f}.jpg`);

// Flat-wash backgrounds for the phone image blocks (MobileArt).
const u = (src: string) => `linear-gradient(rgba(198,212,223,.18),rgba(198,212,223,.18)),url(${src}) top/cover no-repeat #C6D4DF`;
export const ART = STAGE_IMAGES.slice(0, 4).map(u);

/** Same imagery, cropped differently per use. */
export const artBg = (i: number, pos = 'top') => ART[i % ART.length].replace('top/cover', `${pos}/cover`);

// Original hero collage plates (Unsplash, free licence) used by the home Stage.
const h = (id: string) => `linear-gradient(rgba(198,212,223,.3),rgba(198,212,223,.3)),url(https://images.unsplash.com/${id}?auto=format&fit=crop&w=1800&q=70) center/cover no-repeat #C6D4DF`;
export const HERO_ART = [
  h('photo-1487958449943-2429e8be8625'),
  h('photo-1524758631624-e2822e304c36'),
  h('photo-1519389950473-47ba0277781c'),
  h('photo-1441974231531-c6227db76b6e'),
];
