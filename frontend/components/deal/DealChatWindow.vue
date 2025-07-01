<template>
  <div class="quantum-glass flex flex-col h-[75vh]">
    <div class="p-4 border-b border-border-color flex-shrink-0">
      <h2 class="font-bold text-white">Secure Deal Room</h2>
      <p class="text-sm text-text-secondary">Bounty: {{ deal.bounty.title }}</p>
    </div>

    <div ref="chatContainer" class="flex-grow p-4 space-y-4 overflow-y-auto">
      <!-- Chat Messages -->
      <div v-for="message in localDeal.chat_history" :key="message.timestamp" 
           :class="['flex items-end gap-2', message.sender.id === authStore.user.id ? 'justify-end' : 'justify-start']">
        <div v-if="message.sender.id !== authStore.user.id" class="flex-shrink-0">
          <img :src="`https://ui-avatars.com/api/?name=${message.sender.full_name}&size=32`" class="w-8 h-8 rounded-full" />
        </div>
        <div :class="['max-w-md p-3 rounded-lg', message.sender.id === authStore.user.id ? 'bg-primary text-white' : 'bg-surface text-text-primary']">
          <p class="text-sm">{{ message.content }}</p>
          <p class="text-xs opacity-70 mt-1 text-right">{{ useTimeAgo(message.timestamp) }}</p>
        </div>
      </div>
    </div>

    <div class="p-4 border-t border-border-color flex-shrink-0">
      <form @submit.prevent="sendMessage" class="flex gap-2">
        <FormInput v-model="newMessage" id="chat-message" placeholder="Type your message..." class="flex-grow" />
        <UiAppButton type="submit" variant="primary" :icon="Send" :loading="isSending" />
      </form>
    </div>
  </div>
</template>

<script setup>
import { Send } from 'lucide-vue-next';
import { useAuthStore } from '~/store/auth';
import { useUiStore } from '~/store/ui';

const props = defineProps({ deal: Object });
const authStore = useAuthStore();
const uiStore = useUiStore();

const localDeal = ref(props.deal);
const newMessage = ref('');
const isSending = ref(false);
const chatContainer = ref(null);

const scrollToBottom = () => {
  nextTick(() => {
    if (chatContainer.value) {
      chatContainer.value.scrollTop = chatContainer.value.scrollHeight;
    }
  });
};

onMounted(scrollToBottom);
watch(() => localDeal.value.chat_history, scrollToBottom, { deep: true });

async function sendMessage() {
  if (!newMessage.value.trim()) return;
  isSending.value = true;
  
  const tempMessage = {
    sender: authStore.user,
    content: newMessage.value,
    timestamp: new Date().toISOString()
  };
  // Optimistic update
  localDeal.value.chat_history.push(tempMessage);

  try {
    const { data: updatedDeal, error } = await useApiFetch(`/deals/${props.deal.id}/messages`, {
      method: 'POST',
      body: { content: newMessage.value },
    });

    if (error.value) throw error.value;
    
    localDeal.value = updatedDeal.value;
    newMessage.value = '';
  } catch (e) {
    // Revert optimistic update on error
    localDeal.value.chat_history.pop();
    uiStore.showToast('Failed to send message.', 'error');
  } finally {
    isSending.value = false;
  }
}
</script>