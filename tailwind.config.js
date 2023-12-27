/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        'myprimecolor': 'rgb(34 197 94)',
        'fadedgreen': '#F2FFE8',
        'mypink': '#4942E4'
        // 84CC16
        // FF2480 pink
      },
      textColor: {
        'myprimecolor': '#84CC16',
        'mypink': '#4942E4'
      },

    },
  },
  plugins: [],
}

