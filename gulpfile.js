'use strict';

var gulp                = require('gulp'),
    autoPrefixer        = require('autoprefixer-stylus'),
    concat              = require('gulp-concat'),
    cssBeautify         = require('gulp-cssbeautify'),
    cssComb             = require('gulp-csscomb'),
    csso                = require('gulp-csso'),
    browserSync         = require('browser-sync').create(),
    combineMQ           = require('gulp-combine-mq'),
    htmlPrettify        = require('gulp-html-prettify'),
    jade                = require('gulp-jade'),
    notify              = require('gulp-notify'),
    plumber             = require('gulp-plumber'),
    rename              = require('gulp-rename'),
    rev                 = require('gulp-rev-append'),
    rigger              = require('gulp-rigger'),
    rimraf              = require('rimraf'),
    runSequence         = require('run-sequence'),
    stripCssComments    = require('gulp-strip-css-comments'),
    stylus              = require('gulp-stylus'),
    uglify              = require('gulp-uglify'),
    urlAdjuster         = require('gulp-css-url-adjuster'),
    watch               = require('gulp-watch');

// Plugins options
var options = {
    browserSync: {
        server: {
            baseDir: "dist/"
        },
        tunnel: false,
        host: 'localhost',
        port: 9007
    },
    plumber: {
        errorHandler: notify.onError("Error: <%= error.message %>")
    },
    stylus: {
        'include css': true,
        use: [
            autoPrefixer({
                cascade: false
            })
        ]
    },
    cssBeautify: {
        indent: '\t',
        autosemicolon: true
    },
    htmlPrettify: {
        indent_char: ' ',
        indent_size: 4
    }
};


gulp.task('browser-sync', function() {
    return browserSync.init(options.browserSync);
});

// CLEAN Folders

gulp.task('clean:dist', function (cb) {
    rimraf("./dist", cb);
});
gulp.task('clean:tmp', function (cb) {
    rimraf("./scr/tmp", cb);
});
gulp.task('clean', ['clean:dist', 'clean:tmp']);


// JADE, HTML PAGES

gulp.task('pages', function(){
    return gulp.src("src/pages/*.jade")
        .pipe(plumber(options.plumber))
        .pipe(jade({pretty: true}))
        .pipe(htmlPrettify(options.htmlPrettify))
        .pipe(gulp.dest("dist/"))
});

gulp.task('rev', function() {
  gulp.src("dist/*.html")
    .pipe(rev())
    .pipe(gulp.dest("dist"))
});

gulp.task('html', function (cb) {
    return runSequence('pages', 'rev', cb);
});


// STYLUS, CSS STYLES

gulp.task('style', function(){
    return gulp.src("src/styles/style.styl")
        .pipe(plumber(options.plumber))
        .pipe(stylus(options.stylus))
        .pipe(urlAdjuster({prepend: '../'}))
        .pipe(combineMQ({beautify: false}))
        .pipe(cssBeautify(options.cssBeautify))
        .pipe(cssComb())
        .pipe(gulp.dest("dist/assets/css/"))
        .pipe(stripCssComments({preserve:false}))
        .pipe(csso())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest("dist/assets/css/"))
});


// JAVASCRIPT

gulp.task('js:app', function () {
    return gulp.src(['src/js/common.js','src/blocks/**/*.js'])
        .pipe(plumber(options.plumber))
        .pipe(concat('app.js'))
        .pipe(gulp.dest("dist/assets/js/"))
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest("dist/assets/js/"))
});

// gulp.task('js:plugins', function () {
//     return gulp.src("src/js/plugins.js")
//         .pipe(plumber(options.plumber))
//         .pipe(rigger())
//         .pipe(rename('plugins.js'))
//         .pipe(gulp.dest("src/tmp/"))
//         .pipe(uglify())
//         .pipe(rename({suffix: '.min'}))
//         .pipe(gulp.dest("dist/assets/js/"))
// });

gulp.task('js:jquery', function() {
    return gulp.src("src/bower/jquery/dist/jquery.min.js")
        .pipe(plumber(options.plumber))
        .pipe(gulp.dest("dist/assets/js/"))
});

// gulp.task('js', ['js:jquery','js:plugins','js:app']);
gulp.task('js', ['js:jquery','js:app']);

// IMAGES, PNG SPRITE, Favicons

gulp.task('img', function () {
    return gulp.src("src/img/**/{*,!_*}.{jpg,gif,svg,png}")
        .pipe(plumber(options.plumber))
        .pipe(gulp.dest("dist/assets/img/"))
});

gulp.task('favicons', function() {
    return gulp.src("src/favicons/{*,!_*}.*")
        .pipe(plumber(options.plumber))
        .pipe(gulp.dest("dist/assets/img/favicons/"))
});


// OTHER TASKS

gulp.task('fonts', function() {
    return gulp.src("src/fonts/**/*.*")
        .pipe(plumber(options.plumber))
        .pipe(gulp.dest("dist/assets/fonts/"))
});


// WATCH for live reload

gulp.task('watch', function (cb) {
    global.isWatching = true;

    watch(["src/pages/**/*.{jade,html}", "src/blocks/**/*.jade"], function(event, cb) {
        runSequence('html', browserSync.reload);
        notify("HTML").write('');
    });

    watch(["src/styles/style.styl", "src/styles/inc/*.styl", "src/blocks/**/*.styl"], function(event, cb) {
        runSequence('style', browserSync.reload)
        notify("Main Styles").write('');
    });

    watch(["src/js/common.js", "src/js/inc/*.js", "src/blocks/**/*.js"], function(event, cb) {
        runSequence('js:app', browserSync.reload);
        notify("JS Application").write('');
    });

    watch("src/img/*.*", function(event, cb) {
        runSequence('img', browserSync.reload);
        notify("Images").write('');
    });

    watch("src/fonts/**/*.*", function(event, cb) {
        runSequence('fonts', browserSync.reload);
        notify("Fonts").write('');
    });

});

// Build and Development mode

gulp.task('build', function (cb) {
    return runSequence(
        'clean',
        ['img', 'favicons', 'fonts', 'js'],
        ['style'],
        'html', cb);
});

gulp.task('default', function (cb) {
    return runSequence('build', ['browser-sync', 'watch'], cb);
});
