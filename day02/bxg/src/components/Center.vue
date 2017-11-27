<template>
              <!-- 讲师资料 -->
            <div class="body teacher-profile">
                <div class="settings">
                    <form action="" class="form-horizontal" ref="form" @submit.prevent="submit">
                        <div class="form-group">
                            <label for="" class="col-xs-3 control-label">姓名</label>
                            <div class="col-xs-5">
                                <p class="form-control-static">{{user.username}}</p>
                                <input type="hidden" name="username" :value="user.username">
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="" class="col-xs-3 control-label">头像</label>
                            <div class="col-xs-2 preview">
                                <img :src="user.avatar">
                                <input
                                ref="upfile"
                                @change="upfile"
                                type="file" id="upfile">
                                <div class="cover">
                                    <i class="fa fa-upload"></i>
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="" class="col-xs-3 control-label">昵称</label>
                            <div class="col-xs-5">
                                <input name="nickname"
                                v-model="user.nickname"
                                type="text" class="form-control input-sm">
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="" class="col-xs-3 control-label">性别</label>
                            <div class="col-xs-3">
                                <label class="radio-inline">
                         
                                    <input name="gender"
                                     v-model="user.gender"
                                     value="0"
                                     type="radio" > 男
                                </label>
                                <label class="radio-inline">
                                    <input  name="gender"
                                    v-model="user.gender"
                                    value="1"
                                    type="radio"> 女
                                </label>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="" class="col-xs-3 control-label">出生日期</label>
                            <div class="col-xs-5">
                                <input   name="birthDay"
                                v-model="user.birtyDay"
                                type="text" class="form-control input-sm">
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="" class="col-xs-3 control-label">籍贯</label>
                            <div class="col-xs-5">
                                <select name="province" v-model="nowP" class="form-control input-sm">
                                    <option :value="item.number" v-for="(item,index) in region.p['000000']" :key="index">{{item.name}}</option>
                                </select>
                                 <select name="city" v-model="nowC" class="form-control input-sm">
                                    <option :value="item.number" v-for="(item,index) in region.c[nowP]" :key="index">{{item.name}}</option>
                                </select>
                                 <select name="district" v-model="nowD" class="form-control input-sm">
                                    <option :value="item.number" v-for="(item,index) in region.d[nowC]" :key="index">{{item.name}}</option>
                                </select>
                               
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="" class="col-xs-3 control-label">手机号码</label>
                            <div class="col-xs-5">
                                <input name="phone"
                                v-model="user.phone"
                                type="text" class="form-control input-sm">
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="" class="col-xs-3 control-label">电子邮箱</label>
                            <div class="col-xs-5">
                                <input name="email"
                                v-model="user.email"
                                type="text" class="form-control input-sm">
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="" class="col-xs-3 control-label">入职日期</label>
                            <div class="col-xs-5">
                                <input
                                name="joinDate"
                                v-model="user.joinDate"
                                type="text" class="form-control input-sm">
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="" class="col-xs-3 control-label">个人介绍</label>
                            <div

                            class="col-xs-5 ckeditor">
                                <textarea
                                v-model="user.introduce"
                                name="introduce" rows="15" class="form-control input-sm"></textarea>
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="col-xs-8">
                                <button class="btn btn-success btn-sm pull-right" type="submit">保 存</button>
                                <a href="./repass.html" class="btn btn-link btn-sm pull-right">更改密码？</a>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
</template>
<script>
//引入bus做组件传值
import bus from '../bus'
export default {
    data(){
        return {
            user:{},
            region:{},
            nowP:'',//选中的省级编号
            nowC:'',//选中的市级编号
            nowD:'',//选中的区级编号
        }
    },
    created(){
        this.getUserData()
        //获取省市区数据
        this.getRegion()
    },
    methods:{
        getUserData(){
            //获取当前用户的信息
            this.$axios.get('http://bxg.huoqishi.net/userinfo').then(res=>{
                if(res.data.errcode !==0){
                    return alert(res.data.errmsg)
                }
                this.user = res.data.user
            })
        },
        upfile(){
            //上传图片，直接存入数据库
            var fd = new FormData();
            var file = this.$refs.upfile.files[0];
            fd.append('avatar',file);
            //formdata数据本身就是一个对象所以直接传入入即可
            this.$axios.post('http://bxg.huoqishi.net/avatar',fd).then(res=>{
                 if(res.data.errcode !==0){
                    return alert(res.data.errmsg)
                }
                //将上传页面显示的图片进行替换
                this.user.avatar = res.data.avatar
                //将头像也修改
                //需要利用bus传给home组件,再做处理
                bus.$emit('avatar', res.data.avatar)
            })
        },
        getRegion(){
            //先判断缓存中有没有，没有再请求
            if(sessionStorage.getItem('region')){
                this.region = JSON.parse(sessionStorage.getItem('region'))
            }else{
                this.$axios.get('http://bxg.huoqishi.net/region').then(res=>{
                     if (res.data.errcode !== 0) {
                        return alert(res.data.errmsg)
                    }
                    sessionStorage.setItem('region',JSON.stringify(res.data.region))
                    this.region = res.data.region
                })
            }
        },
        submit(){
            console.log(this.$refs.form)
            var data = new FormData(this.$refs.form)
            this.$axios.post('http://bxg.huoqishi.net/userinfo',data).then(res=>{
                 if(res.data.errcode !==0){
                    return alert(res.data.errmsg)
                }
               alert(res.data.errmsg)
            })
        }
        
    }
}
</script>

