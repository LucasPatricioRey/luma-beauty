<script setup>
import { useCartStore } from '../stores/cartStore'

const cartStore = useCartStore()
</script>

<template>
  <section>
    <h1>Carrito</h1>

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
          Precio: ${{ item.price }}
        </p>

        <button
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
        @click="cartStore.clearCart()"
      >
        Vaciar carrito
      </button>
    </div>
  </section>
</template>