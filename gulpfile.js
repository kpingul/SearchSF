/* Gulp Configurations */

var gulp 	= require('gulp'),
	express = require('express'),
	app 	= express(),
	port 	= 3000;



/* Gulp Tasks */

gulp.task('express', function(){

	app.use(express.static(__dirname + '/'));

	app.listen(port, function(){
		console.log("Listening on port " + port);
	});

});


/* Gulp Task Start Configurations */

gulp.task('default', ['express']);