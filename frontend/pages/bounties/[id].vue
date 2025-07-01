<template>
  <div v-if="pending" class="flex justify-center items-center h-96"><UiAppLoader /></div>
  <div v-else-if="error || !bounty" class="text-center py-20 quantum-glass">
    <h2 class="text-3xl font-bold text-white">Bounty Not Found</h2>
    <p class="text-text-secondary mt-2">This bounty may have been claimed or removed.</p>
    <UiAppButton to="/bounties" class="mt-6">Back to The Foundry</UiAppButton>
  </div>
  <div v-else class="container mx-auto max-w-5xl">
    <div class="grid grid-cols-12 gap-8">
      <!-- Left Column: Bounty Details -->
      <div class="col-span-12 md:col-span-8">
        <div class="space-y-6">
          <span class="bg-primary/10 text-primary text-xs font-bold px-2 py-1 rounded-full">{{ bounty.category }}</span>
          <h1 class="text-4xl font-bold tracking-tighter text-white">{{ bounty.title }}</h1>
          <div class="prose prose-invert max-w-none text-text-secondary">
            <p>{{ bounty.description }}</p>
          </div>
        </div>
      </div>

      <!-- Right Column: Action Card -->
      <div class="col-span-12 md:col-span-4">
        <div class="quantum-glass p-6 space-y-6 sticky top-24">
          <div class="text-center">
            <p class="text-sm text-text-secondary">Bounty Reward</p>
            <p class="text-4xl font-extrabold text-secondary">${{ bounty.amount.toFixed(2) }}</p>
          </div>

          <div class="border-t border-border-color pt-4">
            <p class="text-xs text-text-secondary mb-2">Posted By</p>
            <NuxtLink :to="`/u/${bounty.creator._id}`" class="flex items-center gap-3 group">
              <img :src="`https://ui-avatars.com/api/?name=${bounty.creator.full_name}&background=16161C&color=F8FAFC&size=40`" class="w-10 h-10 rounded-full" />
              <div>
                <p class="font-semibold text-white group-hover:text-primary transition-colors">{{ bounty.creator.full_name }}</p>
                <p class="text-xs text-text-secondary">{{ bounty.creator.headline }}</p>
              </div>
            </NuxtLink>
          </div>

          <div v-if="authStore.isAuthenticated">
            <UiAppButton 
              v-if="authStore.user._id !== bounty.creator._id"
              variant="primary"
              size="large" 
              class="w-full"
              :loading="isClaiming"
              :icon="Handshake"
              @click="handleClaim"
            >
              Claim Bounty
            </UiAppButton>
            <div v-else class="text-center text-xs text-text-secondary p-2 bg-surface rounded-md">
              This is your bounty.
            </div>
          </div>
          <div v-else>
            <UiAppButton to="/auth/login" variant="secondary" size="large" class="w-full">
              Log In to Claim
            </UiAppButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Handshake } from 'lucide-vue-next';
import { useAuthStore } from '~/store/auth';

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();
const bountyId = route.params.id;
const isClaiming = ref(false);

const { data: bounty, pending, error } = await useApiFetch(`/bounties/${bountyId}`);

async function handleClaim() {
  isClaiming.value = true;
  try {
    const { data: deal, error } = await useApiFetch(`/deals/claim/${bountyId}`, { method: 'POST' });
    if (error.value) {
      // You can use a toast notification here
      alert(error.value.data.detail || 'Failed to claim bounty.');
    } else {
      // On success, redirect to the newly created deal room
      router.push(`/deals/${deal.value._id}`);
    }
  } catch (e) {
    alert('An unexpected error occurred.');
  } finally {
    isClaiming.value = false;
  }
}
</script>