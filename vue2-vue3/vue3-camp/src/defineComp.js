// 动态定义组件
import {defineComponent, ref} from 'vue'

const OptionComp = defineComponent({
  data() {
    return {
      count: 1
    }
  },
  methods: {
    increment() {
      this.count++
    }
  }
})

const CompositionComp = defineComponent(function CompositionComp() {
  const count = ref(0);
  return {count}
})