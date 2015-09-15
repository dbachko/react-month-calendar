'use strict';

var del = require('del'),
    gulp = require('gulp'),
    gutil = require('gulp-util'),
    webpack = require('webpack'),
    compass = require('gulp-compass'),
    browserSync = require('browser-sync'),
    autoprefixer = require('gulp-autoprefixer'),
    webpackConfig = require('./webpack.config.js');

gulp.task('clean:dist', function() {
  return del('dist');
});

gulp.task('webpack', function(callback) {
  var jsFilename = webpackConfig.output.filename;

  if (gutil.env.production) {
    webpackConfig.output.filename = gutil.replaceExtension(jsFilename, '.min.js');
    webpackConfig.plugins = webpackConfig.plugins.concat(
      new webpack.DefinePlugin({
        'process.env': { 'NODE_ENV': JSON.stringify('production') }
      }),
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin()
    );
  }

  webpack(webpackConfig).run(function(err, stats) {
    if (err) {
      throw new gutil.PluginError('webpack', err);
    }

    gutil.log('[webpack]', stats.toString({ colors: true }));
    browserSync.reload();
    callback();
  });
});

gulp.task('server', ['compass'], function() {
  browserSync({
    open: false,
    notify: false,
    server: {
      baseDir: ['example', 'dist']
    }
  });
});

gulp.task('compass', function() {
  return gulp.src('lib/styles/main.sass')
    .pipe(compass({
      css: 'dist/styles',
      sass: 'lib/styles'
    })).pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    })).pipe(gulp.dest('dist/styles'));
});

gulp.task('copy', function() {
  return gulp.src(['lib/assets/**'])
    .pipe(gulp.dest('dist'));
})

gulp.task('watch', function() {
  gulp.watch('./lib/scripts/*.jsx', ['webpack']);
  gulp.watch('./lib/styles/*.{scss,sass}', ['compass', 'webpack']);
});

gulp.task('default', ['clean:dist', 'webpack', 'copy', 'server', 'watch']);
