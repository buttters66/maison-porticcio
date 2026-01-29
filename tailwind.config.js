/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter Tight', 'system-ui', 'sans-serif'],
      },
      colors: {
        accent: {
          DEFAULT: '#FF6B35',
          light: '#FF8E53',
          bright: '#FFB03B',
        },
        dark: {
          DEFAULT: '#050505',
          light: '#0a0a0a',
          card: '#1a1a1a',
        }
      }
    },
  },
  plugins: [],
}
