// 动态定义异步组件
import {defineAsyncComponent} from 'vue'

const AsyncComp1 = defineAsyncComponent(() => 
  import('./components/Test.vue')
)

const AsyncComp2 = defineAsyncComponent({
  loader: () => import('./components/Test.vue'),
  // 加载中组件
  loadingComponent: null,
  // 加载失败时的组件
  errorComponent: null,
  // 延迟时间
  tiemout: 3000,
  // 定义组件是否挂起状态, 默认true
  suspensible: false,
  // 错误回调
  /**
   * 
   * @param {*} error 错误信息对象
   * @param {*} retry 当加载程序拒绝时异步组件是否重试
   * @param {*} fail 加载失败时，结束失败
   * @param {*} attempts 运行最大重试次数
   */
  onError(error, retry, fail, attempts) {
    if (error.message.match(/fetch/) && attempts <= 3) {
      retry()
    } else {
      fail()
    }
  }
})

export {AsyncComp1, AsyncComp2};