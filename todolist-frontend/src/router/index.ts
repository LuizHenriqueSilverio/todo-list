import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import Login from '../views/LoginView.vue'
import Register from '../views/RegisterView.vue'
import Dashboard from '../views/TodoDashboard.vue'
import { useAuthStore } from '../store/auth'

const routes: RouteRecordRaw[] = [
  { path: '/', redirect: '/todos' },
  { path: '/login', component: Login },
  { path: '/signup', component: Register },
  { path: '/todos', component: Dashboard },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const publicPages = ['/login', '/signup']
  const authRequired = !publicPages.includes(to.path)
  const authStore = useAuthStore()
  if (authRequired && !authStore.isLoggedIn) return next('/login')
  next()
})

export default router