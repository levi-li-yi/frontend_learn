//// vue3的h函数，创建组件
import {h} from 'vue';

// h函数接收type、props、children三个参数

export default {
  render() {
    return h('div', {'id': 'test_div'}, [
      'Some Title',
      h('h1', {}, '一个h1标签'),
      // h(MyComponent, {
      //   someProp: 'foobar'
      // })
    ])
  }
}
