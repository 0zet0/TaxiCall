<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <div class="order-detail-page">
        <ion-modal
          ref="modal"
          style="--height: auto"
          :initial-breakpoint="1"
          :breakpoints="[0, 1]"
          :is-open="true"
          :backdrop-breakpoint="1"
          @didDismiss="() => show && menuStore.backPage()"
        >
          <div class="order-detail-page__wrapper size-full">
            <ScrollbarList class="flex flex-col items-center" height="auto">
              <div class="order-detail-page__card top flex flex-col items-center w-full">
                <div v-if="createOrderStore.selectedActiveOrders.performer" class="flex flex-col items-center mt-20 gap-8">
                  <span class="font-700-24 auto-truncate">
                    {{ `За рулем ${createOrderStore.selectedActiveOrders.performer?.first_name || 'Водитель'}` }}
                  </span>
                  <span class="font-400-18 auto-truncate">
                    {{
                      `${createOrderStore.selectedActiveOrders.performer.transport?.color || ''} ${
                        createOrderStore.selectedActiveOrders.performer.transport?.model || ''
                      }`
                    }}
                  </span>
                </div>
                <div v-if="createOrderStore.selectedActiveOrders.performer" class="flex mt-25">
                  <div class="--center flex-col gap-7 w-full">
                    <ion-avatar class="w-55 h-55">
                      <img alt="Silhouette of a person's head" src="https://ionicframework.com/docs/img/demos/avatar.svg" />
                    </ion-avatar>
                    <span class="order-detail-page__text font-400-12 text-center">{{
                      createOrderStore.selectedActiveOrders.performer?.first_name
                    }}</span>
                  </div>
                </div>
                <div class="order-detail-page__address flex flex-col w-full mt-25">
                  <div class="flex gap-20 items-center w-full">
                    <span class="order-detail-page__address_circle"></span>
                    <RippleButton class="w-full h-60 flex items-center rounded-10 pl-5 pr-5" @click.prevent.stop>
                      <div class="flex gap-20 items-center justify-between w-full">
                        <span class="font-400-16 truncate">{{ getAddress(createOrderStore.selectedActiveOrders.from_address, true) }}</span>
                        <!-- <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none">
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M9.11568 7.50005L4.55762 2.94199L5.4415 2.05811L10.8834 7.50005L5.4415 12.942L4.55762 12.0581L9.11568 7.50005Z"
                            fill="#00CCFF"
                          />
                        </svg> -->
                      </div>
                    </RippleButton>
                  </div>
                  <div class="flex gap-25 w-full">
                    <span class="w-15"></span>
                    <div class="order-detail-page__address_line"></div>
                  </div>
                  <div class="flex gap-20 items-center w-full">
                    <span class="order-detail-page__address_rect"></span>
                    <RippleButton class="w-full h-60 flex items-center rounded-10 pl-5 pr-5">
                      <div class="flex gap-20 items-center justify-between w-full">
                        <span class="font-400-16 truncate">
                          {{ getAddress(createOrderStore.selectedActiveOrders.to_addresses[0], true) }}
                        </span>
                        <!-- <add-icon @click.prevent.stop /> -->
                      </div>
                    </RippleButton>
                  </div>
                </div>
              </div>
              <div class="order-detail-page__card --center flex-col gap-7 w-full mt-25">
                <ToggleButton class="w-55 h-55" background="#F5F4F2" color="#000" @click.prevent.stop="cancelOrder">
                  <DeleteIcon />
                </ToggleButton>
                <span class="order-detail-page__text font-400-12 text-center">
                  Отменить <br />
                  заказ
                </span>
              </div>
            </ScrollbarList>
          </div>
        </ion-modal>
        <ion-toast
          style="--background: #fff; --background-rgb: #fff"
          ref="toast"
          message="Ваш заказ успешно отменен."
          :duration="4000"
        ></ion-toast>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ToggleButton, RippleButton } from '@/components/button';
import { DeleteIcon, AddIcon } from '@/components/icons';
import { ScrollbarList } from '@/components/scrollbar-list';
import { ActiveOrderItem } from '@/components/list-item';

import { addressesModel } from '@/entities/addresses';
import { createOrderModel } from '@/entities/create-order';
import { useMapControllerStore } from '@/entities/map-controller';
import { menuModel } from '@/entities/menu';

import { onIonViewWillEnter, onIonViewWillLeave } from '@ionic/vue';
import { nextTick, ref } from 'vue';
import { useRouter } from 'vue-router';
import getAddress from '@/shared/lib/get-address';
import { socketStates } from '@/socket';

const menuStore = menuModel();
const addressesStore = addressesModel();
const createOrderStore = createOrderModel();
const mapController = useMapControllerStore();

const modal = ref();
const show = ref(true);
const router = useRouter();
const toast = ref();

const cancelOrder = async () => {
  if (!createOrderStore.selectedActiveOrders.id) return;

  const res = await createOrderStore.cancelOrders(createOrderStore.selectedActiveOrders.id);
  if (res) {
    if (toast.value) {
      toast.value.$el.message = 'Ваш заказ успешно отменен.';
      toast.value.$el.present();
    }
    menuStore.backPage();
  } else {
    if (toast.value) {
      toast.value.$el.message = 'Не удалось отменить заказ!';
      toast.value.$el.present();
    }
  }
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
    else if (router.currentRoute.value.name === 'OrderDetailPage') modal.value.$el.present();
  };

  mapController.tryDrawRoute = true;
  mapController.drawActiveOrderRoutes();
});

onIonViewWillLeave(() => {
  show.value = false;
  modal.value.$el.dismiss();
  menuStore.showMenu = false;

  mapController.tryDrawRoute = false;
  mapController.clearRoutes();
});
</script>

<style lang="scss" scoped>
.order-detail-page {
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

  &__text {
    color: #9d9d9d;
  }

  &__address {
    &_circle {
      width: 15px;
      height: 15px;
      border-radius: 50%;
      border: 3px solid #0cf;
      aspect-ratio: 1/1;
    }

    &_rect {
      width: 15px;
      height: 15px;
      border: 3px solid #343434;
      aspect-ratio: 1/1;
    }

    &_line {
      height: 1px;
      width: 100%;
      background: #eee;
    }

    &_btn {
      padding: 10px 14px;
      border-radius: 15px;
      background: #eee;
    }
  }

  &__text {
    color: #000;
    font-family: 'Open Sans';
    font-style: normal;
  }

  &__line {
    width: 100%;
    height: 1px;
    background: #eee;
  }

  &__card {
    padding: 18px 20px;
    background: #fff;

    &.top {
      border-radius: 25px 25px 0 0;
    }

    &.bottom {
      border-radius: 0 0 25px 25px;
    }
  }
}
</style>
