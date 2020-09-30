// nextTick 在组件完成渲染后可以运行的内容
import {createApp, nextTick, ref} from 'vue'

const app = createApp({
  setup() {
    const msg = ref('demo');
    const changeMsg = async newMsg => {
      message.value = newMsg
      await nextTick()
      console.log('Dom is updated');
    }
  }
})

export default app;