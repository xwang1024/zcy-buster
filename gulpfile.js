'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var spritesmith = require('gulp.spritesmith');

gulp.task('sass', function () {
  gulp.src('./scss/index.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./css/'));
  gulp.src('./scss/icon/ionicons.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./css/'));
});

gulp.task('sass:watch', function () {
  gulp.watch('./scss/*.scss', ['sass']);
});

gulp.task('sprite', function () {
  var spriteData = gulp.src('./images/sprite/*.png').pipe(spritesmith({
    imgName: 'sprite.png',
    cssName: 'sprite.css'
  }));
  return spriteData.pipe(gulp.dest('./sprite/'));
});

gulp.task('sprite:watch', function () {
  gulp.watch('./images/sprite/*.png', ['sprite']);
});

gulp.task('default', ['sass', 'sprite', 'sass:watch', 'sprite:watch']);
