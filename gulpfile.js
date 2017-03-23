//gulp需要的模块
var gulp = require("gulp");
var browserify = require("browserify");
var source = require("vinyl-source-stream");
var babel = require("babelify");
var sass = require("gulp-sass");
// var jshint = require('gulp-jshint');//检查js
// var watchify = require('watchify');
// var reactify = require('reactify');

// 编译任务 
gulp.task("browserify",function(){
    return browserify({entries: './src/js/Main.js', extensions: ['.jsx']})  //entris:入口文件的js  
        // .transform(reactify)
        .transform(babel)   //用babel转换
        .transform(require('browserify-shim'))  //需要browserify-shim转换
        .bundle()   //bundle合并
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('./public/javascripts'));   //编译文件目标目录
});

gulp.task('sass', function() {
    gulp.src('./src/sass/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./public/stylesheets'));//dest()写入文件
});

// gulp.task('lint', function() {
//     gulp.src('./src/js/*.js')
//         .pipe(jshint())
//         .pipe(jshint.reporter('default'));
// });

gulp.task("default", ['browserify', 'sass'], function() {
    gulp.watch('./src/js/*.js', ['browserify']);
    gulp.watch('./src/sass/*.scss', ['sass']);
});