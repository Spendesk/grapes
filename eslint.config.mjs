import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import reactPlugin from 'eslint-plugin-react';
import hooksPlugin from 'eslint-plugin-react-hooks';
import jsxa11y from 'eslint-plugin-jsx-a11y';

export default tseslint.config(
  {
    ignores: [
      '**/scripts/**',
      '**/dist/**',
      '**/coverage/**',
      '**/tooling/**',
      '**/tailwind.ts',
    ],
  },
  {
    files: ['src/**/*.ts', 'src/**/*.tsx'],
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      react: reactPlugin,
      'jsx-a11y': jsxa11y,
      'react-hooks': hooksPlugin,
    },
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        projectService: true,
      },
    },
    settings: {
      react: {
        version: '18',
      },
    },
    extends: [eslint.configs.recommended, ...tseslint.configs.recommended],
    rules: {
      ...jsxa11y.configs.recommended.rules,
      ...hooksPlugin.configs.recommended.rules,
      ...reactPlugin.configs.recommended.rules,
      'react/prop-types': 'off',
      'react/display-name': 'off',
    },
  },
);
