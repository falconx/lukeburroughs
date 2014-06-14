var gulp     = require('gulp'),
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
	buildDir: 'dist',
	assets: [
		'images/**',
		'projects/**'
	],
	scripts: [
		'scripts/vendor/modernizr.custom.js',
		'scripts/vendor/spin.min.js',
		'scripts/vendor/background-slideshow/js/jquery.imagesloaded.min.js',
		'scripts/vendor/background-slideshow/js/cbpBGSlideshow.js',
		'scripts/vendor/ui-utils-0.1.1/ui-utils.js'
		// 'scripts/app.js'
	],
	stylesheets: [
		'scripts/vendor/background-slideshow/css/component.css',
		'css/ng-animate.css',
		'css/reset.css',
		'css/fonts.css',
		'css/app.css'
	]
};

gulp.task('default', ['compress', 'watch']);

/**
 * Clean out dist
 */
gulp.task('clean', function() {  
	return gulp.src( paths.buildDir, { read: false })
		.pipe( clean() );
});

/**
 * Watch for changes
 */
gulp.task('watch', function() {
	gulp.watch( paths.scripts, ['scripts'] );
	gulp.watch( paths.assets, ['assets'] );
	gulp.watch( paths.stylesheets, ['css'] );
});

gulp.task('compress', ['scripts', 'assets', 'css'], function() {
	gutil.log( gutil.colors.green('Files compressed') );
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
		.pipe( gulp.dest( paths.buildDir ) )
		.on('error', gutil.log);	
});

/**
 * Minify image assets and maintain file structure by setting base
 */
gulp.task('assets', function() {
	return gulp.src( paths.assets, { base: '.' } )
		// Only compress files which have been modified
		.pipe(changed( paths.buildDir ))
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{
            	removeViewBox: false
            }]
        }))
        .pipe( gulp.dest( paths.buildDir ) )
        .on('error', gutil.log);
});

/**
 * Minify stylesheets
 */
gulp.task('css', function() {
	gulp.src( paths.stylesheets )
		.pipe( cssmin() )
		.pipe( concat('lukeburroughs.min.css') )
        .pipe( gulp.dest( paths.buildDir ) )
        .on('error', gutil.log);
});