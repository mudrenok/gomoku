/**
 * Created by anton on 5/14/2015.
 */
var gulp       = require('gulp');
var jade       = require('gulp-jade');
var uglify     = require('gulp-uglify');
var sass       = require('gulp-sass');
var connect    = require('gulp-connect');
var browserify = require('browserify');
var source     = require('vinyl-source-stream');
var streamify  = require('gulp-streamify');
//var gulpif     = require('gulp-if');

var production = false; // true; false;
var outDir = 'builds/development';
var prodDir = 'builds/production';

gulp.task('jade', function(){
  return gulp.src('src/templates/**/*.jade')
    .pipe(jade())
    .pipe(gulp.dest(outDir))
    .pipe(connect.reload());
});

gulp.task('js', function(){
  return browserify('src/js/main.js',{debug : true})
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest(outDir + '/js'))
    .pipe(connect.reload());
});

gulp.task('jsProd', function(){
  return gulp.src(outDir + '/js/*.js')
    .pipe(streamify(uglify()))
    .pipe(gulp.dest(prodDir + '/js'))
    .pipe(connect.reload());
});

gulp.task('sass', function(){
  return gulp.src('src/sass/main.scss')
    .pipe(sass({sourceComments: 'map'}))
    .pipe(gulp.dest(outDir + '/css'))
    .pipe(connect.reload());
});

gulp.task('sassProd', function(){
  return gulp.src('src/sass/main.scss')
    .pipe(sass({sourceComments: 'compressed'}))
    .pipe(gulp.dest(prodDir + '/css'))
    .pipe(connect.reload());
});

gulp.task('connectDev', function () {
  connect.server({
    root: outDir,
    port: 8000,
    livereload: true
  });
});

gulp.task('watch', function(){
  gulp.watch('src/templates/**/*.jade', ['jade']);
  gulp.watch('src/js/**/*.js', ['js']);
  gulp.watch('src/sass/**/*.scss', ['sass']);
});

var tasks = ['js', 'jade', 'sass', 'connectDev', 'watch'];
var tasksProd = ['jsProd', 'sassProd'];
if (production) tasks = tasks.concat(tasksProd);

gulp.task('default', tasks);