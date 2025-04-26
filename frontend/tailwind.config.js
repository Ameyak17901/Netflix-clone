import tailwindScrollbarHide from 'tailwind-scrollbar-hide'

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [tailwindScrollbarHide],
};
