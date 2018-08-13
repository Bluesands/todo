<template>
  <div>
    <ul>
      <li><router-link :to="{name: 'app'}">app</router-link></li>
      <li><router-link to="/login">login</router-link></li>
    </ul>
    {{ title }}
  </div>
</template>

<script>
  export default {
    data () {
      return {
        title: 'This is Login Page!'
      }
    }
  }
</script>


<style lang="stylus" scoped>


</style>
