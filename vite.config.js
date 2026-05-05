import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/cidadao-digital-seguro/',
  plugins: [react()],
})
