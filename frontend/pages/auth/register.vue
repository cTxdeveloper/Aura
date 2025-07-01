<template>
  <div class="flex items-center justify-center py-12">
    <div class="w-full max-w-md">
      <div class="text-center mb-8">
        <h2 class="text-4xl font-bold text-white">Forge Your Aura Key</h2>
        <p class="text-text-secondary mt-2">Join a trusted network of professionals.</p>
      </div>
      <form class="quantum-glass p-8 space-y-6" @submit.prevent="onSubmit">
        <UiFormInput id="full_name" v-model="fullName" label="Full Name" :icon="User" :error="errors.full_name" placeholder="John Doe" />
        <UiFormInput id="email" v-model="email" label="Email Address" type="email" :icon="Mail" :error="errors.email" placeholder="you@example.com" />
        <UiFormInput id="password" v-model="password" label="Password" type="password" :icon="Lock" :error="errors.password" placeholder="8+ characters" />
        
        <div>
           <label class="block text-sm font-medium text-text-secondary mb-2">I am a...</label>
           <div class="grid grid-cols-2 gap-2">
              <button type="button" :class="['p-4 border rounded-lg text-center transition-colors', role === 'seeker' ? 'bg-primary/20 border-primary' : 'border-border-color hover:border-primary/50']" @click="role = 'seeker'">
                <span class="font-semibold">Seeker</span>
                <p class="text-xs text-text-secondary">I need connections</p>
              </button>
              <button type="button" :class="['p-4 border rounded-lg text-center transition-colors', role === 'connector' ? 'bg-primary/20 border-primary' : 'border-border-color hover:border-primary/50']" @click="role = 'connector'">
                <span class="font-semibold">Connector</span>
                <p class="text-xs text-text-secondary">I have connections</p>
              </button>
           </div>
        </div>

        <UiAppButton type="submit" variant="primary" class="w-full" size="large" :loading="isSubmitting">
          Create My Account
        </UiAppButton>
        <p class="text-xs text-center text-text-secondary">Already have an account? <NuxtLink to="/auth/login" class="font-semibold text-primary hover:underline">Log In</NuxtLink></p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { useForm, useField } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import * as z from 'zod';
import { User, Mail, Lock } from 'lucide-vue-next';
import { useAuthStore } from '~/store/auth';

const authStore = useAuthStore();
const router = useRouter();

const validationSchema = toTypedSchema(
  z.object({
    full_name: z.string().min(2, 'Name is too short'),
    email: z.string().email('Must be a valid email'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    role: z.enum(['seeker', 'connector']),
  })
);

const { handleSubmit, errors, isSubmitting } = useForm({
  validationSchema,
  initialValues: { role: 'seeker' }
});

const { value: fullName } = useField('full_name');
const { value: email } = useField('email');
const { value: password } = useField('password');
const { value: role } = useField('role');

const onSubmit = handleSubmit(async (values) => {
  const success = await authStore.register(values);
  if (success) {
    router.push('/dashboard');
  }
});
</script>