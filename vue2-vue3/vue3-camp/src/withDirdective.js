// withDirectives 将一个指令应用于VNode
// withDirectives 只能用在render函数或者setup函数中
import {withDirectives, resolveDirective} from 'vue'

const foo = resolveDirective('foo');
const bar = resolveDirective('bar');

return withDirectives(h('div'), [
  [foo],
  [bar, 100]
])