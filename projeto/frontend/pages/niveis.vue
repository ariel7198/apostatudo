<script setup lang="ts">
import { onMounted, ref } from "vue";
import type { Nivel } from "~/types/nivel";
import { useNiveis } from "~/composables/useNiveis";
import { CornerRightUp, Pencil, Trash } from "lucide-vue-next";

useHead({
  title: "Niveis",
});

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

    <SkeletonsNivelSkeleton v-if="loading" />

    <div
      v-if="!loading && niveis.length === 0"
      class="flex flex-row gap-4  h-64 p-8 text-start items-center justify-center text-gray-500 border rounded bg-white"
    >
      <div class="flex flex-col">
        <span class="text-lg font-bold"> Nenhum nivel cadastrado. </span>
        <span> Use o campo acima para adicionar um novo nível. </span>
      </div>
      <CornerRightUp class="h-12 w-12" />
    </div>

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
