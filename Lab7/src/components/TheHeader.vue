<template>
  <header>
    <input 
      type="text" 
      v-model="store.userInput" 
      class="cityInput" 
      placeholder="ГОРОД ИЛИ ТЕКСТ"
    >
    <RouterLink to="/weather" class="header_button">ПОГОДА</RouterLink>
    <RouterLink to="/cats" class="header_button">КОТИК</RouterLink>
    <RouterLink to="/posts" class="header_button">БЛОГ</RouterLink>
  </header>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { store } from '@/store.js'
</script>

<style scoped>
.header_button {
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
</style>