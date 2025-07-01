<template>
  <div class="landing-page-container text-white">
    <section class="hero min-h-screen flex flex-col items-center justify-center text-center p-8 relative overflow-hidden">
      <!-- Background elements (e.g., gradient, noise, Nexus animation placeholder) -->
      <div class="absolute inset-0 -z-10">
        <!-- Example: Dark purple gradient background -->
        <div class="absolute inset-0 bg-gradient-to-br from-obsidian-black via-gray-900 to-purple-900 opacity-70"></div>
        <!-- Noise effect could be added via CSS or a subtle image -->
      </div>

      <!-- Nexus Mascot Placeholder -->
      <div class="mb-12">
        <!-- Placeholder for NexusMascot.vue component or a direct SVG/animation -->
        <svg width="150" height="150" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" class="mx-auto animate-pulse">
          <defs>
            <linearGradient id="heroNexusGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:#7F5AF0;stop-opacity:1" />
              <stop offset="100%" style="stop-color:#FFFFFF;stop-opacity:1" />
            </linearGradient>
          </defs>
          <polygon points="50,5 95,35 80,95 20,95 5,35" fill="url(#heroNexusGradient)" stroke="#FFFFFF" stroke-width="0.5"/>
        </svg>
        <p class="mt-4 text-lg text-quantum-purple animate-fadeIn" style="animation-delay: 0.5s;">Nexus</p>
      </div>

      <h1 class="text-5xl md:text-7xl font-bold mb-6 animate-slideInUp">
        Your Network is Your <span class="text-quantum-purple">Net Worth.</span>
      </h1>
      <p class="text-xl md:text-2xl mb-10 text-gray-300 animate-slideInUp" style="animation-delay: 0.2s;">
        Unlock It. The Access Marketplace.
      </p>
      <div class="space-x-4 animate-slideInUp" style="animation-delay: 0.4s;">
        <NuxtLink
          to="/bounties"
          class="bg-quantum-purple hover:bg-purple-700 text-white font-semibold py-3 px-8 rounded-lg shadow-lg transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-quantum-purple focus:ring-opacity-50"
        >
          Find an Introduction
        </NuxtLink>
        <NuxtLink
          to="/auth/register?role=connector"
          class="bg-transparent hover:bg-quantum-purple border-2 border-quantum-purple text-quantum-purple hover:text-white font-semibold py-3 px-8 rounded-lg shadow-lg transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-quantum-purple focus:ring-opacity-50"
        >
          Become a Connector
        </NuxtLink>
      </div>
    </section>

    <!-- How It Works Section -->
    <section id="how-it-works" class="py-16 md:py-24 bg-obsidian-black/70 backdrop-blur-sm">
      <div class="container mx-auto px-6 md:px-8">
        <h2 class="text-3xl md:text-4xl font-bold text-center mb-16 text-white">
          How <span class="text-quantum-purple">The Access Marketplace</span> Works
        </h2>
        <div class="grid md:grid-cols-3 gap-8 text-center">
          <GlassCard :interactive="true" hover-effect="lift" class="flex flex-col items-center">
            <div class="p-4 bg-quantum-purple/20 rounded-full mb-4 inline-block">
              <!-- Placeholder for Icon 1 -->
              <svg class="w-8 h-8 text-quantum-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </div>
            <h3 class="text-xl font-semibold mb-2 text-white">1. Define Your Need</h3>
            <p class="text-gray-300 text-sm">
              Seekers post a "Bounty" detailing the introduction or access they need and the reward they're offering.
            </p>
          </GlassCard>
          <GlassCard :interactive="true" hover-effect="lift" class="flex flex-col items-center">
            <div class="p-4 bg-quantum-purple/20 rounded-full mb-4 inline-block">
              <!-- Placeholder for Icon 2 -->
              <svg class="w-8 h-8 text-quantum-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M5 6h14M5 10h14M5 14h14M5 18h14"></path></svg>
            </div>
            <h3 class="text-xl font-semibold mb-2 text-white">2. Connectors Respond</h3>
            <p class="text-gray-300 text-sm">
              Trusted Connectors with relevant networks can claim bounties, proposing how they can facilitate the introduction.
            </p>
          </GlassCard>
          <GlassCard :interactive="true" hover-effect="lift" class="flex flex-col items-center">
            <div class="p-4 bg-quantum-purple/20 rounded-full mb-4 inline-block">
              <!-- Placeholder for Icon 3 -->
              <svg class="w-8 h-8 text-quantum-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            </div>
            <h3 class="text-xl font-semibold mb-2 text-white">3. Value Secured & Exchanged</h3>
            <p class="text-gray-300 text-sm">
              Funds are held in escrow. Upon successful introduction, the Connector is paid. Trust and transparency, guaranteed.
            </p>
          </GlassCard>
        </div>
      </div>
    </section>

    <!-- The Problem Section -->
    <section id="the-problem" class="py-16 md:py-24">
      <div class="container mx-auto px-6 md:px-8">
        <div class="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 class="text-3xl md:text-4xl font-bold mb-6 text-white">
              The <span class="text-red-500">Chaos</span> of Modern Networking
            </h2>
            <p class="text-gray-300 mb-4 text-lg">
              Endless LinkedIn requests, cold emails into the void, introductions that go nowhere. Finding the right connection at the right time feels like searching for a needle in a haystack.
            </p>
            <ul class="space-y-2 text-gray-400">
              <li class="flex items-center"><span class="text-red-500 mr-2">&times;</span>Wasted time on low-value interactions.</li>
              <li class="flex items-center"><span class="text-red-500 mr-2">&times;</span>Lack of trust and accountability.</li>
              <li class="flex items-center"><span class="text-red-500 mr-2">&times;</span>Gatekeepers and inaccessible networks.</li>
              <li class="flex items-center"><span class="text-red-500 mr-2">&times;</span>No clear way to incentivize valuable introductions.</li>
            </ul>
          </div>
          <div class="relative h-64 md:h-96">
            <!-- Placeholder for "Chaos" animation/graphic -->
            <div class="absolute inset-0 rounded-lg bg-gray-800/30 flex items-center justify-center">
              <p class="text-gray-500 text-2xl"> chaotic_networking_visual.svg </p>
              <!-- Could be an SVG animation of tangled lines, overflowing icons -->
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- The Solution Section -->
    <section id="the-solution" class="py-16 md:py-24 bg-obsidian-black/70 backdrop-blur-sm">
      <div class="container mx-auto px-6 md:px-8">
        <div class="grid md:grid-cols-2 gap-12 items-center">
          <div class="relative h-64 md:h-96 order-last md:order-first">
            <!-- Placeholder for "Solution" animation/graphic -->
            <div class="absolute inset-0 rounded-lg bg-gray-800/30 flex items-center justify-center">
               <p class="text-gray-500 text-2xl"> orderly_connection_path.svg </p>
              <!-- Could be an SVG animation showing a clear path from Seeker to Connector to Target -->
            </div>
          </div>
          <div>
            <h2 class="text-3xl md:text-4xl font-bold mb-6 text-white">
              Introducing <span class="text-quantum-purple">Order & Value</span>
            </h2>
            <p class="text-gray-300 mb-4 text-lg">
              The Access Marketplace transforms networking into a transparent, incentivized, and efficient process. We bring structure to the unstructured.
            </p>
            <ul class="space-y-3 text-gray-300">
              <li class="flex items-start">
                <span class="text-guardian-green mr-3 mt-1">&#10003;</span>
                <div>
                  <h4 class="font-semibold text-white">Targeted Bounties</h4>
                  <p class="text-sm text-gray-400">Clearly define what you need, ensuring only relevant Connectors respond.</p>
                </div>
              </li>
              <li class="flex items-start">
                <span class="text-guardian-green mr-3 mt-1">&#10003;</span>
                <div>
                  <h4 class="font-semibold text-white">Verified Connectors</h4>
                  <p class="text-sm text-gray-400">A curated network of professionals with proven access and reputation.</p>
                </div>
              </li>
              <li class="flex items-start">
                <span class="text-guardian-green mr-3 mt-1">&#10003;</span>
                <div>
                  <h4 class="font-semibold text-white">Secure Escrow System</h4>
                  <p class="text-sm text-gray-400">Rewards are held securely and released only upon successful introduction, building trust for all parties.</p>
                </div>
              </li>
               <li class="flex items-start">
                <span class="text-guardian-green mr-3 mt-1">&#10003;</span>
                <div>
                  <h4 class="font-semibold text-white">Mutual Benefit</h4>
                  <p class="text-sm text-gray-400">Seekers gain valuable access, Connectors are rewarded for their network and effort.</p>
                </div>
              </li>
            </ul>
             <AppButton to="/bounties" variant="primary" size="lg" class="mt-8">
              Explore Bounties
            </AppButton>
          </div>
        </div>
      </div>
    </section>

    <!-- Our Story / Founder's Story Section -->
    <section id="our-story" class="py-16 md:py-24">
      <div class="container mx-auto px-6 md:px-8 text-center">
        <GlassCard class="max-w-3xl mx-auto" padding="p-8 md:p-12">
          <h2 class="text-3xl md:text-4xl font-bold mb-6 text-white">
            From Frustration to <span class="text-quantum-purple">Fruition</span>
          </h2>
          <img
            src="https://via.placeholder.com/150"
            alt="Founder Name"
            class="w-32 h-32 rounded-full mx-auto mb-6 ring-4 ring-quantum-purple/50"
          />
          <p class="text-gray-300 mb-4 text-lg leading-relaxed">
            "I built The Access Marketplace because I experienced firsthand the inefficiencies and opaqueness of traditional networking. My mission is to empower professionals by providing a transparent, fair, and effective platform to unlock the true value of connections."
          </p>
          <p class="text-gray-400 font-semibold mb-1"> - [Founder's Name] </p>
          <p class="text-gray-500 text-sm">Founder & CEO, The Access Marketplace</p>

          <div class="mt-8">
            <AppButton to="/manifesto" variant="outline" size="md">
              Read Our Manifesto
            </AppButton>
          </div>
        </GlassCard>
      </div>
    </section>

    <!-- Call to Action Section -->
    <section class="py-16 md:py-24 bg-gradient-to-r from-purple-800 via-quantum-purple to-purple-600">
        <div class="container mx-auto px-6 md:px-8 text-center">
            <h2 class="text-3xl md:text-4xl font-bold text-white mb-6">
                Ready to Unlock Your Network's Potential?
            </h2>
            <p class="text-purple-200 text-lg mb-10 max-w-2xl mx-auto">
                Join The Access Marketplace today. Whether you're seeking crucial introductions or looking to monetize your valuable network, your journey starts here.
            </p>
            <div class="space-y-4 md:space-y-0 md:space-x-6">
                <AppButton to="/auth/register?role=seeker" variant="primary" size="xl" class="bg-white text-quantum-purple hover:bg-gray-200">
                    I Need Introductions
                </AppButton>
                <AppButton to="/auth/register?role=connector" variant="outline" size="xl" class="border-white text-white hover:bg-white/10">
                    I Have Connections
                </AppButton>
            </div>
        </div>
    </section>


  </div>
</template>

<script setup lang="ts">
// Import UI components if they are not globally registered by Nuxt
// import GlassCard from '~/components/ui/GlassCard.vue';
// import AppButton from '~/components/ui/AppButton.vue';

definePageMeta({
  layout: 'landing', // Use the landing layout
});

useHead({
  title: 'The Access Marketplace - Unlock Your Network',
  meta: [
    { name: 'description', content: 'The premier platform for monetizing your professional network and finding high-value introductions. Post bounties, make connections, and grow your net worth.' }
  ]
});

// Placeholder for GSAP animations if needed for more complex interactions
// import { gsap } from 'gsap';
// onMounted(() => {
//   gsap.fromTo('.hero h1', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1, delay: 0.5 });
// });
</script>

<style scoped>
/* Specific styles for the landing page */
.hero {
  /* You might add a subtle animated gradient or particle effect here later */
}

/* Add a bit of depth to the glass effect cards on hover */
.glass-effect:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(127, 90, 240, 0.2); /* quantum-purple with opacity */
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
</style>
