const path = require('path');
require('dotenv').config();
const { defineConfig } = require('cypress');
const indexHtmlFile = path.join(__dirname, 'public', 'index.html');

module.exports = defineConfig({
  e2e: {
    specPattern: 'src/**/*.e2e.{js,jsx,ts,tsx}',
    setupNodeEvents(on, config) {
      config.baseUrl = process.env.API_ENDPOINT;
      config.env.API_ENDPOINT = `${process.env.API_ENDPOINT}/api/story`;

      return config;
    },
  },

  component: {
    indexHtmlFile: indexHtmlFile,
    devServer: {
      framework: 'react',
      bundler: 'webpack',
    },
  },
});
