let mode = 'development';
if (process.env.NODE_ENV === 'production') {
  mode = 'production';
}

const path = require('path');//поможет нам с абсолютным путем, чтобы не гадать где проект она уже есть в node.js не надо устанавливать
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: mode,//настраиваем режим сборки, код выше
  entry: {
    main: './src/index.js'// точка входа, куда заглянет вебпак в первую очередь
  },
  output: { //точка выхода , аналог bandle.js из browserify
    path: path.resolve(__dirname, 'dist'),// всегда должен быть абсолютный путь (от корневой папки) в нашем случае npm_webpack - название папки в которой лежит проект path: './dist/' - нет. сейчас вызываем методо path.resolve и передаем ему два параметра __dirname - ссылка на текущую папку, так и пишется и dist - относительный путь до папки в которую будем все сохранять
    filename: 'main.js'
  },
  plugins: [],
  module: {
    rules: []
  }
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'), // Каталог для статики
    },
    open: true, // Автоматически открывать браузер
  },
  mode: 'development', // Режим сборки
}
