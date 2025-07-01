<template>
  <div class="overflow-x-hidden">
    <!-- Hero Section -->
    <section class="relative h-screen flex items-center justify-center text-center">
      <div class="absolute inset-0 opacity-50">
        <MascotNexusCrystal />
      </div>
      <div 
        class="relative z-10"
        v-motion
        :initial="{ opacity: 0, y: 20 }"
        :enter="{ opacity: 1, y: 0, transition: { duration: 1000, delay: 500 } }"
      >
        <h1 class="text-5xl md:text-8xl font-extrabold tracking-tighter text-white mb-6">
          Your Network is Your Net Worth.<br/>
          <span class="text-gradient">Unlock It.</span>
        </h1>
        <p class="max-w-3xl mx-auto text-lg text-text-secondary mb-8">
          Aura is the Trust Engine for high-value professional networking, powered by AI-assisted escrow. We turn skepticism into certainty.
        </p>
        <div class="flex gap-4 justify-center">
          <UiAppButton to="/bounties" variant="primary" size="large" :icon="Zap">Explore The Foundry</UiAppButton>
        </div>
      </div>
    </section>

    <!-- How it Works Section -->
    <section class="container mx-auto py-32">
      <h2 class="text-center text-4xl font-bold mb-16">A Marketplace Built on Trust, Not Luck.</h2>
      <div class="grid md:grid-cols-3 gap-8">
        <UiGlassCard class="animate-fade-in-up" style="animation-delay: 0.1s;">
          <div class="flex flex-col items-center text-center">
            <div class="bg-primary/10 p-4 rounded-full mb-4"><Zap class="w-8 h-8 text-primary"/></div>
            <h3 class="text-xl font-bold mb-2">Post a Bounty</h3>
            <p class="text-text-secondary">Clearly define the connection you need. Our AI helps you craft an enforceable request.</p>
          </div>
        </UiGlassCard>
        <UiGlassCard class="animate-fade-in-up" style="animation-delay: 0.3s;">
          <div class="flex flex-col items-center text-center">
             <div class="bg-secondary/10 p-4 rounded-full mb-4"><ShieldCheck class="w-8 h-8 text-secondary"/></div>
            <h3 class="text-xl font-bold mb-2">Secure Escrow</h3>
            <p class="text-text-secondary">Fund the bounty. Funds are held by our secure, automated escrow until the deal is complete.</p>
          </div>
        </UiGlassCard>
        <UiGlassCard class="animate-fade-in-up" style="animation-delay: 0.5s;">
          <div class="flex flex-col items-center text-center">
             <div class="bg-blue-500/10 p-4 rounded-full mb-4"><Handshake class="w-8 h-8 text-blue-400"/></div>
            <h3 class="text-xl font-bold mb-2">Get Connected</h3>
            <p class="text-text-secondary">Receive a warm, double opt-in introduction. We verify the connection was made before releasing funds.</p>
          </div>
        </UiGlassCard>
      </div>
    </section>
  </div>
</template>

<script setup>
import { Zap, ShieldCheck, Handshake } from 'lucide-vue-next';
definePageMeta({ layout: 'landing' });
</script>