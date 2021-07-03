import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from "path"

export default defineConfig({
  base: '/vue3-h5/chat-room/',
  define: {
    'process.env': process.env
  },
  server: {
    port: 3355,
    open: true,
    proxy: {
      '/api': {
        target: process.env.NODE_ENV === 'development'
          ? 'http://localhost:18303/nest-demo-01/'
          : 'http://www.hgqweb.cn:18303/nest-demo-01',
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
