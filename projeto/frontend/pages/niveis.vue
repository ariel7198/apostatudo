<script setup lang="ts">
import { onMounted, ref } from "vue";
import type { Nivel } from "~/types/nivel";
import { useNiveis } from "~/composables/useNiveis";
import { Pencil, Trash } from "lucide-vue-next";

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
  <div class="p-6 space-y-6">
    <div class="flex items-center justify-between">
      <h1 class="text-2xl font-bold text-gray-900">Níveis</h1>
    </div>

    <NivelForm @created="carregar" />

    <p v-if="loading" class="text-center text-gray-600">Carregando...</p>

    <div v-else class="grid grid-cols-1 gap-4">
      <div
        v-for="nivel in niveis"
        :key="nivel.id"
        class="bg-white border border-gray-200 rounded p-4 flex justify-between items-center shadow-sm"
      >
        <span class="font-medium text-lg text-gray-900">
          {{ nivel.nivel }}
        </span>

        <div class="flex gap-2">
          <button
            class="flex items-center gap-2 px-3 py-1 text-sm rounded border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
            @click="editarNivel(nivel)"
          >
          Editar
          <Pencil class="h-4 w-4" />
          </button>

          <button
            class="flex items-center gap-2 px-3 py-1 text-sm rounded bg-red-600 hover:bg-red-700 text-white transition"
            @click="remover(nivel.id)"
          >
          Excluir
          <Trash class="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>

    <!-- modal de edição -->
    <NivelEditModal
      v-model="modalEditAberto"
      :nivel="nivelSelecionado"
      @saved="carregar"
    />
  </div>
</template>
