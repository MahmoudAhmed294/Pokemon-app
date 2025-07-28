import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/setupTests.ts'],
    css: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      exclude: ['node_modules/', 'src/setupTests.ts'],
    }
  },
  define: {
    'process.env.API_BASE_URL': JSON.stringify(process.env.API_BASE_URL || 'https://pokeapi.co/api/v2')
  }
})
