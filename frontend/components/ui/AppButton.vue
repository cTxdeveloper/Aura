<template>
  <NuxtLink v-if="to" :to="to" :class="buttonClasses" v-motion-press>
    <AppLoader v-if="loading" />
    <template v-else>
      <component v-if="icon" :is="icon" class="w-5 h-5" :class="{ 'mr-2': slots.default }" />
      <span v-if="slots.default"><slot /></span>
    </template>
  </NuxtLink>
  <button v-else :class="buttonClasses" :disabled="loading || disabled" v-motion-press>
    <AppLoader v-if="loading" />
    <template v-else>
      <component v-if="icon" :is="icon" class="w-5 h-5" :class="{ 'mr-2': slots.default }" />
      <span v-if="slots.default"><slot /></span>
    </template>
  </button>
</template>

<script setup>
import { computed, useSlots } from 'vue';
const slots = useSlots();
const props = defineProps({
  to: String,
  variant: { type: String, default: 'primary' }, // primary, secondary, ghost, danger
  size: { type: String, default: 'medium' }, // small, medium, large
  icon: { type: Object, default: null },
  loading: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false }
});

const buttonClasses = computed(() => [
  'inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:ring-primary disabled:opacity-50 disabled:cursor-not-allowed',
  {
    'bg-primary text-white hover:bg-primary-hover shadow-lg shadow-primary/20': props.variant === 'primary',
    'bg-surface border border-border-color text-text-primary hover:bg-border-color': props.variant === 'secondary',
    'bg-transparent text-text-secondary hover:text-text-primary': props.variant === 'ghost',
    'bg-danger/20 text-danger border border-danger/50 hover:bg-danger/30': props.variant === 'danger',
    'px-4 py-2 text-sm': props.size === 'medium',
    'px-6 py-3 text-base': props.size === 'large',
    'px-3 py-1.5 text-xs': props.size === 'small',
  }
]);
</script>