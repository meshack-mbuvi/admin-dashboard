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
        mono: ["var(--font-slussen-mono)", ...fontFamily.mono],
      },
      colors: {
        black: "#000",
        white: "#fff",
        success: "#30E696",
        warning: "#FFA653",
        red: "#F14D4D",
        ultraviolet: "#627EEA",
        teal: "#01ECDE",
        gray: {
          1: "#F1F3F7",
          2: "#D9DDE5",
          3: "#B8BDC7",
          4: "#90949E",
          5: "#646871",
          6: "#3F4147",
          7: "#232529",
          8: "#131416",
          9: "#0B0C0D",
        },
        blue: {
          1: "#A4DEFF",
          neptune: "#4376FF",
        },
      },
    },
  },
  plugins: [],
}
