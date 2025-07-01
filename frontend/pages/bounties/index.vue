<template>
  <div class="container mx-auto py-8 px-4 md:px-0">
    <div class="flex flex-col md:flex-row justify-between items-center mb-10">
      <h1 class="text-4xl font-bold text-white mb-4 md:mb-0">
        Bounty <span class="text-quantum-purple">Marketplace</span>
      </h1>
      <AppButton to="/bounties/new" variant="primary" size="lg">
        Post a New Bounty
      </AppButton>
    </div>

    <div class="grid grid-cols-12 gap-x-8">
      <!-- Filters Column -->
      <div class="col-span-12 md:col-span-3 mb-8 md:mb-0">
        <GlassCard padding="p-6" class="sticky top-8">
          <h2 class="text-xl font-semibold text-white mb-4 border-b border-white/10 pb-3">Filters</h2>
          <!-- Placeholder for BountyFilters.vue -->
          <div class="space-y-4">
            <div>
              <label for="filter-category" class="block text-sm font-medium text-gray-300 mb-1">Category</label>
              <select id="filter-category" class="form-input block w-full sm:text-sm rounded-md bg-obsidian-black/40 text-white placeholder-gray-500 py-2 px-3 border border-gray-700/70 focus:ring-quantum-purple focus:border-quantum-purple">
                <option>All Categories</option>
                <option>Investment</option>
                <option>Design</option>
                <option>Marketing</option>
                <option>Co-founder Search</option>
              </select>
            </div>
            <div>
              <label for="filter-status" class="block text-sm font-medium text-gray-300 mb-1">Status</label>
              <select id="filter-status" class="form-input block w-full sm:text-sm rounded-md bg-obsidian-black/40 text-white placeholder-gray-500 py-2 px-3 border border-gray-700/70 focus:ring-quantum-purple focus:border-quantum-purple">
                <option>All</option>
                <option>Open</option>
                <option>Claimed</option>
                <option>In Progress</option>
              </select>
            </div>
            <AppButton variant="outline" size="sm" block>Apply Filters</AppButton>
          </div>
          <!-- <BountyFilters /> -->
        </GlassCard>
      </div>

      <!-- Bounties Column -->
      <div class="col-span-12 md:col-span-9">
        <div v-if="isLoadingBounties" class="flex justify-center items-center h-96">
          <AppLoader size="xl" text-label-content="Fetching Bounties..." :show-text-label="true" />
        </div>
        <div v-else-if="fetchBountiesError" class="text-center py-12">
          <GlassCard padding="p-8" class="max-w-md mx-auto">
            <h3 class="text-xl font-semibold text-red-400 mb-3">Error Loading Bounties</h3>
            <p class="text-gray-400 mb-6">{{ fetchBountiesError }}</p>
            <AppButton variant="outline" @click="loadBounties">Try Again</AppButton>
          </GlassCard>
        </div>
        <div v-else-if="sampleBounties && sampleBounties.length > 0" class="space-y-6">
          <BountyCard
            v-for="bounty in sampleBounties"
            :key="bounty.id"
            :bounty="bounty"
            @view="navigateToBounty"
          />
        </div>
        <div v-else class="text-center py-20">
          <GlassCard padding="p-10">
            <svg class="w-16 h-16 text-gray-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 18a8 8 0 100-16 8 8 0 000 16z"></path></svg>
            <h3 class="text-2xl font-bold text-white mb-3">No Bounties Found</h3>
            <p class="text-gray-400 mb-6">
              It seems the marketplace is quiet right now, or no bounties match your current filters.
            </p>
            <AppButton to="/bounties/new" variant="primary">
              Be the First to Post a Bounty
            </AppButton>
          </GlassCard>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
// Components AppButton, GlassCard, AppLoader, BountyCard are expected to be auto-imported by Nuxt

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

const sampleBounties = ref<BountySummary[]>([]);
const isLoadingBounties = ref(true);
const fetchBountiesError = ref<string | null>(null);

const loadBounties = async () => {
  isLoadingBounties.value = true;
  fetchBountiesError.value = null;
  try {
    await new Promise(resolve => setTimeout(resolve, 1200)); // Simulate API call
    sampleBounties.value = [
      {
        id: '1',
        title: 'Introduction to Series A Investor in FinTech',
        description: 'Seeking a warm intro to a partner-level investor at a Tier 1 VC firm specializing in FinTech for our upcoming Series A round. Proven track record required.',
        amount: 5000,
        status: 'open',
        seekerNickname: 'FinConnectX',
        category: 'Investment',
        tags: ['FinTech', 'Series A', 'VC Intro', 'Growth Stage'],
      },
      {
        id: '2',
        title: 'Need UI/UX Design Lead for SaaS Product',
        description: 'Looking for an experienced UI/UX design lead to overhaul our current SaaS platform. Must have experience with complex dashboards and data visualization. Portfolio essential.',
        amount: 2500,
        status: 'open',
        seekerNickname: 'SaaSBuilderCo',
        category: 'Design',
        tags: ['UI/UX', 'SaaS', 'Dashboard Design', 'Figma'],
      },
      {
        id: '3',
        title: 'Access to Marketing Exec at Major CPG Brand',
        description: 'Need to connect with a VP of Marketing or higher at a top 10 CPG company to discuss a potential partnership for our innovative packaging solution. Urgent need.',
        amount: 3000,
        status: 'claimed',
        seekerNickname: 'PackInnovate',
        category: 'Marketing',
        tags: ['CPG', 'Partnership', 'Networking', 'Urgent'],
      },
      {
        id: '4',
        title: 'Technical Co-founder for AI Startup (Stealth)',
        description: 'Early-stage AI startup with a strong concept looking for a technical co-founder with expertise in Python, NLP, and machine learning. Equity + small stipend.',
        amount: 1000,
        status: 'in progress',
        seekerNickname: 'AI Visionary',
        category: 'Co-founder Search',
        tags: ['AI', 'NLP', 'Machine Learning', 'Startup', 'Python'],
      },
       {
        id: '5',
        title: 'Beta Testers for New Mobile Productivity App',
        description: 'Seeking 50 active beta testers for a new iOS and Android productivity app. Testers will receive a lifetime premium subscription and other perks.',
        amount: 100, // Nominal amount or could be non-monetary
        status: 'open',
        seekerNickname: 'AppDevPro',
        category: 'Software Testing',
        tags: ['Beta Test', 'Mobile App', 'iOS', 'Android', 'Productivity'],
      },
    ];
  } catch (error) {
    console.error("Error fetching bounties (simulated):", error);
    fetchBountiesError.value = 'Failed to load bounties. Please try again.';
  } finally {
    isLoadingBounties.value = false;
  }
};

const navigateToBounty = (bountyId: string) => {
  if (typeof navigateTo === 'function') {
    navigateTo(`/bounties/${bountyId}`); // Assumes dynamic route [id].vue exists
  } else {
    console.warn('navigateTo function is not available. Could not navigate to bounty:', bountyId);
  }
};

onMounted(() => {
  loadBounties();
});

useHead({
  title: 'Bounty Marketplace - The Access Marketplace',
  meta: [
    { name: 'description', content: 'Explore bounties for valuable introductions and network access. Find opportunities or provide connections.' }
  ]
});
</script>

<style scoped>
/* Custom select style to match the theme if needed, though base Tailwind is used for now */
.form-input { /* Re-using class name for consistency, can be more specific */
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%239ca3af' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
  background-position: right 0.5rem center;
  background-repeat: no-repeat;
  background-size: 1.5em 1.5em;
  padding-right: 2.5rem; /* Make space for arrow */
}
</style>
