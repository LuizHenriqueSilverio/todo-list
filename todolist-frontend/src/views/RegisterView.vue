<template>
  <div class="container">
    <div class="card">
      <h1 class="title">Criar Conta</h1>
      <form @submit.prevent="register">
        <label for="email">Email</label>
        <input type="email" v-model="email" required />

        <label for="password">Senha</label>
        <input type="password" v-model="password" required />

        <label for="confirmPassword">Confirmar Senha</label>
        <input type="password" v-model="confirmPassword" required />

        <button type="submit">Registrar</button>
        <p class="link" @click="goToLogin">Já tem conta? Entrar</p>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import api from '../api'

const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const router = useRouter()

const register = async () => {
  if (password.value !== confirmPassword.value) {
    alert('As senhas não coincidem.')
    return
  }

  try {
    await api.post('/auth/signup', {
      email: email.value,
      password: password.value,
    })
    alert('Conta criada com sucesso!')
    router.push('/login')
  } catch (error) {
    alert('Erro ao registrar. Tente novamente.')
    console.error(error)
  }
}

const goToLogin = () => {
  router.push('/login')
}

</script>
