import type { Config } from 'tailwindcss';
import preset from './src/tailwind';

export default {
  corePlugins: {
    preflight: false,
  },
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  presets: [preset],
  variants: {},
  plugins: [],
} satisfies Config;
