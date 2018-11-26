const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');

const generateHtml = ({isProduction}) => {
  const htmlMinification = {
    minifyJS: true,
    collapseWhitespace: true
  };

  const baseConfig = {
    plugins: [
      new HtmlWebpackPlugin({
        filename: `index.html`,
        template: 'src/index.html',
        publicPath: '/',
        inject: 'body',
        minify: isProduction ? htmlMinification : false
      }),
      new ScriptExtHtmlWebpackPlugin({
        inline: 'bootstrap.js',
        preload: /.*\.js/,
        async: /.*\.js/
      })
    ]
  };

  return baseConfig;
};

module.exports = generateHtml;
