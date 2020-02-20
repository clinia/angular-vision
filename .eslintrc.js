module.exports = {
  extends: 'clinia',
  parserOptions: {
    ecmaFeatures: {
      legacyDecorators: true,
    },
  },
  rules: {
    'new-cap': [
      'error',
      { capIsNewExceptions: ['Component', 'NgModule', 'Input', 'Inject'] },
    ],
  },
};
