var gulp = require('gulp');
var browsersync = require('browser-sync');
var inline = require('gulp-inline-css');
var less = require('gulp-less');
var rimraf = require('rimraf');
var sequence = require('gulp-sequence');
var rename = require('gulp-rename');

gulp.task('html', function() {
	return gulp.src('src/index.html')
			.pipe(inline())
			.pipe(gulp.dest('dist'))
			.pipe(browsersync.reload({stream: true}))
})

gulp.task('css', function() {
	return gulp.src('src/less.css')
			.pipe(less())
			.pipe(rename("main.css"))
			.pipe(gulp.dest("src"))
			.pipe(browsersync.reload({stream: true}))
})

gulp.task('img', function() {
	return gulp.src('src/img/*.*')
			.pipe(gulp.dest('dist/img'))
})

gulp.task('watch', function(cb) {
	sequence('css', 'html', 'img', cb);
	gulp.watch('src/**/*.*', ['watch']);
})

gulp.task('default', sequence('cleandist', 'watch', 'browser'));

gulp.task('browser', function() {
    browsersync.init({
        server: {
            baseDir: "dist"
        },
        notify: false
    });
});

gulp.task('cleandist', function(cb) {
	rimraf('./dist', cb);
})