<template>
  <form @submit.prevent="onSubmit" class="quantum-glass p-8 space-y-8">
    <UiFormInput 
      v-model="title" 
      label="Bounty Title" 
      id="title" 
      :error="errors.title"
      placeholder="e.g., Introduction to a Series A Investor in FinTech" 
    />

    <UiFormTextarea 
      v-model="description" 
      label="Detailed Description" 
      id="description" 
      :error="errors.description"
      placeholder="Describe exactly who you're looking for and why. The more detail, the better the match."
      :rows="6"
    />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <UiFormInput 
        v-model="category" 
        label="Category" 
        id="category" 
        :error="errors.category"
        placeholder="e.g., Venture Capital, Manufacturing" 
      />
      <UiFormInput 
        v-model.number="amount" 
        label="Bounty Amount ($)" 
        id="amount" 
        type="number"
        :error="errors.amount"
        placeholder="e.g., 500" 
      />
    </div>

    <div class="border-t border-border-color pt-6 flex justify-end">
      <UiAppButton type="submit" variant="primary" size="large" :loading="isSubmitting">
        Post Bounty
      </UiAppButton>
    </div>
  </form>
</template>

<script setup>
import { useForm, useField } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import * as z from 'zod';
import { useUiStore } from '~/store/ui';

const emit = defineEmits(['success']);
const uiStore = useUiStore();

const validationSchema = toTypedSchema(
  z.object({
    title: z.string().min(10, 'Title is too short').max(100, 'Title is too long'),
    description: z.string().min(50, 'Please provide more detail').max(2000),
    category: z.string().min(3, 'Category is required'),
    amount: z.number({ invalid_type_error: 'Amount must be a number' }).gt(0, 'Amount must be positive'),
  })
);

const { handleSubmit, errors, isSubmitting } = useForm({ validationSchema });

const { value: title } = useField('title');
const { value: description } = useField('description');
const { value: category } = useField('category');
const { value: amount } = useField('amount');

const onSubmit = handleSubmit(async (values) => {
  const { data: newBounty, error } = await useApiFetch('/bounties/', {
    method: 'POST',
    body: values,
  });

  if (error.value) {
    uiStore.showToast(error.value.data.detail || 'Failed to create bounty.', 'error');
  } else {
    uiStore.showToast('Bounty posted successfully!', 'success');
    emit('success', newBounty.value);
  }
});
</script>