<script setup lang="ts">
import { useProfissionais } from "~/composables/useProfissionais";

const { list } = useProfissionais();

const {
  data: profissionais,
  pending,
  error,
  refresh,
} = await useAsyncData("profissionais", list);


</script>

<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">Profissionais</h1>
    <p v-if="pending">Carregando...</p>
    <p v-else-if="error">Erro ao carregar profissionais</p>

    <ul v-else class="space-y-2">
      <li
        v-for="profissional in profissionais"
        :key="profissional.id"
        class="p-2 border rounded"
      >
        {{ profissional.nome }} - {{ profissional.sexo }} -
        {{ profissional.data_nascimento }} - {{ profissional.hobby }} - Nível:
        {{ profissional.nivel?.nivel }}
      </li>
    </ul>
    <ProfissionalForm @created="refresh" />
  </div>
</template>
