/* eslint-disable no-undef */
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

let mode = 'development';
if (process.env.NODE_ENV === 'production') {
  mode = 'production';
}
console.log(mode + ' mode'); // исправлена опечатка

const path = require('path'); //поможет нам с абсолютным путем, чтобы не гадать где проект она уже есть в node.js не надо устанавливать

module.exports = {
  mode: mode, //настраиваем режим сборки, код выше

  entry: {
    main: './src/index.js' // точка входа, куда заглянет вебпак в первую очередь
  },
  output: { //точка выхода , аналог bandle.js из browserify
    path: path.resolve(__dirname, 'dist'), // всегда должен быть абсолютный путь (от корневой папки) в нашем случае npm_webpack - название папки в которой лежит проект path: './dist/' - нет. сейчас вызываем методо path.resolve и передаем ему два параметра __dirname - ссылка на текущую папку, так и пишется и dist - относительный путь до папки в которую будем все сохранять

    filename: mode === 'production' ? 'js/[name].[contenthash].js' : 'js/[name].js',
    assetModuleFilename: 'assets/[hash][ext][query]'
  },

  module: {
    rules: [
      // HTML
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },

      // SCSS/CSS
      {
        test: /\.(s[ac]ss|css)$/i,
        use: [
          mode === 'production' ? MiniCssExtractPlugin.loader : 'style-loader',
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },

      // JavaScript (Babel)
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            cacheDirectory: true,
          },
        },
      },

      // картинки
      {
        test: /\.(png|jpe?g|gif|svg|webp|ico)$/i,
        type: mode === 'production' ? 'asset' : 'asset/resource',
      },

      // шрифты
      {
        test: /\.(woff2?|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[hash][ext][query]'
        }
      },
    ],
  },

  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      minify: mode === 'production' ? {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
      } : false,
    }),
    ...(mode === 'production'
      ? [new MiniCssExtractPlugin({ filename: 'css/[name].[contenthash].css' })]
      : []
    ),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'src/assets',
          to: 'assets',
          noErrorOnMissing: true,
        },
      ],
    }),
  ],

  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },

  devtool: mode === 'development' ? 'source-map' : false,

  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    port: 3000,
    open: true,
    hot: true,
    compress: true,
    historyApiFallback: true,
  },
};