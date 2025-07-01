<template>
  <div>
    <label v-if="label" :for="id" class="block text-sm font-medium text-text-secondary mb-2">{{ label }}</label>
    <textarea
      :id="id"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :placeholder="placeholder"
      :rows="rows"
      :class="['w-full px-4 py-2 bg-surface border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors', error ? 'border-danger' : 'border-border-color']"
    ></textarea>
    <Transition name="slide-down">
      <p v-if="error" class="text-danger text-xs mt-1">{{ error }}</p>
    </Transition>
  </div>
</template>

<script setup>
defineProps({
  id: String,
  label: String,
  modelValue: String,
  placeholder: String,
  error: String,
  rows: { type: Number, default: 4 },
});
defineEmits(['update:modelValue']);
</script>