import gulp from 'gulp';
import plumber from 'gulp-plumber';
import notify from 'gulp-notify';
import sassComp from 'sass';
import gulpSass from  'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';
import groupCssMediaQueries from 'gulp-group-css-media-queries';

// path import
const path = {
    src: `./scss/**/*.scss`,
    build: `./css`,
}

// tasks import
const sass = gulpSass(sassComp);
const scss = () => {
    return gulp.src(path.src)
        .pipe(plumber(
            notify.onError({
                title: 'SCSS',
                message: 'Error <%= error.message %>'
            })
        ))
        .pipe(sass({
            outputStyle: 'expanded'
        }))
        .pipe(groupCssMediaQueries()
        )
        .pipe(
            autoprefixer({
                    grid: true,
                    overrideBrowserlist: ["last 3 versions"],
                    cascade: true
                })
        )
        .pipe(gulp.dest(path.build))
}

// create watcher
function watcher() {
    gulp.watch(path.src, scss);
}

// main tasks
const mainTasks = gulp.parallel(scss);

// create scenarios for tasks
const dev = gulp.series(mainTasks, gulp.parallel(watcher));

//export scenarios
export {dev};

// start default task
gulp.task('default', dev);