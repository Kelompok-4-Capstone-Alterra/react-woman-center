/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        right: "1px 0 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);",
      },
      colors: {
        primaryPressed: "#913175",
        secondary: "#BDB728",
        primaryMain: "#AF1582",
        primaryBorder: "#B5589A",
      },
    },
  },
  plugins: [],
};
