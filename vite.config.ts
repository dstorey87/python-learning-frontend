import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src',
      '@shared': '/shared'
    }
  },
  server: {
    host: '0.0.0.0',  // Allow external connections for Docker
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',  // API service port
        changeOrigin: true
      },
      '/auth': {
        target: 'http://localhost:8081',  // Auth service port  
        changeOrigin: true
      }
    }
  },
  optimizeDeps: {
    include: ['monaco-editor']
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          editor: ['monaco-editor', '@monaco-editor/react']
        }
      }
    }
  }
})