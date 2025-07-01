<template>
  <div v-if="authStore.user" class="relative">
    <button @click="isOpen = !isOpen" class="flex items-center gap-2">
      <img :src="`https://ui-avatars.com/api/?name=${authStore.user.full_name}&background=7F5AF0&color=fff`" alt="User Avatar" class="w-8 h-8 rounded-full border-2 border-primary">
      <ChevronDown class="w-4 h-4 text-text-secondary transition-transform" :class="{ 'rotate-180': isOpen }" />
    </button>
    <Transition name="slide-down">
      <div v-if="isOpen" @click="isOpen = false" class="absolute right-0 mt-2 w-48 quantum-glass p-2 rounded-lg shadow-lg z-20">
        <div class="px-3 py-2 text-xs text-text-secondary border-b border-border-color">
          Signed in as <strong class="text-white">{{ authStore.user.full_name }}</strong>
        </div>
        <div class="py-1">
          <NuxtLink to="/dashboard" class="flex items-center w-full px-3 py-2 text-sm text-text-secondary hover:bg-surface rounded-md"><LayoutDashboard class="w-4 h-4 mr-2"/>Dashboard</NuxtLink>
          <NuxtLink to="/settings/profile" class="flex items-center w-full px-3 py-2 text-sm text-text-secondary hover:bg-surface rounded-md"><Settings class="w-4 h-4 mr-2"/>Settings</NuxtLink>
        </div>
        <div class="py-1 border-t border-border-color">
          <button @click="authStore.logout()" class="flex items-center w-full px-3 py-2 text-sm text-danger hover:bg-surface rounded-md"><LogOut class="w-4 h-4 mr-2"/>Log Out</button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useAuthStore } from '~/store/auth';
import { ChevronDown, LayoutDashboard, Settings, LogOut } from 'lucide-vue-next';
const authStore = useAuthStore();
const isOpen = ref(false);
</script>