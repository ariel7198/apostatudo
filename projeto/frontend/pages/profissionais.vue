<script setup lang="ts">
import { useProfissionais } from "~/composables/useProfissionais";
import type { Profissional } from "~/types/profissional";
import { useNiveis } from "~/composables/useNiveis";
import type { Nivel } from "~/types/nivel";

const { list, del } = useProfissionais();
const { list: listNiveis } = useNiveis();
const { updateNivel } = useProfissionais();

const status = ref<Record<number, "loading" | "success" | "error" | null>>({});

const profissionalSelecionado = ref<Profissional | null>(null);
const modalEditAberto = ref(false);
const modalCreateAberto = ref(false);

const editarProfissional = (profissional: Profissional) => {
  profissionalSelecionado.value = { ...profissional };
  modalEditAberto.value = true;
};

const alterarNivel = async (profissional: Profissional, event: Event) => {
  const nivelId = Number((event.target as HTMLSelectElement).value);

  status.value[profissional.id] = "loading";

  try {
    await updateNivel(profissional.id, nivelId);

    status.value[profissional.id] = "success";

    await carregar();

    setTimeout(() => {
      status.value[profissional.id] = null;
    }, 2000);
  } catch (e) {
    alert("Erro ao atualizar nível");
  }
};

const remover = async (id: number) => {
  if (!confirm("Deseja realmente excluir este nível?")) return;

  try {
    await del(id);
    carregar();
  } catch (e: any) {
    alert(e.message);
  }
};
const niveis = ref<Nivel[]>([]);

const profissionais = ref<Profissional[]>([]);
const loading = ref(false);
const error = ref<string | null>(null);

const carregar = async () => {
  loading.value = true;
  error.value = null;

  try {
    profissionais.value = await list();
  } catch (e) {
    console.error(e);
    error.value = "Erro ao carregar profissionais";
  } finally {
    loading.value = false;
  }
};

onMounted(async () => {
  await carregar();
  niveis.value = await listNiveis();
});

</script>

<template>
  <div class="p-6">
    <div class="flex items-center justify-between mb-4">
      <h1 class="text-2xl font-bold">Profissionais</h1>

      <button
        class="bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-700"
        @click="modalCreateAberto = true"
      >
        + Novo profissional
      </button>
    </div>
    <p v-if="loading">Carregando...</p>
    <p v-else-if="error">Erro ao carregar profissionais</p>

    <ul v-else class="space-y-2">
      <li
        v-for="profissional in profissionais"
        :key="profissional.id"
        class="p-2 border rounded flex items-center gap-2"
      >
        <span class="flex-1">
          {{ profissional.nome }} - {{ profissional.sexo }} -
          {{ profissional.data_nascimento }} - {{ profissional.hobby }}
        </span>

        <select
          class="border rounded px-2 py-1"
          :class="{
            'opacity-50': status[profissional.id] === 'loading',
            'border-emerald-500': status[profissional.id] === 'success',
            'border-red-500': status[profissional.id] === 'error',
          }"
          :disabled="status[profissional.id] === 'loading'"
          :value="profissional.nivel?.id"
          @change="alterarNivel(profissional, $event)"
        >
          <option v-for="nivel in niveis" :key="nivel.id" :value="nivel.id">
            {{ nivel.nivel }}
          </option>
        </select>
        <button
          class="text-sm px-3 py-1 border rounded hover:bg-gray-100"
          @click="editarProfissional(profissional)"
        >
          Editar
        </button>
        <button
          class="text-sm px-3 py-1 border rounded border border-red-500 text-red-500 hover:bg-red-600 hover:text-white"
          @click="remover(profissional.id)"
        >
          Excluir
        </button>
      </li>
    </ul>

    <ProfissionalEditModal
      v-model="modalEditAberto"
      :profissional="profissionalSelecionado"
      @saved="carregar"
    />

    <ProfissionalCreateModal v-model="modalCreateAberto" @created="carregar" />
  </div>
</template>
