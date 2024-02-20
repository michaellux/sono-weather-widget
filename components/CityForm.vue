<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <form class="mb-4" action="">
    <InputText v-model="value" placeholder="Moscow" type="text" class="w-full p-3 border-emerald-600" />
  </form>
</template>

<script>
import { ref } from 'vue'

const city = ref('')
</script>

<style lang="scss" scoped>

</style>
