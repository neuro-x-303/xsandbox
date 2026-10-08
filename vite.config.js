import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import compilerApp from './server/index.js'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'express-compiler-middleware',
      configureServer(server) {
        server.middlewares.use(compilerApp);
      }
    }
  ],
  define: {
    global: 'window',
  },
  server: {
    port: 5173,
    host: true
  }
})
