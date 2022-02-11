module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],

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
        "picton-blue": {
          DEFAULT: "#5EB0E8",
          50: "#EBF5FC",
          100: "#DBEDFA",
          200: "#BCDEF5",
          300: "#9CCFF1",
          400: "#7DBFEC",
          500: "#5EB0E8",
          600: "#2D98E1",
          700: "#1B7ABB",
          800: "#145A8A",
          900: "#0D3A59",
        },
        lochmara: {
          DEFAULT: "#008DCA",
          50: "#83D9FF",
          100: "#6ED3FF",
          200: "#45C7FF",
          300: "#1DBBFF",
          400: "#00A9F3",
          500: "#008DCA",
          600: "#0074A6",
          700: "#005B83",
          800: "#00425F",
          900: "#00293B",
        },
        "midnight-blue": {
          DEFAULT: "#002C5F",
          50: "#1883FF",
          100: "#0378FF",
          200: "#0065D9",
          300: "#0052B1",
          400: "#003F88",
          500: "#002C5F",
          600: "#002550",
          700: "#001E40",
          800: "#001731",
          900: "#001022",
        },
        "who-green": "#00A173",
        "who-yellow": "#FFCC03",
        "who-orange": {
          light: "#E7A113",
          dark: "#D46120",
        },
        danger: "#d82038",
        "who-purple": "#7236D6",
      },
    },
  },
  plugins: [
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/forms")({ strategy: "class" }),
  ],
};
