const generateDevServer = ({isProduction}) => {
  if (isProduction) {
    return {};
  }

  return {
    devServer: {
      inline: true,
      hot: true,
      compress: true,
      publicPath: '/',
      historyApiFallback: true
    }
  };
};

module.exports = generateDevServer;
