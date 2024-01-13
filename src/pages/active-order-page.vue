<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <div class="active-order-page">
        <ion-modal
          ref="modal"
          :initial-breakpoint="0.5"
          :breakpoints="[0.25, 0.5, 0.75]"
          :is-open="true"
          :backdrop-breakpoint="1"
          @didDismiss="() => show && modal.$el.present()"
        >
          <div class="active-order-page__wrapper size-full">
            <ScrollbarList class="mt-16 pl-16 pr-16" height="calc(75% - 120px)">
              <ActiveOrderItem
                v-for="activeOrder in createOrderStore.activeOrders"
                :key="activeOrder.id"
                :item="activeOrder"
                :active="selectedOrder === activeOrder.id"
                @click="selectOrder(activeOrder)"
              />
            </ScrollbarList>
          </div>
        </ion-modal>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ToggleButton } from '@/components/button';
import { ScrollbarList } from '@/components/scrollbar-list';
import { ActiveOrderItem } from '@/components/list-item';

import { addressesModel } from '@/entities/addresses';
import { createOrderModel } from '@/entities/create-order';
import { useMapControllerStore } from '@/entities/map-controller';
import { menuModel } from '@/entities/menu';

import { onIonViewWillEnter, onIonViewWillLeave } from '@ionic/vue';
import { nextTick, ref, watch } from 'vue';
import { useRouter } from 'vue-router';

const menuStore = menuModel();
const addressesStore = addressesModel();
const createOrderStore = createOrderModel();
const mapController = useMapControllerStore();

const modal = ref();
const show = ref(true);
const router = useRouter();
const selectedOrder = ref();

const selectOrder = (order: any) => {
  selectedOrder.value = selectedOrder.value === order.id ? null : order.id;
};

onIonViewWillEnter(async () => {
  await nextTick();

  show.value = true;
  modal.value.$el.present();
  menuStore.showMenu = true;
  mapController.show = true;

  menuStore.toggle = (state: boolean) => {
    show.value = !state;
    menuStore.show = !state;
    if (state) modal.value.$el.dismiss();
    else if (router.currentRoute.value.name === 'ActiveOrderPage') modal.value.$el.present();
  };

  await createOrderStore.fetchActiveOrders();

  if (createOrderStore.activeOrders[0]) selectOrder(createOrderStore.activeOrders[0]);
});

onIonViewWillLeave(() => {
  show.value = false;
  modal.value.$el.dismiss();
  menuStore.showMenu = false;
});
</script>

<style lang="scss" scoped>
.active-order-page {
  &__location {
    position: absolute;
    right: 15px;
    top: -60px;
  }

  &__back {
    position: absolute;
    left: 15px;
    top: -60px;
  }

  &__rotate {
    transform: rotateZ(180deg);
  }

  &__wrapper {
    background: #eee;
    border-radius: 25px 25px 0 0;
  }
}
</style>
