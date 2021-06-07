const plugin = require('tailwindcss/plugin');

require('dotenv').config();

const enablePurge = process.env.ENABLE_PURGE || false;

module.exports = {
  prefix: '',
  purge: {
    enabled: enablePurge,
    content: [
      './src/**/**/*.html',
      './src/**/**/*.scss',
      './src/**/**/*.ts',
    ]
  },
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: ['Lato', 'sans-serif'],
        heading: ['Oswald', 'sans-serif'],
      },
      colors: {
        black: {
          '100': '#121212',
          '200': '#383838',
          '300': '#272727',
        },
        White:{
          '100': '#F5F5F5'
        },
        Gray:{
          '100':'#E3E3E3',
          '200':'#989898',
        },
        Orange: {
          '100': '#bd842f',
          '200': '#a26e1e',          
        },
        Green: {
          '100': '#528854',
          '200': '#3e6f40',   
          '300': '#3BD16F',       
        },
        Aqua : {
            '100': '#63abaf',
            '200': '#519094'
        },
        Purpul: {
          '100': '#C0AEFF',
          '200': '#8D6BE7',          
        },
        Pink:{
          '100': "#c14d7f",
          '200': "a53465",
        },
        Red: {
          '100': '#E06666',
          // '200': '#212121',          
        },
        brand: {
          '100': '#f7931b'
        }
      
      },
      gradientColorStops: {
        'primary': '#2c3e50',
       'secondary': '#a55c1b',
      },

    },
  },
  variants: {
      backgroundColor: ['responsive', 'dark', 'group-hover', 'focus-within', 'hover', 'focus']
  },
  plugins: [plugin(function({ addUtilities }) {
    const newUtilities = {
      '.no-scrollbar::-webkit-scrollbar' : {
        display: 'none'
    },
    '.no-scrollbar' : {
      '-ms-overflow-style': 'none',
      'scrollbar-width': 'none',
  },
    }
    addUtilities(newUtilities);
  }),require('@tailwindcss/forms'),require('@tailwindcss/typography')],
};