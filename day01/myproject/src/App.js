import Vue from 'vue';
// 组件其实是个构造函数

// 使用Vue.extend()创建一个组件

const App = Vue.extend({
    template: `
    <div>
    <h1>看我看我</h1>
    <button>{{name}}</button>
    </div>
  `,
  data: function () {
    // dd
    return {name: '小明'}
  }
})
export default App;