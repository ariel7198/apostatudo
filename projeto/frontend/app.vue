<script setup lang="ts">
import { Users, TrendingUp  } from "lucide-vue-next";
</script>

<template>
  <div class="min-h-screen flex bg-gray-100 text-gray-900">
    <!-- Sidebar -->
    <aside class="w-64 bg-white border-r border-gray-200 fixed min-h-screen">
      <div class="h-16 flex items-center px-6 border-b border-gray-200">
        <span class="text-lg font-bold"> Administração </span>
      </div>

      <nav class="p-4 space-y-1">
        <NuxtLink
          to="/profissionais"
          class="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-100"
          active-class="bg-emerald-100 text-emerald-700 font-medium"
        >
          <Users class="w-4 h-4" />
          Profissionais
        </NuxtLink>

        <NuxtLink
          to="/niveis"
          class="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-100"
          active-class="bg-emerald-100 text-emerald-700 font-medium"
        >
          <TrendingUp class="w-4 h-4" />
          Níveis
        </NuxtLink>
      </nav> 
    </aside>

    <!-- Conteúdo -->
    <main class="grow-1 flex-1 p-6 overflow-y-auto ml-64">
      <NuxtPage />
      <slot />
    </main>
  </div>
</template>
