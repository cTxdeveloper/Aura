import { defineStore } from 'pinia';
import type { AppNotification } from '~/types'; // Import the type

// The AppNotification interface is now imported from '~/types'
// export interface AppNotification {
//   id: string;
//   type: 'success' | 'error' | 'info' | 'warning';
//   message: string;
//   duration?: number; // in ms, undefined for persistent
// }

interface UIState {
  isPageLoading: boolean;
  isModalOpen: Record<string, boolean>; // e.g., { loginModal: true, bountyFormModal: false }
  theme: 'dark' | 'light'; // If we allow theme switching beyond the default
  notifications: AppNotification[]; // This will now use the imported AppNotification
}

export const useUIStore = defineStore('ui', {
  state: (): UIState => ({
    isPageLoading: false,
    isModalOpen: {},
    theme: 'dark', // Default to dark as per design
    notifications: [],
  }),

  getters: {
    isLoading: (state) => state.isPageLoading,
    activeModals: (state) => state.isModalOpen,
    currentTheme: (state) => state.theme,
    activeNotifications: (state) => state.notifications,
  },

  actions: {
    setPageLoading(isLoading: boolean) {
      this.isPageLoading = isLoading;
    },

    openModal(modalId: string) {
      this.isModalOpen[modalId] = true;
    },

    closeModal(modalId: string) {
      this.isModalOpen[modalId] = false;
    },

    toggleModal(modalId: string) {
      this.isModalOpen[modalId] = !this.isModalOpen[modalId];
    },

    setTheme(theme: 'dark' | 'light') {
      this.theme = theme;
      // Potentially also update body class or Vuetify theme instance
      if (process.client) {
        document.documentElement.setAttribute('data-theme', theme);
      }
    },

    addNotification(notification: Omit<AppNotification, 'id'>) {
      const id = Math.random().toString(36).substring(2, 9);
      const newNotification = { ...notification, id };
      this.notifications.push(newNotification);

      if (notification.duration) {
        setTimeout(() => {
          this.removeNotification(id);
        }, notification.duration);
      }
    },

    removeNotification(notificationId: string) {
      this.notifications = this.notifications.filter(n => n.id !== notificationId);
    },

    clearNotifications() {
      this.notifications = [];
    }
  }
});
