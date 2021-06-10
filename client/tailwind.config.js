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
          '400': '#282c34',
          '500': '#31363f',
          '600': '#1d1e21'
        },
        White:{
          '100': '#F5F5F5',
          '200': '#fafbfc'
        },
        Gray:{
          '100':'#abb2bf',
          '200':'#989898',
          '300':'#5c6370',
        },
        Orange: {
          '100': '#d19a66',
          '200': '#e6c07b',          
        },
        Green: {
          '100': '#98c379',
          '200': '#3e6f40',   
          '300': '#3BD16F',       
        },
        Blue: {
          '100': '#61aeee',
        },
        Aqua : {
            '100': '#56b6c2',
        },
        Purpul: {
          '100': '#c678dd',
          '200': '#8D6BE7',          
        },
        Pink:{
          '100': "#c14d7f",
          '200': "a53465",
        },
        Red: {
          '100': '#e06c75',
          '200': '#be5046',
          // '200': '#212121',          
        },
        brand: {
          '100': '#f7931b'
        },
        darkBG:{

        },

      
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