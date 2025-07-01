<template>
  <div
    class="glass-card rounded-xl shadow-xl"
    :class="[cardClasses, interactiveClasses]"
  >
    <slot name="header"></slot>
    <slot></slot>
    <slot name="footer"></slot>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  bgColor?: string; // e.g., 'bg-obsidian-black/70' or a custom rgba class
  borderColor?: string; // e.g., 'border-white/10' for white with 10% opacity
  blurAmount?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl'; // Tailwind backdrop blur scale
  interactive?: boolean; // Add hover effects if true
  hoverEffect?: 'lift' | 'glow' | 'none'; // Specific hover effect type
  padding?: string; // Tailwind padding class e.g. 'p-4', 'p-6', 'p-8'
  shadow?: string; // Tailwind shadow class e.g., 'shadow-md', 'shadow-lg', 'shadow-xl'
}

const props = withDefaults(defineProps<Props>(), {
  bgColor: 'bg-glass-bg', // Default to the 'glass-bg' color defined in tailwind.config.js
  borderColor: 'border-white/10',
  blurAmount: 'md', // Default to backdrop-blur-md (12px)
  interactive: false,
  hoverEffect: 'lift',
  padding: 'p-6',
  shadow: 'shadow-xl',
});

const cardClasses = computed(() => [
  props.bgColor,
  props.borderColor ? `border ${props.borderColor}` : 'border border-transparent', // Apply border only if borderColor is provided
  props.blurAmount !== 'none' ? `backdrop-blur-${props.blurAmount}` : '',
  props.padding,
  props.shadow,
]);

const interactiveClasses = computed(() => {
  if (!props.interactive || props.hoverEffect === 'none') return '';

  let classes = 'transition-all duration-300 ease-out';
  if (props.hoverEffect === 'lift') {
    // Tailwind JIT should pick up shadow-quantum-purple/20 if quantum-purple is in theme.colors
    classes += ' hover:scale-[1.02] hover:shadow-lg hover:shadow-quantum-purple/30';
  } else if (props.hoverEffect === 'glow') {
    classes += ` hover:border-quantum-purple/70 hover:shadow-xl hover:shadow-quantum-purple/40`;
  }
  return classes;
});

// Note on backdrop-filter:
// It requires an element or its parent to have some transparency.
// `bg-glass-bg` (rgba(18, 18, 22, 0.5)) from tailwind.config.js provides this.
// Ensure there's content/background behind the card for the blur to be visually effective.
</script>

<style scoped>
/* Styles specific to GlassCard if not achievable with Tailwind utilities */
.glass-card {
  /* Base transition for properties not covered by interactiveClasses if needed */
}
</style>
