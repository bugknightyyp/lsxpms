var gulp = require('gulp');
var less = require('gulp-less');
var path = require('path');
//https://scotch.io/tutorials/a-quick-guide-to-using-livereload-with-gulp
var livereload = require('gulp-livereload');
var autoprefixer = require('gulp-autoprefixer');
var reloadConfig = {
  port: 8080,
  host: "127.0.0.1",
  basePath: "/"
}

gulp.task('less', function () {
  return gulp.src('./less/main.less')  //gulp.src('./less/**/*.less')
    .pipe(less({
      paths: [ path.join(__dirname, 'less') ]
    }))
    .on('error', function (err) {
                this.emit('end');
    })
    .pipe(autoprefixer({
      browsers: [
                  '> 1%',
                  'last 2 versions',
                  'firefox >= 4',
                  'safari 7',
                  'safari 8',
                  'IE 8',
                  'IE 9',
                  'IE 10',
                  'IE 11'
      ],
      cascade: true
    }))
    .pipe(gulp.dest('./css')) //autoprefixer()
    .pipe(livereload())
    .on('error', function (err) {
                //gutil.log(err);
                this.emit('end');
    })
});
gulp.task('html', function () {
  return gulp.src('./page/**/*.html')  //gulp.src('./less/**/*.less')
    .pipe(livereload())
});

gulp.task('watch',  function() {
  livereload.listen();
  gulp.watch('less/**/*.less', ['less']);
  gulp.watch('page/**/*.html', ['html']);
});



gulp.task('default', ['watch']);
