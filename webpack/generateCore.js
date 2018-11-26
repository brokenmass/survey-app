const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const pkg = require('../package.json');

const generateCore = ({environment, isProduction}) => {
  const baseConfig = {
    output: {
      devtoolFallbackModuleFilenameTemplate: `webpack:///${pkg.name}/[resource-path]?[hash]`,
      devtoolModuleFilenameTemplate: `webpack:///${pkg.name}/[resource-path]`,
      filename: 'js/[name].js',
      path: path.join(__dirname, '../dist')
    },
    node: {
      fs: 'empty',
      net: 'empty',
      tls: 'empty'
    },
    profile: true,
    stats: {
      children: false,
      colors: true
    },
    optimization: {
      runtimeChunk: true,
      splitChunks: {
        chunks: 'async',
        cacheGroups: {
          commons: {
            test (module) {
              return module.context &&
                (
                  module.context.indexOf('node_modules') !== -1 ||
                  module.context.indexOf('src/polyfills') !== -1
                );
            },
            priority: 10,
            name: 'vendor',
            chunks: 'initial',
            minSize: 1
          }
        }
      }
    },
    plugins: [
      new webpack.DefinePlugin({
        __DEV__: !isProduction,
        __TEST__: false,
        'process.env.NODE_ENV': JSON.stringify(environment)
      })
    ]
  };

  if (isProduction) {
    return merge.smart(baseConfig, {
      devtool: 'source-map',
      entry: {
        index: './src/index.js'
      },
      output: {
        publicPath: '/'
      },
      plugins: [
        new BundleAnalyzerPlugin({
          analyzerMode: 'static',
          reportFilename: path.resolve(__dirname, `../reports/webpack/stats.html`),
          defaultSizes: 'stat',
          openAnalyzer: false,
          generateStatsFile: true,
          statsFilename: path.resolve(__dirname, `../reports/webpack/stats.json`),
          logLevel: 'info'
        }),
        new webpack.optimize.ModuleConcatenationPlugin()
      ]
    });
  } else {
    return merge.smart(baseConfig, {
      devtool: 'cheap-module-source-map',
      entry: {
        index: './src/index.js'
      },
      output: {
        publicPath: '/'
      }
    });
  }
};

module.exports = generateCore;
