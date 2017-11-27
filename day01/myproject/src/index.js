import Vue from 'vue'

//引入组件
import App from './App.vue'

//引入路由组件
import router from './router'

var vm = new Vue({
    el:'#app',
    router,
    render:function(handler){
        // handler方法用来解析组件中的模板，return回去让内部渲染到DOM中
       return handler(App)
    }
})


