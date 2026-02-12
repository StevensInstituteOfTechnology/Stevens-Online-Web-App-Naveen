import js from '@eslint/js'
import globals from 'globals'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import jsxA11y from 'eslint-plugin-jsx-a11y'

export default [
  { ignores: ['dist'] },
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    settings: { react: { version: '18.3' } },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'jsx-a11y': jsxA11y,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      ...reactHooks.configs.recommended.rules,
      ...jsxA11y.configs.recommended.rules,
      'react/jsx-no-target-blank': 'off',
      'react/prop-types': 'off',
      'react/no-unescaped-entities': 'off',
      'react/no-unknown-property': [
        'error',
        {
          ignore: [
            'initial',
            'animate',
            'exit',
            'whileInView',
            'whileHover',
            'whileTap',
            'viewport',
            'transition',
            'custom',
            'variants',
            'layout',
            'jsx',
            'fetchpriority', // Native HTML img attribute; React may not support fetchPriority in all versions
          ],
        },
      ],
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'no-unused-vars': ['error', {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
      }],
      // Allow tabIndex on region/group for keyboard-accessible carousels and video players
      'jsx-a11y/no-noninteractive-tabindex': ['error', {
        tags: [],
        roles: ['tabpanel', 'region', 'group'],
      }],
    },
  },
  // Node/script files: tailwind, vite, scripts (must come after main config to override)
  {
    files: [
      'tailwind.config.js',
      'vite.config.js',
      'scripts/**/*.js',
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: { ...globals.node, ...globals.es2021 },
      parserOptions: { sourceType: 'module' },
    },
  },
]
