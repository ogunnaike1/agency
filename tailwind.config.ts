import type { Config } from 'tailwindcss';
export default {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        white: '#FFFFFF', soft: '#F3F5F7', dusty: '#C6D4DF', stone: '#C6D4DF', silver: '#C6D4DF', steel: '#718CA4',
        graphite: '#222B33', slate: 'rgb(34 43 51 / 0.74)', // slate = graphite at 74%: secondary text
        diff: '#DDD4CC', // for mix-blend-difference text: renders exactly graphite on white, lightens over dark plates
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'sans-serif'],
        display: ['var(--font-display)', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      letterSpacing: { tightest: '-.045em' },
    },
  },
  plugins: [],
} satisfies Config;
