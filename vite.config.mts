/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import fs from 'node:fs';
import { getReducedClassName } from './tooling/getReducedClassName.mjs';

const pkg = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
const externalDependencies = [
  ...Object.keys(pkg.dependencies),
  ...Object.keys(pkg.peerDependencies),
].map((dependency) => new RegExp(`^${dependency}`));

export default defineConfig({
  server: {
    port: 6007,
  },
  css: {
    modules: {
      generateScopedName: getReducedClassName,
    },
    preprocessorOptions: {
      scss: {
        api: 'modern',
      },
    },
  },
  plugins: [react(), dts()],
  test: {
    pool: 'threads',
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test-utils/setup.ts'],
    coverage: {
      provider: 'v8',
      thresholds: {
        // I'll haunt you personally for the rest of your life if you lower these numbers.
        statements: 98,
        functions: 98,
        lines: 98,
      },
      include: [
        'src/components/*/**/*.{ts,tsx}',
        '!**/stories/**',
        '!**/Skeleton/**',
        '!**/AutocompletePlace/countryCodeToCoordinates.ts',
        '!**/AutocompleteWithAddOption/**',
        '!**/ComboboxNoDropdown/**',
      ],
    },
  },
  build: {
    target: 'esnext',
    emptyOutDir: false,
    sourcemap: false,
    lib: {
      entry: 'src/index.ts',
      fileName: 'index',
      cssFileName: 'style',
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      external: (dependency) =>
        externalDependencies.some((externalDependency) =>
          externalDependency.test(dependency),
        ),
      output: {
        // For Next 14+
        banner: '"use client"',
        // For Downshift
        interop: 'compat',
      },
    },
  },
});
