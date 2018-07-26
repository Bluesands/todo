<template>
  <div :class="[$style.todoItem, todo.completed ? $style.completed : '']">
    <input type="checkbox" :class="$style.toggle" v-model="todo.completed">
    <label>{{ todo.content }}</label>
    <button :class="$style.destroy" @click="deleteTodo"></button>
  </div>
</template>

<script>
  export default {
    props: {
      todo: {
        todo: Object,
        required: true
      }
    },
    methods: {
      deleteTodo () {
        this.$emit('del', this.todo.id)
      }
    }
  }
</script>

<style lang="stylus" module>
  @import '../../assets/styles/item.stylus';
</style>