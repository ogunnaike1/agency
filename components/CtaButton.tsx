'use client';
import Link from 'next/link';

const SIZE = {
  sm: 'rounded-[10px] px-5 py-[13px] text-[13px]',
  md: 'rounded-[14px] px-8 py-4 text-[15px]',
} as const;

type Common = { children: string; size?: keyof typeof SIZE; className?: string };
type AsLink = Common & { href: string } & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'children'>;
type AsButton = Common & { href?: undefined } & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'>;

/** Rounded graphite block; on hover a steel fill sweeps across from the left and the text turns graphite. Renders a <button> when no href. */
export default function CtaButton(props: AsLink | AsButton) {
  const { children, size = 'md', className = '', ...rest } = props;
  const cls = `group relative inline-flex items-center justify-center overflow-hidden border border-graphite bg-graphite font-medium leading-none text-white transition-colors duration-500 hover:text-graphite ${SIZE[size]} ${className}`;
  const inner = (<>
    <span aria-hidden className="absolute inset-0 origin-left scale-x-0 bg-steel transition-transform duration-[600ms] ease-[cubic-bezier(.65,0,.2,1)] group-hover:scale-x-100" />
    <span className="relative">{children}</span>
  </>);
  if ('href' in rest && rest.href !== undefined) return <Link {...(rest as AsLink)} className={cls}>{inner}</Link>;
  return <button type="button" {...(rest as AsButton)} className={cls}>{inner}</button>;
}
