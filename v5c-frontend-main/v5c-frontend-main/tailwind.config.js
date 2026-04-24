/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          // WE ARE RENAMING THESE TO BE LOGICAL
          luxury: {
            bg: '#ffffff',         // White Background
            text: '#1a1a1a',       // Dark Text (nearly black)
            accent: '#D4AF37',     // Gold Accent
            muted: '#f5f5f5',      // Light Gray (for cards/sections)
            dark: '#000000',       // Pure Black (for footer/nav)
          }
        },
        fontFamily: {
          serif: ['"Playfair Display"', 'serif'],
          sans: ['"Montserrat"', 'sans-serif'],
        },
        keyframes: {
          shimmer: {
            '0%': { transform: 'translateX(-100%)' },
            '100%': { transform: 'translateX(100%)' },
          },
        },
        animation: {
          shimmer: 'shimmer 2.5s infinite linear', 
        }
      },
    },
    plugins: [],
}