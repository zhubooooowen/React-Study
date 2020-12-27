/* craco.config.js */
const CracoLessPlugin = require('craco-less');
const CracoAlias = require("craco-alias");

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { '@primary-color': '#00a0e9' },
            javascriptEnabled: true,
          },
        },
      },
    },
    {
      plugin: CracoAlias,
      options: {
         source: "tsconfig",
         // baseUrl SHOULD be specified
         // plugin does not take it from tsconfig
         baseUrl: "./src",
         /* tsConfigPath should point to the file where "baseUrl" and "paths"
         are specified*/
         tsConfigPath: "./tsconfig.paths.json"
      }
    }
  ],
};