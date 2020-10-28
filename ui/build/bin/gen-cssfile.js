var fs = require('fs')
var path = require('path')

var Components = require('../../components.json');
Components = Object.keys(Components);

var themes = ['theme-chalk']

// 获取组件包packages目录路径
var basePath = path.resolve(__dirname, '../../packages/');

// 判断指定路径的文件是否存在
function fileExists(filePath) {
  try{
    fs.statSync(filePath).isFile()
  } catch(err) {
    return false
  }
}

// 将不同样式主题下,在packages主题模块中的base.scss或base.css,以及packages中组件模块对应的主题模块中的scss或者css文件
// 自动添加到packages的对应主题模块src/下的index.scss/index.css文件中

themes.forEach((theme) => {
  // 判断是不是scss文件类型的主题
  var isSCSS = theme !== 'theme-default';
  // 定义各个组件模块的scss或者css在index.scss/index.css中的引入语句
  var indexContent = isSCSS ? '@import "./base.scss";\n' : '@import "./base.css";\n';

  Components.forEach((key) => {
    // 过滤部分特殊组件
    if(['icon', 'option', 'option-group'].indexOf(key) > -1) return

    // 拼接所有需要自动导入组件的scss/css文件
    var fileName = key + (isSCSS ? '.scss' : '.css');
    indexContent += '@import "./' + fileName + '";\n'

    // 获取packages下对应主题中每个组件模块的scss或css文件路径
    var filePath = path.resolve(basePath, theme, 'src', fileName);
    // 判断文件若不存在,则自动创建一个对应scss/css文件
    if(!fileExists(filePath)) {
      fs.writeFileSync(filePath, '', 'utf8')
    }
  })
  // 最终将对应样式主题中的组件scss/css文件导入语句自动添加到index文件中
  fs.writeFileSync(
    path.resolve(basePath, theme, 'src', isSCSS ? 'index.scss': 'index.css'),
    indexContent
  )
})
