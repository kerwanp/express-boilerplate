const TsconfigPathsPlugin = require( "tsconfig-paths-webpack-plugin");

const path = require('path');
const nodeExternals = require('webpack-node-externals');
const CopyPlugin = require('copy-webpack-plugin');

const {
    NODE_ENV = 'development'
} = process.env;

module.exports = {
    entry: './src/app.ts',
    mode: NODE_ENV,
    watch: NODE_ENV === 'development',
    target: 'node',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'app.js'
    },
    resolve: {
        extensions: ['.ts', '.js'],
        plugins: [new TsconfigPathsPlugin()]
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: [
                    'ts-loader'
                ]
            }
        ]
    },
    plugins: [
        new CopyPlugin([
            {from: 'src/.env', to: ''},
            {from: 'src/.env.*', to: ''}
        ])
    ],
    externals: [nodeExternals()]
};