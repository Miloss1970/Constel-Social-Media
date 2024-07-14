/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        figmaRed: "#FF1515",

        figmaBlue: "#157EFF",
        figmaBlueShade: "#005BCA",

        figmaGray: "#F9F9F9",
        figmaGrayLight: "#D9D9D9",

        figmaGrayShade: "#A6A6A6",
        figmaGrayShade2: "#848484",
      },
    },
  },
  plugins: [],
};
