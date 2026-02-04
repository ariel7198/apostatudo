<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div
      v-for="i in 6"
      :key="i"
      class="bg-white border border-gray-200 rounded-lg p-4 space-y-3 animate-pulse"
    >
      <!-- Header -->
      <div class="flex justify-between items-start">
        <div class="space-y-2">
          <div class="h-4 w-32 bg-gray-200 rounded"></div>
          <div class="h-3 w-40 bg-gray-100 rounded"></div>
        </div>

        <div class="h-8 w-24 bg-gray-200 rounded"></div>
      </div>

      <!-- Body -->
      <div class="h-3 w-48 bg-gray-100 rounded"></div>

      <!-- Actions -->
      <div class="flex justify-end gap-2 pt-2">
        <div class="h-8 w-20 bg-gray-200 rounded"></div>
        <div class="h-8 w-20 bg-gray-200 rounded"></div>
      </div>
    </div>
  </div>
</template>