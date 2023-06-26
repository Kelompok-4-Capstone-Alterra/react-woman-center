/** @type {import('tailwindcss').Config} */

import plugin from "tailwindcss/plugin";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ["Roboto", "sans-serif"],
    },
    extend: {
      boxShadow: {
        right: "1px 0 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);",
      },
      colors: {
        primaryMain: "#AF1582",
        primaryHover: "#954E80",
        primaryPressed: "#913175",
        primaryBorder: "#B5589A",
        secondaryMain: "#BDB728",
        secondaryHover: "#AEAB59",
        secondaryPressed: "#9A8A23",
        secondarySurface: "#E3DDB2",
        secondaryBorder: "#EADB7D",
        successMain: "#0E9325",
        dangerMain: "#B3261E",
        neutralMedium: "#6B6161",
        neutralHigh: "#282424",
        neutralMediumLow: "#9E9494",
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    plugin(function ({ addUtilities }) {
      addUtilities({
        ".no-scrollbar::-webkit-scrollbar": {
          display: "none",
        },
        ".no-scrollbar": {
          "-ms-overflow-style": "none",
          "scrollbar-width": "none",
        },
        ".no-appereance": {
          appereance: "none",
          "-webkit-appearance": "none",
          "-moz-appearance": "none",
        },
        ".capitalize-first::first-letter": {
          textTransform: "uppercase",
        },
      });
    }),
  ],
};
