<template>
  <div class="select-location-screen size-full flex flex-col gap-17">
    <InputLocation :onSearch="onSearch" :onFocus="onFocus" />
    <ScrollbarList height="calc(75% - 150px)">
      <LocationItem v-for="address in addressesStore.addresses" :key="address.id" :item="address" @click="selectAddress(address)" />
    </ScrollbarList>
  </div>
</template>

<script setup lang="ts">
import { InputLocation } from '@/components/input-location';
import { LocationItem } from '@/components/list-item';
import { ScrollbarList } from '@/components/scrollbar-list';

import { inject, Ref, ref } from 'vue';
import { addressesModel } from '@/entities/addresses';

const activeScreen = inject('activeScreen') as Ref<number>;
const addressesStore = addressesModel();
const activeAddress = ref(0);

if (!addressesStore.isLoaded) addressesStore.fetchAddresses('');

const onSearch = (e: any) => {
  addressesStore.fetchAddresses(e.target.value);
};

const onFocus = (idx: number) => {
  activeAddress.value = idx;
};

const selectAddress = (address: any) => {
  addressesStore.selectAddress(address, activeAddress.value);

  if (activeAddress.value === 1) activeScreen.value = 2;
};
</script>

<style lang="scss" scoped></style>
