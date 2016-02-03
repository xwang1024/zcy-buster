'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var spritesmith = require('gulp.spritesmith');
var babel = require('gulp-babel');

gulp.task('es6', function() {
	gulp.src('scripts/**/*.es6')
		.pipe(babel({
			presets: ['es2015']
		}))
		.pipe(gulp.dest('../js/'));
  gulp.src('scripts/**/*.js')
		.pipe(gulp.dest('../js/'));
});

gulp.task('es6:watch', function() {
  gulp.watch('scripts/**/*', ['es6']);
});

gulp.task('styles', function () {
  gulp.src('./styles/index.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('../css/'));
  gulp.src('./scss/icon/ionicons.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('../css/'));
});

gulp.task('styles:watch', function () {
  gulp.watch('./styles/*.scss', ['styles']);
});

gulp.task('sprite', function () {
  var spriteData = gulp.src('./images/sprite/*.png')
  .pipe(spritesmith({
    imgName: 'sprite.png',
    cssName: 'sprite.css'
  }));
  return spriteData.pipe(gulp.dest('../sprite/'));
});

gulp.task('sprite:watch', function () {
  gulp.watch('./images/sprite/*.png', ['sprite']);
});

gulp.task('view', function () {
  gulp.src('index.html')
    .pipe(gulp.dest('../'));
  gulp.src('./views/**/*.html')
    .pipe(gulp.dest('../page/'));
});

gulp.task('view:watch', function () {
  gulp.watch('index.html', ['view'])
  gulp.watch('./views/**/*.html', ['view']);
});

gulp.task('default', ['es6', 'styles', 'sprite', 'view', 'es6:watch', 'styles:watch', 'sprite:watch', 'view:watch']);
