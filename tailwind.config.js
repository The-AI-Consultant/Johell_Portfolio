/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'rock-black': '#0B0B0B',
        'rock-dark': '#111111',
        'rock-red': '#FF4700',
        'rock-orange': '#F99C28',
        'rock-gold': '#FFD84A',
        'rock-gold-warm': '#FFCC33',
        'rock-blue': '#00C8FF',
        'rock-energy-start': '#C84D2A',
        'rock-energy-end': '#F99C28',
      },
      fontFamily: {
        cinzel: ['Cinzel', 'serif'],
        montserrat: ['Montserrat', 'sans-serif'],
        roboto: ['Roboto Condensed', 'sans-serif'],
      },
      backgroundImage: {
        'energy-gradient': 'linear-gradient(to right, #C84D2A, #F99C28)',
        'stage-texture': "url('/src/assets/stage-texture.jpg')",
        'crowd-silhouette': "url('/src/assets/crowd-silhouette.png')",
      },
      boxShadow: {
        'glow-gold': '0 0 15px rgba(255, 216, 74, 0.5)',
        'glow-blue': '0 0 15px rgba(0, 200, 255, 0.5)',
        'glow-red': '0 0 15px rgba(255, 71, 0, 0.5)',
        'inner-gold': 'inset 0 0 15px rgba(255, 216, 74, 0.3)',
      },
      dropShadow: {
        'text-gold': '0 0 10px rgba(255, 216, 74, 0.5)',
      },
    },
  },
  plugins: [],
};