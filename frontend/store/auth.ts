import { defineStore } from 'pinia';

interface User {
  id: string;
  email: string;
  role: 'seeker' | 'connector' | null;
  // Add other user properties as needed
  // e.g., name: string, profilePictureUrl?: string, etc.
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    token: null, // Could be stored in localStorage/cookie as well by Nuxt auth modules
    isAuthenticated: false,
    loading: false,
    error: null,
  }),

  getters: {
    currentUser: (state) => state.user,
    isUserAuthenticated: (state) => state.isAuthenticated,
    isLoading: (state) => state.loading,
    authError: (state) => state.error,
    userRole: (state) => state.user?.role,
  },

  actions: {
    // Example login action - replace with actual API call
    async login(credentials: { email: string; password: string }) {
      this.loading = true;
      this.error = null;
      try {
        // const { data, error } = await useApiFetch('/auth/login', { method: 'POST', body: credentials });
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        const MOCK_USER_DATA: User = { id: '1', email: credentials.email, role: 'seeker' };
        const MOCK_TOKEN = 'mock-jwt-token';

        // if (error.value) throw error.value;

        this.user = MOCK_USER_DATA; // data.value.user;
        this.token = MOCK_TOKEN; // data.value.token;
        this.isAuthenticated = true;
        // Potentially set token in a cookie or local storage if not handled by a Nuxt auth utility

      } catch (err: any) {
        this.error = err.message || 'Failed to login';
        this.isAuthenticated = false;
        this.user = null;
        this.token = null;
      } finally {
        this.loading = false;
      }
    },

    async register(_payload: any) { // Prefixed payload with _
      this.loading = true;
      this.error = null;
      try {
        // const { data, error } = await useApiFetch('/auth/register', { method: 'POST', body: payload });
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        // if (error.value) throw error.value;
        // Typically, registration might not log the user in immediately, or it might.
        // Depending on that, you might call login action or set user state here.
        // console.log('Registration successful (simulated)', payload);

      } catch (err: any) {
        this.error = err.message || 'Failed to register';
      } finally {
        this.loading = false;
      }
    },

    logout() {
      this.user = null;
      this.token = null;
      this.isAuthenticated = false;
      // Also clear token from cookie/localStorage
      // Potentially redirect to login page
    },

    // Action to initialize auth state from stored token (e.g., on app load)
    async fetchUser() {
      // This action would typically be called in app.vue or a middleware
      // to check if a token exists and fetch user data
      if (!this.token && process.client) { // check for token from cookie/localStorage
          // const storedToken = localStorage.getItem('auth_token');
          // if (storedToken) this.token = storedToken;
      }

      if (this.token && !this.isAuthenticated) {
        this.loading = true;
        try {
            // const { data, error } = await useApiFetch('/auth/me'); // Endpoint to get current user
            // const { data, error } = await useApiFetch('/auth/me'); // Endpoint to get current user
            // if (error.value) throw error.value;
            // this.user = data.value.user;
            // this.isAuthenticated = true;
            await Promise.resolve(); // Placeholder for async operation
            // console.log('User hydrated (simulated)');
        } catch (error: any) {
            // console.error('Failed to fetch user on init:', error.message);
            this.logout(); // Clear invalid state
        } finally {
            this.loading = false;
        }
      }
    }
  }
});
