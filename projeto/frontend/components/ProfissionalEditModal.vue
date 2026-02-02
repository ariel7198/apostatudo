<script setup lang="ts">
import type { Profissional } from "~/types/profissional";

const props = defineProps<{
  modelValue: boolean;
  profissional: Profissional | null;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: boolean): void;
  (e: "saved"): void;
}>();

const form = reactive({
  nome: "",
  sexo: "",
  hobby: "",
  data_nascimento: "",
});

watch(
  () => props.profissional,
  (p) => {
    if (!p) return;
    form.nome = p.nome;
    form.sexo = p.sexo;
    form.hobby = p.hobby;
    form.data_nascimento = p.data_nascimento
      ? p.data_nascimento.slice(0, 10)
      : "";
  },
  { immediate: true },
);

const { updateProfissional } = useProfissionais();

const update = async () => {
  await updateProfissional(props.profissional!.id, {
    nome: form.nome,
    sexo: form.sexo,
    hobby: form.hobby,
    data_nascimento: form.data_nascimento,
  });

  emit("saved");
  emit("update:modelValue", false);
};
</script>

<template>
  <BaseModal
    :model-value="modelValue"
    @update:model-value="emit('update:modelValue', $event)"
  >
    <h2 class="text-xl font-bold mb-4">Editar profissional</h2>

    <div class="space-y-3">
      <input
        v-model="form.nome"
        class="w-full border rounded px-3 py-2"
        placeholder="Nome"
      />

      <input
        v-model="form.sexo"
        class="w-full border rounded px-3 py-2"
        placeholder="Sexo"
      />

      <input
        v-model="form.hobby"
        class="w-full border rounded px-3 py-2"
        placeholder="Hobby"
      />

      <input
        v-model="form.data_nascimento"
        type="date"
        class="w-full border rounded px-3 py-2"
      />
    </div>

    <template #actions>
      <button
        class="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
        @click="update"
      >
        Salvar
      </button>
    </template>
  </BaseModal>
</template>
