'use strict';

var gulp = require('gulp');
var jade = require('gulp-jade');
var babel = require("gulp-babel");
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
var sass = require('gulp-sass');
var cleanCss = require('gulp-clean-css');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var imagemin = require('gulp-imagemin');
var changed = require('gulp-changed');
var uglify  = require('gulp-uglify');
var lineec = require('gulp-line-ending-corrector');
function html()
{
    return gulp.src('src/jade/**/*.jade')
    .pipe(jade({pretty:true}))
    .pipe(gulp.dest('build'))
}
function css()
{
    return gulp.src('src/scss/**/*.scss')
    //.pipe(sourcemaps.init({loadMaps:true}))
    .pipe(sass({outputStyle:'expanded'}).on('error',sass.logError))
    .pipe(autoprefixer('last 2 versions'))
    //.pipe(cleanCss()) // Compress css 
    //.pipe(sourcemaps.write())
    .pipe(lineec())
    .pipe(gulp.dest('build/css'));
};

// function concatCss()
// {
//     return gulp.src('src/libs/**/*.css')
//     .pipe(sourcemaps.init({loadMaps:true, largeFile:true}))
//     .pipe(concat('style.min.css'))
//     .pipe(cleanCss())
//     .pipe(sourcemaps.write('./maps/'))
//     .pipe(lineec())
//     .pipe(gulp.dest('libs/css'))
// };

function javascript()
{
    return gulp.src('src/scripts/**/*.js')
    .pipe(babel())
    //.pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(lineec())
    .pipe(gulp.dest('build/scripts'));
}; 

function watch()
{
    browserSync.init({
        open: 'external',
        
        port:3000,
        server: {
            baseDir : 'build'
        },
        notify : true
    });
    html();
    css();
    javascript();
    gulp.watch('src/jade/**/*.jade',html).on('change',browserSync.reload);
    gulp.watch('src/scss/**/*.scss', gulp.series([css])).on('change',browserSync.reload);
    gulp.watch('src/scripts/**/*.js',javascript).on('change',browserSync.reload);
};

exports.html = html;
exports.css = css;
exports.javascript = javascript;
exports.watch = watch;

var build = gulp.parallel(watch);
gulp.task('default', build);





