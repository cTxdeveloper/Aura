<template>
  <NuxtLink :to="`/bounties/${bounty.id}`">
    <div class="quantum-glass p-5 flex flex-col md:flex-row justify-between items-start gap-4 transition-all duration-300 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 cursor-pointer">
      <div class="flex-grow">
        <div class="flex items-center gap-3 mb-2">
          <span class="bg-primary/10 text-primary text-xs font-bold px-2 py-1 rounded-full">{{ bounty.category }}</span>
        </div>
        <h3 class="text-lg font-semibold text-white mb-1">{{ bounty.title }}</h3>
        <div class="flex items-center gap-4 text-xs text-text-secondary">
          <img :src="`https://ui-avatars.com/api/?name=${bounty.creator.full_name}&background=16161C&color=94A3B8&size=16`" class="w-4 h-4 rounded-full" />
          <span>By {{ bounty.creator.full_name }}</span>
          <span>•</span>
          <span>{{ useTimeAgo(bounty.created_at) }}</span>
        </div>
      </div>
      <div class="flex-shrink-0 text-right">
        <p class="text-2xl font-bold text-secondary">${{ bounty.amount.toFixed(2) }}</p>
        <p class="text-xs text-text-secondary">Bounty</p>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup>
defineProps({ bounty: Object });
</script>