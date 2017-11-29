<template>
              <div class="body teacher">
                <!-- 面包屑 -->
                <ol class="breadcrumb">
                    <li><a href="javascript:;">讲师管理</a></li>
                    <li class="active">讲师编辑</li>
                </ol>
                <div class="teacher-add">
                    <form action="" class="form-horizontal col-xs-offset-2">
                        <div class="form-group">
                            <label for="" class="col-xs-3 control-label">姓名</label>
                            <div class="col-xs-4">
                                <input
                                v-model="teacher.username"
                                type="text" class="form-control input-sm" placeholder="讲师名称">
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="" class="col-xs-3 control-label">入职时间</label>
                            <div class="col-xs-4">
                                <input
                                v-model="teacher.joinDate"
                                type="text" class="form-control input-sm">
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="" class="col-xs-3 control-label">类型</label>
                            <div class="col-xs-2">
                                <select
                                v-model="teacher.type"
                                name="" class="form-control input-sm">
                                    <option value="1">管理员</option>
                                    <option value="0">讲师</option>  
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="" class="col-xs-3 control-label">性别</label>
                            <div class="col-xs-4">
                                <label class="radio-inline">
                                    <input
                                    v-model="teacher.gender"
                                    value="0"
                                    type="radio" checked> 男
                                </label>
                                <label class="radio-inline">
                                    <input
                                    v-model="teacher.gender"
                                    value="1"
                                    type="radio"> 女
                                </label>
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="col-xs-7">
                                <a 
                                @click.prevent="save"
                                class="btn btn-success btn-sm pull-right"> 编 辑 </a>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
</template>
<script>
export default {
  data(){
      return {
         teacher:{}
      }
  },
  created(){
      this.getEditData()
  },
  methods:{
      getEditData(){
           this.$axios.get('http://bxg.huoqishi.net/teachers/edit',
            {
            params: {_id: this.$route.params.id}
            })
            .then( ({data}) => {
                if (data.errcode !== 0) {
                    return alert(data.errmsg)
                }
                this.teacher = data.teacher
            })
      },
      save(){
           this.$axios.post('http://bxg.huoqishi.net/teachers/edit', this.teacher)
            .then( ({data}) => {
            if (data.errcode !== 0) {
                return alert(data.errmsg)
            }
            alert(data.errmsg)
            })
      }
  }
}
</script>

