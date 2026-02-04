<!-- components/skeletons/NivelSkeleton.vue -->
<template>
  <div class="grid grid-cols-1 gap-4">
    <div
      v-for="i in 4"
      :key="i"
      class="bg-white border border-gray-200 rounded p-4 flex justify-between items-center shadow-sm animate-pulse"
    >
      <div class="h-6 w-1/3 bg-gray-200 rounded"></div>

      <div class="flex gap-2">
        <div class="h-8 w-20 bg-gray-200 rounded"></div>
        <div class="h-8 w-20 bg-gray-200 rounded"></div>
      </div>
    </div>
  </div>
</template>
