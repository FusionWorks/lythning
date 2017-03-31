gulp = require "gulp"
connect = require "gulp-connect"
autoprefixer = require "gulp-autoprefixer"
pug = require "gulp-pug"
rename = require "gulp-rename"
plumber = require "gulp-plumber"
wrap = require "gulp-wrap-amd"
del = require "del"
runSequence = require "run-sequence"
sass = require "gulp-sass"
coffee = require "gulp-coffee"
insert = require "gulp-insert"
_ = require "lodash"
uglify = require "gulp-uglify"

pugRuntime = require "pug-runtime/lib/sources"
delete pugRuntime.has_own_property
delete pugRuntime.match_html

sourceDir = "src"
distDir = "app"

coffeeFiles = "#{sourceDir}/**/*.coffee"
sassFiles = "#{sourceDir}/**/*.scss"
pugHtmlFiles = "#{sourceDir}/**/*.html.pug"
pugJsFiles = "#{sourceDir}/**/*.js.pug"
jsFiles = "#{sourceDir}/**/*.js"

gulp.task "copy", ->
  gulp.src ["#{sourceDir}/img/**", "#{sourceDir}/js/**/*.js"], base: sourceDir
    .pipe gulp.dest distDir

gulp.task "build-scripts", ->
  gulp.src coffeeFiles
    .pipe plumber()
    .pipe coffee()
    .pipe gulp.dest distDir
    .pipe connect.reload()

gulp.task "build-sass", ->
  gulp.src sassFiles
    .pipe plumber()
    .pipe sass()
    .pipe autoprefixer()
    .pipe gulp.dest distDir
    .pipe connect.reload()

gulp.task "build-pug-html", ->
  gulp.src pugHtmlFiles
    .pipe rename(extname: "")
    .pipe plumber()
    .pipe pug()
    .pipe gulp.dest distDir
    .pipe connect.reload()

gulp.task "build-pug-js", ->
  gulp.src pugJsFiles
    .pipe rename(extname: "")
    .pipe pug
      client: on
      debug: off
      compileDebug: off
      inlineRuntimeFunctions: false
    .pipe wrap exports: "template"
    .pipe gulp.dest distDir
    .pipe connect.reload()

gulp.task "build-requirejs", ->
  gulp.src "#{distDir}/lib/requirejs/require.js"
    .pipe(insert.append("var pug={\"has_own_property\":Object.prototype.hasOwnProperty, \"match_html\":/[\"&<>]/," + _.map(pugRuntime, (value, key) -> "\"#{key}\":"+value.replace(/pug_(\w*)\(/, '(')).join(',').replace(/pug_/g, 'pug.') + "}"))
    .pipe uglify(mangle: true)
    .pipe gulp.dest distDir

gulp.task "clean", (cb) ->
  del ["#{distDir}/**", "!#{distDir}", "!#{distDir}/lib/**", "!#{distDir}/img/**"], cb

gulp.task "watch", ["build-scripts", "build-requirejs", "build-sass", "build-pug-html", "build-pug-js", "copy"], ->
  gulp.watch coffeeFiles, ["build-scripts"]
  gulp.watch sassFiles, ["build-sass"]
  gulp.watch pugHtmlFiles, ["build-pug-html"]
  gulp.watch pugJsFiles, ["build-pug-js"]
  gulp.watch jsFiles, ["copy"]

gulp.task "default", ->
  runSequence "clean", ["watch"]

gulp.task "serve", ["default"], ->
  connect.server
    root: distDir
    livereload: on
    fallback: "#{distDir}/index.html"
