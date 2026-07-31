import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor':  ['react', 'react-dom', 'react-router-dom'],
          'gsap':    ['gsap', '@gsap/react'],
          'ogl':     ['ogl'],
          'icons':   ['react-icons'],
        },
      },
    },
  },
})
