<template>
  <div class="pincode-screen">
    <img class="pincode-screen__arrow" src="@/assets/images/auth/arrow.svg" alt="" @click="activeScreen = 1" />
    <span class="pincode-screen__title text-center">Сообщение с кодом отправлено на +{{ profileStore.authData.phoneNumber }}.</span>
    <div class="mt-50 flex justify-center gap-15">
      <div class="pincode-screen__input flex flex-col" v-for="(_, i) in 4" :key="i">
        <input
          class="text-center font-400-36"
          type="number"
          :ref="
            (el) => {
              inputs[i] = el;
              if (el) el.onpaste = ($event) => setCopy($event);
            }
          "
          @click="focus"
          @keyup="change(i)"
          @input="onInput(i)"
          @keyup.enter="sendPincode"
        />
        <span class="pincode-screen__line"></span>
      </div>
    </div>
    <ToggleButton v-if="phoneNumber" class="pincode-screen__next w-50 h-50">
      <img src="@/assets/images/auth/next.svg" alt="" />
    </ToggleButton>
    <ion-toast style="--background: #fff; --background-rgb: #fff" ref="toast" message="Ошибка!" :duration="3000"></ion-toast>
  </div>
</template>
<script setup lang="ts">
import { inject, onMounted, Ref, ref } from 'vue';

import { ToggleButton } from '@/components/button';
import { profileModel } from '@/entities/profile';
import { useRouter } from 'vue-router';
import { menuModel } from '@/entities/menu';

const activeScreen = inject('activeScreen') as Ref<number>;

const phoneNumber = ref('');
const inputs = ref([]) as any;
const lasValue = ref('');
const profileStore = profileModel();
const menuStore = menuModel();
const router = useRouter();

const toast = ref();

const focus = () => {
  for (const input of inputs.value) {
    if (input.value) continue;

    input.focus();

    lasValue.value = input.value;

    return;
  }

  inputs.value[3].focus();
  lasValue.value = inputs.value[3].value;
};

const onInput = (idx: number) => {
  const value = inputs.value[idx].value;
  if (value.toString().length < 2) return;

  inputs.value[idx].value = value.toString().slice(0, 1);
};

const sendPincode = async () => {
  const pincode = [...inputs.value].map((input) => input.value).join('');
  if (pincode.length < 4) return;

  const result = await profileStore.sendPincode(pincode);

  if (result) menuStore.showPage('default-page', false, true);
  else toast.value.$el.present();
};

const change = async (idx: number) => {
  const value = inputs.value[idx].value;
  if (value.toString().length > 1) inputs.value[idx].value = value.toString().slice(0, 1);

  if (value) {
    if (idx === 3) {
      await sendPincode();
    } else {
      inputs.value[idx + 1].focus();
      lasValue.value = '';
      return;
    }
  } else if (!lasValue.value) {
    idx = idx - 1;
    idx = idx < 0 ? 0 : idx;
    inputs.value[idx].focus();
    lasValue.value = inputs.value[idx];
    return;
  }

  lasValue.value = value;
};

const setCopy = async (event: any) => {
  const text = event?.clipboardData?.getData('text/plain') as string;

  event?.preventDefault();

  if (typeof text !== 'string') return;
  lasValue.value = '0';

  const pincode = text.slice(0, 4).split('');
  for (let i = 0; i < inputs.value.length; i++) {
    const input = inputs.value[i];
    if (typeof +pincode[i] === 'number') input.value = +pincode[i];
  }

  focus();

  await sendPincode();
};

onMounted(focus);
</script>
<style lang="scss" scoped>
.pincode-screen {
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;

  color: #343434;
  font-family: 'Open Sans', sans-serif;
  font-weight: 400;

  &__title {
    margin-top: 30px;
    font-size: 24px;
    font-weight: 400;
    line-height: 140%;
  }

  &__arrow {
    width: 24px;
    height: 24px;

    &.rotate {
      transform: rotateZ(270deg);

      &-180 {
        transform: rotateZ(180deg);
      }
    }
  }

  &__container {
    display: flex;
    align-items: center;
    gap: 10px;

    padding: 12px 15px;
    margin-top: 25px;

    border-radius: 5px;
    background: #f3f3f3;
  }

  &__text {
    font-feature-settings: 'clig' off, 'liga' off;
    font-size: 16px;
    line-height: 24px;
  }

  &__input {
    width: 60px;
    text-align: center;
  }

  &__line {
    height: 2px;
    border-radius: 2px;
    background: #a0a2a9;
    margin-top: 20px;
  }

  &__next {
    position: absolute;
    right: 0;
    bottom: 0;
    transition: 0.3s;
  }
}
</style>
