import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

function vendorChunk(id) {
  if (!id.includes('node_modules')) return undefined

  const normalizedId = id.replaceAll('\\', '/')

  if (
    normalizedId.includes('/node_modules/react/') ||
    normalizedId.includes('/node_modules/react-dom/')
  ) {
    return 'react-vendor'
  }

  if (
    normalizedId.includes('/node_modules/framer-motion/') ||
    normalizedId.includes('/node_modules/lucide-react/') ||
    normalizedId.includes('/node_modules/motion-dom/') ||
    normalizedId.includes('/node_modules/motion-utils/')
  ) {
    return 'ui-vendor'
  }

  if (normalizedId.includes('/node_modules/jspdf/')) {
    return 'pdf-vendor'
  }

  if (
    normalizedId.includes('/node_modules/html2canvas/') ||
    normalizedId.includes('/node_modules/dompurify/') ||
    normalizedId.includes('/node_modules/html-react-parser/')
  ) {
    return 'html-vendor'
  }

  return undefined
}

export default defineConfig({
  base: '/cidadao-digital-seguro/',
  build: {
    rollupOptions: {
      output: {
        manualChunks: vendorChunk,
      },
    },
  },
  plugins: [react()],
})
