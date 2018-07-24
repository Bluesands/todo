<template>
  <div class="helper">
    <span class="left">{{unFinishedTodoLength}} items left</span>
    <span class="tabs">
      <span v-for="state in states" :key="state" :class="[state, filter === state ? 'actived' : '']" @click="toggleFilter(state)">
        {{state}}
      </span>
    </span>
    <span class="clear" @click="clearAllCompleted">
      Clear Completed
    </span>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        states: ['all', 'active', 'completed']
      }
    },
    props: {
      filter: {
        type: String,
        required: true
      },
      todos: {
        type: Array,
        required: true
      }
    },
    computed: {
      unFinishedTodoLength() {
        return this.todos.filter(todo => !todo.completed).length;
      }
    },
    methods: {
      clearAllCompleted() {
        this.$emit('clearAllCompleted');
      },
      toggleFilter(state) {
        this.$emit('toggle', state);
      },
    }
  }
</script>

<style lang="stylus" scoped>
  @import '../assets/styles/tabs.stylus';
</style>