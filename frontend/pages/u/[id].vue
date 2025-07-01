<template>
  <div class="container mx-auto py-8 px-4">
    <h1 class="text-3xl font-bold text-white mb-4">User Profile Page</h1>
    <p class="text-gray-300">User ID: <span class="text-quantum-purple">{{ $route.params.id }}</span></p>
    <p class="text-gray-400 mt-2">This page will display the public profile for the user.</p>
    <!-- Add more profile details here later -->
    <NuxtLink to="/" class="mt-6 inline-block text-quantum-purple hover:underline">Go back to Home</NuxtLink>
  </div>
</template>

<script setup lang="ts">
// import { useRoute } from 'vue-router'; // Nuxt 3 auto-imports useRoute
const route = useRoute();

// You can fetch user data based on route.params.id here
// For example:
// const { data: userProfile, pending, error } = await useFetch(`/api/users/${route.params.id}`);

useHead({
  title: `Profile for User ${route.params.id} - The Access Marketplace`,
  meta: [
    { name: 'description', content: `View the profile of user ${route.params.id}.` }
  ]
});

definePageMeta({
  // layout: 'default', // Or a specific profile layout if created
});
</script>

<style scoped>
/* Add specific styles for the user profile page if needed */
</style>
