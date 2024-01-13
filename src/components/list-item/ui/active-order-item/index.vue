<template>
  <div class="active-order-item flex flex-col" :class="{ active }">
    <ion-progress-bar class="mb-10" v-if="showIndeterminate" type="indeterminate" color="dark"></ion-progress-bar>
    <div class="flex flex-col gap-5">
      <span class="font-600-20 auto-truncate">{{ firstText }}</span>
      <span class="font-400-13 auto-truncate">{{ secondText }}</span>
    </div>
    <div class="active-order-item__container w-full">
      <div class="flex flex-col" style="min-height: 0px">
        <span class="active-order-item__line"></span>
        <div class="--center gap-50 mt-17">
          <div v-if="accessRemove" class="--center flex-col gap-7">
            <ToggleButton class="w-55 h-55" background="#F5F4F2" color="#000" @click.prevent.stop="cancelOrder">
              <DeleteIcon />
            </ToggleButton>
            <span class="active-order-item__text font-400-12"
              >Отменить <br />
              заказ</span
            >
          </div>
          <div v-else class="--center flex-col gap-7">
            <ToggleButton class="w-55 h-55" background="#F5F4F2" color="#000" @click.prevent.stop="connectClientPerformer">
              <CallIcon />
            </ToggleButton>
            <span class="active-order-item__text font-400-12">Позвонить</span>
          </div>
          <div class="--center flex-col gap-7">
            <ToggleButton
              class="w-55 h-55"
              background="#F5F4F2"
              color="#000"
              @click.prevent.stop="
                createOrderStore.selectedActiveOrders = item;
                menuStore.showPage('order-detail');
              "
            >
              <MenuIcon />
            </ToggleButton>
            <span class="active-order-item__text font-400-12">Детали</span>
          </div>
        </div>
      </div>
    </div>
    <ion-toast
      style="--background: #fff; --background-rgb: #fff"
      ref="toast"
      message="Ваш запрос принят. Ждите звонка."
      :duration="4000"
    ></ion-toast>
  </div>
</template>
<script setup lang="ts">
import { ToggleButton } from '@/components/button';
import { CallIcon, MenuIcon, DeleteIcon } from '@/components/icons';
import { createOrderModel } from '@/entities/create-order';
import { menuModel } from '@/entities/menu';

import useGetIcon from '@/shared/lib/get-icon';
import { socketStates } from '@/socket';

import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps({
  item: {
    type: Object,
    default: () => ({
      address: '',
      city: '',
      icon: '',
    }),
  },
  active: { type: Boolean, default: false },
});

const createOrderStore = createOrderModel();
const menuStore = menuModel();

const router = useRouter();

const toast = ref();

const cancelOrder = async () => {
  if (!props.item.id) return;

  const res = await createOrderStore.cancelOrders(props.item.id);
  if (res) {
    if (toast.value) {
      toast.value.$el.message = 'Ваш заказ успешно отменен.';
      toast.value.$el.present();
    }
  } else {
    if (toast.value) {
      toast.value.$el.message = 'Не удалось отменить заказ!';
      toast.value.$el.present();
    }
  }
};

const connectClientPerformer = async () => {
  if (!props.item.id) return;

  const res = await createOrderStore.connectClientPerformer(props.item.id);
  if (res) {
    if (toast.value) {
      toast.value.$el.message = 'Ваш запрос принят. Ждите звонка.';
      toast.value.$el.present();
    }
  } else {
    if (toast.value) {
      toast.value.$el.message = 'Ошибка!';
      toast.value.$el.present();
    }
  }
};

const showIndeterminate = computed(() => {
  switch (props.item.status) {
    case 'Поступило':
      return true;
    case 'Не оформлен':
      return true;
    default:
      return false;
  }
});

const accessRemove = computed(() => {
  switch (props.item.status) {
    case 'Поступило':
      return true;
    case 'Не оформлен':
      return true;
    case 'Водитель назначен':
      return true;
    default:
      return false;
  }
});

const firstText = computed(() => {
  switch (props.item.status) {
    case 'Поступило':
      return 'Ищем ближайших водителей...';
    case 'Не оформлен':
      return 'Ищем ближайших водителей...';
    case 'Водитель на месте':
      return 'Водитель на месте,\n можете выходить';
    case 'Исполняется':
      return `За рулем ${props.item.performer?.first_name || 'Водитель'}`;
    case 'Водитель назначен':
      return `В ближайшее время \n приедет ${props.item.performer?.first_name}`;
    default:
      return '';
  }
});

const secondText = computed(() => {
  if (props.item.performer == null || props.item.status == 'Поступило') return 'Среднее время поиска водителя ≈ 4 мин';
  else return `${props.item.performer.transport?.color || ''} ${props.item.performer.transport?.model || ''}`;
});

const getIcon = useGetIcon(props.item.icon, 'icons', 'svg');
</script>
<style lang="scss" scoped>
.active-order-item {
  width: 100%;
  border-radius: 25px;
  background: #fff;
  padding: 17px 20px;

  margin-bottom: 10px;
  transition: 0.3s;

  &:last-child {
    margin-bottom: 0;
  }

  &.active {
    .active-order-item__line {
      height: 1px;
      margin-top: 15px;
    }

    .active-order-item__container {
      grid-template-rows: 1fr;
    }
  }

  &__line {
    width: 100%;
    background: #d9d9d9;
    height: 0;
    margin-top: 0;
    transition: 0.3s;
  }

  &__container {
    display: grid;
    grid-template-rows: 0fr;
    overflow: hidden;
    transition: 0.3s;
  }

  &__text {
    color: #9d9d9d;
    text-align: center;
  }
}
</style>
