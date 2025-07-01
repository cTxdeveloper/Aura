<template>
  <div class="relative inline-block" @mouseenter="show = true" @mouseleave="show = false">
    <slot />
    <Transition name="fade">
      <div v-if="show" class="absolute bottom-full mb-2 w-max max-w-xs px-3 py-1.5 bg-background border border-border-color text-xs text-text-secondary rounded-md shadow-lg z-10">
        {{ text }}
      </div>
    </Transition>
  </div>
</template>
<script setup>
import { ref } from 'vue';
defineProps({ text: String });
const show = ref(false);
</script>