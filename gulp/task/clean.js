var gulp=require('gulp');
var del=require('del');
var project = require('../lib/project')();

gulp.task('clean', function(callback) {
    del([project.buildDir], { force: true });
    callback();
});