<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useProfissionais } from "@/composables/useProfissionais";
import { useNiveis } from "@/composables/useNiveis";
import type { Nivel } from "@/types/nivel";

const props = defineProps<{
  modelValue: boolean;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: boolean): void;
  (e: "created"): void;
}>();

const { create } = useProfissionais();
const { list: listNiveis } = useNiveis();

const form = reactive({
  nome: "",
  sexo: "",
  data_nascimento: "",
  hobby: "",
  nivelId: null as number | null,
});

const niveis = ref<Nivel[]>([]);
const loading = ref(false);
const error = ref<string | null>(null);

onMounted(async () => {
  niveis.value = await listNiveis();
});

const limparForm = () => {
  form.nome = "";
  form.sexo = "";
  form.data_nascimento = "";
  form.hobby = "";
  form.nivelId = null;
};

const salvar = async () => {
  try {
    loading.value = true;
    error.value = null;

    if (!form.nivelId) {
      error.value = "Selecione um nível";
      return;
    }

    const nivelId = form.nivelId;

    await create({
      nome: form.nome,
      sexo: form.sexo,
      data_nascimento: form.data_nascimento,
      hobby: form.hobby,
      nivelId,
    });

    limparForm();
    emit("created");
    emit("update:modelValue", false);
  } catch {
    error.value = "Erro ao cadastrar profissional";
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <BaseModal
    :model-value="modelValue"
    @update:model-value="emit('update:modelValue', $event)"
  >
    <h2 class="text-xl font-bold mb-4">Cadastrar profissional</h2>

    <div class="space-y-3">
      <label class="block font-medium">Nome*</label>
      <input
        v-model="form.nome"
        class="w-full border rounded px-3 py-2"
        placeholder="Nome"
        required
      />
      <label class="block font-medium">Sexo*</label>
      <select
        v-model="form.sexo"
        class="w-full border rounded px-3 py-2"
        required
      >
        <option value="M">Masculino</option>
        <option value="F">Feminino</option>
      </select>

      <label class="block font-medium">Data de Nascimento*</label>
      <input
        v-model="form.data_nascimento"
        type="date"
        class="w-full border rounded px-3 py-2"
        required
      />

      <label class="block">Hobby*</label>
      <input
        v-model="form.hobby"
        class="w-full border rounded px-3 py-2"
        placeholder="Hobby"
        required
      />

      <label class="block font-medium">Nível*</label>
      <select
        v-model="form.nivelId"
        class="w-full border rounded px-3 py-2"
        required
      >
        <option value="" disabled>Selecione o nível</option>
        <option v-for="nivel in niveis" :key="nivel.id" :value="nivel.id">
          {{ nivel.nivel }}
        </option>
      </select>

      <p v-if="error" class="text-red-500 text-sm">
        {{ error }}
      </p>
    </div>

    <template #actions>
      <button
        class="px-4 py-2 rounded bg-emerald-600 text-white disabled:opacity-50"
        :disabled="loading"
        @click="salvar"
      >
        Salvar
      </button>
    </template>
  </BaseModal>
</template>
