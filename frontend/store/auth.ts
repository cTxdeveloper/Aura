import { defineStore } from 'pinia';
import type { User } from '~/types';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: useCookie('auth_token').value || null as string | null,
    user: null as User | null,
  }),
  getters: {
    isAuthenticated: (state): boolean => !!state.token && !!state.user,
  },
  actions: {
    async register(data: any) {
      try {
        await $fetch('/auth/register', {
          baseURL: useRuntimeConfig().public.apiBase,
          method: 'POST',
          body: data,
        });
        await this.login({ username: data.email, password: data.password });
        return true;
      } catch (e) {
        console.error("Registration failed:", e);
        return false;
      }
    },
    async login(data: any) {
      try {
        const formData = new URLSearchParams();
        formData.append('username', data.username);
        formData.append('password', data.password);

        const response: any = await $fetch('/auth/login/token', {
          baseURL: useRuntimeConfig().public.apiBase,
          method: 'POST',
          body: formData,
        });
        
        const tokenCookie = useCookie('auth_token', { maxAge: 60 * 60 * 24 * 7, sameSite: 'lax' });
        tokenCookie.value = response.access_token;
        this.token = response.access_token;
        
        await this.fetchUser();
        return true;
      } catch (e) {
        console.error("Login failed:", e);
        return false;
      }
    },
    async fetchUser() {
      if (this.token) {
        try {
          const { data } = await useApiFetch('/auth/me');
          if (data.value) {
            this.user = data.value as User;
          } else {
            this.logout();
          }
        } catch (e) {
          console.error("Failed to fetch user", e);
          this.logout();
        }
      }
    },
    logout() {
      const tokenCookie = useCookie('auth_token');
      tokenCookie.value = null;
      this.token = null;
      this.user = null;
      navigateTo('/');
    }
  }
});