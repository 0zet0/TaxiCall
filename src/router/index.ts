import { createRouter } from '@ionic/vue-router';
import { RouteRecordRaw, createWebHashHistory } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/auth'
  },
  {
    path: '/default-page',
    name: 'DefaultPage',
    component: () => import('@/pages/default-page.vue')
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/pages/home-page.vue')
  },
  {
    path: '/create-order',
    name: 'CreateOrderPage',
    component: () => import('@/pages/create-order-page.vue')
  },
  {
    path: '/auth',
    name: 'AuthPage',
    component: () => import('@/pages/auth-page.vue')
  },
  {
    path: '/search-address',
    name: 'SearchAddressPage',
    component: () => import('@/pages/search-address-page.vue')
  },
  {
    path: '/profile-page',
    name: 'ProfilePage',
    component: () => import('@/pages/profile-page.vue')
  },
  {
    path: '/active-order',
    name: 'ActiveOrderPage',
    component: () => import('@/pages/active-order-page.vue')
  },
  {
    path: '/order-detail',
    name: 'OrderDetailPage',
    component: () => import('@/pages/order-detail-page.vue')
  },
  {
    path: '/select-address',
    name: 'SelectAddressPage',
    component: () => import('@/pages/select-address-page.vue')
  },
  {
    path: '/sliders-page',
    name: 'SlidersPage',
    component: () => import('@/pages/sliders-page.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes
})

export default router
