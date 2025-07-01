<template>
  <div class="relative">
    <label v-if="label" :for="id" class="block text-sm font-medium text-text-secondary mb-2">{{ label }}</label>
    <div class="relative">
      <div v-if="icon" class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <component :is="icon" class="w-5 h-5 text-text-secondary" />
      </div>
      <input 
        :id="id"
        :type="type"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        :placeholder="placeholder"
        :class="['w-full py-2 bg-surface border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors', icon ? 'pl-10 pr-4' : 'px-4', error ? 'border-danger' : 'border-border-color']"
      />
    </div>
    <Transition name="slide-down">
      <p v-if="error" class="text-danger text-xs mt-1 absolute">{{ error }}</p>
    </Transition>
  </div>
</template>

<script setup>
defineProps({
  id: String,
  label: String,
  type: { type: String, default: 'text' },
  modelValue: [String, Number],
  placeholder: String,
  error: String,
  icon: Object,
});
defineEmits(['update:modelValue']);
</script>