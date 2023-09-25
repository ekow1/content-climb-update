/** @type {import('tailwindcss').Config} */
module.exports = {
  
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
  extend :{

     fontFamily : {
      body : 'var(--font-josefin-sans)',
      logo : 'var(--font-pacifico)',
      heading : 'var(--font-dm-sans)',
  
    },


  },
   

  },
  plugins: [],
};
