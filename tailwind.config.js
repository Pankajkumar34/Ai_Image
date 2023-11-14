/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/Components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'light-white': '#ffffff2b',
        'dark-grey': '#202123',
        'light-grey': '#353740',
      },
      fontFamily: {
        'Rubik': ['Rubik',' sans-serif '],     
      },
      screens: {
        'sm': {'max': '576px'},
        'md': {'max': '768px'},
        'lg': {'max': '1024px'},
        'xl': {'max': '1280px'},
        'sm-min': {'min': '576px'},
      },


    },
  },
  plugins: [],
}
