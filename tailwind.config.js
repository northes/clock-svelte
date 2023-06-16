/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      fontSize: {
        '10xl': ['10rem', '1'],
        '11xl': ['12rem', '1'],
        '12xl': ['14rem', '1'],
        '13xl': ['16rem', '1'],
        '14xl': ['18rem', '1'],
        '15xl': ['20rem', '1'],
        '16xl': ['22rem', '1'],
      }
    },
  },
  plugins: [],
}

