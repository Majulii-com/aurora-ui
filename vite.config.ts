import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  build: {
    /** Keep PNG and other static assets as files; avoid huge base64 blobs in JS. */
    assetsInlineLimit: 0,
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'MajuliiAuroraUI',
      fileName: (format) => (format === 'es' ? 'index.js' : 'index.cjs'),
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime', 'zod', 'zustand', 'recharts'],
      output: [
        {
          format: 'es',
          dir: 'dist/esm',
          entryFileNames: '[name].js',
          assetFileNames: (info) => {
            const n = info.names?.[0] ?? '';
            return typeof n === 'string' && n.endsWith('.css') ? 'styles.css' : 'assets/[name][extname]';
          },
          preserveModules: true,
          preserveModulesRoot: 'src',
        },
        {
          format: 'cjs',
          dir: 'dist/cjs',
          entryFileNames: '[name].cjs',
          assetFileNames: (info) => {
            const n = info.names?.[0] ?? '';
            return typeof n === 'string' && n.endsWith('.css') ? 'styles.css' : 'assets/[name][extname]';
          },
          preserveModules: true,
          preserveModulesRoot: 'src',
        },
      ],
    },
    sourcemap: true,
    cssCodeSplit: true,
  },
});
