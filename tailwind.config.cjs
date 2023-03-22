/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{svelte,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      /* padding: {
        '1/2': '50%',
        '1/6': '16.6%',
        full: '100%',
      }, */
    },
  },
  plugins: [],
}
