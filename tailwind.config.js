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
          DEFAULT: "hsl(212, 100%, 19%)",
          0: "hsl(212, 100%, 90%)",
          50: "hsl(212, 100%, 85%)",
          100: "hsl(212, 100%, 80%)",
          200: "hsl(212, 100%, 70%)",
          300: "hsl(212, 100%, 60%)",
          400: "hsl(212, 100%, 40%)",
          500: "hsl(212, 100%, 30%)",
          600: "hsl(212, 100%, 25%)",
          700: "hsl(212, 100%, 19%)",
          800: "hsl(212, 100%, 15%)",
          900: "hsl(212, 100%, 10%)",
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
