var gulp = require('gulp'),
    sass = require('gulp-sass'),
    inlinecss = require('gulp-inline-css'),
    del = require('del'),
    rename = require("gulp-rename");

gulp.task('clean', function() {
    var stream = del(['./*.html', 'dev/*.css']);
    return stream;
});

gulp.task('sass', function() {
    var stream = gulp.src('dev/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('dev'));
    return stream;
});

gulp.task('inline-css', ['sass'], function() {
    return gulp.src('dev/*.html')
        .pipe(inlinecss())
        .pipe(rename("responsive-email-template.html"))
        .pipe(gulp.dest('./'));
});

// default build
gulp.task('default', ['clean'], function() {
    gulp.start('inline-css');
});

// watch for sass changes and process
gulp.task('watch', function() {
  gulp.watch('dev/*.scss', ['sass']);
});