export default [
  {
    path: '/',
    redirect: '/app'
  },
  {
    name: 'app',
    path: '/app',
    component: () => import('../views/todo/todo.vue')
  },
  {
    name: 'login',
    path: '/login',
    component: () => import('../views/login/login.vue')
  }
]
