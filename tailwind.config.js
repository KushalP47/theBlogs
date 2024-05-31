/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'white': '#f9f4ec',
      'black': '#201f1f',
      'orange': '#ee5626'
    },
  },
  plugins: [],
}