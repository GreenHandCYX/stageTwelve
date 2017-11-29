<template>
    <!-- 模态框 添加课程 -->
    <div :class="{modal:isHide, fade:isHide}" id="teacherModal">
       <div class="modal-dialog" style="width: 750px;">
            <div class="panel panel-default">
                <div class="panel-heading">
                    <button
                    @click="hide()"
                    type="button" class="close" data-dismiss="modal">&times;</button>
                    <h4 class="panel-title">讲师信息</h4>
                </div>
                <div class="panel-body">
                    <table class="table table-bordered table-condensed">
                        <tbody>
                            <tr>
                                <th>姓名:</th>
                                <td>{{teacher.username}}</td>
                                <th>职位:</th>
                                <td colspan="3">讲师</td>
                                <td rowspan="4" width="128">
                                    <div class="avatar">
                                        <img :src="teacher.avatar" alt="">
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <th>花名:</th>
                                <td>麻衣长老</td>
                                <th>出生日期:</th>
                                <td colspan="3">2015-11-13</td>
                            </tr>
                            <tr>
                                <th>性别:</th>
                                <td>男</td>
                                <th>出生日期:</th>
                                <td colspan="3">1985-05-25</td>
                            </tr>
                            <tr>
                                <th>手机号码:</th>
                                <td colspan="2">{{teacher.phone}}</td>
                                <th>邮箱:</th>
                                <td colspan="2">{{teacher.email}}</td>
                            </tr>
                            <tr>
                                <th>籍贯:</th>
                                <td colspan="6">河北省 保定市 曲阳县</td>
                            </tr>
                            <tr>
                                <td colspan="7">
                                    <div class="introduce">
                                        {{teacher.introduce}}
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  data(){
      return {
          isHide:true,
          teacher:{}
      }
  },
  methods:{
      hide(){
          this.isHide = true;
          //隐藏时应清空数据
          this.teacher = {}
      },
      show(_id){
          this.isHide = false;
           // 发请求获取讲师的详细信息
        this.$axios.get('http://bxg.huoqishi.net/teachers/' + _id)
        .then( ({data}) => {
          if (data.errcode !== 0) {
            return alert('data.errmsg')
          }
          this.teacher = data.teacher
        })
      }
  }
}
</script>

<style>
    #teacherModal{
        width: 100%;
        height: 100%;
        position: fixed;
        left: 0;
        top: 0;
         z-index: 998;
         background: rgba(0,0,0, 0.6);
    }
</style>

