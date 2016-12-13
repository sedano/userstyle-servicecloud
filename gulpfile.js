var gulp = require('gulp');
var stripCssComments = require('gulp-strip-css-comments');
var insert = require('gulp-insert');
var rename = require("gulp-rename");
var concat = require("gulp-concat");
var del = require('del');

gulp.task('noComments', function () {
    return gulp.src('style.css')
        .pipe(stripCssComments())
        .pipe(gulp.dest('temp'));
});

gulp.task('parameters', ['noComments'], function () {
    return gulp.src(['parameters.css', './temp/style.css'])
        .pipe(concat('fullstyle.css'))
        .pipe(gulp.dest('temp'));
});

gulp.task('wrap', ['parameters'], function () {
    return gulp.src('./temp/fullstyle.css')
        .pipe(insert.wrap('@-moz-document domain("mstr.my.salesforce.com") { \n\n', '\n}'))
        .pipe(rename('userstyle.css'))
        .pipe(gulp.dest('dist'));
});

gulp.task('clean', ['wrap'], function () {
    return del([
        './temp'
    ]);
});


gulp.task('default', ['clean']);

