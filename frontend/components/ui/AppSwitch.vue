<template>
  <button
    type="button"
    @click="toggle"
    :class="['relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background', modelValue ? 'bg-primary' : 'bg-surface']"
    role="switch"
    :aria-checked="modelValue"
  >
    <span
      :class="['pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out', modelValue ? 'translate-x-5' : 'translate-x-0']"
    />
  </button>
</template>

<script setup>
const props = defineProps({ modelValue: Boolean });
const emit = defineEmits(['update:modelValue']);
const toggle = () => emit('update:modelValue', !props.modelValue);
</script>