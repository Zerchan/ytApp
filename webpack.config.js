const webpack = require('webpack');

module.exports = {
    output: {
        filename: 'bundle.js'
    },
    module: {
        loaders: [{
            exclude: /node_modules/,
            loader: 'babel-loader',
            query:
            {
                retainLines: true,
                cacheDirectory: true,
                presets: ['react', 'es2015', 'stage-1'],
                plugins: [
                    'transform-decorators-legacy'
                ]
            }
        }]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        })
    ],
    devtool: 'source-map',
    resolve: {
        extensions: ['', '.js', '.jsx']
    }
};
