var gulp=require('gulp');
var sequence = require('gulp-sequence');
gulp.task('build', sequence(
    'build:webpack'
));

gulp.task('one',function(callback){
    setTimeout(function(){
        console.log("-----one------");    
        callback();
    },2000) 
})
gulp.task('two',function(callback){
    setTimeout(function(){
        console.log("-----two------");
        callback();
    },1000) 
   
})
gulp.task('test',["one"],function(){
    setTimeout(function(){
        console.log("complete");
    },1000) 
})