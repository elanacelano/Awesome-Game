var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');

//compile sass into CSS & auto-inject into browsers
gulp.task('sass', funtion() {
	return gulp.src(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss'])
	.pipe(sass())
	.pipe(gulp.dest("src/css"))
	.pipe(browserSync.stream());
});

//Move the javascript files into our /src/js folder
gulp.task('js', funtion() {
	return gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js', 'node_modules/jquery/dist/jquery.min.js','node_modules/tether/dist/tether.min.js'])
	.pipe(gulp.dest('src/js'))
	.pipe(browserSync.stream());
});


//Static Server + watching scss/html files
gulp.task('serve', ['sass'], funtion(){

	browserSync.init({
		server:"./src"
	});

	gulp.watch(['node_modules/bootstrap/scss/bootstrap/scss', 'src/scss/*.scss'], ['sass']);
	gulp.watch("src/*.html").on('change', browserSync.reload);
});

gulp.task('default', ['js', 'serve']);