import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      fontFamily: {
        quicksand: ['"Quicksand"', 'sans-serif']
      }
    }
  },
  plugins: []
};

export default config;