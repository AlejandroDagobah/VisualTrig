/** @type {import('tailwindcss').Config} */

const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [
    "./src/pages/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      
      colors:{
        mainWhite: '#FFFFFF',
        mainBlack: '#1C1E1B',
        lightBlack: '#212121',
        mainGray: '#6F706F',
        darkerGray: '#4E4E4E',
        mainBlue: '#1F2A31',
        mainGreen: '#13F4BE',
        darkerGreen: '#25C99C',

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
  plugins: [

  ],
})

