import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '@/views/Dashboard.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Dashboard,
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Login.vue'),
    },
    {
      path: '/order',
      name: 'order',
      component: () => import('../views/Order.vue'),
    },
    {
      path: '/income',
      name: 'laporanPemasukan',
      component: () => import('../views/LaporanPemasukan.vue'),
    },
    {
      path: '/expenditure',
      name: 'laporanPengeluaran',
      component: () => import('../views/LaporanPengeluaran.vue'),
    },
    {
      path: '/report',
      name: 'laporanTahunan',
      component: () => import('../views/LaporanTahunan.vue'),
    },
  ],
})

export default router
