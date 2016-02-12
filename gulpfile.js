var gulp     = require('gulp');
var gutil    = require('gulp-util');
var clean    = require('gulp-clean');
var changed  = require('gulp-changed');
var uglify   = require('gulp-uglify');
var concat   = require('gulp-concat');
var imagemin = require('gulp-imagemin');
var cssmin   = require('gulp-cssmin');
var jshint   = require('gulp-jshint');
var summary  = require('jshint-summary');

var paths = {
	buildDir: 'public/dist',
	assets: [
		'public/images/**',
		'public/projects/**'
	],
	scripts: [
		'public/scripts/vendor/modernizr.custom.js',
		'public/scripts/vendor/spin.min.js',
		'public/scripts/vendor/background-slideshow/js/jquery.imagesloaded.min.js',
		'public/scripts/vendor/background-slideshow/js/cbpBGSlideshow.js',
		'public/scripts/vendor/ui-utils-0.1.1/ui-utils.js'
	],
	stylesheets: [
		'public/scripts/vendor/background-slideshow/css/component.css',
		'public/css/ng-animate.css',
		'public/css/reset.css',
		'public/css/fonts.css',
		'public/css/app.css'
	]
};

gulp.task('default', ['compress']);

gulp.task('compress', ['scripts', 'assets', 'css'], function() {
	gutil.log(gutil.colors.green('Files compressed'));
});

// Clean out build directory

gulp.task('clean', function() {  
	return gulp.src(paths.buildDir, { read: false }).pipe(clean());
});

// Watch for changes

gulp.task('watch', function() {
	gutil.log('gulp:watch task running...');

	gulp.watch(paths.scripts, ['scripts']);
	gulp.watch(paths.assets, ['assets']);
	gulp.watch(paths.stylesheets, ['css']);
});

// Lint scripts

gulp.task('lint', function() {
	gulp.src('scripts/app.js')
		.pipe(jshint())
		.pipe(jshint.reporter('jshint-summary', {
			verbose: true,
			reasonCol: 'cyan,bold',
			codeCol: 'green'
		}));
});

// Minify scripts

gulp.task('scripts', ['lint'], function() {
	gulp.src(paths.scripts)
		.pipe(uglify())
		.pipe(concat('lukeburroughs.min.js'))
		.pipe(gulp.dest(paths.buildDir));
});

// Minify image assets and maintain file structure by setting base
// Todo: PNG's

gulp.task('assets', function() {
	return gulp.src(paths.assets, { base: 'public' })
		// Only compress files which have been modified
		.pipe(changed(paths.buildDir))
			.pipe(imagemin({
				progressive: true,
				svgoPlugins: [{
					removeViewBox: false
				}]
			}))
			.pipe(gulp.dest(paths.buildDir));
});

// Minify stylesheets

gulp.task('css', function() {
	gulp.src(paths.stylesheets)
		.pipe(cssmin())
		.pipe(concat('lukeburroughs.min.css'))
		.pipe(gulp.dest(paths.buildDir));
});