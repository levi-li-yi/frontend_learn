<template>
<div>
  <h1>This is RefsApi Comp</h1>
  <p>ref value: {{count}}</p>
  <input type="text" v-model="text">
</div>
</template>

<script>
import {
  ref,
  reactive,
  toRef,
  toRefs,
  isRef,
  customRef,
  shallowRef,
  isReactive,
  triggerRef,
  watchEffect
} from 'vue'
// 创建一个自定义的ref, 它需要一个工厂函数，函数接收track/trigger,并返回带有get和set的对象
// TODO customRef的价值体现在哪里
function useDebounceRef(value, delay = 200) {
  let timeout
  return customRef((track, trigger) => {
    return {
      get() {
        track()
        return value
      },
      set(newValue) {
        clearTimeout(timeout)
        timeout = setTimeout(() => {
          value = newValue
          trigger()
        }, delay)
      }
    }
  })
}
export default {
  setup() {
    // 把基本数据类型做响应式处理
    let count = ref(0);
    setTimeout(() => {
      count.value++
    }, 1000)
    // const foo = ref<string | number>('foo') // foo's type: Ref<string | number>
    // foo.value = 123 // ok!

    // 获取一个不确定是否经过ref处理的数据
    // function useFoo(x:number | Ref<number>) {
    //   const unwrapped = unref(x)
    // }

    // 创建由ref处理并与被reactive处理的对象建立连接
    const state = reactive({
      foo: 99,
      bar: 100
    })

    let fooRef = toRef(state, 'foo');
    fooRef.value++
    console.log(state.foo) // 100
    state.foo++
    console.log(fooRef.value) // 101

    // 创建一个响应式对象，并与reactive处理的对象建立连接
    const state1 = reactive({
      foo: 22,
      bar: 33
    })
    const fooRefs = toRefs(state1)
    state1.foo++
    console.log(fooRefs.foo.value) // 23
    fooRefs.foo.value++
    console.log(state1.foo) // 24

    // 检查是否是ref创建的对象
    const isRefObj = isRef(count)
    console.log(isRefObj, isRef(state1)) // true

    // 创建一个引用来追踪自身的.value突变， 但不会使其有响应式效果
    const foo = shallowRef({})
    foo.value = {}
    console.log(isReactive(foo.value)) // false

    // 手动使经shallowRef追踪的对象触发effect响应
    const shallow = shallowRef({
      greet: 'Hello world'
    })
    watchEffect(() => {
      console.log(shallow.value.greet)
    })
    shallow.value.greet = 'Hello universe'

    setTimeout(() => {
      triggerRef(shallow)
    }, 2000)

    return {
      count,
      text: useDebounceRef('hello')
    }
  }
}
</script>

<style>
</style>
