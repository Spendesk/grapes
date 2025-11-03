/// <reference types="vitest" />
import { defineConfig, coverageConfigDefaults } from 'vitest/config';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import fs from 'node:fs';
import tailwindcss from '@tailwindcss/vite';
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
  },
  plugins: [react(), dts(), tailwindcss()],
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
      include: ['src/components/*/**/*.{ts,tsx}'],
      exclude: [
        ...coverageConfigDefaults.exclude,
        '**/stories/**',
        '**/Skeleton/**',
        '**/AutocompletePlace/countryCodeToCoordinates.ts',
        '**/AutocompleteWithAddOption/**',
        '**/ComboboxNoDropdown/**',
        '**/icons/**',
        'src/theme/**',
        'src/test-utils/**',
        '**/index.ts',
        '**/types.ts',
      ],
    },
  },
  build: {
    target: 'esnext',
    emptyOutDir: false,
    sourcemap: false,
    cssCodeSplit: true,
    lib: {
      entry: { index: 'src/index.ts', token: 'src/theme/css-variables.css' },
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
