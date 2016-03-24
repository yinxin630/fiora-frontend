const webpack = require('webpack');

module.exports = {
    entry: './src/javascript/app.jsx',
    output: {
        path: __dirname + '/src/',
        filename: 'app.js'
    },
    watch: process.env.NODE_ENV === 'development' ? true : false,
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'stage-0', 'react'],
                }
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': `"${process.env.NODE_ENV}"`
            }
        })
    ]
};