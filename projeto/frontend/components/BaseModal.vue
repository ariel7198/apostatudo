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
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      @click.self="close"
    >
      <div
        class="bg-white rounded-lg shadow-lg w-full max-w-lg mx-4 p-6"
      >
        <!-- conteúdo -->
        <slot />

        <!-- ações -->
        <div class="mt-6 flex justify-end gap-2">
          <button
            class="px-4 py-2 text-sm rounded border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
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
