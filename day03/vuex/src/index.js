import Vue from 'vue'
import App from './App.vue'


//引入全局的仓库
import store from './store'


const vm = new Vue({
  el: '#box',
  store:store,//注册后所有组件就都有一个this.$store属性了
  render: function (handler) {
    return handler(App)
  }
})