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



//在发送cors跨域请求时默认不会将cookie携带在请求头中发给服务端
//而登录验证需要将存SESSIONID的cookie发给服务端进行验证
//对axios的请求拦截进行设置withCredentails=true，使得每次请求中都会自带一个cookie
axios.interceptors.request.use(config=>{
    //每次axios发送请求时这个方法都会执行
    //config指对axios请求进行配置
    config.withCredentials = true;//每次请求都会自带一个cookie
    return config
})



var vm = new Vue({
    el:'#app',
    router,
    render:function(handler){
        // handler方法用来解析组件中的模板，return回去让内部渲染到DOM中
       return handler(App)
    }
})


