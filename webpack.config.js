const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = (env) => {

    return {
        entry: './src/index.js',
        output: {
            path: path.join(__dirname, 'public'),
            filename: 'bundle.js',
        },
        module: {
            rules: [{
                loader: 'babel-loader',
                test: /\.js$/,
                exclude: /node_modules/
            }, {
                test: /\.svg/,
                use: {
                    loader: 'svg-url-loader',
                    options: {}
                }
            },   {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                  {
                    loader: 'file-loader',
                  },
                  {
                    loader: 'url-loader',
                    options: {
                        limit: 8192
                    }
                }
                ]
              },{
                test: /\.s?css$/,
                use: [
                  'style-loader',
                  'css-loader',
                  'sass-loader'
                ]
              },{
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                use: [
                  {
                    loader: 'file-loader',
                    options: {
                      name: '[name].[ext]',
                      outputPath: 'fonts/'
                    }
                  }
                ]
              }]
        },
        mode: 'development',
        devServer: {
            contentBase: path.join(__dirname, 'public'),
            historyApiFallback: true,
            port: 9000
        },
        node: {
          fs: 'empty'
        }
    }
}