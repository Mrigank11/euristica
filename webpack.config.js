const path = require('path');
const webpack = require('webpack');
//plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const ETP = require("extract-text-webpack-plugin");

//region arguments parsing
let argv = JSON.parse(process.env.npm_config_argv).original;
const prod = argv.indexOf("--prod") > -1 ? 1 : 0;
//endregion

const paths = {
    node: "node_modules",
    src: path.join(__dirname, 'src'),
    scss: path.join(__dirname, 'src/scss'),
    js: path.join(__dirname, "src/js"),
    dist: path.join(__dirname, "dist")
}

/**
 * Webpack Configuration
 */
let config = {
    entry: path.join(paths.js, 'main.js'),
    output: {
        path: path.join(paths.dist),
        filename: 'build.js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            minify: {
                minifyCSS: true,
                collapseWhitespace: true
            }, template: path.join(paths.src, "index.html"), hash: true
        }),
        new ETP("style.css")
    ],
    module: {
        rules: [
            // BABEL
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /(node_modules)/,
                options: {
                    compact: true
                }
            },

            // SASS
            {
                test: /\.scss/,
                use: ETP.extract({
                    use: [{
                        loader: 'css-loader',
                        options: {
                            minimize: true
                        }
                    }, 'sass-loader']
                })
            },

            // IMAGES
            {
                test: /\.(jpe?g|png|gif)$/,
                loader: 'file-loader',
                options: {
                    name: '[path][name].[ext]'
                }
            }
        ]
    }
};

if (prod)
    config.plugins.push(new UglifyJsPlugin());

module.exports = config;