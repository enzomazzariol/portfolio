/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{html,js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Melodrama', 'sans-serif'],
        sans: ['General Sans', 'sans-serif'],
        mono: ['General Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
