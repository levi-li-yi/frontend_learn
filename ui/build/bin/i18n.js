// 该文件主要为了将在example中输出不同语言的tpl模板转化成对应语言模块的vue单文件

// 单文件组成网页文档页面

'use strict'

var fs = require('fs')
var path = require('path')
// 获取不同语言文档中的lang配置
var langConfig = require('../../examples/i18n/page.json')

langConfig.forEach((lang) => {
  // 先验证在examples/pages/路径下是否存在每个语言包文件，如果不存则创建一个对应的语言包
  try{
    fs.statSync(path.resolve(__dirname, `../../examples/pages/${lang.lang}`))
  }catch{
    // 创建一个对应的语言包,如examples/pages/en-US/XX.vue
    fs.mkdirSync(path.resolve(__dirname, `../../examples/pages/${lang.lang}`))
  }

  // 对每个语言包的pages页面做处理,每个pages中包含了：index、component、theme、theme-preview、theme-nav、changelog、design、guide、nav、resource属性
  Object.keys(lang.pages).forEach((page) => {
    // 获取pages下每个属性对应的tpl模板文件路径
    var templatePath = path.resolve(__dirname, `../../examples/pages/template/${page}.tpl`);

    // 获取pages下每个属性对应的vue单文件路径
    var outputPath = path.resolve(__dirname, `../../examples/pages/${lang.lang}/${page}.vue`);

    // 获取tpl模板文件内容
    var content = fs.readFileSync(templatePath, 'utf8');

    // 获取index、component、theme、theme-preview、theme-nav、changelog、design、guide、nav、resource的配置参数
    var pairs = lang.pages[page]

    // 将tpl模板中带有上一步配置参数的中的对象key值替换成其对象的value值
    Object.keys(pairs).forEach((key) => {
      content = content.replace(
        new RegExp(`<%=\\s*${key}\\s*>`, 'g'),
        pairs[key]
      )
    })

    // 将修改后的tpl模板内容写入examples/pages下的每个语言模块包含的vue单文件
    fs.writeFileSync(outputPath, content)
  })
})