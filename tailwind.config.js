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
            dark: '#000000ff',       // Slightly lighter black for contrast
            gold: '#D4AF37',       // Classic Metallic Gold
            goldLight: '#F1D064',  // Light Gold for gradients
            goldDark: '#AA8C2C',   // Dark Gold for gradients
          }
        },
        fontFamily: {
          serif: ['"Playfair Display"', 'serif'], // For Headings (Luxury feel)
          sans: ['"Montserrat"', 'sans-serif'],   // For Body/Nav (Clean feel)
        },
        // --- ADDED FOR ANIMATIONS ---
        keyframes: {
          // This allows the gold line in the navbar to move across the screen
          shimmer: {
            '0%': { transform: 'translateX(-100%)' },
            '100%': { transform: 'translateX(100%)' },
          },
        },
        animation: {
          // Usage: animate-shimmer or animate-[shimmer_3s_infinite]
          shimmer: 'shimmer 2.5s infinite linear', 
        }
      },
    },
    plugins: [],
  }