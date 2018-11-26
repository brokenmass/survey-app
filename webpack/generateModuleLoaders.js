const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const generateModuleLoaders = ({isProduction}) => {
  const config = {
    resolve: {
      mainFields: ['module', 'browser', 'main']
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          loader: 'babel-loader',
          options: {
            cacheDirectory: true
          }
        },
        {
          test: /\.scss$/,
          loaders: [
            isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
            {
              loader: 'css-loader',
              options: {
                modules: true,
                importLoaders: 4,
                sourceMap: true,
                minimize: isProduction,
                localIdentName: '[path][name]__[local]--[hash:base64:5]'
              }
            },
            'postcss-loader?sourceMap=true',
            'resolve-url-loader',
            'sass-loader?sourceMap=true'
          ]
        },
        {
          test: /\.css$/,
          loaders: [
            MiniCssExtractPlugin.loader,
            'css-loader'
          ]
        },
        // {
        //   test: /\.svg$/,
        //   loaders: [
        //     'babel-loader?cacheDirectory',
        //     'react-svg-loader'
        //   ]
        // },
        {
          test: /\.(eot|woff2|ttf)$/,
          use: {
            loader: 'file-loader',
            options: {
              name: 'fonts/[name].[ext]?[hash]'
            }
          }
        },
        {
          test: /\.(png|jpg|svg)$/,
          use: {
            loader: 'file-loader',
            options: {
              name: `images/[name].[ext]?[hash]`
            }
          }
        },
        {
          test: /\.woff$/,
          use: 'url-loader'
        }
      ]
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: 'css/[name].css',
        chunkFilename: 'css/[name].css'
      })
    ]
  };

  if (!isProduction) {
    config.plugins.push(
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NamedModulesPlugin()
    );
  }

  return config;
};

module.exports = generateModuleLoaders;
