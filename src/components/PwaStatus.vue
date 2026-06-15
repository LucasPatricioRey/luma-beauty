<script setup>
import { useRegisterSW } from 'virtual:pwa-register/vue'

const {
  offlineReady,
  needRefresh,
  updateServiceWorker,
} = useRegisterSW()

const closeMessage = () => {
  offlineReady.value = false
  needRefresh.value = false
}
</script>

<template>
  <div v-if="offlineReady || needRefresh" role="alert">
    <p v-if="offlineReady">
      Luma Beauty está lista para usarse sin conexión.
    </p>

    <p v-else>
      Hay una nueva versión disponible.
    </p>

    <button
      v-if="needRefresh"
      type="button"
      @click="updateServiceWorker(true)"
    >
      Actualizar
    </button>

    <button type="button" @click="closeMessage">
      Cerrar
    </button>
  </div>
</template>