<template>
  <h2>Forecast on next 3 days</h2>
  <Card v-for="post in posts" :key="post.id" style="width: 25em">
    <template #title>
      
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
</template>

<script setup>

</script>

<style lang="scss" scoped>

</style>
