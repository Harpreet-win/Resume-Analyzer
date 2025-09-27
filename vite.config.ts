import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  base: process.env.GITHUB_PAGES ? '/<your-repo-name>/' : '/',
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          pdfjs: ['pdfjs-dist']
        }
      }
    },
    chunkSizeWarningLimit: 2000 // Increase limit to accommodate pdfjs-dist
  }
});