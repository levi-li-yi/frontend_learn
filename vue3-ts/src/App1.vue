<template>
<div>
  <label>新增代办</label>
  <input type="text" v-model="state.todo" @keyup.enter="handleAddTodo">
  <div>
    <h3>总办事项</h3>
    <ul>
      <li v-for="item in state.todoList" :key="item.id" @click="handleStatus(item, item.done)">{{item.text}}</li>
    </ul>
  </div>
  <div>
    <h3>待办事项</h3>
    <ul>
      <li v-for="item in todos" :key="item.id">{{item.text}}</li>
    </ul>
  </div>
  <div>
    <h3>已办事项</h3>
    <ul>
      <li v-for="item in dones" :key="item.id">{{item.text}}</li>
    </ul>
  </div>
</div>
</template>

<script lang="ts">
import {
  ref,
  reactive,
  computed
} from 'vue';

export default {
  setup() {
    let state = reactive({
      todoList: [{
        id: '1',
        done: false,
        text: '初始化'
      }],
      todo: ''
    })
    const handleAddTodo = () => {
      if (!state.todo) return
      state.todoList.push({
        id: '2',
        done: true,
        text: state.todo
      })
      state.todo = ''
    }
    const handleStatus = (item, status: Boolean) => {
      item.done = !status;
    }
    const todos = computed(() => {
      return state.todoList.filter((item) => !item.done)
    })
    const dones = computed(() => {
      return state.todoList.filter((item) => item.done)
    })

    return {
      state,
      todos,
      dones,
      handleAddTodo,
      handleStatus,
    }
  }
}
</script>
