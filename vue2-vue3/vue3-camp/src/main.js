import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App);

//// vue3提供全局应用配置
// 错误处理
app.config.errorHandler = (err, vm, info) => {
  console.log(err, vm, info);
  // info包含了在vue生命周期钩子中“特定的”错误信息
  console.log('errorHandler: ',info);
}

// 告警处理
app.config.warnHandler = (msg, vm, trace) =>{
  console.log(msg, vm, trace);
  // trace 是组件的“层次结构跟踪”信息
}

// 全局属性: (可以在全局使用 this.foo获取)
app.config.globalProperties.foo = 'bar'

// 判定是否是“自定义标签” (以icon-开头的会被标识为自定义组件)
app.config.isCustomElement = tag => tag.startsWith('icon-')

// “自定义选项”合并策略
app.config.optionMergeStrategies.hello = (parent, child, vm) => {
  console.log(parent, child, vm);
  return `Hello, ${child}`
}
// app.mixin({
//   hello: 'Vue'
// })
// Hello, vue

// 性能追踪：若设置performance为true，则会在浏览器开发工具的性能栏显示组件初始化、编译、渲染、打补丁的性能追踪情况
// 注：只适用于开发阶段
app.config.performance = true;


//// vue3注册全局组件
app.component('my-component', {})


//// vue3全局注册directive
app.directive('my-directive', {
  beforeMount() {console.log('beforeMount')},
  mounted(el, binding, vnode, prevNode) {
    console.log(el, binding, vnode, prevNode);
    console.log('binding: ',binding.instance, binding.value, binding.oldValue, binding.arg, binding.modifiers, binding.dir);
    console.log('mounted')
  },
  beforeUpdate() {console.log('beforeUpdate')},
  updated() {console.log('updated')},
  beforeUnmount() {console.log('beforeUnmount')},
  unmounted() {console.log('unmounted');}
})


//// vue3混合： mixin 


//// vue3 根级别组件参数传递: provie/inject
app.provide('user', 'admin')


//// vue3安装插件 use
app.use({
  install: (vue) => {
    console.log(vue)
    // 插件内容
  }
})


//// vue3挂载根实例mount 
app.mount('#app')


//// vue3卸载根组件
// setTimeout(() => app.unmount('#app'), 5000)
