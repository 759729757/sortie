<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <table>
      <tr>
        <td>书名</td><td>作者</td><td>ISBN</td><td>页数</td><td>装订</td><td>出版日期</td>
        <td>出版社</td>
      </tr>
      <tr v-for="item in books">
        <td>
          {{item.name}}
        </td>
        <td>
          {{item.author}}
        </td>
        <td>
          {{item.ISBN}}
        </td>
        <td>
          {{item.ISBN}}
        </td>
        <td>
          {{item.pages}}
        </td>
        <td>
          {{item.pressTime}}
        </td>
        <td>
          {{item.press}}
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
  import { books } from '../api'

  export default {
  name: 'HelloWorld',
  data () {
    return {
      books:[],
      msg: 'Welcome to Your Vue.js App'
    }
  },
    mounted(){
      books().then(res=>{
        console.log(res);
        this.books = res.books
      })
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
