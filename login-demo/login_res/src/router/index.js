import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/components/login.vue'
import Main from '@/components/main.vue'
import Home from '@/components/home.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/main',
      name: 'Main',
      component: Main
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    }
  ]
})
