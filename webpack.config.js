import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

let mode = 'development';
// eslint-disable-next-line no-undef
if (process.env.NODE_ENV === 'production') {
  mode = 'production';
}
console.log(mode + ' mode ')

export default {
  mode: mode,
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html"
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css'
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          mode === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  'postcss-preset-env',
                ],
              },
            },
          },
          'sass-loader',
        ],
      },
    ]
  },
}