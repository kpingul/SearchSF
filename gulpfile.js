/* Gulp Configurations */

var gulp      	  = require('gulp'),
	express       = require('express'),
	concat        = require('gulp-concat'),
	rename        = require('gulp-rename'),
	uglify        = require('gulp-uglify'),
	minifyCss     = require('gulp-minify-css'),
	jshint        = require('gulp-jshint'),
	jscs          = require('gulp-jscs'),
	autoprefixer  = require('gulp-autoprefixer'),
	express       = require('express'),
	plumber       = require('gulp-plumber'),
	minifyHtml    = require('gulp-minify-html'),
	templateCache = require('gulp-angular-templatecache'),
	sourcemaps 	  = require('gulp-sourcemaps'),
	app           = express(),
	port          = 3000;




var paths = {

	bower: 'bower_components',
	app: 'src/js/app/app.js',
	scripts: 'src/js/app/**/*.js',
	css: 'src/css/*.css'

}



/* ***************** */

/* Define Gulp Tasks */

/* ***************** */


gulp.task('Scripts', function() {
	return gulp
			.src([
				paths.app,
				paths.scripts
			])

			.pipe(concat("app.min.js"))
			.pipe(uglify())

			.pipe(gulp.dest('build/js/'))

});


gulp.task('Styles', function() {
	return gulp
			.src('src/css/*.css')
			.pipe(rename({
				suffix: '.min'
			}))
			.pipe(plumber())
			.pipe(autoprefixer({
				browsers: ['last 2 versions'],
				cascade: false
			}))
			.pipe(minifyCss())
			.pipe(gulp.dest('build/css'));
});

/* ***************** */

/* Define Watch Tasks */

/* ***************** */

gulp.task('WatchScripts', function() {

	return gulp
			.watch(paths.scripts, ['Scripts']);

});

gulp.task('WatchStyles', function() {

	return gulp
			.watch(paths.css, ['Styles']);

});


/* ***************** */

/*  Server Setup     */

/* ***************** */


gulp.task('express', function() {

	app
	 .use(express.static(__dirname + '/'));

	app
	 .listen(port, function() {
		console.log("Listening on port " + port);
	 });

});

/* ***************** */

/*    JS Liting      */

/* ***************** */
gulp.task('lint', function() {
  return gulp
		  .src(paths.scripts)
	   	  .pipe(jshint())
	      .pipe(jshint.reporter('jshint-stylish', {verbose: true}))
});


/* ***************** */

/*Angular Templatecache */

/* ***************** */

gulp.task('templatecache', function() {
	return gulp
		    .src('src/js/app/**/*.html')
			.pipe(minifyHtml({empty: true}))
			.pipe(templateCache({
				 standalone: true,
     			 module: 'templates'
			}))
			.pipe(gulp.dest('src/js/app'));

});




/* Gulp Task Start Configurations */

//Run express server, update scripts, update styles
gulp.task('default', ['express', 'lint', 'WatchScripts', 'WatchStyles']);