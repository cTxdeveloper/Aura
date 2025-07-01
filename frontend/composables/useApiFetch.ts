import type { UseFetchOptions } from 'nuxt/app';
import { useAuthStore } from '~/store/auth';

export const useApiFetch: typeof useFetch = (request, opts) => {
  const config = useRuntimeConfig();
  const authStore = useAuthStore();

  const defaultOptions: UseFetchOptions<any> = {
    baseURL: config.public.apiBase,
    
    // Add the token to the request headers if it exists
    onRequest({ options }) {
      if (authStore.token) {
        options.headers = {
          ...options.headers,
          Authorization: `Bearer ${authStore.token}`,
        };
      }
    },
    
    // Handle global 401 Unauthorized errors
    onResponseError({ response }) {
      if (response.status === 401) {
        // We only logout if a request to an authenticated endpoint fails.
        // A failed login attempt also returns 401, but we don't want to logout then.
        if (!response.request.toString().includes('/auth/login/token')) {
            useUiStore().showToast('Your session has expired. Please log in again.', 'error');
            authStore.logout();
        }
      }
    },
  };

  return useFetch(request, { ...defaultOptions, ...opts });
};