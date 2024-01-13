<template>
  <button class="ion-activatable button">
    <slot />
    <ion-ripple-effect class="custom-ripple" :style="{ '--color': options.color }" :type="options.type"></ion-ripple-effect>
  </button>
</template>

<script setup lang="ts">
defineProps({
  options: {
    type: Object,
    default: () => ({
      color: '#343434',
      type: 'bounded',
    }),
  },
});
</script>

<style lang="scss" scoped>
.button {
  position: relative;
  overflow: hidden;

  .custom-ripple {
    color: var(--color);
  }
}
</style>
