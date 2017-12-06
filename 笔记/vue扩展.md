# Object.defineProperty

Object.defineProperty可以用来监听属性变化，做到属性代理



### 定义属性有以下参数:

- 参数1：指明要定义的属性对象,Object
- 参数2：指明要定义的属性是什么,string
- 参数3：一个对象内部有get方法和set方法，分别用来获取和设置值

### 调用这个方法后:

访问对象的属性时相当于调用get方法,赋值时相当于调用set方法

```javascript
    var obj ={
    }
    //可用来定义对象的属性的处理方式
    //参数一:指明对象
    //参数二:指明属性
    //参数三:控制该对象属性的一个对象,内部有get方法和set方法，分别用来获取和设置值
    Object.defineProperty(obj,'msg',{
        get:function(){
            //访问obj的msg属性时就相当于调用此方法
            console.log('我是用来获取的')
            return '998'
        },
        set:function(arg){
            //赋值时相当于调用该方法
            console.log('我是用来赋值的')
        }
    })
    console.log(obj.msg);
    obj.msg = 12;
```





# 属性代理:（监听js某个对象的属性变化）

- 假设用两个对象obj,obj2
- 如果操作:0bj2.name=ss相当于操作obj.name=ss，这样称obj2代理了obj

```javascript
 var obj1 = {
    msg: '哈哈，我真的是A'
   }
   var obj2 = {}
   //属性代理:通过对obj2属性的监听实现对obj1属性的监听
   Object.defineProperty(obj2,'msg',{
       get:function(){
           //通过get方法间接的访问obj1的属性
           return obj1.msg
       },
       set:function(arg){
             //通过set方法间接的设置obj1的属性
            obj1.msg = arg;
       }
       
   })
   console.log(obj1.msg)//在没调用obj2的set方法前直接访问obj1.msg并不会有什么影响
   console.log(obj2.msg) // console.log(get())
    obj2.msg = 998 // set(998)
    console.log(obj1.msg)//此时obj1已改变
```



![snipaste_20171126_093006](.\img\snipaste_20171126_093006.jpg)











### 在vue中其实是使用vue实例/组件的实例代理data中的属性	







# 双向绑定的原理：

- 监听数据的变化(Object.defineProperty和属性代理)，单向数据绑定

- 监听页面值的变化(oninput)

  ```html
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <title>Document</title>
  </head>
  <body>
      <input type="text" v-model="msg">
      <script>
      // 原理:1.模型到视图:用defineProperty配合属性代理监听数据的变化
      var data = {
          msg: '哈哈',
          name: '圭', // for in
        }
        var obj = {}
        Object.defineProperty(obj,'msg',{
            get:function(){
                return data.msg
            },
            set:function(arg){
                data.msg = arg
                var inp = document.querySelector('[v-model="msg"]')
                inp.value = data.msg
                console.log(data.msg)
            }
        })
              //2.视图到模型，事件监听(这里用Input做监听因为change事件触发需要值改变并且失焦)
      var inp = document.querySelector('[v-model="msg"]')
      inp.oninput = function(e){
          var val = e.target.value;
          obj.msg = val;
      }
     
      </script>
  </body>
  </html>
  ```

  ​

  ​





# onchange事件的触发条件:

- 值必须改变
- 失去焦点
- 所以一般使用oninput代替





# vue的特点:

- 双向数据绑定
- 组件化(传值)
- 路由









除了以动画为主的项目，都可以使用vue来实现（特别适合做管理系统）



# 在js中创建组件（这是原理,可以修改为.vue组件）

组件其实是个构造函数

使用Vue.extend()创建一个组件







# npm缓存安装

npm安装时  后面加--cache-min 9999999可以在下载时先从缓存中下载，数值尽可能大就可以









# vue-cli

除了自己搭建外还可以使用脚手架vue-cli自动生成文件夹结构

vue-cli可以自动生成vue的项目结构

下载工具:`npm i vue-cli -g`

使用工具:在需要创建项目的文件夹中打开cmd,输入:

`vue webpack 项目名字`

`vue init webpack 项目名字`













# js标准代码风格

https://standardjs.com/readme-zhcn.html









# 前后端分离的模型

前后端分工，不合在一起书写代码

后端只需要允许前端给他们发送数据和请求数据即可，前端再将数据渲染成html

(ajax:请求地址;请求参数)

![工作流程](.\img\工作流程.png)



# 路由vue-router:



## 路由分类:

普通路由,动态路由(传参/:),嵌套路由(children)



## Vue.use(VueRouter)

Vue.use(VueRouter)会给每个路由规则中的组件实例添加`this.$router`和`this.$route`



## 路由的实际作用

a.监听地址栏锚点的变化的事件:window.onhashchange=function(){}

b.会在事件中找到与锚点值匹配的组件,把组件的模板插入到dom指定位置

需要开发者指定什么锚点匹配什么组件

routes:[

]

以及插入DOM中的位置

##### 注意:需要在vue实例中启用路由

new Vue({router})



## 路由导航

//两种形式

//标签(命名路由)`<router-link :to="{name:'',params:{id:}}"></router-link>`

//js方法触发this.$router.push({name:'',params:{id:}})



## 嵌套路由:

在父路由中设置children:[name:'',path:'',component:'']子路由

![组件嵌套路由](.\img\组件嵌套路由.png)









# 如何开始一个vue的项目结构

1.基础的一些文件要创建

至少一个html,一个js

npm,bower,yarn...cdn

> a.新建index.html
>
> b.新建index.js
>
> c.新建package.json（npm init 输入的名字不能是大写或汉字）
>
> d.新建webpack.config.js这个文件进行配置https://doc.webpack-china.org/concepts/



2.下载第一步所使用的全部第三方包

> a.工具类(devDependencies):webpack,css-loader
>
> b.项目中要引入的这类(dependencies):vue,vue-router,axios



3.将比较长的命令配置到package.json文件中

比如:webpack-dev-server --hot --open --port 8888 --progress

```json
{
  //package.json
  "scripts":{
    "dev":"webpack-dev-server --hot --open --port 8888 --progress"
  }
}
```



4.补充vue的基本代码（这一步才真正在项目中添加一个vue的代码）

> a.需要在index.html添加一个div用来让vue插入组件的模板
>
> b.在src中新建一个名为App.vue的组件，写一些基本的代码
>
> c.在index.js文件中
>
> ​	引入vue和App.vue组件，并初始化vue的实例
>
> ```javascript
> import Vue from 'vue'
> import App from './App.vue'
> const vm = new Vue({
>   el:'#box',
>   //这里render是利用App组件的内容替换了#box中的内容
>   render:function(handle){
>       handle(App)
>   }
> })
> ```





接下来的步骤要在项目中加路由

5.加入路由

> a.在src中新建一个router.js专门用来配置路由
>
> b.在router.js中引入vue-router 和 vue
>
> c.在router.js中使用Vue.use(VueRouter)
>
> d.进行路由规则的配置(const router = new VueRouter({}))
>
> ​	//普通路由/动态路由/嵌套路由
>
> e.在router.js暴露配置的路由对象
>
> f.在index.js中启用路由`import router from './router.js';   new Vue({router}) `
>
> g.在App.vue组件中使用router-view来指定路由规则的组件要插入的位置





**第6步开始就是实现项目功能了，前5步都是固定的代码**

6.分析项目中的路由该怎么配置

> 如果知道项目中要使用多少条路由规则!(无法知道), 我们把一眼能看出来的先配置上!
>
> a. 登陆路由
>
> ​       a1, 每一个路由规则会对应一个组件, 组件一定要创建好 (SignIn.vue)
>
> ​       a2, 一个路由规则`{name, path, component: SignIn.vue}`
>
> b. 首页路由
> ​      b1, 创建好(Home.vue)组件
>
> ​      b2, 配置好路由规则(name, path, component: Home.vue)









# http请求谓词:

get,post,put,delete









# 让每一个组件不需要引入axios就可以直接使用

给每个vue组件实例添加axios的属性

Vue.use(function(Vue){

//这个函数可以在Vue的原型上挂载方法和属性，挂载后所有组件实例便都可以使用这些方法和属性了

//添加到Vue的原型上的属性，会被底层统一添加给每一个vue组件的实例上。

// 这里的$只是一个普通字符

```js
//在每一个组件实例上挂载一个axios属性,将axios对象挂载上去
Vue.use(function(Vue){
//这个函数可以在Vue的原型上挂载方法和属性，挂载后所有组件实例便都可以使用这些方法和属性了
//添加到Vue的原型上的属性，会被底层统一添加给每一个vue组件的实例上。
// 这里的$只是一个普通字符
Vue.prototype.$axios=axios
})
```



})













# cors跨域问题:

### 问题阐释

- ![cors跨域补充](.\img\cors跨域补充.png)cors(跨域资源共享)跨域发送json格式的数据时会导致两次请求

- 第一次：询问服务器是否允许发送请求

- 第二次:发登录请求

  ​

### 简单请求与非简单请求

- 'key=val&key2=val2'格式的请求是简单请求

- json格式的请求是非简单请求

  ​



### axios和jquery发送post请求的区别

- jquery的请求头content-type:'application/x-www-form-urlencoded'数据格式是'a=1&b=2'
- axios的请求头content-type:'application/json'数据格式是'{a:1,b:2}'







# js引用传值与普通传值的区别

```javascript
function hello (fn) {

  var obj = { name: '小晶晶', age: 17}

  var arr = [1, 2, 3, 4]

  fn(obj, arr)

  console.log(obj.name, arr[0])

}

hello(function (a, b) {  a.name = '小月' ; b[0] = 10})

hello(function (a, b) {  a = {name: '小月月', age: 19}; b=[10, 1,2,3,5]})

// 输出什么


```



![1.js小练习分析](.\img\1.js小练习分析.png)





在js中undefined和null不能.属性,会报错









# cors跨域时浏览器默认不会发送cookie给这个跨域服务器的

，需要设置为发送这个cookie以发给后台进行登录验证

### 原生：

> var xhr = XMLHttpRequest/
>
> xhr.withCredentials=true





### axios:

##### 统一的让每一次ajax请求的withCredentials为true

#### axios拦截器，拦截请求的,对请求作处理

```js

//在发送cors跨域请求时默认不会将cookie携带在请求头中发给服务端
//而登录验证需要将存SESSIONID的cookie发给服务端进行验证
//对axios的请求拦截进行设置withCredentails=true，使得每次请求中都会自带一个cookie
axios.interceptors.request.use(config=>{
    //每次axios发送请求时这个方法都会执行
    //config指对axios请求进行配置
    config.withCredentials = true;//每次请求都会自带一个cookie
    return config
})
```



#### axios拦截器，拦截响应的,对响应作处理

```js
axios.interceptord.response.use(function(res){
	return res;//必须返回res，否则请求结束的then中不会返回任何数据
})
```







# FormData对象的.append(key,val)存储的是一个键值对的对象







# 图片src中的网络地址可以不携带任何后缀也能







# 组件传值

1.props

2.busEvent也可以在父子或多代之间传值

  $emit也可以不传值只传一个标识

  $on

3.vuex







# es6箭头函数中的this默认指向父元素





# js中的bool类型转换

![Snipaste_2017-11-27_16-54-06](.\img\Snipaste_2017-11-27_16-54-06.png)





# web格式图片加载时会先模糊加载，而传统图片是从上到下加载









# vue城市选择表单联动

```html
<!-- 省 -->
<select id="pro" v-model="nowP">
  <option :value="province.number" v-for="province in region.p['000000']">{{province.name}}</option>
</select>
<!-- 市 -->
<select id="pro" v-model="nowC">
  <option :value="city.number" v-for="city in region.c[nowP]">{{city.name}}</option>
</select>
<!-- 区 -->
<select id="pro" v-model="nowD">
  <option :value="district.number" v-for="district in region.d[nowC]">{{district.name}}</option>
</select>

```







# Session验证登录

![2.分析登陆原理及过程，退出登陆如何实现](.\img\2.分析登陆原理及过程，退出登陆如何实现.png)













`$emit`和`$on`的实现原理

![03.$emit, $on分析](.\img\03.$emit, $on分析.jpg)







# 函数参数的解构赋值（注在箭头函数中使用时不能省略小括号）

function abc({name,age}){
}

abc({name:'cyx',age:18})









# computed与method的区别

computed在js中调用时不用加括号this.computed

监听某个属性时属性修改了会调用两次(缓存造成的)









# ref的使用,在父子组件之间传递数据

在父组件中给子组件的模板标签中加ref代表子组件的实例对象，这样就可以访问子组件实例的属性及方法了，也可以给子组件传值了

```vue
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <div id="app">

    </div>
    <script src="./node_modules/vue/dist/vue.js"></script>
    <script>
        //通过extend定义全局组件
        var Son = Vue.extend({
            data(){
                return {
                    msg:'我是Son的msg'
                }
            },
            template:
            `<div>
                <h1>我是Son</h1>
            </div>`,
            methods:{
                hello(arg){
                    alert(arg)
                }
            }
        })
        var App = Vue.extend({
            data(){
                return {
                    msg:'我是App的msg'
                }
            },
            components:{
                Son
            },
            template:
            `<div>
                <h1>我是App</h1>
                <Son ref="mySon"></Son>
                <button @click="test">发给Son</button>
            </div>`,
            mounted(){
                //这里通过ref绑定的mySon是Son组件的一个实例,因此也就可以使用Son组件的方法和属性了
                alert(this.$refs.mySon.msg) 
            },
            methods:{
                test(){
                     //同时也能通过这个实例对象的方法的参数也能为子组件传值了
                     this.$refs.mySon.hello(this.msg)
                }
            }
        })
      
        const vm = new Vue({
            el:'#app',
            render:h=>h(App)
        })
    </script>
</body>
</html>
```















# bind与apply、call最大的区别就是：bind不会立即调用，其他两个会立即调用











# Vue.extend()也可以设置一个全局的组件

```js
 var App = Vue.extend({
            data(){
                return {
                    msg:'我是App的msg'
                }
            },
            template:
            `<div>
                <h1>我是App</h1>
            </div>`,
            mounted(){
                
            }
        })
```







# vue中v-on绑定事件时可以直接在v-on中写逻辑判断表达式





# 页面搜索功能的实现:

每次搜索都请求后台

先预加载所有的数据到本地然后搜索从本地查找即可

先在已有数据里面搜索，不够再到服务器请求







# nprogress

http://ricostacruz.com/nprogress/





# js数组的扩展方法:

### filter

js的filter方法可以返回数组操作返回值为true的组成的数组 

```js
filter原理  

var teachers = [
            { name: '小明', age: 18, sex: '男' },
            { name: '小月', age: 18, sex: '女' },
            { name: '小天', age: 18, sex: '女' },
            { name: '小白', age: 18, sex: '男' },
        ]
        Array.prototype.myFilter = function(callback){
            var arr = [];
            for (var i = 0; i < this.length; i++) {
                if(callback(this[i],i)){
                    arr.push(this[i])
                }
            }
            return arr;
        }

        var arr = teachers.myFilter(function(ele,index){
            if(ele.sex == '女') return true;
            return false
        })
        console.log(arr)
```





### find()

 `**find()**` 方法返回数组中满足提供的测试函数的第一个元素的值。否则返回 [`undefined`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/undefined)。

```
function isBigEnough(element) {
  return element >= 15;
}

[12, 5, 8, 130, 44].find(isBigEnough); // 130
```



### reduce

`**reduce()**` 方法对累加器和数组中的每个元素（从左到右）应用一个函数，将其减少为单个值。

```
var total = [0, 1, 2, 3].reduce(function(sum, value) {
  return sum + value;
}, 0);
// total is 6

var flattened = [[0, 1], [2, 3], [4, 5]].reduce(function(a, b) {
  return a.concat(b);
}, []);
// flattened is [0, 1, 2, 3, 4, 5]
```



### map返回操作返回值组成的数组







# vuex

### 概念：

> 把数据放到全局变量中,全局变量会导致变量污染
>
> 
>
> vuex中也提供了一个类似全局变量的东西来存储数据,vuex中提供了一个构造函数Store
>
> 
>
> Store(所有组件都可以用)包含数据(状态),也包含修改数据的方法(通常另放到一个包中)

```js
import Vuex from 'vuex'

const store = new Vuex.Store({

	state:{

	name:'cyx',

	age:18

	}

})

store.state.name
```



### 注意:

> 在组件中通过store引入即可在当前组件中使用this.$state
>
> 
>
> Vuex不推荐在store之外的地方修改state中的数据，如果要修改一定要在mutations中修改，所以也就不推荐将state的数据放在data中
>
> 规定只要是在state中的数据,都通过计算属性来在组件中使用，因为双向数据绑定可以直接修改data中的值
>
> 
>
> 在组件中通过this.$store.commit()调用mutation,第一个参数为mutation中的方法，之后的参数会追加在mutation的方法的state参数之后







### 总结:数据和修改数据的方法写在Store中

取数据：this.$store.state   （建议配合计算属性去取，并在组件中呈现）

改数据:this.$store.commit('mutations中定义的方法名',其他参数)









### actions与mutations的关联:

//actions和mutations差不多都是用来定义修改state的方法的

//约定:     mutations中不要写异步代码(setTimeout)

​		把异步代码写在actions中，然后在action中调用mutations的方法,

actions通过this.$store.dispatch(actions中的方法名','小天')

actions可以让事件异步执行

```js
var store = Vuex.Store({
  state:{
    name:'cyx'
  },
  mutations:{
    changeName(state,arg){
      //不建议在这里执行定时器
      state.name = arg
    }
  },
  
 actions:{
   //与mutations方法可以同名但是并不是一样的
   changeName2(content,arg){
     //content相当于store，可以调用mutations方法
     setTimeout(function(){
       content.commit('changeName',arg)
     },300)
   }
 }
  
})






this.$state.dispatch('changeName2','xiao')
```









### vuex的名词

store(仓库,包含下面的所有东西)

state(状态),
mutations(定义修改状态的方法)
commit (调用mutations中定义的方法)
actions (写异步代码，并在异步代码中调用commit)
dispatch (调用actions中定义的方法)

![vuex2](.\img\vuex2.png)





### 代码

store.js

```js
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
```





index.js

```js
import Vue from 'vue'
import App from './App.vue'


//引入全局的仓库
import store from './store'


const vm = new Vue({
  el: '#box',
  store:store,//注册后所有组件就都有一个this.$store属性了
  render: function (handler) {
    return handler(App)
  }
})
```







App.vue

```vue
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
```











# history.pushState(null,null,'/test')

可以达到类似hash变化的效果(更改地址栏而不刷新页面),这样就不需要在地址栏加#

在路由监听时需设置mode:'history'

```js
new VueRouter({
    mode: 'history',
    routes: [
        { path: '*', component: NotFoundComponent }
    ]
})
```







# 在路由中设置404页面或其他不存在的路由时跳转到一个给定的页面

`{name:'index',path:'*',redirect:'/home'}`

`{name:'index',path:'*',component:404组件}`









# vue脚手架设置读取路径别名

vue脚手架在webpack.base.config.js设置文件读取路径的别名,这样在引用common文件内容的时候就可以直接通过common/而不需要考虑前面的路径问题了

在css中通过`@import '~common'`也就可以找到别名所指路径

![Snipaste_2017-12-04_21-25-03](.\img\Snipaste_2017-12-04_21-25-03.png)











# 项目扩展

babel-runtime用于将es6语法转为es5

fast-click解决移动端click点击事件的延迟

​	使用时需要`import 'fastclick'`引入

​	然后`fastclick.attact(document.body)`

babel-polyfill对es6的api(如promise)进行转义以使用

​	使用时需要在顶部引入`import 'babel-polyfill'`引入



![Snipaste_2017-12-04_21-47-50](.\img\Snipaste_2017-12-04_21-47-50.png)

















# router-link扩展

`<router-link tag='div'  class='active' to='/'>`

其中tag属性指router-link要渲染为什么标签,默认不写为a标签

class属性指点击当前导航时该导航的样式







# 引入组件的扩展

*组件名首字母应大写，并且使用时用-处理驼峰命名*

`import MHeader from 'components/m-header/m-header'`

`<m-header></m-header>`