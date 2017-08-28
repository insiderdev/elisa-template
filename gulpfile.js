var gulp = require('gulp');
var less = require('gulp-less');
var browserSync = require('browser-sync').create();
var header = require('gulp-header');
var cleanCSS = require('gulp-clean-css');
var rename = require("gulp-rename");
var uglify = require('gulp-uglify');
var pkg = require('./package.json');
var mustache = require('gulp-mustache');
const imagemin = require('gulp-imagemin');

// Compiles mustache templates into html
gulp.task('templates', function() {
  return gulp.src('./*.mustache')
    .pipe(mustache({}, {
        extension: '.html'
    }))
    .pipe(gulp.dest('./dist'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

// Compile LESS files from /less into /css
gulp.task('less', function() {
    return gulp.src('less/style.less')
        .pipe(less())
        .pipe(gulp.dest('./dist/css'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

// Minify compiled CSS
gulp.task('minify-css', function() {
    return gulp.src('dist/css/style.css')
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

// Minify JS
gulp.task('minify-js', function() {
    return gulp.src('js/index.js')
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('dist/js'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

// Copy vendor libraries from /node_modules into /vendor
gulp.task('copy', function() {
    gulp.src(['node_modules/bootstrap/dist/**/*', '!**/npm.js', '!**/bootstrap-theme.*', '!**/*.map'])
        .pipe(gulp.dest('dist/vendor/bootstrap'));

    gulp.src(['node_modules/jquery/dist/jquery.js', 'node_modules/jquery/dist/jquery.min.js'])
        .pipe(gulp.dest('dist/vendor/jquery'));

  gulp.src(['node_modules/video.js/dist/video.min.js', 'node_modules/video.js/dist/video-js.min.css'])
    .pipe(gulp.dest('dist/vendor/video.js'));

    gulp.src(['node_modules/magnific-popup/dist/*'])
        .pipe(gulp.dest('dist/vendor/magnific-popup'));

    gulp.src(['node_modules/scrollreveal/dist/*.js'])
        .pipe(gulp.dest('dist/vendor/scrollreveal'));

  gulp.src(['libs/device-mockups/**/*.*'])
    .pipe(gulp.dest('dist/vendor/device-mockups'));

  gulp.src(['node_modules/animate.css/animate.min.css'])
    .pipe(gulp.dest('dist/vendor/animate.css'));

  gulp.src(['node_modules/wowjs/dist/wow.min.js'])
    .pipe(gulp.dest('dist/vendor/wowjs'));

  gulp.src(['node_modules/svg-injector/dist/svg-injector.min.js'])
    .pipe(gulp.dest('dist/vendor/svg-injector'));

  gulp.src(['img/**/*.*'])
    .pipe(imagemin())
    .pipe(gulp.dest('dist/img'));

  gulp.src(['video/**/*.*'])
    .pipe(gulp.dest('dist/video'));

    gulp.src([
            'node_modules/font-awesome/**',
            '!node_modules/font-awesome/**/*.map',
            '!node_modules/font-awesome/.npmignore',
            '!node_modules/font-awesome/*.txt',
            '!node_modules/font-awesome/*.md',
            '!node_modules/font-awesome/*.json'
        ])
        .pipe(gulp.dest('dist/vendor/font-awesome'))
});

// Run everything
gulp.task('default', ['templates', 'less', 'minify-css', 'minify-js', 'copy']);

// Configure the browserSync task
gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: './dist'
        }
    })
});

// Dev task with browserSync
gulp.task('dev', ['less', 'minify-css', 'minify-js', 'templates', 'copy', 'browserSync'], function() {
    gulp.watch(['less/*.less', 'less/**/*.less', 'less/**/**/*.less'], ['less']);
    gulp.watch('dist/css/style.css', ['minify-css']);
    gulp.watch('js/*.js', ['minify-js']);
    gulp.watch(['img/*.*', 'img/**/*.*'], ['copy']);
    // Reloads the browser whenever HTML or JS files change
    gulp.watch('./**/*.mustache', ['templates']);
});
