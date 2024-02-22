<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <h1 class="text-3xl">
    {{ `Weather${ currentCity != '' ? ` in ${currentCity}` : ''}` }}
  </h1>
</template>

<script setup>
import { useWeatherStore } from '~/stores/weather'
const weatherStore = useWeatherStore()
const currentCity = ref('')

watch(() => weatherStore.weatherNow, (newWeather) => {
  currentCity.value = newWeather.city
})

watch(() => weatherStore.error, () => {
  currentCity.value = weatherStore.city !== '' ? weatherStore.city : weatherStore.weatherNow.city
})
</script>

<style lang="scss" scoped>

</style>
