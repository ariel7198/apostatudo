<template>
  <div class="min-h-screen bg-gray-100 text-gray-900">
    <header class="bg-white shadow">
      <div class="max-w-5xl mx-auto px-4 py-4 flex gap-4">
        <NuxtLink to="/" class="font-bold">Início</NuxtLink>
        <NuxtLink to="/niveis">Níveis</NuxtLink>
        <NuxtLink to="/profissionais">Profissionais</NuxtLink>
      </div>
    </header>

    <main class="max-w-5xl mx-auto p-4">
      <NuxtPage />
    </main>
  </div>
</template>