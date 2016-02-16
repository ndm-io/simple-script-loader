var gulp = require('gulp'),
    uglify = require('gulp-uglify');

gulp.task('scripts', function () {
    gulp.src('src/*.js')
        .pipe(uglify({mangle: false}))
        .pipe(gulp.dest('dist'));
});

gulp.task('default', ['scripts']);