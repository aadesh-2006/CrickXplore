import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { viteGeminiPlugin } from './server/plugins/viteGeminiPlugin.ts'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), viteGeminiPlugin()],
})

