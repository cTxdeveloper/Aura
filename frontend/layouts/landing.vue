<template>
  <div class="landing-layout bg-obsidian-black min-h-screen">
    <!-- The landing page might not have a persistent header/footer like the default app layout -->
    <main>
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
// Landing layout specific script
// For example, you might want to set a specific page transition for landing pages
// useHead({
//   bodyAttrs: {
//     class: 'landing-page-body' // If you need specific body classes for this layout
//   }
// })
</script>

<style scoped>
/* Scoped styles for the landing layout */
.landing-layout {
  /* Specific styles for the landing page layout if different from default */
  /* For instance, ensuring full bleed for hero sections */
  overflow-x: hidden; /* Prevent horizontal scroll from wide animated elements */
}
</style>
