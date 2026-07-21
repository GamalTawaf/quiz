/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        chalkboard: { DEFAULT: '#16241c', deep: '#0f1a13' },
        chalk: { DEFAULT: '#f4efe1', dim: '#cdc4a9' },
        ink: '#201b14',
        gold: '#f2b705',
        buzzer: { DEFAULT: '#e1483f', deep: '#a92f28' },
        correct: { DEFAULT: '#5fb865', deep: '#2f6b37' },
      },
      fontFamily: {
        display: ['Bungee', 'cursive'],
        body: ['Space Grotesk', 'sans-serif'],
        mono: ['IBM Plex Mono', 'monospace'],
      },
      boxShadow: {
        paddle: '0 4px 0 #b9b092, 0 8px 14px rgba(0, 0, 0, 0.28)',
        'paddle-hover': '0 6px 0 #b9b092, 0 12px 18px rgba(0, 0, 0, 0.3)',
        'paddle-active': '0 2px 0 #b9b092, 0 4px 8px rgba(0, 0, 0, 0.25)',
        'paddle-correct': '0 4px 0 #2f6b37, 0 8px 14px rgba(0, 0, 0, 0.28)',
      },
    },
  },
  plugins: [],
}
