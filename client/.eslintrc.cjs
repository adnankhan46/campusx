module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { 
    react: { version: '18.2' },
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx']
      }
    }
  },
  plugins: ['react-refresh', 'import'],
  rules: {
    'react/jsx-no-target-blank': 'off',
    'import/no-unresolved': 'error',
    'no-unused-vars': 'warn',
    'react/prop-types': 'warn',
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
  },
}
