<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useProfissionais } from "@/composables/useProfissionais";
import { useNiveis } from "@/composables/useNiveis";
import type { Nivel } from "@/types/nivel";

const emit = defineEmits<{
  (e: "created"): void;
}>();

const { create } = useProfissionais();
const { list: listNiveis } = useNiveis();

const nome = ref("");
const sexo = ref("");
const dataNascimento = ref("");
const hobby = ref("");
const nivelId = ref<number | null>(null);

const niveis = ref<Nivel[]>([]);
const loading = ref(false);
const error = ref<string | null>(null);

onMounted(async () => {
  niveis.value = await listNiveis();
});

const submit = async () => {
  try {
    loading.value = true;
    error.value = null;

    if (!nivelId.value) {
      error.value = "Selecione um nível";
      return;
    }

    await create({
      nome: nome.value,
      sexo: sexo.value,
      data_nascimento: dataNascimento.value,
      hobby: hobby.value,
      nivelId: nivelId.value,
    });

    nome.value = "";
    sexo.value = "";
    dataNascimento.value = "";
    hobby.value = "";
    nivelId.value = null;

    emit("created");
  } catch {
    error.value = "Erro ao cadastrar profissional";
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <form
    @submit.prevent="submit"
    class="mt-6 p-4 border rounded bg-gray-50 space-y-3"
  >
    <h2 class="font-semibold text-lg">Cadastrar profissional</h2>

    <input v-model="nome" placeholder="Nome" class="input" required />

    <select v-model="sexo" class="input" required>
      <option value="" disabled>Sexo</option>
      <option value="M">Masculino</option>
      <option value="F">Feminino</option>
    </select>

    <input
      v-model="dataNascimento"
      type="date"
      class="input"
      required
    />

    <input v-model="hobby" placeholder="Hobby" class="input" required />

    <select v-model="nivelId" class="input" required>
      <option value="" disabled>Selecione o nível</option>
      <option
        v-for="nivel in niveis"
        :key="nivel.id"
        :value="nivel.id"
      >
        {{ nivel.nivel }}
      </option>
    </select>

    <button
      type="submit"
      class="bg-emerald-600 text-white px-4 py-2 rounded disabled:opacity-50"
      :disabled="loading"
    >
      Adicionar
    </button>

    <p v-if="error" class="text-red-500 text-sm">
      {{ error }}
    </p>
  </form>
</template>

<style scoped>
.input {
  width: 100%;
  border: 1px solid #d1d5db;
  padding: 0.5rem;
  border-radius: 0.3rem;
}
</style>
