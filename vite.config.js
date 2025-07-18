import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',  
    port: 5173,    
    // proxy: {
    //   '/api': {
    //     target: 'http://172.30.7.199:28080', 
    //     changeOrigin: true, 
    //     rewrite: (path) => path.replace(/^\/api/, '') 
    //   }
    // } 
  }
})
