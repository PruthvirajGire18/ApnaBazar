import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
// https://vite.dev/config/
export default defineConfig({
  // Proxy removed - using direct backend URL in AppContext instead
  // server:{
  //   proxy:{
  //     '/api':{
  //       target: 'http://localhost:5000',
  //       changeOrigin: true,
  //     }
  //   }
  // },
  plugins: [tailwindcss(),react()],
})
