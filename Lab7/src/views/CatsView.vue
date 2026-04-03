<template>
  <div class="card">
    <h2>Случайный котик</h2>
    <button @click="fetchCat" class="header_button">Обновить котика</button>
    <div v-if="catUrl" class="cat-image">
      <img :src="catUrl" alt="Котик" style="max-width: 100%;">
    </div>
    <p v-else>Загрузка...</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const catUrl = ref('')

const fetchCat = async () => {
  const response = await fetch('https://api.thecatapi.com/v1/images/search')
  const data = await response.json()
  catUrl.value = data[0].url
}

onMounted(fetchCat)
</script>