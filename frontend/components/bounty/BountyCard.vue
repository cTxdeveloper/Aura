<template>
  <GlassCard
    ref="cardRef"
    :interactive="true"
    hover-effect="glow" <!-- Or 'lift', 'glow' is subtle on GlassCard by default -->
    class="bounty-card flex flex-col h-full"
    :padding="padding"
    :style="{ transform: cardTransform, transition: 'transform 0.05s linear' }"
  >
    <div class="flex-grow">
      <div class="flex justify-between items-start mb-3">
        <h3 class="text-lg font-semibold text-white truncate mr-2" :title="bounty.title">
          {{ bounty.title }}
        </h3>
        <span
          class="px-2 py-0.5 text-xs font-semibold rounded-full flex-shrink-0"
          :class="statusColorClass"
        >
          {{ bounty.status }}
        </span>
      </div>

      <p class="text-sm text-gray-400 mb-3 h-10 overflow-hidden line-clamp-2">
        {{ bounty.description }}
      </p>

      <div class="mb-3">
        <span class="text-2xl font-bold text-quantum-purple">${{ bounty.amount.toLocaleString() }}</span>
        <span class="text-xs text-gray-500 ml-1">USD</span>
      </div>

      <div class="text-xs text-gray-500 mb-3 space-y-0.5">
        <p>By: <span class="font-medium text-gray-400">{{ bounty.seekerNickname || 'Anonymous Seeker' }}</span></p>
        <p v-if="bounty.category">Category: <span class="font-medium text-gray-400">{{ bounty.category }}</span></p>
      </div>

      <div v-if="bounty.tags && bounty.tags.length" class="mb-4 flex flex-wrap gap-1.5">
        <span
          v-for="tag in bounty.tags.slice(0, 3)"
          :key="tag"
          class="px-2 py-0.5 text-xs bg-gray-700/60 text-gray-300 rounded-full"
        >
          {{ tag }}
        </span>
        <span v-if="bounty.tags.length > 3" class="text-xs text-gray-500 self-center">
          +{{ bounty.tags.length - 3 }}
        </span>
      </div>
    </div>

    <div class="mt-auto pt-4 border-t border-white/10">
      <AppButton variant="outline" size="sm" block @click="viewBounty" class="w-full">
        View Details
      </AppButton>
    </div>
  </GlassCard>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useMouseInElement } from '@vueuse/core';
// Assuming GlassCard and AppButton are auto-imported by Nuxt from components/ui/

interface BountySummary {
  id: string;
  title: string;
  description: string;
  amount: number;
  status: 'open' | 'claimed' | 'in progress' | 'completed' | 'expired';
  seekerNickname?: string;
  category?: string;
  tags?: string[];
}

interface Props {
  bounty: BountySummary;
  padding?: string;
}

const props = withDefaults(defineProps<Props>(), {
  padding: 'p-5', // Default padding for bounty cards
});

const emit = defineEmits(['view']);

const viewBounty = () => {
  emit('view', props.bounty.id);
  // Example navigation:
  // if (typeof navigateTo === 'function') {
  //   navigateTo(`/bounties/${props.bounty.id}`);
  // }
};

const statusColorClass = computed(() => {
  switch (props.bounty.status.toLowerCase()) {
    case 'open': return 'bg-guardian-green/20 text-guardian-green';
    case 'claimed': return 'bg-yellow-500/20 text-yellow-400';
    case 'in progress': return 'bg-blue-500/20 text-blue-400';
    case 'completed': return 'bg-gray-600/30 text-gray-400';
    case 'expired': return 'bg-red-500/20 text-red-400';
    default: return 'bg-gray-700 text-gray-300';
  }
});

// 3D Tilt Effect Logic
const cardRef = ref<HTMLElement | null>(null); // This ref is attached to the GlassCard component instance

// useMouseInElement will track mouse position relative to the cardRef element
const { elementX, elementY, elementWidth, elementHeight, isOutside } = useMouseInElement(cardRef, {
  handleOutside: true, // Reset transform when mouse leaves
});

const cardTransform = computed(() => {
  if (isOutside.value || !cardRef.value) {
    // Reset to default state
    return 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
  }

  const MAX_ROTATION = 6; // Max rotation in degrees for a more subtle effect
  const percentageX = elementX.value / elementWidth.value;
  const percentageY = elementY.value / elementHeight.value;

  const rotateX = (percentageY - 0.5) * -MAX_ROTATION * 2;
  const rotateY = (percentageX - 0.5) * MAX_ROTATION * 2;

  return `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`; // Slightly scale up
});

</script>

<style scoped>
.bounty-card {
  /* The perspective is now part of the transform style for better control */
}
.line-clamp-2 {
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  /* autoprefixer: off */
  -webkit-box-orient: vertical;
  /* autoprefixer: on */
}
.truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
