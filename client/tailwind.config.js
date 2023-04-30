const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        xs: "550px",
        lg: "850px",
        ...defaultTheme.screens,
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
