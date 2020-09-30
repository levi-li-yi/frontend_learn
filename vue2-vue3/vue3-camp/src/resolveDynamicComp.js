// resolveDynamicComponent 动态解析在全局中注册的组件或者创建一个以获取名为名称的VNode
// resolveDynamicComponent也只能用在render函数或者setup函数中

import {resolveDynamicComponent} from 'vue'

export default {
  render() {
    return resolveDynamicComponent('MyComponent')
  }
}
