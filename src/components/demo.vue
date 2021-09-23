<template lang="pug">
div {{ msg }}
</template>

<script setup lang="ts">
import { defineProps, onMounted, useAttrs, useSlots } from 'vue'

const props = defineProps({
  msg: {
    type: String,
    default: 111
  }
})
</script>

<style scoped></style>
