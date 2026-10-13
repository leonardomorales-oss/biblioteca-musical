import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

const projectRoot = fileURLToPath(new URL('.', import.meta.url))

export default defineConfig({
  base: './',
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        biblioteca: resolve(projectRoot, 'index.html'),
        sugerencias: resolve(projectRoot, 'sugerencias.html'),
      },
    },
  },
})
