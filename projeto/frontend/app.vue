<template>
  <div class="min-h-screen flex bg-gray-100 text-gray-900">
    <!-- Sidebar -->
    <aside class="w-64 bg-white border-r border-gray-200">
      <div class="h-16 flex items-center px-6 border-b border-gray-200">
        <span class="text-lg font-bold">
          Administração
        </span>
      </div>

      <nav class="p-4 space-y-1">
        <NuxtLink
          to="/profissionais"
          class="block px-3 py-2 rounded hover:bg-gray-100 transition"
          active-class="bg-emerald-100 text-emerald-700 font-medium"
        >
          Profissionais
        </NuxtLink>

        <NuxtLink
          to="/niveis"
          class="block px-3 py-2 rounded hover:bg-gray-100 transition"
          active-class="bg-emerald-100 text-emerald-700 font-medium"
        >
          Níveis
        </NuxtLink>
      </nav>
    </aside>

    <!-- Conteúdo -->
    <main class="flex-1 p-6 overflow-y-auto">
      <NuxtPage />
      <slot />
    </main>
  </div>
</template>
