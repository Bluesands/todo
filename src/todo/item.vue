<template>
  <div :class="['todo-item', todo.completed ? 'completed' : '']">
    <input type="checkbox" class="toggle" v-model="todo.completed">
    <label>{{ todo.content }}</label>
    <button class="destroy" @click="deleteTodo"></button>
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
      deleteTodo() {
        this.$emit('del', this.todo.id);
      }
    }
  };
</script>

<style lang="stylus" scoped>
  @import '../assets/styles/item.stylus';
</style>