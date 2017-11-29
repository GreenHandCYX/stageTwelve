<template>
  <div>
        <!-- 侧边栏 -->
    <div class="aside">
        <!-- 个人资料 -->
        <div class="profile">
            <!-- 头像 -->
            <div class="avatar img-circle">
                <img :src="localuser.avatar">
            </div>
            <h4>{{localuser.username}}</h4>
        </div>
        <!-- 导航菜单 -->
        <div class="navs">
            <ul class="list-unstyled">
                <li>
                    <router-link :to="{name:'dashboard'}" class="active">
                        <i class="fa fa-home"></i>
                        仪表盘
                    </router-link>
                </li>
                <li>
                    <a href="../user/list.html">
                        <i class="fa fa-bell"></i>
                        用户管理
                    </a>
                </li>
                <li>
                    <router-link :to="{name:'teclist'}" >
                        <i class="fa fa-bell"></i>
                        讲师管理
                    </router-link>
                </li>
                <li>
                    <a href="javascript:;" @click="showCourse = !showCourse">
                        <i class="fa fa-cog"></i>
                        课程管理
                        <i class="arrow fa fa-angle-right"></i>
                    </a>
                    <ul class="list-unstyled" v-show="showCourse">
                        <li>
                            <a href="../course/add.html">
                                 课程添加
                            </a>
                        </li>
                        <li>
                            <a href="../course/list.html">
                                课程列表
                            </a>
                        </li>
                        <li>
                            <a href="../course/category.html">
                                课程分类
                            </a>
                        </li>
                        <li>
                            <a href="../course/topic.html">
                                课程专题
                            </a>
                        </li>
                    </ul>
                </li>
                <li>
                    <a href="../advert/list.html">
                        <i class="fa fa-bell"></i>
                        广告管理
                    </a>
                </li>
                <li>
                    <a href="javascript:;" @click="showSystem = !showSystem">
                        <i class="fa fa-cog"></i>
                        系统设置
                        <i class="arrow fa fa-angle-right"></i>
                    </a>
                    <ul class="list-unstyled" v-show="showSystem">
                        <li>
                            <a href="javascript:;">
                                网站设置
                            </a>
                        </li>
                        <li>
                            <a href="javascript:;">
                                 权限管理
                            </a>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>

    <!-- 主体 -->
    <div class="main">
        <div class="container-fluid">
            <!-- 头部 -->
            <div class="header">
                <nav class="navbar navbar-custom">
                    <div class="navbar-header">
                        <a href="javascript:;" class="navbar-brand">
                            <i class="fa fa-navicon"></i>
                        </a>
                    </div>
                    <ul class="nav navbar-nav navbar-right">
                        <li>
                            <a href="javascript:;">
                                <i class="fa fa-bell"></i>
                                <span class="badge">8</span>
                            </a>
                        </li>
                        <li>
                            <router-link :to="{name:'center'}">
                                <i class="fa fa-user"></i>
                                个人中心
                            </router-link>
                        </li>
                        <li>
                            <a @click.prevent="logout">
                                <i class="fa fa-sign-out"></i>
                                退出
                            </a>
                        </li>
                        <li>
                            <a href="javascript:;">
                                <i class="fa fa-tasks"></i>
                            </a>
                        </li>
                    </ul>
                </nav>          
            </div>
            <!-- 子路由 -->
            <router-view>
            </router-view>
        </div>
    </div>
  </div>
</template>
<script>
//用于接收组件传来的值
import bus from '../bus'
export default {
    data(){
        return {
            localuser:{},
            showCourse:false,
            showSystem:false
        }
    },
  created(){
      this.valiLogin()
      this.getlocaluser()
      //获取本地缓存中的菜单栏的状态
      this.showCourse = localStorage.getItem('showCourse')==='true'
      this.showSystem = localStorage.getItem('showSystem')==='true'


      //接收借由bus传来的图像信息
      //更改头像，并存入缓存
      bus.$on('avatar',(imgSrc)=>{
          this.localuser.avatar = imgSrc;
          localStorage.setItem('userInfo',JSON.stringify(this.localuser))
      })
  },
  watch:{
      showCourse(){
           //监听showCourse的值并将菜单栏显示状况存在本地缓存中
           localStorage.setItem('showCourse',this.showCourse)
      },
      showSystem(){
           //监听showSystem的值并将菜单栏显示状况存在本地缓存中
           localStorage.setItem('showSystem',this.showSystem)
      }
  }
  ,
  methods:{
      valiLogin(){
          this.$axios.get('http://bxg.huoqishi.net/user/status').then(res=>{
              if(res.data.errcode!==0){
                alert(res.data.errmsg)
                this.$router.push({
                    name:'signin'
                })
                  return 
              }
              alert(res.data.errmsg)
          })
      },
      logout(){
          this.$axios.post('http://bxg.huoqishi.net/signout').then(
              res=>{
                  if(res.data.errcode!=0){
                      return alert(res.data.msg)
                  }
                  alert('退出成功')
                  this.$router.push({name:'signin'})
              }
          )
      },
      getlocaluser(){
          //获取登录成功时存在本地缓存的数据
          var data = localStorage.getItem('userInfo') || '{}'
          console.log(data)
          this.localuser = JSON.parse(data);
      }
  }
}
</script>
