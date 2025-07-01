<template>
  <div>
    <h1 class="text-4xl font-bold mb-8">Profile Settings</h1>
    <div class="max-w-2xl">
      <form class="quantum-glass p-8 space-y-6" @submit.prevent="updateProfile">
        <h2 class="text-xl font-semibold text-white">Your Information</h2>
        <UiFormInput id="full_name" v-model="form.full_name" label="Full Name" />
        <UiFormInput id="headline" v-model="form.headline" label="Headline" placeholder="e.g., Founder at Aura | Web3 Enthusiast" />
        
        <div class="border-t border-border-color pt-6 flex justify-end">
          <UiAppButton type="submit" variant="primary" :loading="isUpdating">Save Changes</UiAppButton>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '~/store/auth';
definePageMeta({ middleware: 'auth' });

const authStore = useAuthStore();
const isUpdating = ref(false);

const form = ref({
  full_name: authStore.user?.full_name || '',
  headline: authStore.user?.headline || '',
});

async function updateProfile() {
  isUpdating.value = true;
  try {
    await useApiFetch('/auth/me', {
      method: 'PUT',
      body: form.value,
    });
    // Refetch user to update state
    await authStore.fetchUser();
    // Show success toast
  } catch (e) {
    // Show error toast
  } finally {
    isUpdating.value = false;
  }
}
</script>