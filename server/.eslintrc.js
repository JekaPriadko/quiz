module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'airbnb-base',
    'airbnb-typescript/base',
    'prettier',
  ],
  env: {
    node: true,
  },
  parserOptions: {
    ecmaVersion: 'latest',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
    project: ['./tsconfig.json'],
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'operator-linebreak': 'off',
    'no-unused-expressions': ['error', { allowTernary: true }],
    'object-curly-newline': 'off',
    'implicit-arrow-linebreak': 'off',
    'function-paren-newline': 'off',
    'import/no-extraneous-dependencies': 'off',
    'func-names': ['error', 'as-needed'],
    'class-methods-use-this': 'off',
    'no-underscore-dangle': 'off',
  },
};
