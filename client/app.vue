<template>
  <div :id="$style.app">
    <div :id="$style.cover"></div>
    <Header></Header>
    <router-view></router-view>
    <Footer></Footer>
  </div>
</template>

<script>
  import Header from './views/layout/header.vue'
import Footer from './views/layout/footer.jsx'

export default {
    components: {
      Header,
      Footer
    }
  }
</script>

<style lang="stylus" module>
  @import 'assets/styles/app.stylus';
</style>
