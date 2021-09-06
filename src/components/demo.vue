<template>
  <div>{{ msg }}</div>
</template>

<script setup lang="ts">
import { defineProps, onMounted, ref, toRef } from 'vue'

const props = defineProps({
  msg: {
    type: String,
    default: 111
  }
})
</script>

<style scoped></style>
