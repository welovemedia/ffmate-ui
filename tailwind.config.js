/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./composables/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./nuxt.config.{js,ts}",
  ],

  theme: {
    fontFamily: {
      body: "Poppins",
    },

    extend: {
      colors: {
        primary: {
          50: "#ecfdf4",
          100: "#d2f9e3",
          200: "#a9f1cd",
          300: "#71e4b1",
          400: "#47d299",
          500: "#15b478",
          600: "#099261",
          700: "#077551",
          800: "#095c41",
          900: "#084c37",
          950: "#032b1f",
        },
        gray: {
          300: "#D1D5DB",
          350: "#B1B1BB",
          400: "#9A9A9A",
          500: "#636363",
          600: "#414141",
          650: "#313131",
          700: "#292929",
          750: "#202020",
          800: "#18181b",
          900: "#0C0C0C",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
