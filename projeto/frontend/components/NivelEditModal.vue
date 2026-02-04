<script setup lang="ts">
import type { Nivel } from "~/types/nivel";
import { useNiveis } from "~/composables/useNiveis";

const props = defineProps<{
  modelValue: boolean;
  nivel: Nivel | null;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: boolean): void;
  (e: "saved"): void;
}>();

const { update } = useNiveis();

const form = reactive({
  nivel: "",
});

watch(
  () => props.nivel,
  (n) => {
    if (!n) return;
    form.nivel = n.nivel;
  },
  { immediate: true }
);

const salvar = async () => {
  if (!props.nivel) return;

  try {
    await update(props.nivel.id, {
      nivel: form.nivel,
    });

    emit("saved");
    emit("update:modelValue", false);
  } catch (e) {
    alert("Erro ao editar nível");
  }
};
</script>

<template>
  <BaseModal
    :model-value="modelValue"
    @update:model-value="emit('update:modelValue', $event)"
  >
    <h2 class="text-xl font-bold mb-4">Editar nível</h2>

    <input
      v-model="form.nivel"
      class="w-full border rounded px-3 py-2"
      placeholder="Nome do nível"
    />

    <template #actions>
      <button
        class="px-4 py-2 rounded bg-emerald-600 text-white hover:bg-emerald-700"
        @click="salvar"
      >
        Salvar
      </button>
    </template>
  </BaseModal>
</template>
