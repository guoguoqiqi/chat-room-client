import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from "path"

export default defineConfig({
  server: {
    port: 3355,
    open: true,
    https: false,
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
