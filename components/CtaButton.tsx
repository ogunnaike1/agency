'use client';

const SIZE = {
  sm: 'rounded-[10px] px-5 py-[13px] text-[13px]',
  md: 'rounded-[14px] px-8 py-4 text-[15px]',
} as const;

/** Rounded graphite block; on hover a steel fill sweeps across from the left and the text turns graphite. */
export default function CtaButton({ href, children, size = 'md', className = '', ...rest }: { href: string; children: string; size?: keyof typeof SIZE; className?: string } & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'children'>) {
  return (
    <a href={href} {...rest} className={`group relative inline-flex items-center justify-center overflow-hidden border border-graphite bg-graphite font-medium leading-none text-white transition-colors duration-500 hover:text-graphite ${SIZE[size]} ${className}`}>
      <span aria-hidden className="absolute inset-0 origin-left scale-x-0 bg-steel transition-transform duration-[600ms] ease-[cubic-bezier(.65,0,.2,1)] group-hover:scale-x-100" />
      <span className="relative">{children}</span>
    </a>
  );
}
