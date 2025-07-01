import { defineStore } from 'pinia';

export const useUiStore = defineStore('ui', {
  state: () => ({
    isGlobalLoading: false,
    toast: null as { message: string; type: 'success' | 'error' } | null,
  }),
  actions: {
    setGlobalLoading(isLoading: boolean) {
      this.isGlobalLoading = isLoading;
    },
    showToast(message: string, type: 'success' | 'error' = 'success') {
      this.toast = { message, type };
      setTimeout(() => {
        this.toast = null;
      }, 3000);
    },
  },
});