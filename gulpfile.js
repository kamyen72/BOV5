var gulp = require('gulp'),
    concat = require('gulp-concat'),
    minifyCSS = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    rename = require("gulp-rename"),
    ka = require("karma"),
    replace = require("gulp-replace"),
    sass = require("gulp-sass")(require("node-sass")),
    del = require('del');
    
var merge = require('merge-stream');

// 打包 GHL.scss 編譯壓縮成 => main.min.css
gulp.task('build-scss', function () {
    return gulp.src('./content/css/GHL/scss/GHL.style.scss')    // 指定要處理的 Scss 檔案目錄
        .pipe(concat('main.scss'))
        .pipe(sass())
        .pipe(minifyCSS({
            keepBreaks: true
        }))
        .pipe(rename(function (path) {
            path.basename += ".min";
            path.extname = ".css";
        }))
        .pipe(gulp.dest('./content/css/GHL/'));  // 指定編譯後的 css 檔案目錄
});

// 打包 所有用到的lib(css與js) => all-lib.min.css, all-lib.js
gulp.task('build-lib', function () {
    var packCSS = gulp.src([
        './content/css/angular-block-ui/angular-block-ui.min.css',
        './content/css/bootstrap/bootstrap.css',
        './content/css/GHL/font-awesome.min.css',
        './content/css/GHL/normalize.css',
        './content/css/GHL/color_scheme/ball.style.css',
        ])
        .pipe(concat('all-lib.css'))
        .pipe(replace('../../fonts', '../fonts')) // 更新取代font路徑
        .pipe(minifyCSS({
            keepBreaks: true
        }))
        .pipe(rename(function (path) {
            path.basename += ".min";
            path.extname = ".css";
        }))
        .pipe(gulp.dest('./content/css/'));  // 指定編譯後的 css 檔案目錄

    var packJS = gulp.src([
        './scripts/jquery/jquery-3.4.1.min.js',
        './scripts/echart/echarts.min.js',
        './scripts/jquery/jquery.isotope.js',
        './scripts/tether/tether.min.js',
        './scripts/bootstrap/bootstrap.min.js',
        './scripts/angularjs/1.6.0/angular.js',
        './scripts/angularjs/1.6.0/angular-touch.min.js',
        './scripts/angularjs/1.6.0/angular-sanitize.min.js',
        './scripts/angularjs/1.6.0/angular-route.min.js',
        './scripts/angularjs/1.6.0/angular-resource.min.js',
        './scripts/angularjs/1.6.0/angular-mocks.js',
        './scripts/angularjs/1.6.0/angular-messages.min.js',
        './scripts/angularjs/1.6.0/angular-message-format.min.js',
        './scripts/angularjs/1.6.0/angular-cookies.min.js',
        './scripts/angularjs/1.6.0/angular-aria.min.js',
        './scripts/angularjs/1.6.0/angular-animate.min.js',
        './scripts/angularjs/1.6.0/angular-local-storage.min.js',
        './scripts/angularjs/1.6.0/angular-parse-ext.min.js',
        './scripts/angular-ui/autocomplete.js',
        './scripts/angular-block-ui/angular-block-ui.js',
        './scripts/angular-loading-bar/loading-bar.min.js',
        './scripts/angular-translate/angular-translate.min.js',
        './scripts/angular-translate/angular-translate-loader-url.min.js',
        './scripts/angular-translate/angular-translate-loader-static-files.min.js',
        ])
        .pipe(uglify())
        .pipe(concat('all-lib.js'))
        .pipe(rename(function (path) {
            path.basename += ".min";
            path.extname = ".js";
        }))
        .pipe(gulp.dest('./scripts/'));

    return merge(packCSS, packJS);
});

// 打包 所有js 並移動到build
gulp.task('build-js', function () {
    var controllerJs = gulp.src(['./app/Controllers/**/*.js'])
        .pipe(uglify())
        .pipe(concat('controller.js'))
        .pipe(rename(function (path) {
            path.basename += ".min";
            path.extname = ".js";
        }))
        .pipe(gulp.dest('./build/js/'));

    var serviceJs = gulp.src(['./app/Service/*.js'])
        .pipe(uglify())
        .pipe(concat('service.js'))
        .pipe(rename(function (path) {
            path.basename += ".min";
            path.extname = ".js";
        }))
        .pipe(gulp.dest('./build/js/'));

    var directiveJs = gulp.src(['./app/Service/Directive/**/*.js'])
        .pipe(uglify())
        .pipe(concat('directive.js'))
        .pipe(rename(function (path) {
            path.basename += ".min";
            path.extname = ".js";
        }))
        .pipe(gulp.dest('./build/js/'));

    var serviceHelperJs = gulp.src(['./app/Service/helper/*.js', './app/Service/validators/*.js'])
        .pipe(uglify())
        .pipe(concat('serviceHelper.js'))
        .pipe(rename(function (path) {
            path.basename += ".min";
            path.extname = ".js";
        }))
        .pipe(gulp.dest('./build/js/'));

    var repositoryJs = gulp.src(['./app/Repositorys/**/*.js'])
        .pipe(uglify())
        .pipe(concat('repository.js'))
        .pipe(rename(function (path) {
            path.basename += ".min";
            path.extname = ".js";
        }))
        .pipe(gulp.dest('./build/js/'));

    var webconfigJs = gulp.src(['./webConfig.js']) // webConfig.js不壓縮
        .pipe(gulp.dest('./build/'));

    var appJs = gulp.src(['./app/app.js'])
        .pipe(uglify())
        .pipe(replace('./app/Views', './html')) // 更新取代html路徑
        .pipe(rename(function (path) {
            path.basename += ".min";
            path.extname = ".js";
        }))
        .pipe(gulp.dest('./build/js/'));

    return merge(controllerJs, serviceJs, serviceHelperJs, repositoryJs, directiveJs, webconfigJs, appJs);
});


// 移動需要資源到 build
gulp.task('move-resources', function () {
    var mainCss = gulp.src(['./content/css/GHL/main.min.css'])
        .pipe(replace('../../img', '../content/img')) // 更新取代圖片路徑
        .pipe(gulp.dest('./build/css/'));

    var libCss = gulp.src(['./content/css/all-lib.min.css']) // 移動已經先處理過的lib.css 若無處理過 要先執行gulp build-lib
        .pipe(replace('../fonts', '../content/fonts')) // 更新取代font路徑
        .pipe(gulp.dest('./build/css/'));

    var contentFile = gulp.src(['./content/**/*','!./content/css','!./content/css/**/*']) // css資料夾內容已經打包移動 不需要再複製
        .pipe(gulp.dest('./build/content/'));

    var libJs = gulp.src(['./scripts/all-lib.min.js']) // 移動已經先處理過的lib.js 若無處理過 要先執行gulp build-lib
        .pipe(gulp.dest('./build/js/'));
        
    var indexHtml = gulp.src(['./index.html']) // 把註解更新成讀取build內的檔案
        .pipe(replace('<!--BUILD_CSS_START-- >', '<!--BUILD_CSS_START-->')) 
        .pipe(replace('< !--BUILD_CSS_END-->', '<!--BUILD_CSS_END-->')) 
        .pipe(replace('<!--LOCAL_CSS_START-->', '<!--LOCAL_CSS_START-- >')) 
        .pipe(replace('<!--LOCAL_CSS_END-->', '< !--LOCAL_CSS_END-->')) 
        .pipe(replace('<!--BUILD_LIB_JS_START-- >', '<!--BUILD_LIB_JS_START-->')) 
        .pipe(replace('< !--BUILD_LIB_JS_END-->', '<!--BUILD_LIB_JS_END-->')) 
        .pipe(replace('<!--LOCAL_LIB_JS_START-->', '<!--LOCAL_LIB_JS_START-- >')) 
        .pipe(replace('<!--LOCAL_LIB_JS_END-->', '< !--LOCAL_LIB_JS_END-->')) 
        .pipe(replace('<!--BUILD_JS_START-- >', '<!--BUILD_JS_START-->')) 
        .pipe(replace('< !--BUILD_JS_END-->', '<!--BUILD_JS_END-->')) 
        .pipe(replace('<!--LOCAL_JS_START-->', '<!--LOCAL_JS_START-- >')) 
        .pipe(replace('<!--LOCAL_JS_END-->', '< !--LOCAL_JS_END-->'))
        .pipe(gulp.dest('./build/'));

    var html = gulp.src(['./app/Views/**/*']) // 移動所有html
        .pipe(gulp.dest('./build/html/'));

    return merge(mainCss, libCss, contentFile, libJs, indexHtml, html);
});

// 刪除build資料夾(上一次gulp產生的檔案)
gulp.task('clear', function () {
    return del('./build/')
});

gulp.task('default', gulp.series('clear', 'build-scss', 'build-js', 'move-resources'));