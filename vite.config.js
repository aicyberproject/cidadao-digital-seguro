import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const repoName = 'cidadao-digital-seguro'

export default defineConfig({
  base: `/${repoName}/`,
  plugins: [react()],
})
