<template>
  <div class="quiz-list">
    <div class="header">
      <h1>Liste des Quiz</h1>
      <div class="user-info">
        <span v-if="username">Bienvenue, {{ username }}</span>
        <button @click="goToHome">Accueil</button>
      </div>
    </div>
    <div v-for="quiz in quizzes" :key="quiz.id" class="quiz-item">
      <h2>{{ quiz.name }}</h2>
      <router-link :to="`/quiz/${quiz.id}`">Commencer</router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { instance as axios } from '../services/axios';

const quizzes = ref([])

const username = ref(localStorage.getItem('username') || '')

const router = useRouter()

const goToHome = () => {
  router.push('/')
}

// Requête pour récupérer les quiz
onMounted(async () => {
  try {
    const response = await axios.get(`/quizz/`);
    quizzes.value = response.data.message;
  } catch (error) {
    console.error("Erreur lors de la récupération du quiz :", error);
  }
})
</script>

<style scoped>
.quiz-list {
  width: 70%;
  margin: 0 auto;
  padding: 2rem;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 10px;
}

.user-info span {
  font-size: 16px;
  color: #34495e;
}

.user-info button {
  padding: 8px 12px;
  font-size: 14px;
  color: #fff;
  background-color: #46178F;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.user-info button:hover {
  opacity: 0.9;
}

.quiz-item {
  margin-bottom: 1rem;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.quiz-item h2 {
  margin: 0 0 0.5rem;
}

.quiz-item a {
  display: inline-block;
  padding: 8px 12px;
  color: white;
  background-color: #46178F;
  text-decoration: none;
  border-radius: 4px;
  transition: background-color 0.3s ease;
}

.quiz-item a:hover {
  opacity: 0.9;
}
</style>
