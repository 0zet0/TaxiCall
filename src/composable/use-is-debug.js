import { computed } from 'vue';

export const isDebug = computed(() => !('mp' in window));
