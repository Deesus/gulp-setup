'use strict';

// ==================================================
// import modules/dependencies:
// ==================================================

const gulp  = require('gulp');
const less  = require('gulp-less');
const path  = require('path');
const del   = require('del');


// ==================================================
// define constants:
// ==================================================

let FILE_PATHS = {
    styles: {
        src:  [ '!local/**/_*.less',  // ignore files that begin with underscore
                'local/**/*.less'],
        dest: 'local'
    },
    scripts: {
        src:  'local/**/*.js',
        dest: 'local'
    }
};

FILE_PATHS = Object.freeze(FILE_PATHS);


// ==================================================
// define functions:
// ==================================================

/*
 * compiles Less files
 */
function compileStyles() {
    return  gulp.src(FILE_PATHS.styles.src)
            .pipe(less({javascriptEnabled: true}))
            .pipe(gulp.dest(FILE_PATHS.styles.dest));
}

/*
 * cleans directory
 */
function clean() {
    return  del(['assets'])
            .then( (paths) => {
                console.log('Deleted files and folders:');
                console.log(paths.join('\n'));
            });
}


// ==================================================
// define Gulp tasks:
// ==================================================

// assign functions for each task:
// initialize and assign a cli name: 
gulp.task('default',    gulp.parallel(compileStyles));
gulp.task('dev-build',  gulp.parallel(compileStyles));
gulp.task('prod-build', gulp.series(clean, compileStyles));

// TODO: make consistent pattern as above
gulp.task('watch', () => {
    gulp.watch(FILE_PATHS.styles.src, gulp.series('default'));
});
