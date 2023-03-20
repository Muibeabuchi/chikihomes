/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      'sans': ['Poppins', 'sans-serif']
    },
    extend: {
      colors:{
        secondary:'var(--secondary)',
        tertiary:'var(--tertiary)',
        color1:'var(--bg-color-1)',
      }
    },
  },
  plugins: [  require('@tailwindcss/forms')],
}