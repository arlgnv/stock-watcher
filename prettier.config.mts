import type { Config } from 'prettier';

const config: Config = {
  singleQuote: true,
  endOfLine: 'auto',
  plugins: ['prettier-plugin-tailwindcss'],
  tailwindStylesheet: './app/globals.css',
};

export default config;
