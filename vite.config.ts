import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from "path"

export default defineConfig({
  server: {
    port: 3355,
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3322/nest-demo-01/',
        changeOrigin: true,
        rewrite: (pathStr) => pathStr.replace('/api', '')
      }
    }
  },
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './'),
      "@": path.resolve(__dirname, "src")
    }
  }
})
