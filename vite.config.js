import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite' // <--- IMPORT THIS

export default defineConfig({
  base: '/',   // important for subfolder deployment
  plugins: [
    react(),
    tailwindcss(), // <--- ADD THIS
  ],
})