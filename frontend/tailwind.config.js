/** @type {import('tailwindcss').Config} */
const colors = require("material-ui-colors");

module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: { ...colors },
    },
  },
  plugins: [],
};
