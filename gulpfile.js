const gulp = require("gulp");
const sass = require("gulp-sass");
const pug = require('gulp-pug');
const browserSync = require('browser-sync');
const webpackStream = require("webpack-stream");
const webpack = require("webpack");

const autoprefixer = require('autoprefixer');
const plumber = require('gulp-plumber');
const notify = require("gulp-notify");
const runSequence = require('run-sequence');

// webpackの設定ファイルの読み込み
const webpackConfig = require("./webpack.config");
const paths = {
    'scss': './src/frontend/sass/',
    'css': './dist/css/',
    'pug': './src/',
    'html': './dist/',
    'js': './dist/js/'
}
const pugOptions = {
    pretty: true
}

// タスクの定義。 ()=> の部分はfunction() でも可
gulp.task("default", ['browser-sync', 'watch'], () => {
    return webpackStream(webpackConfig, webpack)
        .pipe(gulp.dest("dist"));
    // ☆ webpackStreamの第2引数にwebpackを渡す☆
    // browserSync.init({
    //     server: "portfolio/product"
    // });
    //
    // gulp.watch('portfolio/dist/css/*.css',['sass']);
    // gulp.watch('portfolio/src/**/*.html',['html']);

    // gulp.watch('app/src/**/*.html'[]);
});

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir:"./dist",
            ext: ".html"
        },
        open: 'external'
    });
});

gulp.task('sass', () => {
    var plugins = [
        autoprefixer({
            browsers: [
                'last 1 version',
                '> 3% in JP',
                'ie >= 9',
                'iOS >= 8',
                'Android >= 4.4'
            ]
        })
    ];
    gulp.src('src/frontend/sass/style.scss')
    //エラーではタスクを止めない
        .pipe(sass({
            outputStyle: 'expanded'
        }).on('error', sass.logError))
        .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('pug', () => {
    return gulp.src([paths.pug + '/**/*.pug', '!' + paths.pug + '/**/_*.pug'])
        //エラーではタスクを止めない
        .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
        .pipe(pug({
            pretty: true
        }))
        .pipe(gulp.dest('./dist/'));
});

gulp.task('build', ()=> {
    runSequence(
        ['pug', 'sass']
    )
});

// gulp.task('webpack', ()=> {
//     return webpackStream(webpackConfig, webpack)
//         .pipe(gulp.dest("dist"));
// })


gulp.task('watch', ['build'], () => {
    gulp.watch(paths.scss + '**/*.scss', ['sass']);
    gulp.watch([paths.pug + '**/*.pug', '!' + paths.pug + '**/_*.pug'], ['pug']);
});