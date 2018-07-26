<template>
  <div :id="$style.app">
    <div :id="$style.cover"></div>
    <Header></Header>
    <Todo></Todo>
    <Footer></Footer>
  </div>
</template>

<script>
  import Header from './views/layout/header.vue'
import Footer from './views/layout/footer.jsx'
import Todo from './views/todo/todo.vue'

export default {
    components: {
      Header,
      Footer,
      Todo
    }
  }
</script>

<style lang="stylus" module>
  @import 'assets/styles/app.stylus';
</style>