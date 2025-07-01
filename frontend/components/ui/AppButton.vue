<template>
  <button
    :type="nativeType"
    :disabled="disabled || loading"
    class="app-button inline-flex items-center justify-center font-semibold focus:outline-none transition-all duration-200 ease-in-out"
    :class="[
      sizeClasses,
      variantClasses,
      { 'opacity-50 cursor-not-allowed': disabled },
      { 'cursor-wait': loading },
      block ? 'w-full' : ''
    ]"
    @click="handleClick"
  >
    <AppLoader v.if="loading" :size="loaderSize" class="mr-2" :color="loaderColor" />
    <component :is="iconLeft" v-if="iconLeft && !loading" class="mr-2 h-5 w-5" />
    <slot></slot>
    <component :is="iconRight" v-if="iconRight && !loading" class="ml-2 h-5 w-5" />
  </button>
</template>

<script setup lang="ts">
import { computed, FunctionalComponent, SVGAttributes } from 'vue';
// Ensure AppLoader is imported if it's a local component.
// If AppLoader is globally registered or auto-imported by Nuxt, this line might not be needed.
// import AppLoader from './AppLoader.vue'; // Will be created in a subsequent step

type ButtonNativeType = 'button' | 'submit' | 'reset';
type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'link';
type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

interface Props {
  nativeType?: ButtonNativeType;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  block?: boolean; // Full width
  iconLeft?: FunctionalComponent<SVGAttributes> | null; // For SVGs as components
  iconRight?: FunctionalComponent<SVGAttributes> | null;
  to?: string | Record<string, any>; // For NuxtLink-like navigation
}

const props = withDefaults(defineProps<Props>(), {
  nativeType: 'button',
  variant: 'primary',
  size: 'md',
  disabled: false,
  loading: false,
  block: false,
  iconLeft: null,
  iconRight: null,
  to: undefined,
});

const emit = defineEmits(['click']);

const handleClick = (event: MouseEvent) => {
  if (props.disabled || props.loading) {
    event.preventDefault();
    return;
  }
  if (props.to && typeof navigateTo === 'function') { // Check if navigateTo is available
    navigateTo(props.to);
  }
  emit('click', event);
};


const sizeClasses = computed(() => {
  switch (props.size) {
    case 'xs': return 'px-2.5 py-1.5 text-xs rounded';
    case 'sm': return 'px-3 py-1.5 text-sm rounded-md';
    case 'md': return 'px-4 py-2 text-sm rounded-md';
    case 'lg': return 'px-5 py-2.5 text-base rounded-lg';
    case 'xl': return 'px-6 py-3 text-base rounded-lg';
    default: return 'px-4 py-2 text-sm rounded-md';
  }
});

// Combined computed property for loader attributes to avoid re-calculating variant logic
const loaderAttrs = computed(() => {
  let loaderSizeVal: 'sm' | 'md' = 'md';
  let loaderColorVal = 'text-white'; // Default

  if (props.size === 'xs' || props.size === 'sm') {
    loaderSizeVal = 'sm';
  }

  if (props.variant === 'outline' || props.variant === 'ghost' || props.variant === 'link') {
    loaderColorVal = 'text-quantum-purple';
  } else if (props.variant === 'secondary') {
    loaderColorVal = 'text-gray-100';
  }
  return { size: loaderSizeVal, color: loaderColorVal };
});

const loaderSize = computed(() => loaderAttrs.value.size);
const loaderColor = computed(() => loaderAttrs.value.color);

const baseButtonClasses = 'border focus:ring-2 focus:ring-offset-1 focus:ring-offset-obsidian-black/30'; // Adjusted offset

const variantClasses = computed(() => {
  switch (props.variant) {
    case 'primary':
      return `${baseButtonClasses} bg-quantum-purple text-white border-transparent hover:bg-purple-700 focus:ring-quantum-purple shadow-md hover:shadow-lg hover:shadow-quantum-purple/40`;
    case 'secondary': // Darker, more subtle button
      return `${baseButtonClasses} bg-gray-700/70 text-gray-200 border-gray-600 hover:bg-gray-600/80 focus:ring-gray-500`;
    case 'outline':
      return `${baseButtonClasses} bg-transparent text-quantum-purple border-quantum-purple hover:bg-quantum-purple/10 focus:ring-quantum-purple`;
    case 'ghost':
      return `${baseButtonClasses} bg-transparent text-quantum-purple border-transparent hover:bg-quantum-purple/10 focus:ring-quantum-purple`;
    case 'danger':
      return `${baseButtonClasses} bg-red-600 text-white border-transparent hover:bg-red-700 focus:ring-red-500`;
    case 'link':
      return `bg-transparent text-quantum-purple hover:underline focus:outline-none focus:ring-1 focus:ring-quantum-purple p-0`; // Minimal styling
    default:
      return `${baseButtonClasses} bg-quantum-purple text-white border-transparent hover:bg-purple-700 focus:ring-quantum-purple shadow-md hover:shadow-lg hover:shadow-quantum-purple/40`;
  }
});

</script>

<style scoped>
/* Scoped styles for AppButton */
.app-button {
  /* Base transition for properties not covered by Tailwind's duration-200 if needed */
}
</style>
