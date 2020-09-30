<template>
<div>
  <p>reactive测试： {{state.count}}</p>
  <p>readonly测试： {{copy.count}}</p>
  <p>isProxy测试： {{isProx}}</p>
  <p>isReactive测试： {{isReact}}</p>
  <p>isReadonly测试： {{isReadOnl}}</p>
  <p>isRaw测试： {{isRa}}</p>
  <p>markRaw测试： {{notReactive1}}</p>
  <p>markRaw测试： {{notReactive2}}</p>
  <p>shallowReactive测试： {{shallowRe.state}}</p>
  <p>shallowReactive测试： {{shallowRe.nested.bar}}</p>
  <p>shallowReadonly测试： {{shallowReadOnl.state}}</p>
  <p>shallowReadonly测试： {{shallowReadOnl.nested.bar}}</p>
</div>
</template>

<script>
// 为了测试reactivity api

import {
  reactive,
  readonly,
  isProxy,
  isReactive,
  isReadonly,
  toRaw,
  markRaw,
  shallowReactive,
  shallowReadonly
} from 'vue';

export default {
  setup() {
    // 对象响应式
    let state = reactive({
      count: 0
    })
    // 只读
    const copy = readonly(state)
    copy.count++
    // 检测对象是否被reactive或readonly做了响应式处理
    const isProx = isProxy(state)
    // 检测对象是否被reactive做了响应式处理
    const isReact = isReactive(copy)
    // 检测对象是否被readonly做了只读处理
    const isReadOnl = isReadonly(copy)
    // 获取响应化的原生对象
    const foo = {};
    const reactiveFoo = reactive(foo);
    const isRa = toRaw(reactiveFoo) === foo ? '原生的对象是foo' : '不是原生对象'
    // 标记一个对象，让其不能被响应式处理
    const foo1 = markRaw({})
    const notReactive1 = isReactive(reactive(foo1))
    const notReactive2 = isReactive(reactive({
      foo1
    }).foo1)
    // 只对一个对象做一级属性做响应式处理
    const shallowRe = shallowReactive({
      state: 1,
      nested: {
        bar: 2
      }
    })
    setTimeout(() => {
      shallowRe.state++
      console.log('shallowRe', isReactive(shallowRe.nested))
      // TODO shallowRe.nested不是响应式的，但是下面shallowRe.nested.bar++会触发dom更新
      shallowRe.nested.bar++
    }, 5000)
    // 只对一个对象做一级属性做只读处理
    const shallowReadOnl = shallowReadonly({
      state: 1,
      nested: {
        bar: 2
      }
    })
    setTimeout(() => {
      shallowReadOnl.state++
      // TODO shallowReadOnl.nested不是只读的，但是下面shallowReadOnl.nested.bar++没有触发dom更新
      shallowReadOnl.nested.bar++
    }, 5000)

    // 统一返回
    return {
      state,
      copy,
      isProx,
      isReact,
      isReadOnl,
      isRa,
      notReactive1,
      notReactive2,
      shallowRe,
      shallowReadOnl
    }
  }
}
</script>

<style>
</style>
