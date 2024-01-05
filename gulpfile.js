const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const nunjucksRender = require('gulp-nunjucks-render');
const browserSync = require('browser-sync').create();

gulp.task('sass', function() {
    return gulp.src('src/sass/**/*.sass')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.stream());
});

gulp.task('nunjucks', function() {
    return gulp.src('src/html/**/*.njk')
        .pipe(nunjucksRender({
            path: ['src/html/', 'src/components']
        }))
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.stream());
});

gulp.task('images', function() {
    return gulp.src('src/img/**/*')
        .pipe(gulp.dest('dist/img'));
});

gulp.task('serve', function() {
    browserSync.init({
        server: './dist'
    });

    gulp.watch('src/sass/**/*.sass', gulp.series('sass'));
    gulp.watch('src/html/**/*.njk', gulp.series('nunjucks'));
    gulp.watch('src/img/**/*', gulp.series('images'));
    gulp.watch('dist/*.html').on('change', browserSync.reload);
});

gulp.task('default', gulp.series('sass', 'nunjucks', 'images', 'serve'));
