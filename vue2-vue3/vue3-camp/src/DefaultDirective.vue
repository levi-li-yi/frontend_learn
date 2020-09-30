<template>
<div>
  <h5 v-text="title"></h5>
  <div v-html="node"></div>

  <span v-show="status">is show</span>
  <span v-if="status">is if</span>
  <button @click="status = !status">tigger</button>
  <span v-pre>{{ this will not be compiled }}</span>

  <div v-cloak>{{message}}</div>
  <ul>
    <li v-is="'blog-li'"></li>
    <li>blog-li222</li>
  </ul>

  <h3>以下是vue3中内含组件</h3>
  <component :is="$options.components.Test"></component>
  <component :is="href ? 'a' : 'span'"></component>
  <div id="transition-demo">
    <transition name="fade" mode="out-in" appear @after-enter="enterAfter">
      <div>在transition组件中</div>
    </transition>
  </div>
  <keep-alive>
    <div>currentView Comp</div>
  </keep-alive>
  <p>传送组件：移动实际的DOM节点不会对dom进行破坏和重建，并且将保持html元素的所有状态</p>
  <teleport to="#tele"></teleport>
  <teleport to="#popup" :disabled="displayVideo">
    <video src='http://vali-g1.cp31.ott.cibntv.net/youku/6773520e8a3317145d0103c24/03000801005EC3B40C7E2BC003E8805D7AAD55-3ACD-4C5C-8125-1C63ED3F6C76.mp4?sid=160143484100010009822_00_Bf521a50157a25849a33bc72a877523e6&sign=8de13a7af899d5c98296a5dc60702e3f&ctype=50&si=183&psid=66f7d8d24f0bfd49178aa4210bc10de143162'></video>
  </teleport>
</div>
</template>

<script>
import {
  ref
} from 'vue'
import Test from './components/Test'

// TODO 疑问：1、在composition api中怎么调用ref；2、is到底如何配置动态组件使用
export default {
  components: {
    Test
  },
  setup() {
    const title = ref('标题')
    const node = '<h1>这是v-html</h1>'
    const message = 'message info'
    let status = ref(true)
    let currentView = ref(true)
    let displayVideo = ref(true)
    setTimeout(() => {
      currentView.value = false
      displayVideo.value = false
    }, 5000)

    function enterAfter() {
      console.log('enterAfter')
    }
    return {
      title,
      node,
      status,
      message,
      currentView,
      enterAfter,
      displayVideo
    }
  }
}
</script>

<style>
[v-cloak] {
  display: none;
}
</style>
