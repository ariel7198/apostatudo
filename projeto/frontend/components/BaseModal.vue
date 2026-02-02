<script setup lang="ts">
defineProps<{
  modelValue: boolean;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: boolean): void;
}>();

const close = () => emit("update:modelValue", false);
</script>

<template>
  <Teleport to="body">
    <div
      v-if="modelValue"
      class="fixed inset-0 z-50 flex items-center justify-center"
    >
      <!-- overlay -->
      <div class="absolute inset-0 bg-black/50" @click="close" />

      <!-- modal -->
      <div
        class="relative bg-white rounded-lg shadow-lg w-full max-w-lg p-6 z-10"
      >
        <slot />

        <div class="mt-6 flex justify-end gap-2">
          <button
            class="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
            @click="close"
          >
            Cancelar
          </button>

          <slot name="actions" />
        </div>
      </div>
    </div>
  </Teleport>
</template>
