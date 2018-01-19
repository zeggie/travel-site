var gulp = require('gulp');
var watch = require('gulp-watch');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var postCssVars = require('postcss-simple-vars');
var nested = require('postcss-nested')
var cssImport = require('postcss-import');
var browserSync = require('browser-sync').create();

gulp.task('default', function(){
  console.log("Hooray - you created a gulp task");
});

gulp.task('html', function(){
  console.log("Do something to your html tasks");
});
gulp.task('styles', function(){
  return gulp.src('./app/assets/styles/styles.css')
  .pipe(postcss([cssImport, postCssVars, nested, autoprefixer]))
  .pipe(gulp.dest('./app/temp/styles'));
});

//Start Watching
gulp.task('watch', function(){
  //Tell browser sync where the web lives
  browserSync.init({
    notify: false,
    server: {
      baseDir: "app"
    }
  });
  // Watch HTML file
  watch('./app/index.html', function() {
    browserSync.reload();
  });
  // Watch Style file
  watch('./app/assets/styles/**/*.css', function() {
    gulp.start('cssInject');
  });
});

gulp.task('cssInject', ['styles'], function(){
  return gulp.src('./app/temp/styles/styles.css')
  .pipe(browserSync.stream());
});

