<template>
  <div class="body teacher-list">
                <!-- 面包屑 -->
      <ol class="breadcrumb">
          <li><a href="javascript:;">讲师管理</a></li>
          <li class="active">讲师列表</li>
      </ol>
      <div class="page-title">
          <a href="../teacher/add.html" class="btn btn-success btn-sm pull-right">添加讲师</a>
      </div>
      <div class="panel panel-default">
          <div class="panel-body">
              <form action="" class="form-inline">
                  <div class="input-group">
                      <input type="text" class="form-control input-sm" @input="search" v-model="query">
                      <span class="input-group-btn">
                          <button class="btn btn-success btn-sm" @click="searchOnline">搜索</button>
                      </span>
                  </div>
              </form>
          </div>
          <button class="btn btn-success" @click="getTecList(-1)">上一页</button>
            <button class="btn btn-success" @click="getTecList(1)">下一页</button>
          <table class="table table-striped table-bordered table-hover">
              <thead>
                  <tr>
                      <th>编号</th>
                      <th>姓名</th>
                      <th>昵称</th>
                      <th>年龄</th>
                      <th>性别</th>
                      <th>手机号码</th>
                      <th>操作</th>
                  </tr>
              </thead>
              <tbody id="list">
                  <tr v-for="(item,index) in searchArr" :key="index">
                      <td>
                        {{index +1}}
                      </td>
                      <td>{{item.username}}</td>
                      <td>{{item.nickname}}</td>
                      <td>{{item.birthDay | getAge}}</td>
                      <td>{{item.gender === 1 ? '女':'男'}}</td>
                      <td>{{item.phone}}</td>
                      <td>
                          <a @click.prevent="showModel(item._id)" class="btn btn-info btn-xs">查 看</a>
                          <router-link :to="{name:'tecedit',params:{id:item._id}}" class="btn btn-info btn-xs">编 辑</router-link >
                          <a href="javascript::" class="btn btn-warning btn-xs" @click.prevent="handler(item)">{{ item.status === 0 ? '启用' : '注销'}}</a>
                      </td>
                  </tr>
              </tbody>
          </table>
      </div>
      <Modal ref="myModal"></Modal>
  </div>
</template>
<script>
//引入模态框
import Modal from './Modal.vue';
export default {
  data(){
    return {
      teachers:[],
      page:0,
      total:null,
      query:'',
      searchArr:[]//搜索结果，默认与teachers一致
    }
  },
  components:{
    Modal
  }
  ,
  created(){
    this.getTecList(1)
  },
  methods:{
    getTecList(dir){
        //通过方向翻页
        const page = this.page + dir;
      if(page < 1) alert('已经是第一页了');

      if(this.total ==null || page <= Math.ceil(this.total/5)){
         this.$axios.get('http://bxg.huoqishi.net/teachers', {
            params: {
              page: page,
              count: 5
            }
          }).then( ({data}) => {
            
            this.teachers =this.searchArr = data.teachers
            this.page = page
            this.total = data.total
          })
      }else{
        alert('已经是最后一页了')
      }
      
    },
    search(){
      //先在已有数据里查询
      //若在所有字段里查则JSON.stringify(ele).indexOf
      //用teachers存所有的数据
      this.searchArr = this.teachers.filter(ele =>
      ele.username.indexOf(this.query)!==-1
      )  
    },
    searchOnline(){
        //再去服务器里查
      // 发请求去服务器搜索!
      this.$axios.get('http://bxg.huoqishi.net/teachers/search', {
        params: {
          query: this.query
        }
      }).then( ({data}) => {
        if (data.errcode !== 0) {
          return alert(data.errmsg)
        }
        this.teachers = this.searchArr = data.teachers
        this.total = data.total
      })
    },
    handler(item){
      //修改用户状态
      const newStatus = item.status === 1? 0:1;
       this.$axios.post('http://bxg.huoqishi.net/teachers/handler', {
          _id: item._id,
          status: newStatus
        }).then(({data})=>{
          if(data.errcode!==0){
            return alert(data.errmsg)
          }
          item.status = newStatus
        })
    },
    showModel(_id){
      //模拟框
      //通过refs可以获取到子组件的实例,此处为myModal
      //也就可以给调用子组件的方法或属性了
      //同时也可以通过子组件的方法给子组件传值
      this.$refs.myModal.show(_id);
    }


     
  },
  filters:{
    getAge(data){
      var year = new Date(data).getFullYear();
      var nowYear = new Date().getFullYear();
      return nowYear - year + 1
    }
  }
}
</script>
