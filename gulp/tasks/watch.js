var gulp = require('gulp'),
watch = require('gulp-watch'),
browserSync = require('browser-sync').create();


gulp.task('watch', function() {

	browserSync.init({
		notify: false,
		server: {
			baseDir: "app"
		}
	});

  watch('./app/index.html', function() {
   	browserSync.reload(); //uses browserSync package to automatically refresh the index.html page when a change has been detected
  });

  watch('./app/assets/styles/**/*.css', function() { //any time we make changes to the styles.css file, you trigger the cssInject task
    gulp.start('cssInject');
  });

});


gulp.task('cssInject', ['styles'], function(){ //cssInject would not begin untill styles task was completed. 
	return gulp.src('./app/temp/styles/styles.css') //then the compile css file can be generated
	.pipe(browserSync.stream()); //then we pipe it to browserSync
});

