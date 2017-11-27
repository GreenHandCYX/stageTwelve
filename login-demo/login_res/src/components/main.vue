<template>
    <div>
        <h3>所有注册用户</h3>
        <ul>
            <li v-for="item in list">
                {{item.username}}
            </li>
        </ul>
    </div>
</template>

<style>
    ul{padding: 0;}
    ul li{list-style: none;}
</style>

<script>
import { setCookie,getCookie,delCookie } from '../assets/js/cookie.js'
    export default{
        data(){
            return{
                list: ''
            }
        },
        mounted(){
             /*页面挂载获取保存的cookie值，渲染到页面上*/
            let uname = getCookie('username')
            this.name = uname
            /*如果cookie不存在，则跳转到登录页*/
            if(uname == ""){
                this.$router.push('/')
                return 
            }
            this.$http.get('http://vue.studyit.io/api/getnewslist').then((res)=>{
                this.list = res.data
                console.log(res)
            })
        }
    }
</script>