<template>
    <div class="pseudonym-container">
        <h1 class="title-pseudonym">Bienvenue sur Answer</h1>
        <form @submit.prevent="startQuiz" class="input-group">
            <input v-model="username" type="text" placeholder="Entrez votre pseudo" required />
            <button type="submit">Commencer</button>
            <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
        </form>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const username = ref('')
const errorMessage = ref('')
const router = useRouter()

const startQuiz = () => {
    const noSpacesRegex = /^\S+$/

    if (username.value.trim() === '') {
        errorMessage.value = 'Veuillez saisir un pseudonyme.'
        username.value = ''
    } else if (!noSpacesRegex.test(username.value)) {
        errorMessage.value = "Le pseudonyme ne doit pas contenir d'espaces."
        username.value = ''
    } else if (username.value.length > 20) {
        errorMessage.value = 'Veuillez saisir un pseudonyme de 20 caractères maximum.'
        username.value = ''
    } else if (username.value.length < 4) {
        errorMessage.value = 'Veuillez saisir un pseudonyme de 4 caractères minimum.'
        username.value = ''
    } else {
        localStorage.setItem('username', username.value)
        router.push('/quizzes')
        errorMessage.value = ''
    }
}
</script>

<style scoped>
.error-message {
    color: red;
    font-size: 14px;
    margin-top: 10px;
}

.pseudonym-container {
    max-width: 400px;
    margin: 0 auto;
    text-align: center;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    background-color: #f9f9f9;
}

.title-pseudonym {
    padding-bottom: 20px;
    font-size: 1.5rem;
}

.input-group {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
}

.input-group input {
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
    width: 70%;
    outline: none;
    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
    transition: border-color 0.3s ease;
}

.input-group input:focus {
    border-color: #46178F;
}

.input-group button {
    padding: 10px 15px;
    font-size: 16px;
    color: #fff;
    background-color: #46178F;
    border: none;
    border-radius: 20px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.input-group button:hover {
    opacity: 0.9;
}
</style>