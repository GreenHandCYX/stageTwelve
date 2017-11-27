<template>
  <div class="login">
        <div class="login-wrap">
            <div class="avatar">
                <img src="../assets/img/monkey.png" class="img-circle" alt="">
            </div>
            <form action="" @submit.prevent="login" class="col-xs-offset-1 col-xs-10">
                <div class="input-group input-group-lg">
                    <span class="input-group-addon">
                        <i class="fa fa-user"></i>
                    </span>
                    <input id="name" type="text" class="form-control" v-model="username" placeholder="用户名"
                    >
                </div>
                <div class="input-group input-group-lg">
                    <span class="input-group-addon">
                        <i class="fa fa-key"></i>
                    </span>
                    <input id="pass" type="password" class="form-control" v-model="password" placeholder="密码"
                    >
                </div>
                <!-- 用事件修饰符prevent阻止表单提交页面默认刷新 -->
                <button type="submit" class="btn btn-lg btn-primary btn-block">登 录</button>
            </form>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            username:'',
            password:''
        }
    },
    methods:{
          login(){
              this.$axios.post('http://bxg.huoqishi.net/signin',{
                  username:this.username,
                  password:this.password
              }).then(
                  res=>{
                      if(res.data.errcode!=0){
                          return alert(res.data.errmsg)
                      }
                      this.$router.push({
                          name:'home'
                      })
                      alert('成功!')
                  }
              )
          }
    }
    
}
</script>

