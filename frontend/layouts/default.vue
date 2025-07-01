<template>
  <div class="default-layout bg-obsidian-black min-h-screen flex flex-col">
    <!-- AppHeader will be added here later -->
    <!-- <AppHeader /> -->
    <main class="flex-grow">
      <slot />
    </main>
    <!-- AppFooter will be added here later -->
    <!-- <AppFooter /> -->
  </div>
</template>

<script setup lang="ts">
// Default layout script
// You can add layout-specific logic here
</script>

<style scoped>
/* Scoped styles for the default layout */
.default-layout {
  /* You can add specific styling for the overall layout container if needed */
}
</style>
