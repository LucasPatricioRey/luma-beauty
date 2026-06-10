<script setup>
import { useAuthStore } from '../stores/authStore'
import { useCartStore } from '../stores/cartStore'

const authStore = useAuthStore()
const cartStore = useCartStore()

const handleLogout = async () => {
  await authStore.logout()
}
</script>

<template>
  <nav class="navbar__links" aria-label="Navegación principal">
    <RouterLink to="/">Inicio</RouterLink>

    <RouterLink to="/productos">Productos</RouterLink>

    <RouterLink to="/carrito">
      Carrito ({{ cartStore.totalItems }})
    </RouterLink>

    <RouterLink to="/mis-compras">Mis compras</RouterLink>

    <RouterLink to="/admin">Admin</RouterLink>

    <template v-if="authStore.isLoggedIn">
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