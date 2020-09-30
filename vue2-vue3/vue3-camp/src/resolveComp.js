// resolveComponent 只能用于在render函数或者setup函数中
// 使用resolveComponent可以解析在vue全局中已经注册的某个组件
import {resolveComponent} from 'vue'

 export default {
   render() {
     return resolveComponent('MyComponent')
   }
 }
