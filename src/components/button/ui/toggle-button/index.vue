<template>
  <button class="ion-activatable toggle-button --center" :style="{ background }">
    <slot />
    <ion-ripple-effect :style="{ color }" type="unbounded"></ion-ripple-effect>
  </button>
</template>
<script setup lang="ts">
defineProps({
  background: { type: String, default: '#343434' },
  color: { type: String, default: '#fff' },
});
</script>
<style lang="scss" scoped>
.toggle-button {
  position: relative;
  border-radius: 50%;
  overflow: hidden;
  aspect-ratio: 1/1;
}
</style>
