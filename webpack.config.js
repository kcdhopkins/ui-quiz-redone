const HtmlWebpackPlugin = require("html-webpack-plugin"); 
const path = require("path");
// const { CleanWebpackPlugin } = require("clean-webpack-plugin"); 

module.exports = {
    entry: './src/index.js',
    output:{
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        clean: true,
    },
    module:{
        rules: [
            {test: /\.txt/, use: 'raw-loader'},
            {test: /\.(js|jsx)$/, exclude: /nodeModules/, use: { loader: 'babel-loader'}},
            {test: /\.css/, use: [{loader: 'style-loader'}, {loader: 'css-loader'}]},
            {test: /\.html$/, use: [ {loader: 'html-loader', options: {minimize: true}}]},
            {test: /\.(png|jpg|gif)$/, use: {loader: 'file-loader'}} 
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({title:'Here Goes Nothing', template: 'index.html'}),
        // new CleanWebpackPlugin()
    ],
    devtool : 'inline-source-map',
    devServer: {
       port: 3000,
       liveReload: true
     }
}