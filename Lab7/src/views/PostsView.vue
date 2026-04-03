<template>
  <div class="blog-container">
    <div class="card">
      <h2 class="blog-main-title">МОЙ БЛОГ</h2>
      <button class="header_button" @click="createPost">+ СОЗДАТЬ ПОСТ</button>
      <p class="helper-text">ДЛЯ СОЗДАНИЯ ИЛИ ИЗМЕНЕНИЯ ИСПОЛЬЗУЙТЕ ПОЛЕ В ШАПКЕ</p>
    </div>

    <div v-if="loading" class="loading">ЗАГРУЗКА...</div>

    <div v-if="localPosts.length === 0" class="card">СПИСОК ПУСТ</div>

    <div v-for="post in localPosts" :key="post.id" class="card" style="margin-bottom: 15px;">
      <h3 class="post-title">{{ post.title.toUpperCase() }}</h3>
      <div class="card-actions">
        <button class="header_button btn-small btn-update" @click="updatePost(post.id)">ИЗМЕНИТЬ (PUT)</button>
        <button class="header_button btn-small btn-delete" @click="deletePost(post.id)">УДАЛИТЬ (DEL)</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { store } from '@/store.js'

const localPosts = ref([])
const loading = ref(false)

const createPost = async () => {
  const title = store.userInput.trim() || "БЕЗ НАЗВАНИЯ"
  loading.value = true
  try {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: JSON.stringify({ title, userId: 1 }),
      headers: { 'Content-type': 'application/json' }
    })
    const newPost = await res.json()
    newPost.id = Date.now()
    localPosts.value.unshift(newPost)
    store.userInput = ""
  } finally {
    loading.value = false
  }
}

const updatePost = async (id) => {
  if (!store.userInput) return alert("СНАЧАЛА ВВЕДИТЕ ТЕКСТ В ПОЛЕ В ШАПКЕ!")
  loading.value = true
  localPosts.value = localPosts.value.map(p => p.id === id ? { ...p, title: store.userInput } : p)
  loading.value = false
}

const deletePost = async (id) => {
  loading.value = true
  localPosts.value = localPosts.value.filter(p => p.id !== id)
  loading.value = false
}
</script>