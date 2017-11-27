import Vue from 'vue'

//引入组件
import App from './App.vue'

//引入路由组件
import router from './router'
// 引入所有的css文件
import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.css'
import 'nprogress/nprogress.css'
import './assets/css/index.css'

//引入axios处理请求
import axios from 'axios'


//在每一个组件实例上挂载一个axios属性,将axios对象挂载上去
Vue.use(function(Vue){
//这个函数可以在Vue的原型上挂载方法和属性，挂载后所有组件实例便都可以使用这些方法和属性了
//添加到Vue的原型上的属性，会被底层统一添加给每一个vue组件的实例上。
// 这里的$只是一个普通字符
Vue.prototype.$axios=axios
})




var vm = new Vue({
    el:'#app',
    router,
    render:function(handler){
        // handler方法用来解析组件中的模板，return回去让内部渲染到DOM中
       return handler(App)
    }
})


