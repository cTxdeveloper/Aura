<template>
  <footer class="border-t border-border-color mt-20">
    <div class="container mx-auto px-4 py-8 flex flex-col md:flex-row justify-between items-center">
      <div class="text-sm text-text-secondary">
        © {{ new Date().getFullYear() }} Aura Protocol. All rights reserved.
      </div>
      <div class="flex gap-4 mt-4 md:mt-0">
        <NuxtLink to="/terms" class="text-xs text-text-secondary hover:text-white">Terms of Service</NuxtLink>
        <NuxtLink to="/privacy" class="text-xs text-text-secondary hover:text-white">Privacy Policy</NuxtLink>
      </div>
    </div>
  </footer>
</template>