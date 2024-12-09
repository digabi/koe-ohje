const path = require('path')

module.exports = {
  extends: path.resolve(__dirname, './webpack.config.js'),
  devtool: 'inline-source-map',
  mode: 'development',
  devServer: {
    compress: true,
    port: 8080,
    devMiddleware: {
      writeToDisk: true,
    },
    static: {
      directory: path.join(__dirname, './'),
      watch: {
        ignored: /playwright.*/,
      },
    },
  },
}
