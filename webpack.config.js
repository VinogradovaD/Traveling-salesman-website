const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin');
//const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev

module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: './js/index.js',
  output: {
    filename: 'main.[hash].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: './index.html'
    }),
    new CopyPlugin({
      patterns: [
          {
            from: path.resolve(__dirname, 'src/img'),
            to:   path.resolve(__dirname, 'dist/img')
          },
          {
            from: path.resolve(__dirname, 'src/lib'),
            to:   path.resolve(__dirname, 'dist/lib')
          }
        ]
      }),
    new MiniCssExtractPlugin({
      filename: 'style.[hash].css'
      })
   // new CleanWebpackPlugin()
  ],
  module: {
    rules: [
      { 
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },
      {
        test: /\.s[ac]ss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'file-loader'
      }
    ]
  },
  devServer: {
    port: 4200
  }
}