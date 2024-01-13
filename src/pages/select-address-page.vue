<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <div class="select-address-page">
        <ion-modal
          ref="modal"
          style="--height: auto"
          :initial-breakpoint="1"
          :breakpoints="[0, 1]"
          :backdrop-breakpoint="1"
          @didDismiss="() => hideModal && menuStore.backPage()"
        >
          <div class="select-address-page__wrapper size-full p-20 flex flex-col gap-17">
            <ToggleButton class="select-address-page__location w-50 h-50" @click="mapController.setCenter">
              <img src="@/assets/images/auth/location.svg" alt="" />
            </ToggleButton>
            <ToggleButton
              class="select-address-page__back w-50 h-50"
              @click="
                hideModal = false;
                menuStore.backPage();
              "
            >
              <img class="select-address-page__rotate" src="@/assets/images/auth/next.svg" alt="" />
            </ToggleButton>
            <span class="select-address-page__text font-600-22"
              >Точка {{ createOrderStore.activateInput === 0 ? 'отправления' : 'назначения' }}</span
            >
            <span class="select-address-page__line"></span>
            <div class="flex gap-20 items-center">
              <span class="select-address-page__box" :class="{ circle: createOrderStore.activateInput === 0 }"></span>
              <div class="flex flex-col gap-5">
                <span class="select-address-page__text truncate font-400-16">{{
                  addressesStore.selectedAddresses[createOrderStore.activateInput]?.city
                }}</span>
                <span class="cselect-address-page__text truncate font-400-13">{{
                  addressesStore.selectedAddresses[createOrderStore.activateInput]?.address
                }}</span>
              </div>
            </div>
            <PrimaryButton
              @click="
                hideModal = false;
                menuStore.backPage();
              "
              >Готово</PrimaryButton
            >
          </div>
        </ion-modal>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { onIonViewWillEnter, onIonViewWillLeave } from '@ionic/vue';
import { useMapControllerStore } from '@/entities/map-controller';
import { PrimaryButton, RippleButton, ToggleButton } from '@/components/button';
import { profileModel } from '@/entities/profile';
import { menuModel } from '@/entities/menu';
import { addressesModel } from '@/entities/addresses';
import { createOrderModel } from '@/entities/create-order';
import { ref } from 'vue';

const mapController = useMapControllerStore();
const profileStore = profileModel();
const addressesStore = addressesModel();
const createOrderStore = createOrderModel();

const menuStore = menuModel();

const modal = ref();
const hideModal = ref(true);

onIonViewWillEnter(() => {
  mapController.show = true;
  mapController.showMarker = true;
  modal.value.$el.present();
});

onIonViewWillLeave(() => {
  mapController.showMarker = false;
  modal.value.$el.dismiss();
});
</script>

<style lang="scss" scoped>
.select-address-page {
  position: relative;

  &__wrapper {
    background: #ffffff;
    border-radius: 25px 25px 0 0;
  }

  &__line {
    height: 1px;
    width: 100%;
    background: #d9d9d9;
  }

  &__box {
    width: 15px;
    height: 15px;
    border: 3px solid #1c1c1c;
    aspect-ratio: 1/1;

    &.circle {
      border: 3px solid #0cf;
    }
  }

  &__text {
    color: #000;
    font-family: Open Sans;
    font-style: normal;

    &.font-600-22 {
      font-weight: 600;
      font-size: 22px;
    }

    &.font-400-16 {
      color: #1c1c1c;
      font-size: 16px;
      font-weight: 400;
    }

    &.font-400-13 {
      color: #818181;
      font-size: 13px;
      font-weight: 400;
    }
  }

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
}
</style>
