/* eslint-disable import/no-commonjs, import/unambiguous , no-process-env, filenames/match-exported, no-console, no-process-exit */

const fs = require('fs');
const path = require('path');

let browsers;

try {
  browsers = fs.readFileSync(path.join(__dirname, '.browserslistrc'), 'utf8').trim().split('\n');
} catch (error) {
  console.error('Unable to read .browserslistrc', error);
  process.exit(1);
}
const isProduction = process.env.NODE_ENV === 'production';

const presets = [
  [
    '@babel/preset-env',
    {
      targets: {
        browsers
      },
      modules: false,
      useBuiltIns: 'usage'
    }
  ],
  '@babel/preset-react'
];

const plugins = [
  '@babel/plugin-transform-runtime',
  '@babel/plugin-proposal-function-bind',
  '@babel/plugin-proposal-export-default-from',
  '@babel/plugin-proposal-optional-chaining',
  ['@babel/plugin-proposal-class-properties', {loose: false}],
  ...isProduction ? [] : ['react-hot-loader/babel']
];

module.exports = {
  sourceType: 'unambiguous',
  ignore: [/[/\\]core-js/, /@babel[/\\]runtime/],
  presets,
  plugins
};
