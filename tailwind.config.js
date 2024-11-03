/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'bona-nova-regular': ['"Bona Nova SC"', 'serif'],
        'bona-nova-bold': ['"Bona Nova SC"', 'serif'],
        'bona-nova-italic': ['"Bona Nova SC"', 'serif']
      },
      colors:{
        primary:"#3c3c3c",
        secondary:"#fab51f",
        grey:" #e4e4e4",

        secondary_dark:"#E1A21B"
      }
    },
  },
  plugins: [],
}