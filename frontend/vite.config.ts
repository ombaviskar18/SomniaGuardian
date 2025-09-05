import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['@Zetachain/toolkit/chains/evm'],
    force: true,
  },
  resolve: {
    alias: {
      // Force ethers to resolve to a single instance from the frontend's node_modules
      ethers: resolve(__dirname, 'node_modules/ethers'),
    },
    dedupe: ['ethers'],
  },
  build: {
    commonjsOptions: {
      include: [/node_modules/, /toolkit/],
    },
    outDir: 'dist',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ethers: ['ethers'],
          charts: ['chart.js', 'react-chartjs-2', 'recharts']
        }
      }
    }
  },
  server: {
    port: 5173,
    host: true
  }
});
