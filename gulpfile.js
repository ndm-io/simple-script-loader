var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename');

gulp.task('scripts', function () {
    gulp.src('src/*.js')
        .pipe(uglify({mangle: false}))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('dist'));
});

gulp.task('default', ['scripts']);