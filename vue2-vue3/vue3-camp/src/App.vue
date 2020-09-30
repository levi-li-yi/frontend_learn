<template>
<div v-my-directive:foo="1">
  <default-directive></default-directive>
  <h3>{{user}}</h3>
  <todo-list></todo-list>
  <my-component></my-component>
  <h-comp></h-comp>

  <reactivity-api></reactivity-api>
  <refs-api></refs-api>
</div>
</template>

<script>
import TodoList from './TodoList';
import HComp from './h';
import mixin from './mixin'
import DefaultDirective from './DefaultDirective'
import ReactivityApi from './ReactivityApi'
import RefsApi from './RefsApi'

export default {
  name: 'App',
  mixins: [mixin],
  components: {
    TodoList,
    HComp,
    DefaultDirective,
    ReactivityApi,
    RefsApi
  },
  inject: ['user'],
  data() {
    return {
      article: {
        text: 'awesome'
      }
    }
  },
  // 组件生命周期
  beforeCreate() {
    console.log('beforeCreate')
  },
  created() {
    console.log('created')

    // 实例方法：
    // $watch
    this.$watch('article', () => {
      console.log('is changed')
    }, {
      deep: true, // 是否深度监听
      immediate: true, // 是否立即触发回调
    })
    // $emit
    this.$emit('created')
    // $forceUpdate
    // this.$forceUpdate();
    // $nextTick
    this.$nextTick(() => {
      console.log('nectTick')
    })
  },
  beforeMount() {
    console.log('beforeMount')
  },
  mounted() {
    console.log('mounted')
  },
  beforeUpdate() {
    console.log('beforeUpdate')
  },
  updated() {
    console.log('updated')
  },
  beforeUnmount() {
    console.log('beforeUnMount')
  },
  unmounted() {
    console.log('unmounted')
  },
  // 捕获到任何后代的错误时调用
  errorCaptured: (err, vm, info) => {
    // err错误信息；vm错误触发的组件实例；捕获错误的位置信息的字符串
    console.log(err, vm, info)
  },
  // 渲染追踪
  renderTracked({
    key,
    target,
    type
  }) {
    // 反馈了什么操作跟踪了组件以及该操作的目标对象和键
    console.log(key, target, type)
  },
  // 触发组件重新渲染时调用
  renderTriggered({
    key,
    target,
    type
  }) {
    console.log(key, target, type)
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
