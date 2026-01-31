<script setup lang="ts">
import { onMounted, ref } from "vue";
import type { Nivel } from "~/types/nivel";
import { useNiveis } from "~/composables/useNiveis";

const { list, del } = useNiveis();

const niveis = ref<Nivel[]>([]);
const loading = ref(false);

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
  <div class="space-y-4">
    <ul class="space-y-2">
      <li
        v-for="nivel in niveis"
        :key="nivel.id"
        class="flex justify-between items-center bg-gray-100 p-3 rounded"
      >
        <span>{{ nivel.nivel }}</span>

        <button
          class="text-red-600 hover:underline"
          @click="remover(nivel.id)"
        >
          Excluir
        </button>
      </li>
    </ul>

    <NivelForm @created="carregar"/>

    <p v-if="loading">Carregando...</p>
  </div>
</template>
