<template>
    <div class="quiz" v-if="currentQuiz">
        <h1>{{ currentQuiz.name }}</h1>
        <div v-if="!quizCompleted">
            <div class="question">
                <h2>{{ currentQuestion.question }}</h2>
                <div class="options">
                    <button v-for="answer in currentQuestion.answers" :key="answer.answer" @click="selectAnswer(answer)"
                        :class="{ selected: selectedAnswer === answer }">
                        {{ answer.answer }}
                    </button>
                </div>
                <div class="navigation">
                    <p>Question {{ currentQuestionIndex + 1 }} / {{ currentQuiz.questions.length }}</p>
                    <button @click="nextQuestion" :disabled="!selectedAnswer">
                        Suivant
                    </button>
                </div>
            </div>
        </div>
        <div v-else class="results">
            <h2>Résultats</h2>
            <p>Score : {{ score }} / {{ currentQuiz.questions.length }}</p>
            <p>Bonnes réponses : {{ correctAnswers }}</p>
            <p>Mauvaises réponses : {{ incorrectAnswers }}</p>
            <p>Pourcentage de bonnes réponses : {{ correctPercentage.toFixed(2) }}%</p>
            <router-link to="/quizzes">Retour aux quiz</router-link>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { instance as axios } from '../services/axios';

// Gestion des données de la route
const route = useRoute()
const quizId = computed(() => Number(route.params.id))

// Données du quiz et états
const currentQuiz = ref(null)
const currentQuestionIndex = ref(0)
const selectedAnswer = ref(null)
const score = ref(0)
const quizCompleted = ref(false)

// Calcul des statistiques
const correctAnswers = computed(() => score.value)
const incorrectAnswers = computed(() => currentQuiz.value.questions.length - score.value)
const correctPercentage = computed(() => (score.value / currentQuiz.value.questions.length) * 100)


// Récupération des données du quiz
onMounted(async () => {
    try {
        const response = await axios.get(`/quizz/${quizId.value}`);
        currentQuiz.value = response.data.quizz.find(quiz => quiz.id === quizId.value);
        console.log("Quiz trouvé :", currentQuiz.value);
    } catch (error) {
        console.error("Erreur lors de la récupération du quiz :", error);
    }
})

// Question actuelle
const currentQuestion = computed(() =>
    currentQuiz.value.questions[currentQuestionIndex.value]
)

// Gestion des réponses
const selectAnswer = (answer) => {
    selectedAnswer.value = answer
}

const nextQuestion = () => {
    if (selectedAnswer.value.isAnswer) {
        score.value++
    }

    currentQuestionIndex.value++
    selectedAnswer.value = null

    if (currentQuestionIndex.value >= currentQuiz.value.questions.length) {
        quizCompleted.value = true
    }
}
</script>

<style scoped>
.quiz {
    max-width: 600px;
    margin: 0 auto;
    padding: 2rem;
}

.options {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
}

.options button {
    padding: 1rem;
    border-radius: 4px;
    border: 2px solid #46178F;
    background-color: white;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.options .selected {
    background-color: #46178F;
    color: white;
}

.navigation {
    display: flex;
    justify-content: space-between;
    margin-top: 1rem;
}

.navigation button {
    padding: 10px 15px;
    font-size: 16px;
    color: #fff;
    background-color: #46178F;
    border: none;
    border-radius: 20px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.navigation button:hover {
    opacity: 0.9;
}

.results {
    text-align: center;
    margin-top: 2rem;
}

.results p {
    margin: 0.5rem 0;
    font-size: 18px;
}
</style>
