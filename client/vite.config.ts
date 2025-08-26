import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: "/",   // 👈 ให้ React Router ทำงานได้บน Vercel
  build: {
    chunkSizeWarningLimit: 1000
  }
})
