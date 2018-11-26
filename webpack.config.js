/* eslint-disable import/no-commonjs, import/unambiguous , no-process-env, filenames/match-exported, no-console */
const merge = require('webpack-merge');
const generateCore = require('./webpack/generateCore');
const generateHtml = require('./webpack/generateHtml');
const generateModuleLoaders = require('./webpack/generateModuleLoaders');
const generateDevServer = require('./webpack/generateDevServer');

const env = {
  environment: process.env.NODE_ENV || 'development',
  isProduction: process.env.NODE_ENV === 'production'
};

const config = merge.smart(
  generateCore(env),
  generateHtml(env),
  generateModuleLoaders(env),
  generateDevServer(env)
);

console.log(require('util').inspect(config, {
  depth: Infinity,
  colors: true
}));

module.exports = config;
