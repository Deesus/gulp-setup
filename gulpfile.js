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

const FILE_PATHS = {
    styles: {
        src:  [ path.resolve(__dirname, 'local/**/*.less'), 
                `!${path.resolve(__dirname, 'local/**/_*.less')}` ], // ignore files that begin with underscore
        dest: path.resolve(__dirname, 'local/assets/styles/')
    },
    scripts: {
        src:  path.resolve(__dirname, 'local/**/*.js'),
        dest: path.resolve(__dirname, 'local/assets/scripts')
    }
};


// ==================================================
// define functions:
// ==================================================

/*
 * compiles Less files
 */
function styles() {
    return  gulp.src(FILE_PATHS.styles.src)
            .pipe(less())
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
let devBuild = gulp.parallel(styles);
let prodBuild = gulp.series(clean, styles);

// initialize and assign a cli name: 
gulp.task('default', devBuild);
gulp.task('dev-build', devBuild);
gulp.task('prod-build', prodBuild);
