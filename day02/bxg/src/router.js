import Vue from 'vue';
import VueRouter from 'vue-router';

//将this.$router和this.$route绑定到所有组件的实例上
Vue.use(VueRouter)

// 引入路由配置中所需要的组件
import Signin from './components/Signin.vue'
import Home from './components/Home.vue'
import Dashboard from './components/Dashboard.vue'
import TecList from './components/TecList.vue'
import Center from './components/Center.vue'

//配置路由
const router = new VueRouter({
    routes:[
        {name:'signin',path:'/signin',component:Signin},
        {
            name:'home',path:'/home',component:Home,
            //配置子路由(嵌套路由)
            children:[
                {name:'dashboard',path:'/dashboard',component:Dashboard},
                {name:'teclist',path:'/teclist',component:TecList},
                {name:'center',path:'/center',component:Center}
            ]
        },
        {name:'index',path:'/',redirect:'/home'}
    ]
})


export default router;