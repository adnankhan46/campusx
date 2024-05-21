/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'custom-gradient': 'linear-gradient(90deg, #f6a1fff5, #e886edf6, #AC9DFB, #7685FD, #4b6cfcec)',
      },
    },
  },
  plugins: [],
}