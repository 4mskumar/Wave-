// tailwind.config.js

/** @type {import('tailwindcss').Config} */
module.exports = {
  // 1. Tell Tailwind where your components are (adjust if needed)
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // 2. Add the custom keyframes for the fade-in animation
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        }
      },
      // 3. Define the custom animation class
      animation: {
        fadeIn: 'fadeIn 0.5s ease-out forwards', 
      }
    },
  },
  plugins: [],
}