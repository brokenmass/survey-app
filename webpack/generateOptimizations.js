const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const merge = require('webpack-merge');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const tests = {
  isSharedComponents: (module) => (/\/node_modules\/@(cob-lvs|cob|lvs)\//).test(module.context),
  isStyleSheet: (module) => (/css/).test(module.type) || (/\.(scss|css)/).test(module.request),
  isNodeModules: (module) => (/node_modules/).test(module.context)
};

const generateOptimizations = ({isProduction}) => {
  const baseConfig = {
    optimization: {
      runtimeChunk: {
        name: `runtime`
      },
      splitChunks: {
        chunks: 'all',
        automaticNameDelimiter: '-',
        cacheGroups: {
          styles: {
            test: (module) => tests.isStyleSheet(module),
            maxSize: 600000,
            priority: 30,
            enforce: true,
            name: 'main'
          },
          sharedComponents: {
            test: (module) => !tests.isStyleSheet(module) && tests.isSharedComponents(module),
            priority: 20
          },
          vendors: {
            test: (module) => !tests.isStyleSheet(module) && tests.isNodeModules(module)
          }
        }
      }
    }
  };

  const productionConfig = {
    plugins: [
      new LodashModuleReplacementPlugin({
        paths: true
      })
    ],
    optimization: {
      minimizer: [
        new OptimizeCssAssetsPlugin({
          cssProcessorPluginOptions: {
            preset: ['advanced', {discardComments: {removeAll: true}}]
          },
          canPrint: true
        }),
        new UglifyJsPlugin({
          sourceMap: true,
          cache: true,
          parallel: true
        })
      ]
    }
  };

  const devConfig = {};

  return merge.smart(baseConfig, isProduction ? productionConfig : devConfig);
};

module.exports = generateOptimizations;
