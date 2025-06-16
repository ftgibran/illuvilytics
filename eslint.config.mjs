import { FlatCompat } from '@eslint/eslintrc'
import js from '@eslint/js'
import { defineConfig } from 'eslint/config'
import eslintConfigPrettier from 'eslint-config-prettier/flat'
import pluginReact from 'eslint-plugin-react'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import eslintPluginUnusedImports from 'eslint-plugin-unused-imports'
import { dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

const eslintConfig = defineConfig([
  pluginReact.configs.flat.recommended,
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    plugins: {
      js,
      'unused-imports': eslintPluginUnusedImports,
      'simple-import-sort': simpleImportSort,
    },
    extends: ['js/recommended'],
    rules: {
      '@typescript-eslint/ban-ts-comment': 'warn',
      '@typescript-eslint/no-empty-object-type': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          args: 'after-used',
          ignoreRestSiblings: false,
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^(_|ignore)',
        },
      ],

      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',

      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],

      'padding-line-between-statements': [
        'warn',
        { blankLine: 'always', prev: '*', next: 'return' },
        { blankLine: 'always', prev: ['const', 'let', 'var'], next: '*' },
        {
          blankLine: 'any',
          prev: ['const', 'let', 'var'],
          next: ['const', 'let', 'var'],
        },
        { blankLine: 'always', prev: '*', next: 'if' },
        { blankLine: 'always', prev: 'if', next: '*' },
      ],

      'react/react-in-jsx-scope': 'off',
      'react/self-closing-comp': ['error', { component: true, html: true }],
      'react/jsx-curly-brace-presence': [
        'error',
        { props: 'always', children: 'ignore' },
      ],
    },
  },
  eslintConfigPrettier,
  {
    ignores: ['.next/', 'src/app/(payload)/admin/importMap.js'],
  },
])

export default eslintConfig
