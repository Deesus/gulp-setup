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

const FILE_PATHS = Object.freeze({
    styles: {
        src:  ['styles/**/[^_]*.less'],    // ignore files that begin with underscore <https://stackoverflow.com/a/27689389>
        dest: 'local/assets'
    },
    scripts: {
        src:  ['local/**/*.js'],
        dest: 'local'
    }
});


// ==================================================
// define functions:
// ==================================================

/**
 * compiles Less files
 */
function compileStyles() {
    return  gulp.src(FILE_PATHS.styles.src)
            .pipe(less({javascriptEnabled: true}))
            .pipe(gulp.dest(FILE_PATHS.styles.dest));
}

/**
 * cleans directory
 */
function clean() {
let foldersToClean = ['local/assets', 'local/assets2'];     // TODO: possibly would want folderToClean to be a global constant

    return  del(foldersToClean)
            .then( (paths) => {
                console.log('Deleted files and folders:');
                console.log(paths.join('\n'));
            });
}


// ==================================================
// define task functions:
// ==================================================

/**
 * watches for file changes
 *
 * runs default task on change and notifies the files changed
 */
function watch() {
    let watcher = gulp.watch(FILE_PATHS.styles.src,
                             gulp.series('default'));

    watcher.on('change', (filePath, fileStats) => {
        console.log(`File ${filePath} was changed.`);
    });
}

// ==================================================
// define Gulp tasks:
// ==================================================

// initialize and assign an alias for each task:
gulp.task('default',    gulp.parallel(compileStyles));
gulp.task('dev-build',  gulp.parallel(compileStyles));
gulp.task('prod-build', gulp.series(clean, compileStyles));
gulp.task('watch',      watch);
