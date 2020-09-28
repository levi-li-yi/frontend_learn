import {createRouter, createWebHashHistory} from 'vue-router';

export default createRouter ({
  history: createWebHashHistory(),
  routes: [{
    path: '/',
    component: () => import('../App1.vue')
  }]
})