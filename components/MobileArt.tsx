import { artBg } from '@/lib/art';

/** Phones only: in-flow image block, so photography is never covered by (or squeezes) the copy. */
export default function MobileArt({ i, pos, className = '' }: { i: number; pos?: string; className?: string }) {
  return <div aria-hidden className={`aspect-[4/3] w-full border border-silver min-[900px]:hidden ${className}`} style={{ background: artBg(i, pos) }} />;
}
