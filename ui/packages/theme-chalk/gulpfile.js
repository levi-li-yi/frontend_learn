'use strict'
// 制定gulp任务，处理css
const {seriser, src, dest} = require('gulp')
const sass = require('gulp-sass')
const autoprefixer = require('gulp-autoprefixer')
const cssmin = require('gulp-cssmin')
const { series } = require('gulp')

// 编译scss方法
function compile() {
  return src('./src/*.scss')
    .pipe(sass.sync())
    .pipe(
      autoprefixer({
        browsers: ['ie > 9', 'last 2 versions'],
        cascade: false
      })
    )
    .pipe(cssmin())
    .pipe(dest('./lib'))
}

// 复制字体到lib
function copyFont() {
  return src('./src/fonts/**').pipe(cssmin()).pipe(dest('./lib/fonts'))
}
// 导出
exports.build = series(compile, copyFont);