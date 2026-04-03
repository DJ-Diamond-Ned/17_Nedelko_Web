<template>
  <div class="card">
    <div v-if="loading" class="loading">ЗАГРУЗКА...</div>
    <div v-else-if="weatherData">
      <h2>{{ weatherData.city.toUpperCase() }}</h2>
      <p>ГРАДУСЫ: {{ weatherData.temp }}°C</p>
      <p>НЕБО: {{ weatherData.condition.toUpperCase() }}</p>
    </div>
    <div v-else class="card">Введите город и нажмите "Погода" (или ОШИБКА)</div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { store } from '@/store.js'

const weatherData = ref(null)
const loading = ref(false)

const fetchWeather = async () => {
  const city = store.userInput.trim() || 'Moscow'
  loading.value = true
  try {
    const res = await fetch(`https://wttr.in/${city}?format=j1&lang=ru`)
    const data = await res.json()
    weatherData.value = {
      city: city,
      temp: data.current_condition[0].temp_C,
      condition: data.current_condition[0].lang_ru[0].value
    }
  } catch (e) {
    weatherData.value = null
    alert("ОШИБКА ГОРОДА")
  } finally {
    loading.value = false
  }
}

onMounted(fetchWeather)
watch(() => store.userInput, () => fetchWeather())
</script>