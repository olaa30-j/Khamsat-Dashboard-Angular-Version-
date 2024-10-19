/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors:{
        primary:"#1C4E80",
        secondary:"#A5D8DD",
        break:"#EA6A47",
        grey:" #7E909A"
      }
    },
  },
  plugins: [],
}