<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <main>
    <div class="main-container">
      <slot name="form" />
      <header class="text-center py-3">
        <WeatherTitle />
      </header>
      <slot name="weather" />
      <div class="cards">
        <div v-if="isLoading">
          Загрузка
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>

</script>

<style lang="scss" scoped>
  .main-container {
    max-width: 85vw;
    margin: auto;
  }
</style>
