import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
      fontFamily: {
        // Noto Sans CJK JP
        notoSansCjkJp: ['noto-sans-cjk-jp', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config;
