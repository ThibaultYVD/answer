import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import QuizListPage from '../views/QuizListPage.vue'
import QuizPage from '../views/QuizPage.vue'

const routes = [
  { path: '/', component: HomePage },
  { path: '/quizzes', component: QuizListPage },
  { path: '/quiz/:id', component: QuizPage, props: true }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router