var gulp = require('gulp'),
    clean = require('gulp-clean'),
    jade = require('gulp-jade'),
    plumber = require('gulp-plumber'),
    browserify = require('gulp-browserify'),
    uglify = require('gulp-uglify'),
    gulpif = require('gulp-if'),
    cssmin = require('gulp-cssmin'),
    useref = require('gulp-useref'),
    paths = {
        src: './client/src/',
        app: './client/src/app/',
        dest: './client/build/',
        templates: './client/src/assets/templates/',
        stylesheets: './client/src/assets/stylesheets/',
        vendor: './client/src/vendor/'
    };

gulp.task('html', function () {
    return gulp.src(paths.templates + '**/*.jade')
        .pipe(jade({pretty: true}))
        .pipe(gulp.dest(paths.dest + 'assets/templates'));
});

gulp.task('vendor', function () {
    return gulp.src(paths.vendor + '**')
        .pipe(gulp.dest(paths.dest + 'vendor'));
});

gulp.task('scripts', function () {
    return gulp.src(paths.app + 'init.js')
        .pipe(plumber())
        .pipe(browserify())
        .pipe(gulp.dest(paths.dest + 'assets/scripts'));
});

gulp.task('stylesheets', function () {
    return gulp.src(paths.stylesheets + '**')
        .pipe(gulp.dest(paths.dest + 'assets/stylesheets'));
});

gulp.task('clean', function () {
    return gulp.src(paths.dest, {read: false})
        .pipe(clean());
});

gulp.task('serve', function () {
    var app = require('./app'),
        config = require('./libs/config'),
        log = require('./libs/log')(module);

    app.listen(config.get('port'), function () {
        log.info('Express server listening on port ' + config.get('port'));
    });
});

gulp.task('refs', function () {
    var assets = useref.assets();

    return gulp.src(paths.dest + 'assets/templates/index.html')
        .pipe(assets)
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.css', cssmin()))
        .pipe(assets.restore())
        .pipe(useref())
        .pipe(gulp.dest(paths.dest + 'assets/templates'));
});

gulp.task('watch', function () {
    gulp.watch(paths.templates + '**/*.jade', ['html']);

    gulp.watch(paths.app + '**/*.js', ['scripts']);

    gulp.watch(paths.stylesheets + '**', ['stylesheets']);
});

gulp.task('start', ['watch', 'serve']);

gulp.task('build', ['html', 'scripts', 'vendor', 'stylesheets']);

