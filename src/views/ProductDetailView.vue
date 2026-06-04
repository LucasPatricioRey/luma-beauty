<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const productId = computed(() => route.params.id)
</script>

<template>
  <section class="page">
    <div class="page__header">
      <p class="page__eyebrow">Detalle de producto</p>

      <h1>Producto #{{ productId }}</h1>

      <p class="page__description">
        Esta página muestra el producto seleccionado desde el catálogo.
      </p>
    </div>

    <div class="empty-state">
      <p>No se encontró información cargada para este producto.</p>

      <RouterLink class="button" to="/productos">
        Volver al catálogo
      </RouterLink>
    </div>
  </section>
</template>