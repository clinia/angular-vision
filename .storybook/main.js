const path = require('path');

module.exports = {
  stories: ['../stories/**/*.stories.ts'],
  addons: ['@storybook/addon-actions', '@storybook/addon-links', '@storybook/addon-notes'],
  webpackFinal: async (config, { configType }) => {
    config.resolve.alias['@clinia/angular-vision'] = path.resolve(__dirname, '../src');

    // Return the altered config
    return config;
  },
};
