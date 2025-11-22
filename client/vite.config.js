import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000', // Local dev
        changeOrigin: true,
        secure: false,
      },
    },
  },
  // IMPORTANT FOR DEPLOYMENT
  build: {
    outDir: 'dist',
  }
})
