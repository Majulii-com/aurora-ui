import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  root: resolve(__dirname, 'playground'),
  publicDir: false,
  resolve: {
    alias: [
      { find: '@majulii/aurora-ui/styles.css', replacement: resolve(__dirname, 'src/styles.css') },
      { find: '@majulii/aurora-ui', replacement: resolve(__dirname, 'src/index.ts') },
    ],
  },
  server: {
    port: 5174,
  },
});
