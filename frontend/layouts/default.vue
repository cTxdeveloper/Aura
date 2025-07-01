<template>
  <div class="min-h-screen flex flex-col">
    <LayoutAppHeader />
    <main class="flex-grow container mx-auto px-4 py-8">
      <slot />
    </main>
    <LayoutAppFooter />
  </div>
</template>

<script setup>
// This component provides the standard layout with a header and footer
// for authenticated parts of the application.
</script>