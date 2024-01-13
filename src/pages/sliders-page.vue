<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <div v-if="getSliders" class="sliders-page flex flex-col size-full" tabIndex="0" :style="{ background: getSliders.background }">
        <div class="flex gap-5">
          <span
            class="sliders-page__progressbar flex w-full"
            v-for="(slider, idx) in getSliders.sliders"
            :key="idx"
            @click="restartProgress(idx)"
          >
            <span class="sliders-page__progress" :style="{ width: `${progressbars[idx]}%` }"></span>
          </span>
        </div>
        <div class="flex flex-col items-center pr-20 pl-20 gap-40">
          <div class="flex w-full justify-end mt-12">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" @click="menuStore.backPage">
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M7.99956 6.58579L14.3635 0.221826L15.7777 1.63604L9.41377 8L15.7777 14.364L14.3635 15.7782L7.99956 9.41421L1.6356 15.7782L0.221383 14.364L6.58534 8L0.221383 1.63604L1.6356 0.221826L7.99956 6.58579Z"
                fill="#1C1C1C"
              />
            </svg>
          </div>
          <div class="flex flex-col w-full gap-40">
            <span class="auto-truncate font-600-30">{{ getSliders.sliders[activeSlide]?.title }}</span>
            <span class="auto-truncate font-400-15">{{ getSliders.sliders[activeSlide]?.description }}</span>
          </div>
          <img :src="getImg(getSliders.sliders[activeSlide]?.img)" alt="" />
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { useMapControllerStore } from '@/entities/map-controller';
import { menuModel } from '@/entities/menu';
import useGetIcon from '@/shared/lib/get-icon';
import { onIonViewWillEnter, onIonViewWillLeave } from '@ionic/vue';
import { computed, nextTick, ref } from 'vue';

const menuStore = menuModel();
const mapController = useMapControllerStore();
const progressbars = ref([0]);
const activeSlide = ref(0);
const isActive = ref(false);
let start = 0;

const slidersList = [
  {
    background: 'linear-gradient(192deg, #B0FFFF 0%, #9DDCFF 100%)',
    sliders: [
      {
        title: 'Укажите свое место',
        description: `Здесь отображается Ваше местонахождение, если вы будете передвигать метку на карте то адрес автоматически изменится`,
        img: '1',
      },
      {
        title: 'Выберите куда поехать',
        description: `Здесь отображается адрес куда вы хотите ехать, можно вводить  адрес в поле, или же выбрать точку на карте`,
        img: '2',
      },
      {
        title: 'Поездки, доставка и услуги',
        description: `Большой выбор тарифов позволяет клиентам выбрать более доступный тариф в зависимости от ситуации.`,
        img: '3',
      },
      {
        title: 'Дополнения к заказу',
        description: `Можно оставить комментарий водителю. Заказать поездку другому человеку, или забронировать поездку заранее`,
        img: '4',
      },
    ],
  },
];

const clickHandler = (e: any) => {
  const halfWidth = document.body.clientWidth / 2;
  const { pageX, pageY } = e;
  if (pageY < 100) return;

  if (halfWidth > pageX) restartProgress(activeSlide.value - 1);
  else restartProgress(activeSlide.value + 1);
};

const getImg = (img: string) => useGetIcon(img, 'sliders/slides');

const getSliders = computed(() => slidersList[menuStore.activeSliders]);

const restartProgress = (idx: number) => {
  start = 0;

  activeSlide.value = idx < 0 ? 0 : idx >= getSliders.value.sliders.length ? getSliders.value.sliders.length - 1 : idx;
  progressbars.value = new Array(getSliders.value.sliders.length).fill(0);

  for (let i = 0; i < idx; i++) {
    progressbars.value[i] = 100;
  }
};

const startProgress = (timestamp: number) => {
  if (!isActive.value) return;

  if (!start) start = timestamp;
  const progress = timestamp - start;

  if (progress / 70 > 100) {
    start = timestamp;

    if (activeSlide.value + 1 < getSliders.value.sliders.length) {
      activeSlide.value += 1;
      window.requestAnimationFrame(startProgress);

      return;
    } else {
      nextTick(() => menuStore.backPage());

      return;
    }
  }

  progressbars.value[activeSlide.value] = progress / 70;

  window.requestAnimationFrame(startProgress);
};

onIonViewWillEnter(() => {
  if (!getSliders.value) {
    menuStore.backPage();

    return;
  }

  mapController.show = false;
  isActive.value = true;

  progressbars.value = new Array(getSliders.value.sliders.length).fill(0);

  window.requestAnimationFrame(startProgress);

  window.addEventListener('click', clickHandler);
});

onIonViewWillLeave(() => {
  isActive.value = false;
  window.removeEventListener('click', clickHandler);
});
</script>

<style lang="scss" scoped>
.sliders-page {
  padding: 60px 7px 27px 7px;
  overflow-y: auto;

  &__progressbar {
    height: 4px;
    border-radius: 20px;
    background: #fafafa;
  }

  &__progress {
    height: 100%;
    width: 0;
    border-radius: 20px;
    background: #323643;
  }
}
</style>
