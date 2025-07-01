<template>
  <div class="quantum-glass p-6 sticky top-24">
    <h3 class="font-bold text-white mb-4">Filter The Foundry</h3>
    <div class="space-y-4">
      <FormInput id="search" placeholder="Search by keyword..." v-model="localFilters.search" />
      <div>
        <label for="category" class="block text-sm font-medium text-text-secondary mb-2">Category</label>
        <select id="category" v-model="localFilters.category" class="w-full px-4 py-2 bg-surface border border-border-color rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors">
          <option value="">All Categories</option>
          <option>Venture Capital</option>
          <option>Manufacturing</option>
          <option>Software Engineering</option>
          <option>Marketing</option>
        </select>
      </div>
      <UiAppButton variant="secondary" class="w-full" @click="apply">Apply Filters</UiAppButton>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({ search: '', category: '' })
  }
});

const emit = defineEmits(['update:modelValue']);

const localFilters = ref({ ...props.modelValue });

function apply() {
  emit('update:modelValue', { ...localFilters.value });
}
</script>