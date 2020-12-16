const path = require('path');
var dotenv = require('dotenv').config({path: __dirname + '/.env'});

module.exports = {
    context: __dirname,
    entry: "./app.js",
    output: {
      path: path.resolve(__dirname, "./"),
      filename: "webpack.js",
      chunkLoading: false,
      wasmLoading: false,
    },
    resolve: {
        fallback: { "path": require.resolve("path-browserify") }
    },
    module: {
      rules: [
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        },
        {
          test: /\.(png|jpe?g|gif)$/i,
          use: [
            {
              loader: 'file-loader',
            },
          ],
        }
      ],
    },
    target: 'node'
};