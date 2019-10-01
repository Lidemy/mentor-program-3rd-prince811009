const gulp=require("gulp"),sass=require("gulp-sass"),babel=require("gulp-babel"),minify=require("gulp-minify"),clean=require("gulp-clean");function sassToCSS(){return gulp.src("./app.scss").pipe(sass({outputStyle:"compressed"}).on("error",sass.logError)).pipe(gulp.dest("./dist/css"))}function runBabel(s){gulp.src("./*.js").pipe(babel()).pipe(minify()).pipe(gulp.dest("./dist/js")),s()}function del(){return gulp.src("./dist").pipe(clean())}const test=gulp.series(del,sassToCSS,runBabel);gulp.task("default",test);