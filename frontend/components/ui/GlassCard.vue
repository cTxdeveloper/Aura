<template>
  <div 
    ref="card" 
    class="quantum-glass p-6 transition-all duration-300"
    :style="{ transform: cardTransform, transition: 'transform 0.1s ease-out' }"
  >
    <slot />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useMouseInElement } from '@vueuse/core'

const card = ref(null)
const { elementX, elementY, elementWidth, elementHeight, isOutside } = useMouseInElement(card)

const cardTransform = computed(() => {
  if (isOutside.value) return ''
  const rotateX = (elementY.value / elementHeight.value - 0.5) * -15
  const rotateY = (elementX.value / elementWidth.value - 0.5) * 15
  return `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03)`
})
</script>