import { useStore } from 'vuex';

export function isAccessed(level) {
  const { adminLevel } = useStore().state.Player;

  return level <= adminLevel || true;
}
