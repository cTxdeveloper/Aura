import VueApexCharts from 'vue3-apexcharts';
import { defineNuxtPlugin } from '#app';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(VueApexCharts);
  nuxtApp.vueApp.component('Apexchart', VueApexCharts); // Optional: Register globally if needed frequently by this name
});
