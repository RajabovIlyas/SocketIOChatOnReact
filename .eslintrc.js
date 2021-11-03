module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    'eslint-disable-next-line': 'off',
    'react/jsx-filename-extension': 'off',
    'react/button-has-type': 'off',
    'no-unused-vars': 'off',
    'no-shadow': 'off',
    'no-use-before-define': 'off',
    'react/no-array-index-key': 'off',
    'import/prefer-default-export': 'off',
    'no-unused-expressions': 'off',
    'no-underscore-dangle': 'off',
    'no-restricted-syntax': 'off',
  },
};
