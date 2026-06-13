<script setup>
import { onMounted } from 'vue'

import { useCartStore } from '../stores/cartStore'
import { useOrderStore } from '../stores/orderStore'

const cartStore = useCartStore()
const orderStore = useOrderStore()

const handleCheckout = async () => {
  const { error } = await orderStore.createOrder(
    cartStore.items,
    cartStore.totalPrice
  )

  if (!error) {
    cartStore.clearCart()
  }
}

onMounted(() => {
  orderStore.clearMessages()
})
</script>

<template>
  <section>
    <h1>Carrito</h1>

    <p v-if="orderStore.successMessage">
      {{ orderStore.successMessage }}
    </p>

    <p v-if="orderStore.errorMessage">
      Error: {{ orderStore.errorMessage }}
    </p>

    <p v-if="cartStore.items.length === 0">
      El carrito está vacío.
    </p>

    <div v-else>
      <article
        v-for="item in cartStore.items"
        :key="item.id"
      >
        <h2>{{ item.name }}</h2>

        <p>
          Cantidad: {{ item.quantity }}
        </p>

        <p>
          Precio unitario: ${{ item.price }}
        </p>

        <p>
          Subtotal: ${{ Number(item.price) * item.quantity }}
        </p>

        <button
          type="button"
          @click="cartStore.removeProduct(item.id)"
        >
          Eliminar
        </button>
      </article>

      <hr>

      <p>
        Productos: {{ cartStore.totalItems }}
      </p>

      <p>
        Total: ${{ cartStore.totalPrice }}
      </p>

      <button
        type="button"
        @click="cartStore.clearCart()"
      >
        Vaciar carrito
      </button>

      <button
        type="button"
        :disabled="orderStore.isLoading"
        @click="handleCheckout"
      >
        {{ orderStore.isLoading ? 'Registrando compra...' : 'Finalizar compra' }}
      </button>
    </div>
  </section>
</template>