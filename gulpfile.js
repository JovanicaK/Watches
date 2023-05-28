var gulp = require('gulp');
var scss = require('gulp-sass');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var sassLint = require('gulp-sass-lint');
var consolidate = require('gulp-consolidate');
var iconfont = require('gulp-iconfont');

// Task rules
// [1] source
// [2] option - file manipulation
// [3] destination


// Tasks:
// 1. SCSS TO CSS
// 2. SCSS LINT
// 3. ICONFONT
// 4. COPY FILES

// 1. Task - scss to css
gulp.task('scss', function() {
    return gulp.src('src/scss/style.scss')
    .pipe(scss({outputStyle: 'compressed'}))
    .pipe(postcss([autoprefixer('last 2 versions')]))
    .pipe(gulp.dest('dist/css'));
});

// 2. Task - scss lint
gulp.task('scss-lint', function () {
    return gulp.src('src/scss/**/*.s+(a|c)ss')
      .pipe(sassLint({
          configFile: '.sass-lint.yml'
      }))
      .pipe(sassLint.format())
      .pipe(sassLint.failOnError())
});

// 3. Task - iconfont
var iconConfig = {
    fontName: 'iconfont',
    formats: ['woff', 'woff2'],
    appendCodepoints: true,
    appendUnicode: false,
    normalize: true,
    fontHeight: 1000,
    centerHorizontally: true
};

gulp.task('iconfont', function () {
    return gulp.src('src/images/svg/*.svg')
        .pipe(iconfont(iconConfig))
        .on('glyphs', function (glyphs, options) {
            gulp.src('src/scss/config/iconfont-template/_iconfont.scss')
                .pipe(consolidate('underscore', {
                    glyphs: glyphs,
                    fontName: options.fontName,
                    fontDate: new Date().getTime()
                }))
                .pipe(gulp.dest('src/scss/config'));
        })
        .pipe(gulp.dest('dist/fonts'));
});

// 4. Task - copy
gulp.task('copy-html', function() {
    return gulp.src('*.html')
    .pipe(gulp.dest('dist'))
});

gulp.task('copy-js', function() {
    return gulp.src('src/js/*.js')
    .pipe(gulp.dest('dist/js'));
});

gulp.task('copy-img', function() {
    return gulp.src('src/images/*.{png,svg,jpg,jpeg}')
    .pipe(gulp.dest('dist/images'))
});

// Task Build
gulp.task('build', ['copy-html', 'copy-js', 'copy-img', 'iconfont', 'scss', 'scss-lint']);

// Task Watch
gulp.task('default', ['scss', 'scss-lint'], function() {
    gulp.watch('src/**/*.scss', ['scss', 'scss-lint']);
    gulp.watch('*.html', ['copy-html']);
	gulp.watch('src/**/*.js', ['copy-js']);
});

// GULP4