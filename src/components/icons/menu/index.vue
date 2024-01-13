<template>
  <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
    <path d="M26.25 22.5H3.75V20H26.25V22.5ZM26.25 16.25H3.75V13.75H26.25V16.25ZM26.25 10H3.75V7.5H26.25V10Z" :fill="color" />
  </svg>
</template>
<script setup lang="ts">
defineProps({
  color: { type: String, default: '#343434' },
});
</script>
