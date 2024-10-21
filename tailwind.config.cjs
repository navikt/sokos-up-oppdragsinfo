module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx,css}"],
  theme: {
    extend: {
      minWidth: {
        128: "32rem",
        1024: "68rem",
        1400: "87.5rem",
      },
    },
  },
  plugins: [],
};
