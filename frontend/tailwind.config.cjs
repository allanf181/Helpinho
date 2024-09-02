const colors = require('./colors')
// @ts-ignore
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-292': 'linear-gradient(292deg, var(--tw-gradient-stops))',
      },
      gradientColorStopPositions: {
        ['neg-35%']: '-35%',
      },
      animation: {
        'infinite-scroll': 'infinite-scroll 25s linear infinite',
      },
      keyframes: {
        'infinite-scroll': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-100%)' },
        }
      }
    },
    fontFamily: {
      sans: ['Open Sans',  'sans-serif'],
      inter: ['Inter', 'sans-serif'],
      montserrat: ['Montserrat', 'sans-serif'],
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      ...colors
    }
  },
  plugins: [],
}

