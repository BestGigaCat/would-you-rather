const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry:'./src/index.tsx',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    resolve: { extensions: [".tsx", ".ts", ".js"] },
    plugins: [new HtmlWebpackPlugin({
        template: './src/index.html'
    }), new MiniCssExtractPlugin({
        filename: 'style.[contenthash].css',
    }),],
    module:{
        rules:[
            {
                test: /\.scss$/,
                use:  [  'style-loader', MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
            },
            {
                test: /\.(jpe?g|png|gif|svg|woff|woff2|eot|ttf)$/i,
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
    mode: "development",
    devServer: {
        contentBase: './',
        inline: true,
        historyApiFallback: true,
    }
};
