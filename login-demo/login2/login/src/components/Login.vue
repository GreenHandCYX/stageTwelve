<template>
    <div>
        <div class="login-wrap" >
            <h3>登录</h3>
          
            <input type="text" placeholder="请输入用户名" v-model="email">
            <input type="password" placeholder="请输入密码" v-model="pass">
            <button v-on:click="login">登录</button>
           
        </div>

 
    </div>
</template>

<style>
    .login-wrap{text-align:center;}
    input{display:block; width:250px; height:40px; line-height:40px; margin:0 auto; margin-bottom: 10px; outline:none; border:1px solid #888; padding:10px; box-sizing:border-box;}
    p{color:red;}
    button{display:block; width:250px; height:40px; line-height: 40px; margin:0 auto; border:none; background-color:#41b883; color:#fff; font-size:16px; margin-bottom:5px;}
    span{cursor:pointer;}
    span:hover{color:#41b883;}
</style>
<script>
export default {
data(){
	return {
		email:'',
		pass:''
	}
},
	methods:{
		login(){
			this.$axios.post('http://127.0.0.1:3000/login',{email:this.email,pass:this.pass}).then(res=>{

				if(res.code===10000){
				return alert(res.msg)
				}
                alert(res.msg)
			})
		}
	}
}
</script>