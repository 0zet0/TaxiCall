<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <div class="home-page size-full">
        <teleport v-if="menuStore.isMounted" to="#parent">
          <transition name="bottom-in" appear="">
            <div
              v-if="menuStore.showMyAddress"
              class="home-page__address --center flex-col gap-5"
              @click="
                createOrderStore.activateInput = 0;
                menuStore.showPage('search-address');
              "
            >
              <div class="flex gap-10 items-center">
                <span class="font-400-12">Ваш адрес</span>
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M9.11568 7.50005L4.55762 2.94199L5.4415 2.05811L10.8834 7.50005L5.4415 12.942L4.55762 12.0581L9.11568 7.50005Z"
                    fill="#343434"
                  />
                </svg>
              </div>
              <span class="font-700-12 max-w-10 max-h-25 auto-truncate text-center">{{ addressesStore.selectedAddresses[0]?.city }}</span>
            </div>
          </transition>
        </teleport>
        <ion-modal
          ref="modal"
          :is-open="true"
          :initial-breakpoint="0.3"
          :breakpoints="[0.3, 0.5]"
          :backdrop-breakpoint="0.5"
          @didDismiss="() => show && modal.$el.present()"
        >
          <div class="size-full">
            <ToggleButton class="home-page__location w-50 h-50" @click="mapController.setCenter">
              <img src="@/assets/images/auth/location.svg" alt="" />
            </ToggleButton>
            <ToggleButton v-if="activeScreen === 1" class="home-page__back w-50 h-50" @click="activeScreen = 0">
              <img class="home-page__rotate" src="@/assets/images/auth/next.svg" alt="" />
            </ToggleButton>
            <ToggleButton v-if="activeScreen === 2" class="home-page__back w-50 h-50" @click="activeScreen = 1">
              <img class="home-page__rotate" src="@/assets/images/auth/next.svg" alt="" />
            </ToggleButton>
            <scrollbar-list height="50%">
              <component class="p-15" :is="screens[activeScreen]"></component>
            </scrollbar-list>
          </div>
          <div class="modal-bottom"></div>
        </ion-modal>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ToggleButton } from '@/components/button';
import { MainScreen, SelectLocationScreen, ConfirimScreen } from '@/views/home-page';
import { ScrollbarList } from '@/components/scrollbar-list';

import { inject, nextTick, onDeactivated, onUnmounted, provide, Ref, ref, watch } from 'vue';
import { onIonViewWillEnter, onIonViewWillLeave } from '@ionic/vue';
import { menuModel } from '@/entities/menu';
import { addressesModel } from '@/entities/addresses';
import { useRouter } from 'vue-router';
import { useMapControllerStore } from '@/entities/map-controller';
import { createOrderModel } from '@/entities/create-order';

const menuStore = menuModel();
const addressesStore = addressesModel();
const mapController = useMapControllerStore();
const createOrderStore = createOrderModel();

const screens = [MainScreen, SelectLocationScreen, ConfirimScreen];

const activeScreen = ref(0);
const modal = ref();
const show = ref(true);
const router = useRouter();

provide('activeScreen', activeScreen);

onIonViewWillEnter(() => {
  nextTick(() => {
    show.value = true;
    modal.value.$el.present();
    menuStore.showMenu = true;
    mapController.show = true;
    mapController.showMarker = true;

    menuStore.toggle = (state: boolean) => {
      show.value = !state;
      menuStore.show = !state;
      if (state) modal.value.$el.dismiss();
      else if (router.currentRoute.value.name === 'Home') modal.value.$el.present();
    };
  });

  menuStore.isMounted = true;
  menuStore.showMyAddress = true;
  createOrderStore.activateInput = 0;

  addressesStore.fetchPopularAddresses();
});

onIonViewWillLeave(() => {
  show.value = false;
  modal.value.$el.dismiss();
  menuStore.showMenu = false;
  menuStore.showMyAddress = false;
  mapController.showMarker = false;
});
</script>

<style lang="scss" scoped>
.home-page {
  position: relative;
  width: 100%;
  height: 100%;

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

  &__address {
    position: absolute;
    left: 50%;
    top: 60px;
    transform: translateX(-50%);
    padding: 9px 20px;
    width: 177px;
    border-radius: 25px;
    background: #eee;
    box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, 0.25);
    z-index: 2;
  }
}
</style>
