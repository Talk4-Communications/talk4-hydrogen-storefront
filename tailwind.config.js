/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}'],
  theme: {
    fontFamily: {
      'gt-pro': ["GT Walsheim Pro"]
    },
    extend: {
      colors:{
        'blue': '#3977FC',
        'pink': '#EF5DA8',
        'black': '#303030',
        'grey': '#606060',
        'red': '#EC5039',
        'offwhite': '#F1F5FF'
      },
    },
  },
  plugins: [],
};
