const gulp = require('gulp');

const sass = require('gulp-sass');

const babel = require('gulp-babel');

const minify = require('gulp-minify');

const clean = require('gulp-clean');

function sassToCSS() {
  return gulp.src('./app.scss').pipe(sass({
    outputStyle: 'compressed'
  }).on('error', sass.logError)).pipe(gulp.dest('./dist/css'));
}

function runBabel(done) {
  gulp.src('./*.js').pipe(babel()).pipe(minify()).pipe(gulp.dest('./dist/js'));
  done();
}

function del() {
  return gulp.src('./dist').pipe(clean());
}

const test = gulp.series(del, sassToCSS, runBabel);
gulp.task('default', test);