<script setup>
import { onMounted } from 'vue'

import AppFooter from './components/AppFooter.vue'
import AppNavbar from './components/AppNavbar.vue'
import PwaStatus from './components/PwaStatus.vue'

import { useAuthStore } from './stores/authStore'
import { useCartStore } from './stores/cartStore'

const authStore = useAuthStore()
const cartStore = useCartStore()

onMounted(() => {
  cartStore.loadCart()
  authStore.initAuth()
})
</script>

<template>
  <AppNavbar />

  <RouterView />

  <AppFooter />

  <PwaStatus />
</template>