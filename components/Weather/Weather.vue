<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="weather flex gap-3 flex-col">
    <CurrentWeather />
    <NextNDaysWeather />
  </div>
</template>

<script setup>
// import { useWeatherStore } from '~/stores/weather'
const weather = ref([])
const isLoading = ref(true)
onMounted(async () => {
  // TODO get data from store
  /* const weatherStore = usePostStore()
  await weatherStore.getAllWeatherData();
  isLoading.value = false */
})
</script>

<style lang="scss" scoped>

</style>
