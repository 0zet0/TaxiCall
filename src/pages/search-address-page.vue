<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <div class="search-address-page">
        <ion-modal
          ref="modal"
          :initial-breakpoint="0.75"
          :breakpoints="[0, 0.75]"
          :backdrop-breakpoint="0.3"
          @didDismiss="() => close && menuStore.backPage()"
        >
          <div class="flex flex-col size-full">
            <div class="search-address-page__wrapper flex flex-col size-full">
              <div class="p-15">
                <InputLocation :onSearch="onSearch" :onFocus="onFocus" />
              </div>
              <ScrollbarList height="calc(75% - 150px)">
                <LocationItem
                  v-for="address in addressesStore.addresses"
                  :key="address.id"
                  :item="address"
                  @click="selectAddress(address)"
                />
              </ScrollbarList>
            </div>
          </div>
        </ion-modal>
      </div>
    </ion-content>
  </ion-page>
</template>
<script setup lang="ts">
import { onIonViewWillEnter, onIonViewWillLeave } from '@ionic/vue';
import { InputLocation } from '@/components/input-location';
import { LocationItem } from '@/components/list-item';
import { ScrollbarList } from '@/components/scrollbar-list';

import { inject, Ref, ref } from 'vue';
import { addressesModel } from '@/entities/addresses';
import { useRouter } from 'vue-router';
import { createOrderModel } from '@/entities/create-order';
import getAddress from '@/shared/lib/get-address';
import { menuModel } from '@/entities/menu';
import { useMapControllerStore } from '@/entities/map-controller';

const addressesStore = addressesModel();
const createOrderStore = createOrderModel();
const menuStore = menuModel();
const mapController = useMapControllerStore();

const activeAddress = ref(0);
const modal = ref();
const close = ref(false);
const router = useRouter();
const addressCount = ref(0);

if (!addressesStore.isLoaded) addressesStore.fetchAddresses('');

const onSearch = (e: any) => {
  addressesStore.fetchAddresses(e.target.value);
};

const onFocus = (idx: number) => {
  activeAddress.value = idx;
};

const selectAddress = (address: any) => {
  if (activeAddress.value === 0) {
    addressesStore.selectAddress(address, 0);

    addressesStore.lastAddress = addressesStore.selectedAddresses[0].city;

    createOrderStore.meetingInfo = '';
  } else addressesStore.selectAddress(address, 1);

  if (addressesStore.selectedAddresses.length > 1) mapController.drawRoutes();
  else mapController.clearRoutes();
};

onIonViewWillEnter(() => {
  modal.value.$el.present();
  close.value = true;
  addressCount.value = addressesStore.selectedAddresses.length || 1;
});

onIonViewWillLeave(() => {
  close.value = false;
  modal.value.$el.dismiss();
});
</script>
<style lang="scss" scoped>
.search-address-page {
  &__wrapper {
    background: #fff;
    border-radius: 30px 30px 0 0;
    overflow: hidden;
  }
}
</style>
