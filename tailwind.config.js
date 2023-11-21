/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Add your custom colors here
        primaryblue: '#7E22CE', 
        secondaryblue: '#F3E8FF',
        btnblack: '#211935',
        primaryred: '#FF274C',
        secondarytext: '#838383',
        secondarybg:"#D9D9D980",
        hoverbg:"#1D1B2014",
        secondarygry:"#1D1B201F",
        smalltext:"#646464"
    },
    },
  },
  plugins: [],
}

