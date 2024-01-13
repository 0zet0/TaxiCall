<template>
  <div class="create-order --center gap-10">
    <RippleButton class="relative circle w-50 h-50 --center events-none">
      <!-- <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
        <path
          d="M20.834 21.3542H4.16732C3.02148 21.3542 2.08398 20.4167 2.08398 19.2708V8.38542C2.08398 7.70833 2.39648 7.08333 2.9694 6.66667L12.5007 0L22.0319 6.66667C22.6048 7.03125 22.9173 7.70833 22.9173 8.38542V19.2708C22.9173 20.4167 21.9798 21.3542 20.834 21.3542Z"
          fill="#78909C"
        />
        <path d="M7.29102 0.520996H17.7077V16.6668H7.29102V0.520996Z" fill="#AED581" />
        <path d="M6.77148 0V17.1875H18.2298V0H6.77148ZM17.1882 16.1458H7.81315V1.04167H17.1882V16.1458Z" fill="#558B2F" />
        <path
          d="M17.7096 1.56266C17.7096 2.44808 17.5534 3.12516 16.668 3.12516C15.7826 3.12516 15.1055 2.44808 15.1055 1.56266C15.1055 0.677246 15.7826 0.520996 16.668 0.520996C17.5534 0.520996 17.7096 0.677246 17.7096 1.56266ZM8.33464 0.520996C9.22005 0.520996 9.89714 0.677246 9.89714 1.56266C9.89714 2.44808 9.22005 3.12516 8.33464 3.12516C7.44922 3.12516 7.29297 2.44808 7.29297 1.56266C7.29297 0.677246 7.44922 0.520996 8.33464 0.520996Z"
          fill="#558B2F"
        />
        <path
          d="M12.5007 5.20833C13.0759 5.20833 13.5423 4.74196 13.5423 4.16667C13.5423 3.59137 13.0759 3.125 12.5007 3.125C11.9254 3.125 11.459 3.59137 11.459 4.16667C11.459 4.74196 11.9254 5.20833 12.5007 5.20833Z"
          fill="#558B2F"
        />
        <path
          d="M12.5 13.5415C14.2259 13.5415 15.625 12.1424 15.625 10.4165C15.625 8.69061 14.2259 7.2915 12.5 7.2915C10.7741 7.2915 9.375 8.69061 9.375 10.4165C9.375 12.1424 10.7741 13.5415 12.5 13.5415Z"
          fill="#558B2F"
        />
        <path
          d="M20.834 21.354H4.16732C3.02148 21.354 2.08398 20.4165 2.08398 19.2707V8.854L12.5007 15.6248L22.9173 8.854V19.2707C22.9173 20.4165 21.9798 21.354 20.834 21.354Z"
          fill="#CFD8DC"
        />
      </svg> -->
    </RippleButton>
    <PrimaryButton class="w-253 h-57" :loading="createOrderStore.loading" @click="createNewOrder">Заказать</PrimaryButton>

    <RippleButton class="relative circle w-50 h-50 --center" @click="setCurrentBreakpoint">
      <Transition name="bounce">
        <svg
          v-if="!createOrderStore.showTarifInfo"
          class="absolute"
          xmlns="http://www.w3.org/2000/svg"
          width="25"
          height="25"
          viewBox="0 0 25 25"
          fill="none"
        >
          <path
            d="M23.4375 6.25H20.2344C19.8438 4.45312 18.2812 3.125 16.4062 3.125C14.5312 3.125 12.9688 4.45312 12.5781 6.25H1.5625V7.8125H12.5781C12.9688 9.60938 14.5312 10.9375 16.4062 10.9375C18.2812 10.9375 19.8438 9.60938 20.2344 7.8125H23.4375V6.25ZM16.4062 9.375C15.0781 9.375 14.0625 8.35938 14.0625 7.03125C14.0625 5.70312 15.0781 4.6875 16.4062 4.6875C17.7344 4.6875 18.75 5.70312 18.75 7.03125C18.75 8.35938 17.7344 9.375 16.4062 9.375ZM1.5625 18.75H4.76562C5.15625 20.5469 6.71875 21.875 8.59375 21.875C10.4688 21.875 12.0312 20.5469 12.4219 18.75H23.4375V17.1875H12.4219C12.0312 15.3906 10.4688 14.0625 8.59375 14.0625C6.71875 14.0625 5.15625 15.3906 4.76562 17.1875H1.5625V18.75ZM8.59375 15.625C9.92188 15.625 10.9375 16.6406 10.9375 17.9688C10.9375 19.2969 9.92188 20.3125 8.59375 20.3125C7.26562 20.3125 6.25 19.2969 6.25 17.9688C6.25 16.6406 7.26562 15.625 8.59375 15.625Z"
            fill="#343434"
          />
        </svg>
        <svg v-else class="absolute" width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M6.29285 8.30148C6.68337 8.692 7.31654 8.692 7.70706 8.30148L10.8417 5.16687C11.0695 4.93907 11.4388 4.93907 11.6666 5.16687C11.8944 5.39468 11.8944 5.76403 11.6666 5.99183L7.70706 9.95139C7.31654 10.3419 6.68337 10.3419 6.29285 9.95139L2.33329 5.99183C2.10548 5.76402 2.10548 5.39468 2.33329 5.16687C2.5611 4.93907 2.93044 4.93907 3.15825 5.16687L6.29285 8.30148Z"
            fill="#343434"
          />
        </svg>
      </Transition>
    </RippleButton>
  </div>
</template>

<script setup lang="ts">
import { PrimaryButton, RippleButton } from '@/components/button';

import { addressesModel } from '@/entities/addresses';
import { createOrderModel } from '@/entities/create-order';
import { menuModel } from '@/entities/menu';
import { profileModel } from '@/entities/profile';
import { socketStates } from '@/socket';
import { useRouter } from 'vue-router';

const createOrderStore = createOrderModel();
const addressesStore = addressesModel();
const menuStore = menuModel();
const profileStore = profileModel();

const router = useRouter();

async function createNewOrder() {
  if (!profileStore.isLogged) {
    menuStore.showPage('auth', false, true);
    return;
  }

  const success = await createOrderStore.createNewOrder(addressesStore.selectedAddresses);
  if (!success) return;

  if (!socketStates.connected) await createOrderStore.fetchActiveOrders();

  addressesStore.selectedAddresses = [addressesStore.selectedAddresses[0]];

  menuStore.showPage('active-order', false, true);
}

const setCurrentBreakpoint = () => {
  if (createOrderStore.showTarifInfo) createOrderStore.modalEl.setCurrentBreakpoint(0.505);
  else createOrderStore.modalEl.setCurrentBreakpoint(0.9);
};
</script>

<style lang="scss" scoped>
.create-order {
  width: 100%;
  height: 95px;
  background: #fff;
  box-shadow: 0px 0px 100px 0px rgba(0, 0, 0, 0.15);
}
</style>
