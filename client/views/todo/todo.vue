<template>
  <section :class="$style.realApp">
    <input
      type="text"
      :class="$style.addInput"
      autofocus="autofocus"
      placeholder="接下来要去做什么？"
      @keyup.enter="addTodo"
    >
    <item
      v-for="(todo, index) in filteredTodos"
      :todo="todo"
      :key="index"
      @del="deleteTodo"
    />
    <Tabs
      :filter="filter"
      :todos="todos"
      @toggle="toggleFilter"
      @clearAllCompleted="clearAllCompleted"
    />
  </section>
</template>

<script>
  import Item from './item.vue'
  import Tabs from './tabs.vue'

  let id = 0
  export default {
    data () {
      return {
        todos: [],
        filter: 'all'
      }
    },
    computed: {
      filteredTodos () {
        if (this.filter === 'all') {
          return this.todos
        }
        const completed = this.filter === 'completed'
        return this.todos.filter(todo => todo.completed === completed)
      }
    },
    methods: {
      addTodo (e) {
        this.todos.unshift({
          id: id++,
          content: e.target.value.trim(),
          completed: false
        })
        e.target.value = ''
      },
      deleteTodo (id) {
        this.todos.splice(this.todos.findIndex(todo => todo.id === id), 1)
      },
      toggleFilter (state) {
        this.filter = state
      },
      clearAllCompleted () {
        this.todos = this.todos.filter(todo => !todo.completed)
      }
    },
    components: {
      Item,
      Tabs
    }
  }
</script>

<style lang="stylus" module>
  .real-app {
    width: 600px;
    margin: 0 auto;
    box-shadow: 0 0 5px #666;
    border-radius: 4px;
  }

  .add-input {
    position: relative;
    margin: 0;
    width: 100%;
    font-size: 24px;
    font-family: inherit;
    font-weight: inherit;
    line-height: 1.4em;
    border: 0;
    outline: none;
    color: inherit;
    box-sizing: border-box;
    font-smoothing: antialiased;
    padding: 16px 16px 16px 36px;
    border: none;
    border-radius: 4px;
    box-shadow: inset 0 -2px 1px rgba(0, 0, 0, 0.03);
  }

</style>
