/// <binding ProjectOpened='build, watch' />
/*
This file in the main entry point for defining Gulp tasks and using Gulp plugins.
Click here to learn more. http://go.microsoft.com/fwlink/?LinkId=518007
*/
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
    STYLES: {
        // ignore files that begin with underscore <https://stackoverflow.com/a/27689389>:
        SRC_COMPILABLE_LESS: ['styles/**/[^_]*.less'],
        SRC_ALL_LESS: 'styles/**/*.less',
        DEST_LESS: 'dist/styles',
        // ignore files+folders inside `dist` and `node_modules` folders <https://github.com/gulpjs/gulp/issues/165#issuecomment-32611271>:
        SRC_ALL_CSS: ['./**/*.css', '!dist/', '!dist/**', '!node_modules/', '!node_modules/**']
    },
    SCRIPTS: {
        SRC: ['scripts/**/*.js']
    },
    DEST: 'dist',
    // includes all files and subfolders INSIDE `dist` but not `dist` itself:
    FOLDERS_TO_CLEAN: ['dist/**/*']
});


// ==================================================
// define functions:
// ==================================================

/**
 * compiles Less files
 */
function compileLess() {
    return  gulp.src(FILE_PATHS.STYLES.SRC_COMPILABLE_LESS)
            .pipe(less({javascriptEnabled: true}))
            .pipe(gulp.dest(FILE_PATHS.STYLES.DEST_LESS));
}

/**
 * cleans directory
 */
function clean() {
    return  del(FILE_PATHS.FOLDERS_TO_CLEAN)
            .then( (paths) => {
                console.log('Deleted files and folders:');
                console.log(paths.join('\n'));
            });
}

/**
 * copies all CSS files to dist
 */
function copyCss() {
    return gulp.src(FILE_PATHS.STYLES.SRC_ALL_CSS)
           .pipe(gulp.dest(FILE_PATHS.DEST));
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
    let watcher = gulp.watch(FILE_PATHS.STYLES.SRC_ALL_LESS,
                             gulp.series('default'));

    watcher.on('change', (filePath, fileStats) => {
        console.log(`File ${filePath} was changed.`);
    });
}

// ==================================================
// define Gulp tasks:
// ==================================================

// initialize and assign an alias for each task:
gulp.task('default',    gulp.series( clean, gulp.parallel(compileLess, copyCss)) );
gulp.task('build',      gulp.series( clean, gulp.parallel(compileLess, copyCss)) );
gulp.task('watch',      watch);
