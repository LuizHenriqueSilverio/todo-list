<template>
  <div class="container">
    <div class="card">
      <h1 class="title">Login</h1>
      <form @submit.prevent="login">
        <label for="email">Email</label>
        <input type="email" v-model="email" required />

        <label for="password">Senha</label>
        <input type="password" v-model="password" required />

        <button type="submit">Entrar</button>
        <p class="link" @click="goToRegister">Criar conta</p>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import api from '../api'
import { useAuthStore } from '../store/auth'

const email = ref('')
const password = ref('')
const router = useRouter()
const authStore = useAuthStore()

const login = async () => {
  const res = await api.post('/auth/login', { email: email.value, password: password.value })
  authStore.setToken(res.data.access_token)
  router.push('/todos')
}

function goToRegister() {
  router.push('/signup')
}
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
}

.card {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 0 10px #ccc;
  width: 100%;
  max-width: 400px;
}

.title {
  text-align: center;
  margin-bottom: 1.5rem;
}

form {
  display: flex;
  flex-direction: column;
}

input {
  margin-bottom: 1rem;
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  padding: 0.75rem;
  background-color: #333;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #555;
}

.link {
  margin-top: 1rem;
  text-align: center;
  color: #0077cc;
  cursor: pointer;
}

.link:hover {
  text-decoration: underline;
}
</style>