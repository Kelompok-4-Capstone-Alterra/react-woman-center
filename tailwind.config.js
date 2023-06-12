/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
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
      },
    },
  },
  plugins: [],
};
