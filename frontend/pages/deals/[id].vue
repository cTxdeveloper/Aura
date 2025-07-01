<template>
  <div v-if="pending" class="flex justify-center items-center h-96"><UiAppLoader /></div>
  <div v-else-if="error || !deal" class="text-center py-20 quantum-glass">
    <h2 class="text-3xl font-bold text-white">Deal Not Found</h2>
    <p class="text-text-secondary mt-2">You may not have access to this deal, or it may not exist.</p>
  </div>
  <div v-else class="grid grid-cols-12 gap-8">
    <!-- Left Column: Deal Status & Actions -->
    <div class="col-span-12 lg:col-span-4">
      <div class="quantum-glass p-6 sticky top-24 space-y-6">
        <h2 class="text-xl font-bold text-white">Deal Status</h2>
        
        <!-- Status Stepper -->
        <ol class="space-y-4">
          <li v-for="(step, index) in dealSteps" :key="step.name" class="flex items-start">
            <div class="flex flex-col items-center mr-4">
              <div :class="['w-8 h-8 rounded-full flex items-center justify-center', step.status === 'complete' ? 'bg-secondary' : step.status === 'current' ? 'bg-primary animate-pulse' : 'bg-surface border-2 border-border-color']">
                <component :is="step.icon" class="w-5 h-5 text-white" />
              </div>
              <div v-if="index < dealSteps.length - 1" class="w-px h-8 bg-border-color mt-2"></div>
            </div>
            <div>
              <h3 :class="['font-semibold', step.status === 'current' ? 'text-white' : 'text-text-secondary']">{{ step.name }}</h3>
              <p class="text-xs text-text-secondary">{{ step.description }}</p>
            </div>
          </li>
        </ol>

        <div class="border-t border-border-color pt-6">
          <!-- Contextual Actions -->
          <div v-if="deal.status === 'pending' && deal.seeker._id === authStore.user._id">
            <UiAppButton variant="primary" class="w-full" :icon="DollarSign">Fund Escrow (${{ deal.bounty.amount }})</UiAppButton>
            <p class="text-xs text-text-secondary mt-2 text-center">Fund the bounty to begin the introduction process.</p>
          </div>
          <div v-else-if="deal.status === 'introduction_made' && deal.seeker._id === authStore.user._id">
            <UiAppButton variant="secondary" class="w-full" :icon="CheckCircle">Confirm Introduction Complete</UiAppButton>
          </div>
          <div v-else class="text-center text-sm text-text-secondary p-3 bg-surface rounded-md">
            Waiting for other party...
          </div>
        </div>
      </div>
    </div>

    <!-- Middle Column: Chat -->
    <div class="col-span-12 lg:col-span-8">
      <DealChatWindow :deal="deal" />
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '~/store/auth';
import { DollarSign, MessageSquare, Handshake, CheckCircle, XCircle } from 'lucide-vue-next';

const route = useRoute();
const authStore = useAuthStore();
const dealId = route.params.id;

const { data: deal, pending, error } = await useApiFetch(`/deals/${dealId}`);

const dealStatusMap = {
  pending: 0,
  funded: 1,
  introduction_made: 2,
  completed: 3,
  disputed: 4,
  cancelled: 4,
};

const dealSteps = computed(() => {
  const currentStatusIndex = dealStatusMap[deal.value?.status] || 0;
  const steps = [
    { name: 'Pending', description: 'Connector has claimed the bounty.', icon: DollarSign },
    { name: 'Funded', description: 'Seeker has funded the escrow.', icon: MessageSquare },
    { name: 'Introduction Made', description: 'Connector makes the introduction.', icon: Handshake },
    { name: 'Completed', description: 'Seeker confirms and funds are released.', icon: CheckCircle },
  ];

  return steps.map((step, index) => {
    let status = 'upcoming';
    if (index < currentStatusIndex) status = 'complete';
    if (index === currentStatusIndex) status = 'current';
    if (deal.value?.status === 'disputed' || deal.value?.status === 'cancelled') {
      if (index === currentStatusIndex-1) {
          step.icon = XCircle;
          status = 'error';
      }
    }
    return { ...step, status };
  });
});
</script>