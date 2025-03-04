/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        space: ["Space Grotesk", "sans-serif"],
        inter:["Inter","sans-serif"],
        poppins:["Poppins","sans-serif"]
      },
      colors:{
        neutral:"#6C7275",
        anounce:"#121212",
        button:"#38CB89",
        btntxt:"#FEFEFE",
        list:"#807E7E",
        old:"#6C7275",
        off:"#605F5F",
        footbg:"#141718",
        footxt:"#E8ECEF"
      }
    },
  },
  plugins: [],
}