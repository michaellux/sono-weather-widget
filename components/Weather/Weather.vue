<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div v-if="errorMessage" class="text-red-500">
    <Card class="p-3 my-3 min-h-[170px]">
      <template #title>
        Error
      </template>
      <template #content>
        {{ errorMessage }}
      </template>
    </Card>
  </div>
  <div v-else class="weather">
    <div class="flex gap-3 flex-col">
      <CurrentWeather />
    </div>
    <div class="flex gap-3 flex-row flex-wrap">
      <NextNDaysWeather />
    </div>
  </div>
</template>

<script setup>
import { useWeatherStore } from '~/stores/weather'
const weatherStore = useWeatherStore()
const weatherNow = ref(null)
const errorMessage = ref('')
const fetchWeatherData = async () => {
  await weatherStore.getAllWeatherData(3)

  if (weatherStore.error?.message) {
    if (weatherStore.error.cod === '400') {
      errorMessage.value = ''
    } else {
      errorMessage.value = weatherStore.error.message
    }
  } else {
    errorMessage.value = ''
  }
  weatherStore.isLoading = false
  weatherNow.value = weatherStore.weatherNow
}

onMounted(() => {
  fetchWeatherData()
})

watch(() => weatherStore.city, () => {
  fetchWeatherData()
})
</script>

<style lang="scss" scoped>

</style>
