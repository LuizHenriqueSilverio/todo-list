<template>
  <div class="container">
    <div class="header">
      <h2>Minhas Tarefas</h2>
      <button class="btn btn-danger" @click="logout">Sair</button>
    </div>

    <form @submit.prevent="addTodo" class="form">
      <div class="form-group">
        <label for="title">Título</label>
        <input id="title" v-model="newTitle" type="text" class="input" />
      </div>
      <div class="form-group">
        <label for="description">Descrição</label>
        <input id="description" v-model="newDesc" type="text" class="input" />
      </div>
      <div class="form-group">
        <button type="submit" class="btn btn-primary">Adicionar</button>
      </div>
    </form>

    <ul class="todo-list">
      <li v-for="todo in todos" :key="todo.id" class="todo-item">
        <div class="todo-content">
          <input
            type="checkbox"
            v-model="todo.completed"
            @change="toggleDone(todo)"
          />
          <div class="text">
            <span :class="{ completed: todo.completed }" class="title">{{ todo.title }}</span>
            <span class="description">{{ todo.description }}</span>
          </div>
          <button class="btn-icon" @click="deleteTodo(todo.id)">🗑️</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import api from '../api'
import { useAuthStore } from '../store/auth'
import { useRouter } from 'vue-router'

interface Todo {
  id: string
  title: string
  description: string
  completed: boolean
}

const todos = ref<Todo[]>([])
const newTitle = ref('')
const newDesc = ref('')
const authStore = useAuthStore()
const router = useRouter()

const fetchTodos = async () => {
  const res = await api.get('/todos')
  todos.value = res.data
}

const addTodo = async () => {
  if (!newTitle.value) return
  await api.post('/todos', { title: newTitle.value, description: newDesc.value })
  newTitle.value = ''
  newDesc.value = ''
  fetchTodos()
}

const deleteTodo = async (id: string) => {
  await api.delete(`/todos/${id}`)
  fetchTodos()
}

const toggleDone = async (todo: Todo) => {
  await api.patch(`/todos/${todo.id}`, { completed: todo.completed })
}

const logout = () => {
  authStore.logout()
  router.push('/login')
}

onMounted(fetchTodos)
</script>

<style scoped>
body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  background-color: #f1f3f5;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 500px;
  margin-bottom: 30px;
}

.header h2 {
  font-size: 28px;
  font-weight: 700;
  color: #333;
}

.form {
  width: 100%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  background-color: #fff;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
  margin-bottom: 30px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.input {
  padding: 10px 14px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 8px;
  margin-top: 6px;
}

.btn {
  padding: 10px 16px;
  font-size: 15px;
  font-weight: bold;
  border: none;
  cursor: pointer;
  border-radius: 8px;
}

.btn-primary {
  background-color: #007bff;
  color: white;
  transition: background 0.3s;
}

.btn-primary:hover {
  background-color: #0056b3;
}

.btn-danger {
  background-color: #dc3545;
  color: white;
  transition: background 0.3s;
}

.btn-danger:hover {
  background-color: #a71d2a;
}

.todo-list {
  list-style: none;
  padding: 0;
  margin: 0;
  width: 100%;
  max-width: 500px;
}

.todo-item {
  background-color: #fff;
  padding: 15px 20px;
  margin-bottom: 15px;
  border-radius: 10px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  gap: 12px;
}

.todo-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.todo-content .text {
  flex-grow: 1;
  margin-left: 10px;
}

.title {
  display: block;
  font-weight: bold;
  font-size: 18px;
  color: #222;
}

.description {
  display: block;
  font-size: 14px;
  color: #555;
}

.completed {
  text-decoration: line-through;
  color: #aaa;
}

.btn-icon {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: #888;
  transition: color 0.3s;
}

.btn-icon:hover {
  color: #000;
}
</style>
