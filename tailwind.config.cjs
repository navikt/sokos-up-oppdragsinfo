/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx,css}"],
  theme: {
    extend: {minWidth: {
        '128': '32rem',
      }},
  },
  plugins: [],
};
