import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

const repoRoot = resolve(__dirname, '../..');

export default defineConfig({
  plugins: [react()],
  root: __dirname,
  publicDir: false,
  resolve: {
    alias: [
      { find: '@majulii/aurora-ui/styles.css', replacement: resolve(repoRoot, 'src/styles.css') },
      { find: '@majulii/aurora-ui', replacement: resolve(repoRoot, 'src/index.ts') },
    ],
  },
  server: {
    port: 5176,
  },
});
