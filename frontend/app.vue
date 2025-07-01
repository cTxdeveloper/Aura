<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <!-- Global components like a notification center can go here -->
    <NotificationCenter />
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/store/auth';
// It's good practice to import specific composables if not relying purely on auto-import for clarity
// import { useLenisScroll } from '~/composables/useLenisScroll'; // Example

// Initialize Lenis for smooth scrolling (if desired globally)
// useLenisScroll(); // Assuming you create such a composable

// Initialize and check auth state when the app loads
const authStore = useAuthStore();
onMounted(() => {
  // Attempt to hydrate user session if a token might exist
  // This depends on how token persistence is handled (e.g. Nuxt Auth utilities or manual)
  authStore.fetchUser();
});

// Global head configuration (can also be in nuxt.config.ts or per-page)
useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} - The Access Marketplace` : 'The Access Marketplace';
  },
  // General meta tags, link tags etc.
  // Example: Loading global fonts (though often done in nuxt.config or main.css)
  // link: [
  //   {
  //     rel: 'preconnect',
  //     href: 'https://fonts.googleapis.com',
  //   },
  //   {
  //     rel: 'stylesheet',
  //     href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=Satoshi:wght@400;500;700&display=swap',
  //     crossorigin: '',
  //   },
  // ],
});
</script>

<style>
/* Global styles that are not part of Tailwind's base, components, or utilities */
/* Often, main.css is sufficient, but this is also an option */

/* Page transitions (can be defined in nuxt.config.ts or here) */
.page-enter-active,
.page-leave-active {
  transition: all 0.2s ease-out;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(0.5rem);
  /* transform: translateY(10px); */
}

.layout-enter-active,
.layout-leave-active {
 transition: all 0.2s ease-out;
}
.layout-enter-from,
.layout-leave-to {
  opacity: 0;
  filter: blur(0.5rem);
 /* transform: translateY(10px); */
}
</style>
