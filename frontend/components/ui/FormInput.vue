<template>
  <div class="form-input-wrapper">
    <label v-if="label" :for="inputId" class="block text-sm font-medium text-gray-300 mb-1.5">
      {{ label }}
    </label>
    <div class="relative">
      <div v-if="iconLeft" class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none z-10">
        <component :is="iconLeft" class="h-5 w-5 text-gray-400" aria-hidden="true" />
      </div>
      <input
        :id="inputId"
        ref="inputRef"
        :type="currentType"
        :name="name"
        :value="fieldValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :autocomplete="autocomplete"
        class="form-input block w-full sm:text-sm rounded-lg"
        :class="[
          iconLeft ? 'pl-10' : 'px-3.5',
          iconRight || type === 'password' ? 'pr-10' : 'px-3.5',
          inputBaseClasses,
          effectiveErrorMessage ? errorClasses : (isFocused ? focusClasses : defaultBorderClasses)
        ]"
        @input="onInput"
        @blur="onBlurInternal"
        @focus="isFocused = true"
      />
      <div v-if="type === 'password' || iconRight" class="absolute inset-y-0 right-0 pr-3.5 flex items-center z-10">
        <button
          v-if="type === 'password'"
          type="button"
          @click="togglePasswordVisibility"
          class="text-gray-400 hover:text-gray-300 focus:outline-none"
          aria-label="Toggle password visibility"
        >
          <component :is="isPasswordVisible ? EyeOffIcon : EyeIcon" class="h-5 w-5" />
        </button>
        <component :is="iconRight" v-else-if="iconRight" class="h-5 w-5 text-gray-400" aria-hidden="true" />
      </div>
    </div>
    <p v-if="effectiveErrorMessage" class="mt-1.5 text-xs text-red-400" :id="`${inputId}-error`">
      {{ effectiveErrorMessage }}
    </p>
    <p v-if="hint && !effectiveErrorMessage" class="mt-1.5 text-xs text-gray-500">
      {{ hint }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, FunctionalComponent, SVGAttributes, toRef, watch } from 'vue';
import { useField } from 'vee-validate';
// Assuming EyeIcon and EyeOffIcon are available, e.g., from lucide-vue-next or heroicons
// For this example, let's assume they would be imported if used.
// import { EyeIcon, EyeOffIcon } from 'lucide-vue-next'; // Or your preferred icon library

// Placeholder icons if not using a library for this self-contained example
const EyeIcon = { render: () => '👁️' } as FunctionalComponent<SVGAttributes>;
const EyeOffIcon = { render: () => '🙈' } as FunctionalComponent<SVGAttributes>;


type InputTypeOption = 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search';

interface Props {
  modelValue?: string | number;
  name: string;
  label?: string;
  placeholder?: string;
  type?: InputTypeOption;
  disabled?: boolean;
  iconLeft?: FunctionalComponent<SVGAttributes> | null;
  iconRight?: FunctionalComponent<SVGAttributes> | null; // This will be overridden by password toggle if type is password
  hint?: string;
  autocomplete?: string;
  errorMessage?: string; // Allow passing error message directly
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: undefined,
  label: '',
  placeholder: '',
  type: 'text',
  disabled: false,
  iconLeft: null,
  iconRight: null,
  hint: '',
  autocomplete: 'off',
  errorMessage: undefined,
});

const emit = defineEmits(['update:modelValue', 'blur', 'focus']);

const nameRef = toRef(props, 'name');
const {
  value: fieldValue,
  errorMessage: veeErrorMessage,
  handleBlur,
  handleChange,
  meta,
} = useField(nameRef, undefined, {
  initialValue: props.modelValue,
  label: props.label || props.name,
  validateOnValueUpdate: false, // Only validate on blur or explicit trigger, not every keystroke
});

watch(() => props.modelValue, (newVal) => {
  if (newVal !== fieldValue.value) {
    fieldValue.value = newVal as string | number;
  }
});

const effectiveErrorMessage = computed(() => props.errorMessage || veeErrorMessage.value);
const inputId = computed(() => `form-input-${props.name}-${Math.random().toString(36).substring(2, 7)}`);
const isFocused = ref(false);
const isPasswordVisible = ref(false);

const currentType = computed(() => {
  if (props.type === 'password') {
    return isPasswordVisible.value ? 'text' : 'password';
  }
  return props.type;
});

const togglePasswordVisibility = () => {
  isPasswordVisible.value = !isPasswordVisible.value;
};

const onInput = (event: Event) => {
  const targetValue = (event.target as HTMLInputElement).value;
  handleChange(targetValue, false); // Don't validate on input for better UX
  emit('update:modelValue', targetValue);
};

const onBlurInternal = (event: FocusEvent) => {
  isFocused.value = false;
  handleChange((event.target as HTMLInputElement).value, true); // Validate on blur
  handleBlur(event); // VeeValidate's blur handler for its own state
  emit('blur', event);
};


const inputBaseClasses = 'bg-obsidian-black/40 text-white placeholder-gray-500 py-2.5 border focus:outline-none focus:ring-0';
const defaultBorderClasses = 'border-gray-700/70 hover:border-gray-500/90'; // Slightly more visible hover
const focusClasses = 'border-quantum-purple ring-1 ring-quantum-purple/60'; // Glow effect on focus
const errorClasses = 'border-red-500/80 text-red-400 placeholder-red-400/60 ring-1 ring-red-500/70';

</script>

<style scoped>
.form-input {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  transition: border-color 0.2s ease-in-out, ring-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
}
</style>
