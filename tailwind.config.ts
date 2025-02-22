import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    screens: {
      // --------------------------------------------------
      // custom settings
      // --------------------------------------------------
      xsp: '376px',
      maxxsp: '375px',
      sp: '428px', // SP サイズ
      maxsp: { max: '427px' }, // SP サイズ max
      sptb: { min: '428px', max: '559px' }, // SP サイズ - タブレットサイズ

      tb: '600px', // タブレットサイズ
      maxtb: { max: '599px' }, // タブレットサイズ max
      tbpc: { min: '600px', max: '1023px' }, // タブレットサイズ - PC サイズ

      maxpc: { max: '1023px' }, // PC サイズ max
      pc: '1024px', // PC サイズ

      // --------------------------------------------------
      // tailwind default
      // --------------------------------------------------
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    },
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
