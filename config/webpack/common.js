const paths = require('../paths');
const webpack = require('webpack');

const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const DotenvWebpack = require('dotenv-webpack');

const babelLoader = {
  loader: 'babel-loader',
  options: {
    presets: ['@babel/preset-env', '@babel/preset-react'],
    plugins: [
      '@babel/plugin-proposal-class-properties',
      '@babel/plugin-syntax-dynamic-import',
      '@babel/plugin-transform-runtime'
    ]
  }
}

module.exports = {
  entry: `${paths.src}/index.js`,
  output: {
    path: paths.build,
    filename: 'js/[name].bundle.js',
    publicPath: '/',
    clean: true,
    crossOriginLoading: 'anonymous',
    module: true,
    environment: {
      arrowFunction: true,
      bigIntLiteral: false,
      const: true,
      destructuring: true,
      dynamicImport: false,
      forOf: true
    }
  },
  resolve: {
    alias: {
      '@': `${paths.src}/modules`
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json']
  },
  experiments: {
    topLevelAwait: true,
    outputModule: true
  },
  module: {
    rules: [
      // JS, React
      {
        test: /\.m?jsx?$/i,
        exclude: /node_modules/,
        use: babelLoader
      },
      // TypeScript
      {
        test: /.tsx?$/i,
        exclude: /node_modules/,
        use: [babelLoader, 'ts-loader']
      },
      // CSS, SASS
      {
        test: /\.(c|sa|sc)ss$/i,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: { importLoaders: 1 }
          },
          'sass-loader'
        ]
      },
      {
        test: /\.md$/i,
        use: ['html-loader', 'markdown-loader']
      },
      {
        test: /\.(jpe?g|png|gif|svg|eot|ttf|woff2?)$/i,
        type: 'asset'
      }
    ]
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: `${paths.public}/assets`
        }
      ]
    }),
    new HtmlWebpackPlugin({
      template: `${paths.public}/index.html`,
      filename: 'index.html',
      templateParameters: {
        title: 'Ahoy, Webpack!'
      }
    }),
    new webpack.ProvidePlugin({
      React: 'react'
    }),
    new DotenvWebpack({
      path: './config/.env'
    })
  ]
}
