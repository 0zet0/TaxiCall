import { useGetIcon, nullSlot } from '@/composable';
import { useStore } from 'vuex';
import { computed } from 'vue';

export default function useGetQuickSlot(index) {
  const { inventories, config } = useStore().state.Inventory;

  const getSlot = computed(() => {
    let item = nullSlot;

    for (let i = 0; i < inventories.length; i++) {
      const inventory = inventories[i];

      if (!Array.isArray(inventory)) continue;

      for (const slot of inventory) {
        if (typeof slot !== 'object') continue;

        if (slot.quickSlotId === index) {
          item = { ...item, ...slot };

          return {
            ...item,
            ...config.find((i) => i.id === item.id),
            zoneId: i,
          };
        }
      }
    }

    return nullSlot;
  });

  const getIcon = computed(() => useGetIcon(getSlot.value.icon));

  return {
    getSlot,
    getIcon,
  };
}
