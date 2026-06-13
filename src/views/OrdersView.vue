<script setup>
import { onMounted } from 'vue'
import { useOrderStore } from '../stores/orderStore'

const orderStore = useOrderStore()

const formatPrice = (price) => {
  return Number(price).toLocaleString('es-AR')
}

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('es-AR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
}

onMounted(() => {
  orderStore.loadOrders()
})
</script>

<template>
  <section class="page">
    <div class="page__header">
      <p class="page__eyebrow">Mis compras</p>

      <h1>Historial de compras</h1>

      <p class="page__description">
        Consultá las compras realizadas con tu cuenta en Luma Beauty.
      </p>
    </div>

    <p v-if="orderStore.isLoading">
      Cargando compras...
    </p>

    <p v-else-if="orderStore.errorMessage">
      Error: {{ orderStore.errorMessage }}
    </p>

    <div v-else-if="orderStore.orders.length > 0">
      <article
        v-for="order in orderStore.orders"
        :key="order.id"
        class="page-card"
      >
        <h2>Compra #{{ order.id }}</h2>

        <p>
          Fecha: {{ formatDate(order.created_at) }}
        </p>

        <p>
          Estado: {{ order.status }}
        </p>

        <p>
          Total: ${{ formatPrice(order.total) }}
        </p>

        <h3>Productos</h3>

        <ul>
          <li
            v-for="item in order.order_items"
            :key="item.id"
          >
            {{ item.product_name }} -
            {{ item.quantity }} unidad/es -
            ${{ formatPrice(item.subtotal) }}
          </li>
        </ul>
      </article>
    </div>

    <div v-else class="empty-state">
      <p>No hay compras registradas.</p>

      <RouterLink class="button" to="/productos">
        Explorar productos
      </RouterLink>
    </div>
  </section>
</template>