const fs = require('fs');
const path = require('path');
const postcss = require('postcss');

// 读取packages下定义的icon.scss
const fontFile = fs.readFileSync(path.resolve(__dirname, '../../packages/theme-chalk/src/icon.scss'), 'utf8');

// 使用postcss解析fontFile的css模块
const nodes = postcss.parse(fontFile).nodes;
// 定义class选择器中icon 名称的收集列表
const classList = []

nodes.forEach((node) => {
  const selector = node.selector || '';
  const reg = new RegExp(/\.s-icon-([^:]+):before/);
  const arr = selector.match(reg);

  if(arr && arr[1]) {
    classList.push(arr[1])
  }
})

classList.reverse();

// 将icon 名称列表写入到examples目录下的icon.json文件当中
fs.writeFile(path.resolve(__dirname, '../../examples/icon.json'), JSON.stringify(classList), () => {})
