/* Gulp Configurations */

var gulp = require('gulp'),
	express = require('express'),
	concat = require('gulp-concat'),
	rename = require('gulp-rename'),
	uglify = require('gulp-uglify'),
	minifyCss = require('gulp-minify-css'),
	jshint = require('gulp-jshint'),
	mainBowerFiles = require('main-bower-files'),
	express = require('express'),
	app = express(),
	port = 3000;


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

	return gulp.src([
				paths.app,
				paths.scripts
			])
			.pipe(concat("app.min.js"))
			.pipe(uglify())
			.pipe(gulp.dest('build/js/app'))

});


gulp.task('Styles', function() {

	return gulp.src('src/css/*.css')
			.pipe(rename({
				suffix: '.min'
			}))
			.pipe(minifyCss())
			.pipe(gulp.dest('build/css'));
});

/* ***************** */

/* Define Watch Tasks */

/* ***************** */

gulp.task('WatchScripts', function() {

	return gulp.watch(paths.scripts, ['Scripts']);

});

gulp.task('WatchStyles', function() {

	return gulp.watch(paths.css, ['Styles']);

});


/* ***************** */

/*  Server Setup     */

/* ***************** */


gulp.task('express', function() {

	app.use(express.static(__dirname + '/'));

	app.listen(port, function() {
		console.log("Listening on port " + port);
	});

});

/* ***************** */

/*    JS Liting      */

/* ***************** */
gulp.task('lint', function() {
  return gulp.src(paths.scripts)
   	.pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});


/* Gulp Task Start Configurations */

//Run express server, update scripts, update styles
gulp.task('default', ['express', 'lint', 'WatchScripts', 'WatchStyles']);