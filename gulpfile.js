var gulp = require('gulp'),
    sass = require('gulp-sass'),
    inlinecss = require('gulp-inline-css'),
    del = require('del'),
    browsersync = require('browser-sync').create();

gulp.task('clean-before', function() {
    del(['./*.html'])
});

gulp.task('sass', ['clean-before'], function() {
    return gulp.src('dev/style.scss')
        .pipe(sass())
        .pipe(gulp.dest('dev'));
});

gulp.task('inline-css', ['sass'], function() {
    return gulp.src('dev/*.html')
        .pipe(inlinecss())
        .pipe(gulp.dest('./'));
});

gulp.task('clean-after', ['inline-css'], function() {
    del(['dev/*.css'])
});

gulp.task('default', ['clean-after']);
