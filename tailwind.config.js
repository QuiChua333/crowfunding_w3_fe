/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        myGreen: 'var(--green)',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
