module.exports = {
  env: {
    browser: true,
    node: true
  },
  extends: ['frontwerk', 'plugin:prettier/recommended'],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'error',
    'import/no-nodejs-modules': 'off',
    'import/no-extraneous-dependencies': 'off'
  }
};
