import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  // REMOVE proxy in production — only Vite dev server uses it
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000', // Local dev only
        changeOrigin: true,
        secure: false,
      },
    },
  },

  build: {
    outDir: 'dist',
  }
})
