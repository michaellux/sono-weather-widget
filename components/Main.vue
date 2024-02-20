<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <main>
    <div class="main-container">
      <header class="text-center py-3">
        <WeatherTitle />
      </header>
      <slot name="form" />
      <slot name="weather" />
      <div class="cards">
        <div v-if="isLoading">
          Загрузка
        </div>
        <Card v-for="post in posts" :key="post.id" style="width: 25em">
          <template #header>
            <img alt="user header" :src="post.imageSrc">
          </template>
          <template #title>
            <h2>{{ post.title }}</h2>
          </template>
          <template #content>
            <p class="m-0">
              <strong>{{ post.description }}</strong>
            </p>
          </template>
          <template #footer>
            <NuxtLink :to="{ path: `/posts/${post.id}` }">
              <span class="text-sky-400 font-semibold">More</span>
            </NuxtLink>
          </template>
        </Card>
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
