<template>
  <div v-if="!authStore.user" class="flex justify-center items-center h-64"><UiAppLoader /></div>
  <div v-else>
    <div class="mb-8">
      <h1 class="text-4xl font-bold">Welcome back, {{ authStore.user.full_name }}</h1>
      <p class="text-text-secondary mt-1">{{ authStore.user.headline }}</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <!-- Key Stats -->
      <UiGlassCard>
        <p class="text-sm text-text-secondary">Wallet Balance</p>
        <p class="text-3xl font-bold text-white">${{ authStore.user.wallet_balance.toFixed(2) }}</p>
      </UiGlassCard>
      <UiGlassCard>
        <p class="text-sm text-text-secondary">Reputation</p>
        <p class="text-3xl font-bold text-white">{{ authStore.user.reputation_score.toFixed(1) }} / 5.0</p>
      </UiGlassCard>
      <UiGlassCard>
        <p class="text-sm text-text-secondary">Active Deals</p>
        <p class="text-3xl font-bold text-white">3</p> <!-- This would be dynamic data fetched from a /deals/me endpoint -->
      </UiGlassCard>
    </div>

    <div class="mt-12">
      <h2 class="text-2xl font-bold mb-4">Earnings Overview</h2>
      <div class="quantum-glass p-6">
        <ClientOnly>
          <apexchart type="area" height="350" :options="chartOptions" :series="series"></apexchart>
          <template #fallback>
            <div class="h-[350px] flex items-center justify-center">
              <UiAppLoader />
            </div>
          </template>
        </ClientOnly>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '~/store/auth';
definePageMeta({ middleware: 'auth' }); // You will need to create this middleware in /middleware/auth.ts

const authStore = useAuthStore();

const chartOptions = {
  chart: {
    type: 'area',
    height: 350,
    zoom: { enabled: false },
    toolbar: { show: false },
    background: 'transparent'
  },
  dataLabels: { enabled: false },
  stroke: { curve: 'smooth', width: 3, colors: ['#7F5AF0'] },
  fill: {
    type: 'gradient',
    gradient: {
      shadeIntensity: 1,
      opacityFrom: 0.7,
      opacityTo: 0.1,
      stops: [0, 90, 100]
    },
    colors: ['#7F5AF0']
  },
  xaxis: {
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    labels: { style: { colors: '#94A3B8' } },
    axisBorder: { show: false },
    axisTicks: { show: false },
  },
  yaxis: {
    labels: { style: { colors: '#94A3B8' }, formatter: (val) => `$${val}` },
  },
  grid: {
    borderColor: 'rgba(255, 255, 255, 0.1)',
    strokeDashArray: 4,
  },
  tooltip: { theme: 'dark' }
};

const series = [{
  name: 'Earnings',
  data: [31, 40, 28, 51, 42, 109, 100] // Dummy data
}];
</script>