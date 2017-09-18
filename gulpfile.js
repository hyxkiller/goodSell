var gulp = require("gulp");
var uglify = require("gulp-uglify");
var babel = require("gulp-babel")
var rename = require("gulp-rename")
var sass = require("gulp-sass")
var connect = require("gulp-connect");

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
    gulp.src('./scss/*.scss')
    .pipe(sass({
        outputStyle : "expanded"
    }))
    .pipe(gulp.dest("./css/"))
})

gulp.task("refreshHTML",function(){
    gulp.src("./html/*.html")
        .pipe(connect.reload())
})

gulp.task("listen",function(){
    connect.server({
        livereload: true
    });
    gulp.watch("./scss/*.scss",["compilecss"]);
    gulp.watch("./js/*.js",["commen"]);
    gulp.watch("./css/*.css",["refreshHTML"])
})

