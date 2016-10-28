const postcss = require('gulp-postcss'),
  gulp = require('gulp'),
  autoprefixer = require('autoprefixer'),
  lost = require('lost'),
  htmllint = require('gulp-htmllint'),
  colors = require('./src/css/vars'),
  gutil = require('gulp-util');


const options = {
  cssSource: './src/css/style.css',
  cssDestination: './dest/css'
};

gulp.watch(['./src/css/modules/*.css', './src/css/style.css'], function () {
  gulp.start(['css']);
});

gulp.task('html5', function () {
  return gulp.src('./src/index.html')
    .pipe(htmllint({}, htmllintReporter));
});

function htmllintReporter(filepath, issues) {
  console.log(issues.length);
  if (issues.length > 0) {
    issues.forEach(function (issue) {
      gutil.log(gutil.colors.cyan('[gulp-htmllint] ') + gutil.colors.white(filepath + ' [' + issue.line + ',' + issue.column + ']: ') + gutil.colors.red('(' + issue.code + ') ' + issue.msg));
    });

    process.exitCode = 1;
  }
}

gulp.task('css', function () {
  const proccessors = [
    lost(),
    autoprefixer({
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
      ]
    })
  ];
  return gulp.src(options.cssSource)
    .pipe(postcss([require('postcss-easy-import')]))
    .pipe(postcss([require('postcss-simple-vars')({ variables: colors , silent: false })]))
    .pipe(postcss(proccessors))
    .pipe(gulp.dest(options.cssDestination))
});