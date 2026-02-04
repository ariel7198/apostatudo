<script setup lang="ts">
import { ref } from "vue";
import { useNiveis } from "@/composables/useNiveis";
import { Plus } from "lucide-vue-next";

const emit = defineEmits<{
  (e: "created"): void;
}>();

const { create } = useNiveis();

const nivel = ref("");
const loading = ref(false);
const success = ref(false);
const error = ref<string | null>(null);

const submit = async () => {
  try {
    loading.value = true;
    error.value = null;

    await create({ nivel: nivel.value });

    nivel.value = "";
    emit("created");

    setTimeout(() => {
      success.value = false;
    }, 3000);
  } catch (e) {
    error.value = "Erro ao cadastrar nível";
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
    <div class="flex w-full gap-2 items-center">
      <h2 class="font-semibold text-lg">Cadastrar nivel</h2>

      <input
        v-model="nivel"
        type="text"
        placeholder="Nome do nível"
        class="flex-grow border px-3 py-2 rounded"
        required
      />

      <p v-if="error" class="text-red-500 text-sm">
        {{ error }}
      </p>

      <button
        class="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded disabled:opacity-50"
        :disabled="loading"
      >
        <Plus class="h-4 w-4" />
        Cadastrar
      </button>
    </div>
  </form>
</template>
