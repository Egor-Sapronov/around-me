var gulp = require('gulp'),
    clean = require('gulp-clean'),
    jade = require('gulp-jade'),
    plumber = require('gulp-plumber'),
    stylus = require('gulp-stylus'),
    browserify = require('browserify'),
    transform = require('vinyl-transform'),
    uglify = require('gulp-uglify'),
    gulpif = require('gulp-if'),
    cssmin = require('gulp-cssmin'),
    useref = require('gulp-useref'),
    uncss = require('gulp-uncss'),
    paths = {
        src: './client/src/',
        app: './client/src/app/',
        dest: './client/build/',
        templates: './client/src/assets/templates/',
        stylesheets: './client/src/assets/stylesheets/',
        vendor: './client/src/vendor/'
    };

gulp.task('fonts', function () {
    gulp.src(paths.src + 'assets/font/**')
        .pipe(gulp.dest(paths.dest + 'assets/font'));
});

gulp.task('html', function () {
    return gulp.src(paths.templates + '**/*.jade')
        .pipe(jade({pretty: true}))
        .pipe(gulp.dest(paths.dest + 'assets/templates'));
});

gulp.task('vendor', function () {
    return gulp.src(paths.vendor + '**')
        .pipe(gulp.dest(paths.dest + 'vendor'));
});

gulp.task('browserify', function () {
    var browserified = transform(function (filename) {
        var b = browserify(filename);
        return b.bundle();
    });

    return gulp.src([paths.app + 'app.js'])
        .pipe(browserified)
        .pipe(gulp.dest(paths.dest + 'assets/scripts'));
});

gulp.task('css', function () {
    return gulp.src(paths.stylesheets + '**/*.css')
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
        .pipe(gulpif('*.css', uncss({
            html: [paths.dest + 'assets/templates/index.html']
        })))
        .pipe(gulpif('*.css', cssmin()))
        .pipe(gulpif('*.js', uglify()))
        .pipe(assets.restore())
        .pipe(useref())
        .pipe(gulp.dest(paths.dest + 'assets/templates'));
});

gulp.task('watch', function () {
    gulp.watch(paths.templates + '**/*.jade', ['html']);
    gulp.watch(paths.app + '**/*.js', ['browserify']);
    gulp.watch(paths.stylesheets + '**/*.css', ['css']);
    gulp.watch(paths.stylesheets + '**/*.styl', ['stylus']);
});

gulp.task('start', ['watch', 'serve']);

gulp.task('build', ['html', 'browserify', 'vendor', 'stylesheets']);

