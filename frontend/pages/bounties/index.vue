<template>
  <div>
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-4xl font-bold">The Foundry</h1>
      <UiAppButton to="/bounties/new" variant="primary" :icon="Plus">Post a Bounty</UiAppButton>
    </div>
    
    <div class="grid grid-cols-12 gap-8">
      <div class="col-span-12 md:col-span-3">
        <BountyFilters />
      </div>
      <div class="col-span-12 md:col-span-9">
        <div v-if="pending" class="flex justify-center items-center h-64"><UiAppLoader /></div>
        <div v-else-if="error" class="text-red-400 quantum-glass p-8 text-center">
          <h3 class="text-lg font-bold">An Error Occurred</h3>
          <p>Could not load The Foundry. Please try again later.</p>
        </div>
        <MotionStaggeredList v-else-if="bounties && bounties.length > 0" class="space-y-4">
          <BountyCard 
            v-for="(bounty, index) in bounties" 
            :key="bounty._id" 
            :bounty="bounty"
            :data-index="index"
          />
        </MotionStaggeredList>
        <div v-else class="text-center py-20 quantum-glass">
          <h3 class="text-2xl font-bold text-white mb-2">The Foundry is Quiet</h3>
          <p class="text-text-secondary mb-6">Be the spark. Post a bounty to attract top-tier Connectors.</p>
          <UiAppButton to="/bounties/new" variant="primary" :icon="Plus">Post a Bounty</UiAppButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Plus } from 'lucide-vue-next';
const { data: bounties, pending, error } = await useApiFetch('/bounties');
</script>