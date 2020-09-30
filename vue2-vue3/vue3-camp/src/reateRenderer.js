// createRenderer 可以自定义render
import {createRenderer} from 'vue';

const {render, createApp} = createRenderer<Node, Element>({
  patchProp,
  ...nodeOps
})