const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const htmlPlugin = new HtmlWebPackPlugin({
    template: "./src/index.html",
    filename: "./index.html"
});


module.exports = {
    entry:'./src/index.tsx',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    devServer: {
        historyApiFallback: true,
        contentBase: './'
    },
    resolve: { extensions: [".tsx", ".ts", ".js"] },
    plugins: [htmlPlugin, new MiniCssExtractPlugin({
        filename: 'style.[contenthash].css',
    }),],
    module:{
        rules:[
            {
                test: /\.scss$/,
                use:  [  'style-loader', MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
            },
            {
                test: /\.(jpe?g|png|gif|svg|woff|woff2|eot|ttf)$/i,  // a regular expression that catches .js files
                exclude: /node_modules/,
                loader: 'file-loader',
            },
            {
                test: /\.ts|\.tsx$/,
                exclude: path.resolve(__dirname, 'node_modules'),
                include: path.resolve(__dirname, 'src'),
                use: 'awesome-typescript-loader',
            },

            {
                test: /\.js$/,
                exclude: path.resolve(__dirname, 'node_modules'),
                include: path.resolve(__dirname, 'src'),
                use: 'babel-loader',
            },
        ]
    },
};
