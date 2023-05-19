const { fontFamily } = require("tailwindcss/defaultTheme")

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-slussen)", ...fontFamily.sans],
      },
      colors: {
        black: "#000",
        white: "#fff",
        success: "#30E696",
        warning: "#FFA653",
        gray: {
          1: "#F1F3F7",
          2: "#D9DDE5",
          3: "#B8BDC7",
          4: "#90949E",
          5: "#646871",
          7: "#232529",
          8: "#131416",
          9: "#0B0C0D",
        },
        blue: {
          1: "#A4DEFF",
        }
      },
    },
  },
  plugins: [],
}
