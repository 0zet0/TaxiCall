<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <div class="create-order-page">
        <ion-modal
          ref="modalInput"
          style="--height: auto; --background: transparnt; --box-shadow: none"
          :initial-breakpoint="1"
          :breakpoints="[0, 1]"
          :backdrop-breakpoint="0.3"
          @willDismiss="() => (menuStore.show = true)"
        >
          <div class="flex flex-col pt-15 w-full">
            <div class="create-order-page__wrapper flex flex-col w-full">
              <div class="create-order-page__title --center">
                <span class="create-order-page__text font-500-18">{{ modalInputs[activeInput]?.title }}</span>
              </div>
              <div v-if="activeInput < 2 || activeInput === 4" class="p-20 w-full">
                <input
                  class="create-order-page__input create-order-page__text font-400-15 w-full"
                  type="text"
                  ref="inputRef"
                  :placeholder="modalInputs[activeInput]?.placeholder"
                  :value="modalInputs[activeInput].value.value"
                />
              </div>
              <div v-if="activeInput === 3" class="--center">
                <ion-datetime
                  class="w-full"
                  presentation="date-time"
                  :prefer-wheel="true"
                  v-bind="dateOptions"
                  @ionChange="dateChange"
                  style="--background: transparent; --background-rgb: transparent; --wheel-highlight-background: #f5f4f2"
                ></ion-datetime>
              </div>
              <div v-if="activeInput !== 2" class="w-full p-20">
                <PrimaryButton class="w-full" @click="modalInputs[activeInput].btnHanler">Готово</PrimaryButton>
              </div>
              <div v-if="activeInput === 2" class="flex flex-col pl-20 pr-20 pb-30 gap-30 pt-25">
                <span class="font-400-16" @click="modalInputs[activeInput].btnHanler(10)">Через 10 минут</span>
                <span class="font-400-16" @click="modalInputs[activeInput].btnHanler(15)">Через 15 минут</span>
                <div class="create-order-page__line"></div>
                <div class="flex justify-between items-center" @click="showModalInput(3)">
                  <span class="create-order-page__text font-400-16 truncate">Указать дату и время</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M7.80099 7.70715C8.19151 7.31663 8.19151 6.68346 7.80099 6.29294L4.66639 3.15834C4.43858 2.93053 4.43858 2.56118 4.66639 2.33338C4.89419 2.10557 5.26354 2.10557 5.49134 2.33338L9.4509 6.29294C9.84143 6.68346 9.84143 7.31663 9.4509 7.70715L5.49134 11.6667C5.26354 11.8945 4.89419 11.8945 4.66639 11.6667C4.43858 11.4389 4.43858 11.0696 4.66639 10.8418L7.80099 7.70715Z"
                      fill="#343434"
                    />
                  </svg>
                </div>
                <RippleButton
                  v-if="createOrderStore.orderTime"
                  class="w-full font-400-16 rounded-20 p-20"
                  @click="modalInputs[activeInput].btnHanler(0)"
                  >Удалить</RippleButton
                >
              </div>
            </div>
          </div>
        </ion-modal>

        <ion-modal
          ref="modal"
          :is-open="true"
          :initial-breakpoint="0.505"
          :breakpoints="[0.505, 0.9]"
          :backdrop-breakpoint="1"
          @didDismiss="() => show && modal.$el.present()"
          @ionBreakpointDidChange="ionBreakpointDidChange"
        >
          <div class="create-order-page__container size-full">
            <ToggleButton class="create-order-page__back w-50 h-50" @click="menuStore.backPage()">
              <img class="create-order-page__rotate" src="@/assets/images/auth/next.svg" alt="" />
            </ToggleButton>
            <scrollbar-list class="flex flex-col gap-10" height="calc(90% - 95px)">
              <div class="create-order-page__card create-order-page__address flex flex-col">
                <div class="flex gap-20 items-center w-full">
                  <span class="create-order-page__address_circle"></span>
                  <RippleButton
                    class="w-full h-60 flex items-center rounded-10 pl-5 pr-5"
                    @click.prevent.stop="
                      createOrderStore.activateInput = 0;
                      menuStore.showPage('search-address');
                    "
                  >
                    <div class="flex gap-20 items-center justify-between w-full">
                      <span
                        class="create-order-page__text font-400-16 truncate"
                        :style="{
                          opacity: addressesStore.selectedAddresses[0]?.city ? 1 : 0.7,
                        }"
                        >{{ addressesStore.selectedAddresses[0]?.city || 'Откуда едем' }}</span
                      >
                      <span class="create-order-page__address_btn" @click.prevent.stop="showModalInput(4)">Место встречи</span>
                    </div>
                  </RippleButton>
                </div>
                <div class="flex gap-25 w-full">
                  <span class="w-15"></span>
                  <div class="create-order-page__address_line"></div>
                </div>
                <div class="flex gap-20 items-center w-full">
                  <span class="create-order-page__address_rect"></span>
                  <RippleButton class="w-full h-60 flex items-center rounded-10 pl-5 pr-5" @click="showReorderModal">
                    <div class="flex gap-20 items-center justify-between w-full">
                      <span
                        class="create-order-page__text font-400-16 truncate"
                        :style="{
                          opacity: addressesStore.selectedAddresses[addressesStore.selectedAddresses.length - 1 || 1]?.city ? 1 : 0.7,
                        }"
                      >
                        {{ addressesStore.selectedAddresses[addressesStore.selectedAddresses.length - 1 || 1]?.city || 'Куда едем' }}
                      </span>
                      <!-- <add-icon
                        @click.prevent.stop="
                          createOrderStore.activateInput = 1;
                          menuStore.showPage('search-address');
                        "
                      /> -->
                    </div>
                  </RippleButton>
                </div>
              </div>
              <div class="flex flex-col gap-10">
                <div class="create-order-page__card">
                  <div
                    v-if="createOrderStore.selectedVehicle.id"
                    class="create-order-page__tarif-info"
                    :class="{ show: createOrderStore.showTarifInfo }"
                  >
                    <div class="flex gap-15 flex-col w-full" style="min-height: 0">
                      <div class="flex gap-10 justify-between">
                        <span class="create-order-page__text font-700-36 max-h-70 auto-truncate">{{
                          createOrderStore.selectedVehicle.name
                        }}</span>
                        <span class="create-order-page__text right font-400-32 truncate"
                          >{{ createOrderStore.selectedVehicle.min_price }} с</span
                        >
                      </div>
                      <div class="flex gap-10 h-90 justify-between w-full">
                        <img class="max-w-220 max-h-90" :src="createOrderStore.selectedVehicle.image" alt="" />
                        <div class="flex flex-col flex-end gap-30">
                          <!-- <span class="create-order-page__text font-600-12 truncate"
                            >{{ createOrderStore.selectedVehicle.time || 0 }} мин</span
                          > -->
                          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none" @click="nextSlide">
                            <path
                              d="M22 11C22 17.0751 17.0751 22 11 22C4.92487 22 0 17.0751 0 11C0 4.92487 4.92487 0 11 0C17.0751 0 22 4.92487 22 11Z"
                              fill="#343434"
                            />
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M12.0168 11.7071C12.4073 11.3166 12.4073 10.6834 12.0168 10.2929L8.33333 6.60948C8.07298 6.34913 8.07298 5.92702 8.33333 5.66667C8.59368 5.40632 9.01579 5.40632 9.27614 5.66667L13.9024 10.2929C14.2929 10.6834 14.2929 11.3166 13.9024 11.7071L9.27614 16.3333C9.01579 16.5937 8.59368 16.5937 8.33333 16.3333C8.07298 16.073 8.07298 15.6509 8.33333 15.3905L12.0168 11.7071Z"
                              fill="white"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                  <!-- <Swiper class="mt1-5 w-full" v-bind="swiperOption">
                    <SwiperSlide
                      class="create-order-page__slide flex items-center w-auto pt-8 pb-8 pr-8 pl-8"
                      :class="{ active: selectedOrderType === 0 }"
                      @click="selectedOrderType = 0"
                    >
                      <span class="create-order-page__text font-500-12 truncate">Такси</span>
                    </SwiperSlide>
                    <SwiperSlide
                      class="create-order-page__slide flex items-center w-auto pt-8 pb-8 pr-8 pl-8"
                      :class="{ active: selectedOrderType === 1 }"
                      @click="selectedOrderType = 1"
                    >
                      <span class="create-order-page__text font-500-12 truncate">Доставка</span>
                    </SwiperSlide>
                  </Swiper> -->
                  <Swiper class="w-full mt-10" v-bind="swiperOption" @swiper="onSwiper">
                    <SwiperSlide
                      class="create-order-page__slide p-8 flex flex-col gap-7 justify-between w-73 h-76"
                      v-for="vehicle in createOrderStore.vehicles"
                      :key="vehicle.id"
                      :class="{ active: createOrderStore.selectedVehicle.id === vehicle.id }"
                      @click="createOrderStore.selectedVehicle = vehicle"
                    >
                      <img class="max-w-35 max-h-20" :src="vehicle.icon" alt="" />
                      <div class="flex gap-2 flex-col">
                        <span class="create-order-page__text font-400-12 truncate">{{ vehicle.name }}</span>
                        <span class="create-order-page__text font-700-12 truncate">{{ vehicle.min_price }} с</span>
                      </div>
                    </SwiperSlide>
                  </Swiper>
                </div>
                <div class="create-order-page__card padding-x flex flex-col">
                  <RippleButton class="p-20 rounded-25" @click="showModalInput(0)">
                    <div class="flex justify-between items-center">
                      <div class="flex gap-2 flex-col">
                        <span class="create-order-page__text font-400-16 truncate">Комментарий водителю</span>
                        <span class="create-order-page__text right font-400-12 truncate">{{ createOrderStore.comment }}</span>
                      </div>
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M7.80099 7.70715C8.19151 7.31663 8.19151 6.68346 7.80099 6.29294L4.66639 3.15834C4.43858 2.93053 4.43858 2.56118 4.66639 2.33338C4.89419 2.10557 5.26354 2.10557 5.49134 2.33338L9.4509 6.29294C9.84143 6.68346 9.84143 7.31663 9.4509 7.70715L5.49134 11.6667C5.26354 11.8945 4.89419 11.8945 4.66639 11.6667C4.43858 11.4389 4.43858 11.0696 4.66639 10.8418L7.80099 7.70715Z"
                          fill="#343434"
                        />
                      </svg>
                    </div>
                  </RippleButton>
                  <div class="create-order-page__line"></div>
                  <RippleButton class="p-20 rounded-25" @click="showModalInput(1)">
                    <div class="flex justify-between items-center">
                      <div class="flex gap-2 flex-col flex-start">
                        <span class="create-order-page__text font-400-16 truncate">Заказ другому человеку</span>
                        <span class="create-order-page__text right font-400-12 truncate">{{ createOrderStore.phoneNumber }}</span>
                      </div>
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M7.80099 7.70715C8.19151 7.31663 8.19151 6.68346 7.80099 6.29294L4.66639 3.15834C4.43858 2.93053 4.43858 2.56118 4.66639 2.33338C4.89419 2.10557 5.26354 2.10557 5.49134 2.33338L9.4509 6.29294C9.84143 6.68346 9.84143 7.31663 9.4509 7.70715L5.49134 11.6667C5.26354 11.8945 4.89419 11.8945 4.66639 11.6667C4.43858 11.4389 4.43858 11.0696 4.66639 10.8418L7.80099 7.70715Z"
                          fill="#343434"
                        />
                      </svg>
                    </div>
                  </RippleButton>
                  <div class="create-order-page__line"></div>
                  <RippleButton class="p-20 rounded-25" @click="showModalInput(2)">
                    <div class="flex justify-between items-center">
                      <div class="flex gap-2 flex-col">
                        <span class="create-order-page__text font-400-16 truncate">Запланировать поездку</span>
                        <span class="create-order-page__text right font-400-12 truncate">{{ createOrderStore.orderTime }}</span>
                      </div>
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M7.80099 7.70715C8.19151 7.31663 8.19151 6.68346 7.80099 6.29294L4.66639 3.15834C4.43858 2.93053 4.43858 2.56118 4.66639 2.33338C4.89419 2.10557 5.26354 2.10557 5.49134 2.33338L9.4509 6.29294C9.84143 6.68346 9.84143 7.31663 9.4509 7.70715L5.49134 11.6667C5.26354 11.8945 4.89419 11.8945 4.66639 11.6667C4.43858 11.4389 4.43858 11.0696 4.66639 10.8418L7.80099 7.70715Z"
                          fill="#343434"
                        />
                      </svg>
                    </div>
                  </RippleButton>
                </div>
                <!-- <div class="create-order-page__card flex flex-col gap-20">
                  <div class="flex justify-between items-center">
                    <span class="create-order-page__text font-400-16 truncate">Добавить надбавки</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M7.80099 7.70715C8.19151 7.31663 8.19151 6.68346 7.80099 6.29294L4.66639 3.15834C4.43858 2.93053 4.43858 2.56118 4.66639 2.33338C4.89419 2.10557 5.26354 2.10557 5.49134 2.33338L9.4509 6.29294C9.84143 6.68346 9.84143 7.31663 9.4509 7.70715L5.49134 11.6667C5.26354 11.8945 4.89419 11.8945 4.66639 11.6667C4.43858 11.4389 4.43858 11.0696 4.66639 10.8418L7.80099 7.70715Z"
                        fill="#343434"
                      />
                    </svg>
                  </div>
                </div> -->
              </div>
            </scrollbar-list>
          </div>
        </ion-modal>
        <ion-modal
          ref="reorderModal"
          :initial-breakpoint="0.75"
          :breakpoints="[0, 0.75]"
          :backdrop-breakpoint="0"
          @willDismiss="() => (menuStore.show = true)"
        >
          <div class="create-order-page__wrapper pt-20 size-full">
            <scrollbar-list class="flex flex-col gap-10" height="calc(75% - 95px)">
              <ion-reorder-group :disabled="false" @ionItemReorder="handleReorder($event)">
                <ion-item v-for="address in addresses" :key="address?.id">
                  <div class="flex items-center justify-between w-full">
                    <span class="font-400-16">{{ address.city }}</span>
                    <ion-reorder></ion-reorder>
                  </div>
                </ion-item>
              </ion-reorder-group>
            </scrollbar-list>
          </div>
        </ion-modal>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ToggleButton, RippleButton } from '@/components/button';
import { AddIcon } from '@/components/icons';
import { ScrollbarList } from '@/components/scrollbar-list';
import { PrimaryButton } from '@/components/button';
import { Swiper, SwiperSlide } from 'swiper/vue';

import { computed, inject, provide, Ref, ref, watch } from 'vue';
import { onIonViewWillEnter, onIonViewWillLeave, IonDatetime, IonReorder, IonItem, IonReorderGroup } from '@ionic/vue';

import { createOrderModel } from '@/entities/create-order';
import { menuModel } from '@/entities/menu';

import useGetIcon from '@/shared/lib/get-icon';
import { useRouter } from 'vue-router';
import { addressesModel } from '@/entities/addresses';
import { useMoment } from '@/shared/lib';
import moment from 'moment';
import { useMapControllerStore } from '@/entities/map-controller';

const createOrderStore = createOrderModel();
const menuStore = menuModel();
const addressesStore = addressesModel();
const mapController = useMapControllerStore();

const addresses = computed(() => addressesStore.selectedAddresses.slice(1));

const screens = [];

const activeScreen = ref(0);
const modal = ref();
const show = ref(true);
const swiperInstance = ref();
const modalInput = ref();
const activeInput = ref(0);
const inputRef = ref();

const modalInputs = [
  {
    title: 'Комментарий водителю',
    placeholder: 'Комментарий водителю',
    value: computed(() => createOrderStore.comment),
    btnHanler: () => {
      modalInput.value.$el.dismiss();
      if (inputRef.value.value) createOrderStore.comment = inputRef.value.value;
    },
  },
  {
    title: 'Кто поедет на такси?',
    placeholder: 'Введите номер телефона',
    value: computed(() => createOrderStore.phoneNumber),
    btnHanler: () => {
      modalInput.value.$el.dismiss();
      if (inputRef.value.value) createOrderStore.phoneNumber = inputRef.value.value;
    },
  },
  {
    title: 'Запланировать поездку',
    btnHanler: (min: number = 0) => {
      if (min) {
        createOrderStore.orderTime = useMoment(moment().add(min, 'minutes').valueOf(), 'yyyy-MM-DD HH:mm');
      } else {
        createOrderStore.orderTime = '';
      }
      modalInput.value.$el.dismiss();
    },
  },
  {
    title: 'Дата и время поездки',
    btnHanler: () => {
      if (selectedDate.value) createOrderStore.orderTime = useMoment(selectedDate.value, 'yyyy-MM-DD HH:mm');
      modalInput.value.$el.dismiss();
    },
  },
  {
    title: 'Место встречи или номер подъезда',
    placeholder: 'Введите место встречи или номер подъезда',
    value: computed(() => createOrderStore.meetingInfo),
    btnHanler: () => {
      modalInput.value.$el.dismiss();
      if (inputRef.value.value) createOrderStore.meetingInfo = inputRef.value.value;

      if (!addressesStore.selectedAddresses[0]?.city) return;
      addressesStore.selectedAddresses[0].city = addressesStore.lastAddress;

      if (!createOrderStore.meetingInfo) return;

      addressesStore.selectedAddresses[0].city = `${addressesStore.selectedAddresses[0]?.city}, подъезд ${createOrderStore.meetingInfo}`;
    },
  },
];

const selectedOrderType = ref(0);
const router = useRouter();
const reorderModal = ref();
const selectedDate = ref();

const dateOptions = computed(() => ({
  min: moment().toISOString(),
  max: moment().add(3, 'days').toISOString(),
}));

const swiperOption = {
  observer: true,
  observeParents: true,
  parallax: true,
  slidesPerView: 'auto',
  spaceBetween: 10,
  freeMode: true,
  mousewheel: true,
};

const dateChange = (date: any) => {
  selectedDate.value = moment(date?.detail.value).valueOf();
};

const ionBreakpointDidChange = async () => {
  const currentBreakpoint = await modal.value.$el.getCurrentBreakpoint();

  createOrderStore.showTarifInfo = currentBreakpoint >= 0.9;
};

const getIcon = (icon: string, path: string) => useGetIcon(icon, path);

const showModalInput = (idx: number) => {
  modalInput.value.$el.present();
  menuStore.show = false;

  activeInput.value = idx;
  selectedDate.value = '';
};

const showReorderModal = () => {
  if (addressesStore.selectedAddresses.length < 3) {
    createOrderStore.activateInput = 1;
    menuStore.showPage('search-address');

    return;
  }

  reorderModal.value.$el.present();
  menuStore.show = false;
};

function onSwiper(swiper: any) {
  swiperInstance.value = swiper;
}

function nextSlide() {
  const idx = createOrderStore.vehicles.findIndex((i: any) => i.id === createOrderStore.selectedVehicle.id);

  if (idx === -1 || !createOrderStore.vehicles[idx + 1]) return;

  createOrderStore.selectedVehicle = createOrderStore.vehicles[idx + 1];

  swiperInstance.value?.slideTo(idx);
}

const handleReorder = (event: CustomEvent) => {
  const from = addressesStore.selectedAddresses[event.detail.from + 1];
  const to = addressesStore.selectedAddresses[event.detail.to + 1];

  addressesStore.selectedAddresses[event.detail.to + 1] = from;
  addressesStore.selectedAddresses[event.detail.from + 1] = to;

  event.detail.complete();
};

onIonViewWillEnter(async () => {
  show.value = true;
  modal.value.$el.present();
  createOrderStore.modalEl = modal.value.$el;

  menuStore.toggle = (state: boolean) => {
    show.value = !state;
    menuStore.show = !state;
    if (state) modal.value?.$el.dismiss();
    else modal.value?.$el.present();
  };

  if (!createOrderStore.isLoaded) await createOrderStore.getTariffs();

  createOrderStore.selectedVehicle = createOrderStore.vehicles[0] || {};

  mapController.tryDrawRoute = true;
  mapController.drawRoutes();
});

onIonViewWillLeave(() => {
  show.value = false;
  createOrderStore.showTarifInfo = false;
  modal.value.$el.dismiss();

  mapController.tryDrawRoute = false;
  mapController.clearRoutes();
});
</script>

<style lang="scss" scoped>
.create-order-page {
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

    &.right {
      width: fit-content;
      min-width: fit-content;
      max-width: 30%;
    }
  }

  &__line {
    width: 100%;
    height: 1px;
    background: #eee;
  }

  &__slide {
    border-radius: 20px;
    opacity: 0.7;
    transition: 0.3s;

    &.active {
      background: #eee;
      opacity: 1;
    }

    .title {
      color: #343434;
      font-size: 14px;
      font-weight: 600;
      text-overflow: ellipsis;
      overflow: hidden;
      max-width: 100%;
      max-height: 32px;
    }

    .time {
      color: #343434;
      font-size: 10px;
      font-weight: 400;
    }
  }

  &__card {
    padding: 18px 20px;
    border-radius: 25px;
    background: #fff;

    &.padding-x {
      padding: 0;
    }
  }

  &__container {
    background: #eee;
    border-radius: 30px 30px 0 0;
    overflow: hidden;
  }

  &__wrapper {
    background: #fff;
    border-radius: 30px 30px 0 0;
    overflow: hidden;
  }

  &__title {
    width: 100%;
    height: 70px;
    border-radius: 25px 25px 0px 0px;
    background: #f5f4f2;
  }

  &__input {
    padding: 0 0 20px 0;
    border-bottom: 2px solid #343434;
  }

  &__back {
    position: absolute;
    left: 15px;
    top: -60px;
  }

  &__rotate {
    transform: rotateZ(180deg);
  }

  &__tarif-info {
    display: grid;
    grid-template-rows: 0fr;
    overflow: hidden;
    transition: 0.3s;

    &.show {
      grid-template-rows: 1fr;
    }
  }
}
</style>
