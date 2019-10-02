const gulp = require('gulp');
const sass = require('gulp-sass');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const cleanCSS = require('gulp-clean-css');
const del = require('del');

function clean() {
  return del('./build/*');
}

function styles() {
  return gulp.src('./src/css/app.scss')
    .pipe(sass())
    .pipe(cleanCSS())
    .pipe(rename({
      basename: 'main',
      suffix: '.min'
    }))
    .pipe(gulp.dest('./build/css'));
}

function scripts() {
  return gulp.src('./src/js/*.js')
    .pipe(babel())
    .pipe(uglify())
    .pipe(gulp.dest('./build/js'));
}
 
function watch() {
  gulp.watch('./css/style.scss', styles);
  gulp.watch('./js/*.js', scripts);
}

exports.clean = clean;
exports.styles = styles;
exports.scripts = scripts;
exports.watch = watch;
exports.default = gulp.series(clean, styles, scripts);