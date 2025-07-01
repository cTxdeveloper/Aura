<template>
  <div class="flex items-center justify-center py-12">
    <div class="w-full max-w-md">
      <div class="text-center mb-8">
        <h2 class="text-4xl font-bold text-white">Welcome Back</h2>
        <p class="text-text-secondary mt-2">Log in to access your Aura dashboard.</p>
      </div>
      <form @submit.prevent="onSubmit" class="quantum-glass p-8 space-y-6">
        <UiFormInput v-model="email" label="Email Address" id="email" type="email" :icon="Mail" :error="errors.email" placeholder="you@example.com" />
        <UiFormInput v-model="password" label="Password" id="password" type="password" :icon="Lock" :error="errors.password" placeholder="Your password" />
        
        <UiAppButton type="submit" variant="primary" class="w-full" size="large" :loading="isSubmitting">
          Log In
        </UiAppButton>
        <p class="text-xs text-center text-text-secondary">Don't have an account? <NuxtLink to="/auth/register" class="font-semibold text-primary hover:underline">Sign Up</NuxtLink></p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { useForm, useField } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import * as z from 'zod';
import { Mail, Lock } from 'lucide-vue-next';
import { useAuthStore } from '~/store/auth';

const authStore = useAuthStore();
const router = useRouter();

const validationSchema = toTypedSchema(
  z.object({
    email: z.string().email('Must be a valid email'),
    password: z.string().min(1, 'Password is required'),
  })
);

const { handleSubmit, errors, isSubmitting } = useForm({ validationSchema });

const { value: email } = useField('email');
const { value: password } = useField('password');

const onSubmit = handleSubmit(async (values) => {
  const success = await authStore.login({
    username: values.email,
    password: values.password
  });
  if (success) {
    router.push('/dashboard');
  }
});
</script>