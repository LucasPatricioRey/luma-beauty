<script setup>
import { onMounted } from 'vue'

import AppFooter from './components/AppFooter.vue'
import AppNavbar from './components/AppNavbar.vue'

import { useCartStore } from './stores/cartStore'

const cartStore = useCartStore()

onMounted(() => {
  cartStore.loadCart()
})
</script>

<template>
  <AppNavbar />

  <RouterView />

  <AppFooter />
</template>