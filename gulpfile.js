var gulp = require("gulp");
var uglify = require("gulp-uglify");
var babel = require("gulp-babel");
var rename = require("gulp-rename");
var sass = require("gulp-sass");
var connect = require("gulp-connect");
var webserver = require("gulp-webserver");
var proxy = require("http-proxy-middleware");

gulp.task("commen",function(){
    gulp.src("./js/*.js")
        .pipe( babel({
            presets : ["es2015"]
        }) )
        .pipe( uglify() )
        .pipe( rename({suffix:".min"}) )
        .pipe( gulp.dest("./minjs"))
})

gulp.task("compilecss",function(){
    sass("./scss/*.scss",{
        outputStyle : "expanded"
    })
    .pipe(gulp.dest("./css/"))
})

gulp.task("refreshHTML",function(){
    gulp.src("./html/*.html")
        .pipe(connect.reload())
})

// gulp.task("webserver",function(){
//     gulp.src('./')
//         .pipe(
//             webserver({
//                 host : 'localhost',
//                 port : 8000,
//                 livereload : true,
//                 directoryListing : {
//                     enabel : true,
//                     path : './'
//                 }
//             })
//         )
// })

gulp.task("listen",function(){
    connect.server({
        livereload: true
    });
    gulp.watch("./scss/*.scss",["compilecss"]);
    gulp.watch("./js/*.js",["commen"]);
    gulp.watch("./css/*.css",["refreshHTML"])
})

// gulp.task('default',["listen","webserver"],function(){
    
// })