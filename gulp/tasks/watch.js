var gulp = require('gulp');
var watch = require('gulp-watch');
var browserSync = require('browser-sync').create();

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
