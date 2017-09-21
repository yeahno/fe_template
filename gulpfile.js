/*var _ = require('lodash');
var del = require('del');
var webpack = require('webpack');
var gulp = require('gulp');
var plumber = require('gulp-plumber');
var newer = require('gulp-newer');
var logger = require('gulp-logger');
var project = require('./gulp/lib/project')();
var config = require('./gulp/config.' + project).webpack;
var compileLogger = require('./gulp/lib/compile_logger');
var handleErrors = require('../gulp/lib/handle_errors');*/

var requireDir = require('require-dir');
//递归引入gulp/task目录下的文件
requireDir('./gulp/task', { recurse: true });