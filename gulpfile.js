const gulp = require('gulp');
const scss = require('gulp-sass');
const minifyHtml = require('gulp-minify-html');
const minifyCss = require('gulp-clean-css');
const minifyJs = require('gulp-uglify');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;

var src = {
    scss: 'scss/*.scss',
    js: 'js/*.js'
}

var dest = {
    css: 'dest/css/',
    js: 'dest/js/'
}

gulp.task('css', function() {
    return gulp.src(src.scss)
        .pipe(scss());
        .pipe(minifyCss())
        .pipe(gulp.dest(dest.css))
        .pipe(reload({stream: true}))
})

gulp.task('js', function() {
    return gulp.src(src.js)
        .pipe(minifyJs())
        .pipe(gulp.dest(dest.js))
        .pipe(reload({stream: true}))
})

gulp.task('watch', ['server', 'css', 'js'], function() {
    gulp.watch(src.scss, ['css']);
    gulp.watch('*.html', reload);
    gulp.watch(src.js, ['js']);
})

gulp.task('server', function() {
    browserSync.init({
        port: 8080,
        server: {
            baseDir: './' 
        } 
    })
})

gulp.task('default', ['watch'])
