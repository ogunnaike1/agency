/** Inline SVG arrows (currentColor). Replaces the ↗ ↑ ↓ glyphs, which iOS/Android render as coloured emoji tiles. */
type P = { className?: string };
const base = { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'square' as const, 'aria-hidden': true, focusable: false };
export const ArrowUpRight = ({ className = 'h-[1em] w-[1em]' }: P) => <svg {...base} className={`inline-block shrink-0 ${className}`}><path d="M7 17 17 7M8 7h9v9" /></svg>;
export const ArrowUp = ({ className = 'h-[1em] w-[1em]' }: P) => <svg {...base} className={`inline-block shrink-0 ${className}`}><path d="M12 20V5M6 11l6-6 6 6" /></svg>;
export const ArrowDown = ({ className = 'h-[1em] w-[1em]' }: P) => <svg {...base} className={`inline-block shrink-0 ${className}`}><path d="M12 4v15M6 13l6 6 6-6" /></svg>;
