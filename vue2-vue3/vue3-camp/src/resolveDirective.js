// resolveDirective 可以解析全局注册的指令
// resolveDirective只能用于render函数或者setup函数中
import {resolveDirective} from 'vue'

export default {
  render() {
    const highlightDirective = resolveDirective('highlight');
    return highlightDirective
  }
}