<template>
  <Card v-for="weatherInNday in weatherNextNDays" :key="weatherInNday.index" class="card p-3 my-3">
    <template #title>
      {{ weatherInNday.day }}
    </template>
    <template #content>
      <div class="flex flex-col">
        <ProgressBar v-if="isLoading" mode="indeterminate" />
        <div v-else class="flex items-center space-x-4 flex-wrap">
          <img :src="weatherInNday.weatherIcon" alt="Weather Icon" class="ml-2">
          <div class="weather-info flex gap-[1rem] flex-wrap">
            <div>
              <span class="text-2xl font-bold">Temperature: </span>
              <span class="text-2xl text-nowrap">{{ weatherInNday.temp }}°C</span>
            </div>
            <div>
              <span class="text-2xl font-bold">Humidity: </span>
              <span class="text-2xl text-nowrap">{{ weatherInNday.humidity }}%</span>
            </div>
            <div>
              <span class="text-2xl font-bold">Wind Speed: </span>
              <span class="text-2xl text-nowrap">{{ weatherInNday.windSpeed }} m/s</span>
            </div>
          </div>
        </div>
      </div>
    </template>
  </Card>
</template>

<script setup>
const weatherStore = useWeatherStore()
const weatherNextNDays = ref(weatherStore.weatherNextNDays)
const isLoading = ref(weatherStore.isLoading)
watch(() => weatherStore.isLoading, (newStatus) => {
  isLoading.value = newStatus
})

watch(() => weatherStore.weatherNextNDays, (newWeatherNextNDays) => {
  weatherNextNDays.value = newWeatherNextNDays
})
</script>

<style lang="scss" scoped>
.card {
  flex: 3;
}
</style>
