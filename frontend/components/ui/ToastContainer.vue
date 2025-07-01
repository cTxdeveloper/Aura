<template>
  <div class="fixed bottom-0 right-0 p-6 space-y-4 z-[100]">
    <TransitionGroup name="toast">
      <div 
        v-for="toast in uiStore.toasts" 
        :key="toast.id" 
        :class="['quantum-glass flex items-center gap-4 p-4 min-w-[300px] shadow-2xl', toastTypeClasses[toast.type]]"
      >
        <component :is="toastIcons[toast.type]" class="w-6 h-6 flex-shrink-0" />
        <p class="text-sm font-medium text-text-primary">{{ toast.message }}</p>
        <button @click="uiStore.dismissToast(toast.id)" class="ml-auto">
          <X class="w-5 h-5 text-text-secondary hover:text-white" />
        </button>
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup>
import { useUiStore } from '~/store/ui';
import { CheckCircle, AlertTriangle, Info, X } from 'lucide-vue-next';
const uiStore = useUiStore();

const toastTypeClasses = {
  success: 'border-secondary/50',
  error: 'border-danger/50',
  info: 'border-primary/50'
};

const toastIcons = {
  success: CheckCircle,
  error: AlertTriangle,
  info: Info,
};
</script>