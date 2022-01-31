module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    fontFamily: {
      sans: ['"Trebuchet MS"', '"Helvetica Neue"', "Helvetica", "sans-serif"],
    },
    extend: {
      maxWidth: {
        "8xl": "90rem",
      },
      colors: {
        "who-blue": {
          main: "#008DCA",
          light: "#5EB0E8",
          dark: "#002C5F",
        },
        "who-green": "#00A173",
        "who-yellow": "#FFCC03",
        "who-orange": {
          light: "#E7A113",
          dark: "#D46120",
        },
        danger: "#d82038",
        "who-purple": "#7236D6",
        "who-grey": {
          5: "#1A1A1A",
          4: "#4D4D4D",
          3: "#6A6A6A",
          2: "#878787",
          1: "#EBEBEB",
          0: "#FFFFFF",
        },
        "who-black": "#1A1A1A",
      },
    },
  },
  plugins: [
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/forms"),
  ],
}
