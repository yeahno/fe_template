var glob=require('glob');
var path=require('path');
var lodash = require('lodash');
var project = require('./lib/project')();
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var getPlugins=function(env){
    var defaultPlugins = [
        //遇到别名的时候自动引入模块
        //new webpack.ProvidePlugin({
        //    '$': 'jquery.js',
        //}),
        // 抽离公共模块
        //new webpack.optimize.CommonsChunkPlugin('common', 'common.js'),
        new webpack.optimize.ModuleConcatenationPlugin(),
        //抽出css
        new ExtractTextPlugin({
            filename:'css/[name]-[contenthash:8].css',
            allChunks: true,
        }),
        /*externals: {
            jquery: 'window.jQuery',
        }*/
        
    ];
    if (env == 'production') {
        // 线上模式的配置，去除依赖中重复的插件/压缩js/排除报错的插件
        plugins = lodash.union(defaultPlugins, [
            //vue
            new webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: '"production"'
                }
            }),
            new webpack.optimize.UglifyJsPlugin({
                minimize: true,
                compress: {
                    drop_console: true,
                    drop_debugger: true,
                    warnings: false
                },
                output: {
                    comments: false,
                },
                /*mangle: {
                    except: ['$super', '$', 'exports', 'require']
                }*/
            }),
            new webpack.NoEmitOnErrorsPlugin(),
            new OptimizeCssAssetsPlugin({
                assetNameRegExp: /\.css$/g,
                cssProcessor: require('cssnano'),
                cssProcessorOptions: {
                    discardComments: {removeAll: true}
                },
                canPrint: true
            }),
            new HtmlWebpackPlugin({
                //chunks: ['index', 'index2', 'common.js'],
                filename: './index.html',
                template: path.join(project.projectDir,"index.html"),
                inject: true,
                minify: {
                    collapseWhitespace: true
                },
            })
        ]);
    } else {
        plugins = lodash.union(defaultPlugins, [
            //new webpack.HotModuleReplacementPlugin(),
            new HtmlWebpackPlugin({
                //chunks: ['index', 'index2', 'common.js'],
                filename: './index.html',
                template: path.join(project.projectDir,"index.html"),
                inject: true
            })
        ]);
    }
    return plugins; 
}
module.exports = function(env) {
    return {
        entry: (function () {
            var map = {};
            var entry_files = glob.sync(project.projectDir+"/*.js").forEach(function(filepath){
                var filename = filepath.substring(filepath.lastIndexOf('\/') + 1, filepath.lastIndexOf('.'));
                map[filename] = filepath;
            })
            return map;
        })(),
        output: {
            path: project.buildDir,
            filename: 'js/[name].[hash:8].js',
            chunkFilename: 'js/[name].[hash:8].js',
            publicPath: "./",
        },
        devtool: "eval",
        watch: false,
        /*devServer: {
            contentBase: "./build",
            compress: true,
            port: 8080,
            hot:true,
            inline:true
        },*/
        profile: true,
        cache: true,
        module: {
            loaders: [{
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }, {
                test: /\.css$/,
                loader : ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader'
                })
            }, {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader!less-loader"
                })
            },{
                test: /\.vue$/,
                loader:'vue-loader'
            }]
        },
        resolve: {
            alias:{
                //'jquery': path.resolve(__dirname, '../src/vendor/jquery2/jquery.js'),
            }
        },
        plugins: getPlugins(env)
    }
}