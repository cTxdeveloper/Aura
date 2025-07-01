<template>
  <header class="sticky top-0 z-50 quantum-glass">
    <nav class="container mx-auto px-4 py-3 flex justify-between items-center">
      <NuxtLink to="/" class="flex items-center gap-2">
        <img src="~/assets/svg/aura-logo.svg" alt="Aura Logo" class="w-8 h-8"/>
        <span class="text-xl font-bold text-white">Aura</span>
      </NuxtLink>
      <div class="hidden md:flex items-center gap-6 text-sm font-medium">
        <NuxtLink to="/bounties" class="text-text-secondary hover:text-white transition-colors">The Foundry</NuxtLink>
        <NuxtLink to="/lists" class="text-text-secondary hover:text-white transition-colors">The Index</NuxtLink>
        <NuxtLink to="/manifesto" class="text-text-secondary hover:text-white transition-colors">Manifesto</NuxtLink>
      </div>
      <div>
        <LayoutUserNav v-if="authStore.isAuthenticated" />
        <div v-else class="flex items-center gap-2">
          <UiAppButton to="/auth/login" variant="ghost" size="small">Log In</UiAppButton>
          <UiAppButton to="/auth/register" variant="primary" size="small">Sign Up</UiAppButton>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { useAuthStore } from '~/store/auth';
const authStore = useAuthStore();
</script>