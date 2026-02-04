<template>
  <div
    class="bg-gray-200 dark:bg-gray-700 rounded animate-pulse"
    :class="className"
  />
</template>

<script setup lang="ts">
defineProps<{
  className?: string
}>()
</script>
