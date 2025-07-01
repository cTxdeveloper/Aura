<template>
  <div class="min-h-screen flex flex-col items-center justify-center text-center px-4 bg-background">
    <div class="relative w-48 h-48 mb-8">
      <div class="absolute inset-0 animate-pulse">
        <img src="~/assets/svg/aura-logo.svg" class="w-full h-full opacity-10" />
      </div>
      <Compass class="w-24 h-24 text-primary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"/>
    </div>
    <h1 class="text-6xl font-extrabold text-white">{{ error.statusCode }}</h1>
    <p class="text-2xl text-text-secondary mt-4 mb-8">{{ errorMessage }}</p>
    <UiAppButton @click="handleError" variant="primary" size="large">
      Return to Safety
    </UiAppButton>
  </div>
</template>

<script setup>
import { Compass } from 'lucide-vue-next';
const props = defineProps({ error: Object });

const errorMessage = computed(() => {
    if (props.error.statusCode === 404) {
        return "Oops! You've ventured into uncharted territory.";
    }
    return "An unexpected error occurred. We're on it.";
});

const handleError = () => clearError({ redirect: '/' });
</script>