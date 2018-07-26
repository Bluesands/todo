<template>
  <div :class="$style.helper">
    <span :class="$style.left">{{unFinishedTodoLength}} items left</span>
    <span :class="$style.tabs">
      <span v-for="state in states" :key="state" :class="[$style.state, filter === state ? $style.actived : '']" @click="toggleFilter(state)">
        {{state}}
      </span>
    </span>
    <span :class="$style.clear" @click="clearAllCompleted">
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

<style lang="stylus" module>
  @import '../../assets/styles/tabs.stylus';
</style>