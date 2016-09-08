'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const uglify = require('gulp-uglify');
const cache = require('gulp-cache');
const sourcemaps = require('gulp-sourcemaps');
const imagemin = require('gulp-imagemin');
const webpack = require('webpack-stream');
const webpackConfig = require('./webpack.config.js');
const del = require('del');
const through = require('through2');
const runSequence = require('run-sequence');

gulp.task('es6', () => {
    return gulp.src('./src/js/index.js')
        .pipe(webpack(webpackConfig))
        .on('error', hanldeError)
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(through.obj(function (file, enc, cb) {
            const isSourceMap = /\.map$/.test(file.path);
            if (!isSourceMap) this.push(file);
            cb();
        }))
        .pipe(uglify())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./dist/js/'));
});

gulp.task('sass',  () => {
    return gulp.src('./src/scss/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(autoprefixer({ browsers: [ 'last 2 versions' ], cascade: false }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./dist/css/'));
});

gulp.task('images', () => {
	return gulp.src('./src/img/**/*')
    	.pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    	.pipe(gulp.dest('./dist/img/'));
});

gulp.task('fonts', () => {
	return gulp.src('./src/fonts/**/*')
    	.pipe(gulp.dest('./dist/fonts/'));
});

gulp.task('clean', () => {
    return del(['./dist/**']);
});

gulp.task('watch', ['es6', 'sass', 'images'], () => {
    gulp.watch('./src/js/**/*.js', ['es6']);
    gulp.watch('./src/scss/**/*.scss', ['sass']);
    gulp.watch('./src/img/**/*', ['images']);
});

gulp.task('default', () => {
  runSequence('clean',['fonts', 'watch']);
});

function hanldeError(err) {
  console.log(err);
  this.emit('end');
}
