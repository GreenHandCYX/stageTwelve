import Vue from 'vue';
import VueRouter from 'vue-router';

//将this.$router和this.$route绑定到所有组件的实例上
Vue.use(VueRouter)


//配置路由
const router = new VueRouter({
    routes:[
        {name:'',path:'',component:''}
    ]
})


export default router;