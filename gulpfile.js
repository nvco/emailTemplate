var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    inlinecss = require('gulp-inline-css'),
    del = require('del'),
    rename = require("gulp-rename"),
    autoprefixer = require('gulp-autoprefixer'),
    sourcemaps = require('gulp-sourcemaps'),
    replace = require('gulp-replace'),
    fs = require('fs');

gulp.task('clean', function() {
    var stream = del(['email-template.html', 'style.css', 'style.css.map']);
    return stream;
});

gulp.task('sass', function() {
    var stream = sass('*.scss', { 
          sourcemap: true, 
          style: 'expanded'
        })
        //.pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('.'));
    return stream;
});

gulp.task('head-css', ['sass'], function() {
    var stream = gulp.src('index.html')
        .pipe(rename('email-template.html'))
        .pipe(gulp.dest('.'))
        .pipe(replace(/<link href="style-head.css"[^>]*>/, function(s) {
            var style = fs.readFileSync('style-head.css', 'utf8');
            return '<style>\n' + style + '\n</style>';
        }))
        .pipe(gulp.dest('.'));
    return stream;
});

gulp.task('inline-css', ['head-css'], function() {
    var stream = gulp.src('email-template.html')
        .pipe(inlinecss({
            applyStyleTags: false,
            removeStyleTags: false
        }))
        .pipe(gulp.dest('.'));
    return stream;
});

// default build
gulp.task('default', ['clean'], function() {
    gulp.start('inline-css');
});

// watch for sass changes and process
gulp.task('watch', function() {
  gulp.watch('*.scss', ['sass']);
});