var server   = require('./app'),
	gulp     = require('gulp'),
	gutil    = require('gulp-util'),
	clean    = require('gulp-clean'),
	changed  = require('gulp-changed'),
    uglify   = require('gulp-uglify'),
    concat   = require('gulp-concat'),
    imagemin = require('gulp-imagemin'),
    cssmin   = require('gulp-cssmin'),
    jshint   = require('gulp-jshint'),
    summary  = require('jshint-summary');

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
		// 'public/scripts/app.js'
	],
	stylesheets: [
		'public/scripts/vendor/background-slideshow/css/component.css',
		'public/css/ng-animate.css',
		'public/css/reset.css',
		'public/css/fonts.css',
		'public/css/app.css'
	]
};

gulp.task('default', ['compress', 'serve', 'watch']);

gulp.task('compress', ['scripts', 'assets', 'css'], function() {
	gutil.log( gutil.colors.green('Files compressed') );
});

gulp.task('serve', function() {
	server.run();
});

/**
 * Clean out build directory
 */

gulp.task('clean', function() {  
	return gulp.src( paths.buildDir, { read: false })
		.pipe( clean() );
});

/**
 * Watch for changes
 */

gulp.task('watch', function() {
	gutil.log( 'gulp:watch task running...' );

	gulp.watch( paths.scripts, ['scripts'] );
	gulp.watch( paths.assets, ['assets'] );
	gulp.watch( paths.stylesheets, ['css'] );
});

/**
 * Lint scripts
 */

gulp.task('lint', function() {
	gulp.src( 'scripts/app.js' )
		.pipe(jshint())
		.pipe(jshint.reporter('jshint-summary', {
			verbose: true,
			reasonCol: 'cyan,bold',
			codeCol: 'green'
		}));
});

/**
 * Minify scripts
 */

gulp.task('scripts', ['lint'], function() {
	gulp.src( paths.scripts )
		.pipe( uglify() )
		.pipe( concat('lukeburroughs.min.js') )
		.pipe( gulp.dest( paths.buildDir ) );
});

/**
 * Minify image assets and maintain file structure by setting base
 * TODO: PNG's
 */

gulp.task('assets', function() {
	return gulp.src( paths.assets, { base: 'public' } )
		// Only compress files which have been modified
		.pipe(changed( paths.buildDir ))
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{
            	removeViewBox: false
            }]
        }))
        .pipe( gulp.dest( paths.buildDir ) );
});

/**
 * Minify stylesheets
 */

gulp.task('css', function() {
	gulp.src( paths.stylesheets )
		.pipe( cssmin() )
		.pipe( concat('lukeburroughs.min.css') )
        .pipe( gulp.dest( paths.buildDir ) );
});