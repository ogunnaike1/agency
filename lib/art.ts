// Unsplash photography (free licence); a flat dusty-blue wash keeps it inside the palette. Swap for client imagery any time.
const u = (id: string) => `linear-gradient(rgba(198,212,223,.3),rgba(198,212,223,.3)),url(https://images.unsplash.com/${id}?auto=format&fit=crop&w=1800&q=70) center/cover no-repeat #C6D4DF`;
export const ART = [
  u('photo-1487958449943-2429e8be8625'), // hero: pale architecture
  u('photo-1524758631624-e2822e304c36'), // capabilities: bright studio interior
  u('photo-1519389950473-47ba0277781c'), // work: desk workspace
  u('photo-1441974231531-c6227db76b6e'), // process: forest
];

/** Same photography, cropped differently per use. */
export const artBg = (i: number, pos = 'center') => ART[i % ART.length].replace('center/cover', `${pos}/cover`);
