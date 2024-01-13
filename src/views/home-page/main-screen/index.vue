<template>
  <div class="main-screen flex flex-col gap-17 w-full">
    <div
      class="main-screen__location ion-activatable flex items-center justify-between w-full h-50"
      @click="
        createOrderStore.activateInput = 1;
        menuStore.showPage('search-address');
      "
    >
      <div class="flex items-center gap-17">
        <img src="@/assets/images/cars/car-1.png" alt="" />
        <span class="main-screen__font truncate">{{ addressesStore.selectedAddresses[1]?.city || 'Куда едем?' }}</span>
      </div>
      <div class="flex h-full gap-10" @click.prevent.stop="menuStore.showPage('create-order')">
        <div class="main-screen__line"></div>
        <img src="@/assets/images/auth/next.svg" alt="" />
      </div>
      <ion-ripple-effect class="custom-ripple"></ion-ripple-effect>
    </div>
    <Swiper class="w-full" v-bind="swiperOption">
      <SwiperSlide
        class="main-screen__slide p-15 flex flex-col justify-between w-115 h-115"
        v-for="popularAddress in addressesStore.popularAddresses"
        :key="popularAddress.id"
        @click="selectAddress(popularAddress)"
      >
        <div class="flex gap-2 flex-col">
          <span class="title auto-truncate h-28">{{ getAddress(popularAddress, true) }}</span>
          <!-- <span class="time truncate">15 мин</span> -->
        </div>
        <div class="flex items-center justify-between">
          <img src="@/assets/images/cars/car-2.png" alt="" />
          <!-- <img src="@/assets/images/icons/home.svg" alt="" /> -->
        </div>
      </SwiperSlide>
    </Swiper>
    <!-- <Swiper class="w-full" v-bind="swiperOption">
      <SwiperSlide
        class="main-screen__slide pr-15 flex items-center gap-10 w-auto min-w-140 h-30"
        v-for="text in ['Доставка', 'Такси']"
        :key="text"
      >
        <img class="main-screen__car" src="@/assets/images/cars/car-2.png" alt="" />
        <span class="main-screen__font-12 truncate">{{ text }}</span>
      </SwiperSlide>
    </Swiper> -->
    <span class="font-600-20">Добро пожаловать в Gram</span>
    <div class="main-screen__grid">
      <div
        class="main-screen__slider-btn"
        v-for="(slider, idx) in sliders"
        :key="idx"
        :style="{ background: slider.background }"
        @click="
          menuStore.activeSliders = idx;
          menuStore.showPage('sliders-page');
        "
      >
        <span class="font-600-14 auto-truncate">{{ slider.title }}</span>

        <img class="absolute" :src="getImg(slider.img)" alt="" :style="slider.style" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ToggleButton } from '@/components/button';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { IonModal } from '@ionic/vue';

import { inject } from 'vue';
import { useRouter } from 'vue-router';
import { createOrderModel } from '@/entities/create-order';
import { menuModel } from '@/entities/menu';
import { addressesModel } from '@/entities/addresses';
import getAddress from '@/shared/lib/get-address';
import useGetIcon from '@/shared/lib/get-icon';

const createOrderStore = createOrderModel();
const addressesStore = addressesModel();
const menuStore = menuModel();

const activeScreen = inject('activeScreen');

const router = useRouter();

const getImg = (img: string) => useGetIcon(img, 'sliders/btns');

const swiperOption = {
  observer: true,
  observeParents: true,
  parallax: true,
  slidesPerView: 'auto',
  spaceBetween: 10,
  freeMode: true,
  mousewheel: true,
};

const sliders = [
  {
    background: 'linear-gradient(67deg, #9DDCFF -1.55%, #B0FFFF 98.06%)',
    title: 'Как заказать\nтакси',
    img: '1',
    style: {
      left: '72px',
      top: '33px',
      width: '110px',
    },
  },
  // {
  //   background: 'linear-gradient(67deg, #B6EDFF -12.3%, #F6C9FA 103.41%)',
  //   title: 'Быстро найти свое\nтакси',
  //   img: '2',
  //   style: {
  //     left: '72px',
  //     top: '42px',
  //     width: '134px',
  //   },
  // },
];

const selectAddress = (address: any) => {
  addressesStore.selectAddress(address, 1);

  menuStore.showPage('create-order');
};
</script>

<style lang="scss" scoped>
.main-screen {
  &__location {
    position: relative;
    border-radius: 20px;
    background: #343434;
    padding: 13px 13px 13px 0;
    overflow: hidden;

    .custom-ripple {
      color: #ffffff;
    }
  }

  &__font {
    color: #fff;
    font-size: 16px;
    font-weight: 600;

    &-12 {
      color: #343434;
      font-size: 12px;
      font-weight: 400;
    }
  }

  &__line {
    width: 1px;
    height: 100%;
    background: linear-gradient(0deg, #fff 0%, #fff 100%), #fff;
  }

  &__slide {
    border-radius: 20px;
    background: #eee;

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

  &__slider-btn {
    position: relative;
    width: 176px;
    height: 116px;
    padding: 15px;
    border-radius: 20px;
    overflow: hidden;
  }

  &__grid {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }
}
</style>
