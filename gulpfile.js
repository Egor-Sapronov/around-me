var gulp = require('gulp'),
    clean = require('gulp-clean'),
    jade = require('gulp-jade'),
    plumber = require('gulp-plumber'),
    stylus = require('gulp-stylus'),
    browserify = require('browserify'),
    jshint = require('gulp-jshint'),
    transform = require('vinyl-transform'),
    argv = require('yargs').argv,
    log = require('./libs/log')(module),
    paths = {
        src: './client/src/',
        app: './client/src/app/',
        dest: './client/build/',
        templates: './client/src/assets/templates/',
        stylesheets: './client/src/assets/stylesheets/',
        vendor: './client/src/vendor/'
    },
    production;

if (argv.production || argv.prod) {
    production = true;
    log.info('Production build');
}

gulp.task('fonts', function () {
    gulp.src(paths.src + 'assets/font/**')
        .pipe(plumber())
        .pipe(gulp.dest(paths.dest + 'assets/font'));
});

gulp.task('html', function () {
    return gulp.src(paths.templates + '**/*.jade')
        .pipe(plumber())
        .pipe(jade({pretty: true}))
        .pipe(gulp.dest(paths.dest + 'assets/templates'));
});

gulp.task('vendor', function () {
    return gulp.src(paths.vendor + '**')
        .pipe(gulp.dest(paths.dest + 'vendor'));
});

gulp.task('jshint', function () {
    return gulp.src(paths.app + '**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('browserify', function () {
    var browserified = transform(function (filename) {
        var b = browserify(filename);
        return b.bundle();
    });

    return gulp.src([paths.src + 'app.js'])
        .pipe(plumber())
        .pipe(browserified)
        .pipe(gulp.dest(paths.dest + 'assets/scripts'));
});

gulp.task('css', function () {
    return gulp.src(paths.stylesheets + '**/*.css')
        .pipe(plumber())
        .pipe(gulp.dest(paths.dest + 'assets/stylesheets'));
});

gulp.task('stylus', function () {
    return gulp.src(paths.stylesheets + '**/*.styl')
        .pipe(plumber())
        .pipe(stylus())
        .pipe(gulp.dest(paths.dest + 'assets/stylesheets'));
});

gulp.task('stylesheets', ['css', 'stylus']);

gulp.task('clean', function () {
    return gulp.src(paths.dest, {read: false})
        .pipe(plumber())
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

gulp.task('watch', function () {
    gulp.watch(paths.templates + '**/*.jade', ['html']);
    gulp.watch(paths.app + '**/*.js', ['browserify']);
    gulp.watch(paths.stylesheets + '**/*.css', ['css']);
    gulp.watch(paths.stylesheets + '**/*.styl', ['stylus']);
});

gulp.task('start', ['watch', 'serve']);

gulp.task('build', ['html', 'browserify', 'vendor', 'stylesheets']);

