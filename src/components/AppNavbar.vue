<script setup>
import { useRouter } from 'vue-router'

import { useAuthStore } from '../stores/authStore'
import { useCartStore } from '../stores/cartStore'

const router = useRouter()
const authStore = useAuthStore()
const cartStore = useCartStore()

const handleLogout = async () => {
  await authStore.logout()
  router.push('/login')
}
</script>

<template>
  <nav class="navbar__links" aria-label="Navegación principal">
    <RouterLink to="/">Inicio</RouterLink>

    <RouterLink to="/productos">Productos</RouterLink>

    <RouterLink to="/carrito">
      Carrito ({{ cartStore.totalItems }})
    </RouterLink>

    <template v-if="authStore.isLoggedIn">
      <RouterLink to="/mis-compras">Mis compras</RouterLink>

      <RouterLink v-if="authStore.isAdmin" to="/admin">
        Admin
      </RouterLink>

      <span>{{ authStore.userEmail }}</span>

      <button type="button" @click="handleLogout">
        Cerrar sesión
      </button>
    </template>

    <template v-else>
      <RouterLink to="/login">Ingresar</RouterLink>

      <RouterLink to="/register">Registro</RouterLink>
    </template>
  </nav>
</template>