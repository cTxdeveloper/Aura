import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import { aliases, mdi } from 'vuetify/iconsets/mdi'; // Or mdi-js if you prefer
import { defineNuxtPlugin } from '#app';
import '@mdi/font/css/materialdesignicons.min.css'; // Ensure you have this
import 'vuetify/styles'; // Global Vuetify styles

// Your custom theme
const quantumGlassTheme = {
  dark: true, // Assuming a dark theme overall
  colors: {
    background: '#101014', // Obsidian Black
    surface: '#1E1E24', // Slightly lighter for cards, dialogs if needed
    primary: '#7F5AF0', // Quantum Purple
    'primary-darken-1': '#5F3DB0',
    secondary: '#2CB67D', // Guardian Green (can be an alternative accent)
    'secondary-darken-1': '#1B9A5D',
    error: '#FF5252',
    info: '#2196F3',
    success: '#2CB67D', // Guardian Green
    warning: '#FFC107',
    // Custom colors for text and borders
    'on-background': '#FFFFFF',
    'on-surface': '#FFFFFF',
    'on-primary': '#FFFFFF',
    'on-secondary': '#FFFFFF',
    'on-success': '#FFFFFF',
    'on-error': '#FFFFFF',
    'border-color': 'rgba(255, 255, 255, 0.12)',
    'glass-bg': 'rgba(18, 18, 22, 0.5)', // Not a standard Vuetify color, but you can use it in custom components
  },
  variables: {
    'border-color': '#FFFFFF',
    'border-opacity': 0.12,
    'high-emphasis-opacity': 1,
    'medium-emphasis-opacity': 0.70,
    'disabled-opacity': 0.50,
    'idle-opacity': 0.10,
    // Spacing, border-radius etc. can be customized here as well
    // 'rounded-borders': '8px',
  }
};

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    ssr: true, // Important for Nuxt
    components,
    directives,
    icons: {
      defaultSet: 'mdi',
      aliases,
      sets: {
        mdi,
      },
    },
    theme: {
      defaultTheme: 'quantumGlassTheme',
      themes: {
        quantumGlassTheme,
      },
    },
    // Global defaults for components
    // defaults: {
    //   VBtn: {
    //     color: 'primary',
    //     variant: 'flat',
    //     // other defaults
    //   },
    //   VCard: {
    //     elevation: 0, // Using glassmorphism, so default elevation might not be needed
    //     // custom class for glass effect?
    //   }
    // }
  });

  nuxtApp.vueApp.use(vuetify);
});
