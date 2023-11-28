/** @type {import('tailwindcss').Config} */


module.exports = {
  content: [
    "./src/pages/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        mainWhite: '#FFFFFF',
        mainBlack: '#1C1E1B',
        mainGray: '#6F706F',
        mainBlue: '#1F2A31',
        mainGreen: '#13F4BE',

        trigoGreen: '#7BF179',
        trigoYellow: '#F4C313',
        trigoCyan : '#13F4BE',
        trigoBlue: '#132AF4',
        trigoPurple: '#5B13F4'

      },
      fontFamily:{
        'primary': ['Inter']
      }
    },
  },
  plugins: [],
}

