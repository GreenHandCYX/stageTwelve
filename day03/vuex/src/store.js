//引入vue和vuex
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)


//创建Store的实例对象（仓库,类似于全局变量，用来存储公有数据及操作数据的方法）
const Store = new Vuex.Store({
    //状态，存储数据，相当于data，
    //但是所有的组件都可以使用
    state:{
        name:'cyx',
        age:18
    },
    //相当于组件中的methods
    //专门用来处理state中的值的非异步逻辑
    //vue规定使用mutations处理state的数据
    //定义的方法的第一个参数指向state
    mutations:{
        changeName:function(state,arg){
            state.name = arg
        }
    },
    //通常mutations不做异步代码(定时器,ajax请求等异步事件)
    //通过actions来处理异步事件
    //actions的方法中的第一个参数为content指向store,可以通过它调用mutations中的方法
    actions:{//方法名可以与mutations中的一致
        changeName2:function(content,arg){
            setTimeout(function(){
                //调用mutations中的方法
                content.commit('changeName',arg)
            },2000)
        }
    }
})



//将仓库暴露出去
export default Store;