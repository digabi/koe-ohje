const path = require('path')
const webpack = require('webpack')
const devServer = {
  compress: true,
  port: 8080,
  static: {
    directory: __dirname,
    watch: false,
  },
  devMiddleware: {
    writeToDisk: true,
  },
}

module.exports = (env, argv) => {
  const isProduction = argv && argv.mode === 'production'
  return {
    entry: './src/index.ts',
    devtool: isProduction ? 'cheap-module-source-map' : 'inline-source-map',
    mode: isProduction ? 'production' : 'development',
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
            },
          },
          include: path.resolve(__dirname, 'src'),
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.(png|jpe?g|gif)$/i,
          use: [{ loader: 'file-loader' }],
        },
      ],
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env.MAP_TILES_URL':
          process.env.DEPLOYMENT_ENV === 'koe'
            ? JSON.stringify('/tiles')
            : JSON.stringify('https://s3.eu-north-1.amazonaws.com/maptiles-cheat.abitti.fi-cheat.abitti-test'),
        'process.env.MATH_DEMO_URL':
          process.env.DEPLOYMENT_ENV === 'koe' ? JSON.stringify('') : JSON.stringify('https://math-demo.abitti.fi'),
      }),
    ],
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'build'),
    },
    devServer: isProduction ? undefined : devServer,
  }
}
