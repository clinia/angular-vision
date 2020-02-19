const isCJS = process.env.BABEL_ENV === 'cjs';
const isES = process.env.BABEL_ENV === 'es';

module.exports = api => {
  const isTest = api.env('test');
  const modules = isTest || isCJS ? 'commonjs' : false;
  const targets = {};

  if (isTest) {
    targets.node = true;
  } else {
    targets.browsers = ['last 2 versions', 'ie >= 9'];
  }

  return {
    presets: [
      [
        '@babel/preset-env',
        {
          modules,
          targets
        }
      ]
    ],
    plugins: [
      ["@babel/plugin-proposal-decorators", { "legacy": true }]
    ]
  }
}
