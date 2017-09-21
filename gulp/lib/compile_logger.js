var gutil = require("gulp-util")
// 美化webpack的日志输出，强烈推荐！
module.exports = function(err, stats) {
    if (err) {
        throw new gutil.PluginError('webpack', err);
    }
    gutil.log('[webpack]', stats.toString({
        colors: gutil.colors.supportsColor,
        hash: false,
        timings: true,
        chunks: false,
        chunkModules: false,
        modules: false,
        children: false,
        version: false,
        cached: false,
        cachedAssets: false,
        reasons: false,
        source: false,
        errorDetails: false
    }));
}