<script setup lang="ts">
import { onMounted, ref } from "vue";
import type { Nivel } from "~/types/nivel";
import { useNiveis } from "~/composables/useNiveis";

const { list, del } = useNiveis();

const niveis = ref<Nivel[]>([]);
const loading = ref(false);

const nivelSelecionado = ref<Nivel | null>(null);
const modalEditAberto = ref(false);

const editarNivel = (nivel: Nivel) => {
  nivelSelecionado.value = { ...nivel };
  modalEditAberto.value = true;
};

const carregar = async () => {
  loading.value = true;
  niveis.value = await list();
  loading.value = false;
};

const remover = async (id: number) => {
  if (!confirm("Deseja realmente excluir este nível?")) return;

  try {
    await del(id);
    await carregar();
  } catch (e: any) {
    alert(e.message);
  }
};

onMounted(carregar);
</script>

<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold">Niveis</h1>
    <ul class="space-y-2">
      <li
        v-for="nivel in niveis"
        :key="nivel.id"
        class="flex justify-between items-center bg-gray-100 p-3 rounded"
      >
        <span>{{ nivel.nivel }}</span>

        <div class="flex gap-3">
          <button
            class="text-sm px-3 py-1 border rounded hover:bg-gray-100"
            @click="editarNivel(nivel)"
          >
            Editar
          </button>

          <button
            class="text-sm px-3 py-1 border rounded border border-red-500 text-red-500 hover:bg-red-600 hover:text-white"
            @click="remover(nivel.id)"
          >
            Excluir
          </button>
        </div>
      </li>
    </ul>

    <NivelForm @created="carregar" />

    <NivelEditModal
      v-model="modalEditAberto"
      :nivel="nivelSelecionado"
      @saved="carregar"
    />

    <p v-if="loading">Carregando...</p>
  </div>
</template>
