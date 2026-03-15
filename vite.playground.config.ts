import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  root: resolve(__dirname, 'playground'),
  publicDir: false,
  resolve: {
    alias: {
      '@majulii/aurora-ui': resolve(__dirname, 'src/index.ts'),
      '@majulii/aurora-ui/styles.css': resolve(__dirname, 'src/styles.css'),
    },
  },
  server: {
    port: 5174,
  },
});
