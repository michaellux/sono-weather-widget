<template>
  <form class="pb-4" action="">
    <InputText v-model="city" placeholder="Moscow" type="text" class="w-full p-3 border-emerald-600" />
  </form>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useWeatherStore } from '~/stores/weather'

const weatherStore = useWeatherStore()
const city = ref(weatherStore.city)

watch(city, (newValue) => {
  weatherStore.city = newValue
})
</script>

<style lang="scss" scoped>

</style>
