<script setup lang="ts">
import { useProfissionais } from "~/composables/useProfissionais";
import type { Profissional } from "~/types/profissional";
import { useNiveis } from "~/composables/useNiveis";
import type { Nivel } from "~/types/nivel";
import { Pencil, Trash, UserPlus } from "lucide-vue-next";

const { list, del } = useProfissionais();
const { list: listNiveis } = useNiveis();
const { updateNivel } = useProfissionais();

const status = ref<Record<number, "loading" | "success" | "error" | null>>({});

const profissionalSelecionado = ref<Profissional | null>(null);
const modalEditAberto = ref(false);
const modalCreateAberto = ref(false);

const formatarData = (data: string) => {
  if (!data) return "";

  return new Date(data).toLocaleDateString("pt-BR", {
    timeZone: "UTC",
  });
};

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
      <h1 class="text-2xl font-bold text-gray-900">Profissionais</h1>

      <button
        class="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700 transition"
        @click="modalCreateAberto = true"
      >
      <UserPlus class="h-4 w-4" />
        Cadastrar
      </button>
    </div>
    <p v-if="loading">Carregando...</p>
    <p v-else-if="error">Erro ao carregar profissionais</p>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div
        v-for="p in profissionais"
        :key="p.id"
        class="bg-white border border-gray-200 rounded-lg p-4 space-y-3 shadow-sm"
      >
        <!-- Header -->
        <div class="flex justify-between items-start">
          <div>
            <h2 class="text-lg font-semibold">
              {{ p.nome }}
            </h2>
            <p class="text-sm text-gray-50000">
              {{ p.sexo === "M" ? "Masculino" : "Feminino" }} •
              {{ formatarData(p.data_nascimento) }}
            </p>
          </div>

          <select
            class="bg-white border border-gray-300 rounded px-2 py-1 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            :class="{
              'opacity-50 cursor-not-allowed': status[p.id] === 'loading',
              'border-emerald-500': status[p.id] === 'success',
            }"
            :disabled="status[p.id] === 'loading'"
            :value="p.nivel?.id"
            @change="alterarNivel(p, $event)"
          >
            <option v-for="nivel in niveis" :key="nivel.id" :value="nivel.id">
              {{ nivel.nivel }}
            </option>
          </select>
        </div>

        <!-- Body -->
        <div class="text-sm ">
          <span class="font-medium ">Hobby:</span>
          {{ p.hobby }}
        </div>

        <!-- Actions -->
        <div class="flex justify-end gap-2 pt-2">
          <button
            class="flex items-center gap-2  px-3 py-1 text-sm rounded border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
            @click="editarProfissional(p)"
          >
          Editar
          <Pencil class="h-4 w-4" />
          </button>

          <button
            class="flex items-center gap-2  px-3 py-1 text-sm rounded bg-red-600 hover:bg-red-700 text-white transition"
            @click="remover(p.id)"
          >
          Excluir
          <Trash class="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>

    <ProfissionalEditModal
      v-model="modalEditAberto"
      :profissional="profissionalSelecionado"
      @saved="carregar"
    />

    <ProfissionalCreateModal v-model="modalCreateAberto" @created="carregar" />
  </div>
</template>
