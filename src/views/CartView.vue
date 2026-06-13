<script setup>
import { onMounted, ref } from 'vue'

import { useCartStore } from '../stores/cartStore'
import { useOrderStore } from '../stores/orderStore'

const cartStore = useCartStore()
const orderStore = useOrderStore()

const cartMessage = ref('')

const handleIncrease = (productId) => {
  const result = cartStore.increaseQuantity(productId)

  cartMessage.value = result.message
}

const handleDecrease = (productId) => {
  const result = cartStore.decreaseQuantity(productId)

  cartMessage.value = result.message
}

const handleRemove = (productId) => {
  const result = cartStore.removeProduct(productId)

  cartMessage.value = result.message
}

const handleClearCart = () => {
  const result = cartStore.clearCart()

  cartMessage.value = result.message
}

const handleCheckout = async () => {
  cartMessage.value = ''

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
  cartMessage.value = ''
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

    <p v-if="cartMessage">
      {{ cartMessage }}
    </p>

    <p v-if="cartStore.items.length === 0">
      El carrito está vacío.
    </p>

    <div v-else>
      <article
        v-for="item in cartStore.items"
        :key="item.id"
      >
        <img
          v-if="item.image_url"
          :src="item.image_url"
          :alt="item.name"
          width="120"
        >

        <h2>{{ item.name }}</h2>

        <p>
          Stock disponible: {{ item.stock }}
        </p>

        <p>
          Cantidad: {{ item.quantity }}
        </p>

        <button
          type="button"
          @click="handleDecrease(item.id)"
        >
          -
        </button>

        <button
          type="button"
          :disabled="item.quantity >= item.stock"
          @click="handleIncrease(item.id)"
        >
          +
        </button>

        <p>
          Precio unitario: ${{ item.price }}
        </p>

        <p>
          Subtotal: ${{ Number(item.price) * item.quantity }}
        </p>

        <button
          type="button"
          @click="handleRemove(item.id)"
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
        @click="handleClearCart"
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