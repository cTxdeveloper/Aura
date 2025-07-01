<template>
  <div>
    <TransitionGroup
      tag="div"
      :css="false"
      @before-enter="onBeforeEnter"
      @enter="onEnter"
      @leave="onLeave"
    >
      <slot />
    </TransitionGroup>
  </div>
</template>

<script setup>
import gsap from 'gsap';

const props = defineProps({
  stagger: { type: Number, default: 0.08 },
  duration: { type: Number, default: 0.5 },
});

const onBeforeEnter = (el) => {
  el.style.opacity = 0;
  el.style.transform = 'translateY(20px)';
};

const onEnter = (el, done) => {
  gsap.to(el, {
    opacity: 1,
    y: 0,
    duration: props.duration,
    delay: el.dataset.index * props.stagger,
    ease: 'power3.out',
    onComplete: done,
  });
};

const onLeave = (el, done) => {
  gsap.to(el, {
    opacity: 0,
    y: -20,
    duration: props.duration,
    delay: el.dataset.index * props.stagger,
    ease: 'power3.in',
    onComplete: done,
  });
};
</script>