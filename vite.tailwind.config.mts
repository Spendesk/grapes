import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    target: 'node20',
    emptyOutDir: false,
    sourcemap: false,
    lib: {
      entry: 'src/tailwind.ts',
      fileName: 'tailwind',
      formats: ['cjs'],
    },
    rollupOptions: {
      external: (dependency) => /^tailwindcss/.test(dependency),
    },
  },
});
