var path = require('path')
var fs = require('fs')
var nodeExternals = require('webpack-node-externals')
var Components = require('../components.json')

var utilsList = fs.readdirSync(path.resolve(__dirname, '../src/utils'))
var mixinsList = fs.readdirSync(path.resolve(__dirname, '../src/mixins'))
var transitionList = fs.readdirSync(
  path.resolve(__dirname, '../src/transitions')
)
var externals = {}

Object.keys(Components).forEach(function (key) {
  externals[`sinux-ui/packages/${key}`] = `sinux-ui/lib/${key}`
})

externals['sinux-ui/src/locale'] = 'sinux-ui/lib/locale'
utilsList.forEach(function (file) {
  file = path.basename(file, '.js')
  externals[`sinux-ui/src/utils/${file}`] = `sinux-ui/lib/utils/${file}`
})
mixinsList.forEach(function (file) {
  file = path.basename(file, '.js')
  externals[`sinux-ui/src/mixins/${file}`] = `sinux-ui/lib/mixins/${file}`
})
transitionList.forEach(function (file) {
  file = path.basename(file, '.js')
  externals[
    `sinux-ui/src/transitions/${file}`
  ] = `sinux-ui/lib/transitions/${file}`
})

externals = [
  Object.assign(
    {
      vue: 'vue'
    },
    externals
  ),
  nodeExternals()
]

exports.externals = externals

exports.alias = {
  main: path.resolve(__dirname, '../src'),
  packages: path.resolve(__dirname, '../packages'),
  examples: path.resolve(__dirname, '../examples'),
  'sinux-ui': path.resolve(__dirname, '../')
}

exports.vue = {
  root: 'Vue',
  commonjs: 'vue',
  commonjs2: 'vue',
  amd: 'vue'
}

exports.jsexclude = /node_modules|utils\/popper\.js|utils\/date\.js/
