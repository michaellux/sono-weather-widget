<template>
  <Card class="p-3 my-3">
    <template #title>
      Now
    </template>
    <template #content>
      <div class="flex flex-col">
        <ProgressBar v-if="isLoading" mode="indeterminate" />
        <div v-else class="flex items-center space-x-4 flex-wrap">
          <img :src="weatherNow.weatherIcon" alt="Weather Icon" class="ml-2">
          <div class="weather-info flex gap-[1rem] flex-wrap">
            <div>
              <span class="text-2xl font-bold">Temperature: </span>
              <span class="text-2xl text-nowrap">{{ weatherNow.temp }}°C</span>
            </div>
            <div>
              <span class="text-2xl font-bold">Humidity: </span>
              <span class="text-2xl text-nowrap">{{ weatherNow.humidity }}%</span>
            </div>
            <div>
              <span class="text-2xl font-bold">Wind Speed: </span>
              <span class="text-2xl text-nowrap">{{ weatherNow.windSpeed }} m/s</span>
            </div>
          </div>
        </div>
      </div>
    </template>
  </Card>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useWeatherStore } from '~/stores/weather'

const weatherStore = useWeatherStore()
const weatherNow = ref(weatherStore.weatherNow)
const isLoading = ref(weatherStore.isLoading)
watch(() => weatherStore.isLoading, (newStatus) => {
  isLoading.value = newStatus
})

watch(() => weatherStore.weatherNow, (newWeather) => {
  weatherNow.value = newWeather
})
</script>

<style lang="scss" scoped>

</style>
