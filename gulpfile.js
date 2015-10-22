var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    inlinecss = require('gulp-inline-css'),
    del = require('del'),
    rename = require("gulp-rename"),
    autoprefixer = require('gulp-autoprefixer'),
    sourcemaps = require('gulp-sourcemaps');

gulp.task('clean', function() {
    var stream = del(['email-template.html', 'style.css', 'style.css.map']);
    return stream;
});

gulp.task('sass', function() {
    var stream = sass('*.scss', { 
          sourcemap: true, 
          style: 'expanded'
        })
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('.'));
    return stream;
});

gulp.task('inline-css', ['sass'], function() {
    return gulp.src('index.html')
        .pipe(inlinecss())
        .pipe(rename("email-template.html"))
        .pipe(gulp.dest('.'));
});

// default build
gulp.task('default', ['clean'], function() {
    gulp.start('inline-css');
});

// watch for sass changes and process
gulp.task('watch', function() {
  gulp.watch('*.scss', ['sass']);
});