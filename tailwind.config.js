/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          luxury: {
            black: '#0a0a0a',      // Deep rich black
            dark: '#121212',       // Slightly lighter black for contrast
            gold: '#D4AF37',       // Classic Metallic Gold
            goldLight: '#F1D064',  // Light Gold for gradients
            goldDark: '#AA8C2C',   // Dark Gold for gradients
          }
        },
        fontFamily: {
          serif: ['"Playfair Display"', 'serif'], // For Headings (Luxury feel)
          sans: ['"Montserrat"', 'sans-serif'],   // For Body/Nav (Clean feel)
        }
      },
    },
    plugins: [],
  }