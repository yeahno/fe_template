var gulp=require('gulp');
var webpack = require('webpack');
var compileLogger=require('../lib/compile_logger');
var WebpackDevServer = require('webpack-dev-server');

gulp.task('webpack', ['clean'], function(callback) {
    webpack(require('../webpack.config.js')(), function(err, stats) {
        //让webpack的日志输出更好看
        compileLogger(err, stats);
        //这个callback是为了解决gulp异步任务的核心，强烈注意
        callback();
    });
});
gulp.task('watch:webpack', ['clean'], function(callback) {
    var config=require('../webpack.config.js')()
    config.watch=true;
    webpack(config).watch(200, function(err, stats) {
        compileLogger(err, stats);
    });
});
gulp.task('build:webpack', ['clean'], function(callback) {
    var config=require('../webpack.config.js')('production');
    config.devtool=false;
    webpack(config, function(err, stats) {
        compileLogger(err, stats);
        callback();
    });
});
gulp.task('dev:webpack',['clean'],function(){
    var host="localhost";
    var port="8080";
    var webpack_config=require('../webpack.config.js')();
    webpack_config.entry._dev_server="webpack-dev-server/client?http://"+host+":"+port+"/";
    var devServer=new WebpackDevServer(webpack(webpack_config),{});
    devServer.listen(port, host);
});