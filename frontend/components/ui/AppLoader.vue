<template>
  <div role="status" class="app-loader inline-flex items-center justify-center" :class="containerSizeClass">
    <svg
      aria-hidden="true"
      class="animate-spin"
      :class="[colorClass, spinnerSizeClass]"
      viewBox="0 0 100 101"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
        fill="currentColor"
        fill-opacity="0.2"
      />
      <path
        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0492C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
        fill="currentFill"
      />
    </svg>
    <span v-if="labelScreenReader" class="sr-only">{{ labelScreenReader }}</span>
    <span v-if="showTextLabel && textLabelContent" class="ml-2 text-sm" :class="colorClass">
      {{ textLabelContent }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'custom';
  color?: string; // Tailwind text color class, e.g., 'text-quantum-purple'
  labelScreenReader?: string; // For screen readers, defaults to "Loading..."
  textLabelContent?: string; // Optional visible text label next to spinner
  showTextLabel?: boolean;
  customSpinnerClass?: string; // For 'custom' size, pass Tailwind w/h classes
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  color: 'text-quantum-purple',
  labelScreenReader: 'Loading...',
  textLabelContent: 'Loading...',
  showTextLabel: false,
  customSpinnerClass: 'w-8 h-8', // Default for custom if not provided
});

const containerSizeClass = computed(() => {
  if (props.showTextLabel) {
    switch (props.size) {
      case 'xs': return 'text-xs';
      case 'sm': return 'text-sm';
      case 'md': return 'text-sm';
      case 'lg': return 'text-base';
      case 'xl': return 'text-lg';
      default: return 'text-sm';
    }
  }
  return '';
});

const spinnerSizeClass = computed(() => {
  if (props.size === 'custom') {
    return props.customSpinnerClass;
  }
  switch (props.size) {
    case 'xs': return 'w-3 h-3';
    case 'sm': return 'w-4 h-4';
    case 'md': return 'w-6 h-6';
    case 'lg': return 'w-8 h-8';
    case 'xl': return 'w-10 h-10';
    default: return 'w-6 h-6';
  }
});

const colorClass = computed(() => props.color);

</script>

<style scoped>
/* Targets the path that creates the moving part of the spinner */
.app-loader svg path[fill="currentFill"] {
  fill: currentColor;
}
</style>
