const path = require('path');
require('dotenv').config();
const { defineConfig } = require('cypress');
const indexHtmlFile = path.join(__dirname, 'public', 'index.html');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:5000',
    specPattern: 'src/**/*.e2e.{js,jsx,ts,tsx}',
    setupNodeEvents(on, config) {
      // implement node event listeners here
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
