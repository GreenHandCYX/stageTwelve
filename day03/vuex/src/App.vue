<template>
  <div>
   {{name}}
    <h1>我是App.vue</h1>
    <button @click="edit">edit</button>
    <button @click="run">推迟两秒执行</button>
  </div>
</template>
<script>
export default {
  //可以访问全局的仓库
  //一般不将state的绑定到data上，因为双向绑定会直接操作data这有悖vuex的规定
  //通常将state绑定在计算属性上
  created(){
    console.log(this.$store.state)
  },
  computed:{
    name(){
      //直接通过计算属性使用state中的数据
      return this.$store.state.name
    }
  },
  
  methods:{
    edit(){
      //通过this.$store.commit('mutations中的方法名',arg)来调用store的mutations中的方法对state进行修改 
      this.$store.commit('changeName','haha')
    },
    run(){
      //通过this.$store.dispatch('actions中的方法名',arg)来调用store的actions中的方法
      this.$store.dispatch('changeName2','xixi')
    }
  }
}
</script>
