import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { TanStackRouterVite } from '@tanstack/router-vite-plugin'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    TanStackRouterVite(),
    VitePWA(
      {
        registerType: 'autoUpdate',
        injectRegister: 'auto',
        manifest: { theme_color: '#1c1b1e' }
      })
  ],
})
