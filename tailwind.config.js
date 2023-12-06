/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor:{
        'myprimecolor' : '#84CC16',
        'fadedgreen' : '#F2FFE8',
        'mypink' : '#FF2480'
        
      },
      textColor:{
        'myprimecolor' : '#84CC16',
        'mypink' : '#FF2480'
      },
      
    },
  },
  plugins: [],
}

