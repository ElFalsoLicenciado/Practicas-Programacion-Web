import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import tailwindcss from '@tailwindcss/vite'
import basicSsl from '@vitejs/plugin-basic-ssl' //Plugin para SSL basico para la conexion HTTPS.

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] }),
    tailwindcss(),
    basicSsl()
  ],
  server: {
    host: '0.0.0.0',
    port: 5173,
    https: true,
    // Esto le indica a Vite: «Si detectas una solicitud que comience por /api, envíala al servidor Spring Boot por mí».
    proxy: { 
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false // Permite el reenvío a un servidor HTTP desde un servidor HTTPS 
      },
      hmr: false
    }
  }
})
