/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue",
  ],
  theme: {
    extend: {
      colors: {
        'obsidian-black': '#101014',
        'quantum-purple': '#7F5AF0',
        'guardian-green': '#2CB67D',
        'glass-bg': 'rgba(18, 18, 22, 0.5)', // For use with backdrop-filter
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Example, assuming Inter is loaded
      },
      // Example for custom animation/keyframes if needed directly in Tailwind
      // keyframes: {
      //   fadeIn: {
      //     '0%': { opacity: '0' },
      //     '100%': { opacity: '1' },
      //   }
      // },
      // animation: {
      //   fadeIn: 'fadeIn 1s ease-out'
      // }
    },
  },
  plugins: [],
}
