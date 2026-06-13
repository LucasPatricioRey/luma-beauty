<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

import { supabase } from '../services/supabase'
import { useCartStore } from '../stores/cartStore'

const route = useRoute()
const cartStore = useCartStore()

const product = ref(null)
const isLoading = ref(false)
const errorMessage = ref('')
const cartMessage = ref('')

const isOutOfStock = computed(() => {
  return !product.value || Number(product.value.stock) <= 0
})

const loadProduct = async () => {
  isLoading.value = true
  errorMessage.value = ''
  cartMessage.value = ''

  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', route.params.id)
    .single()

  if (error) {
    errorMessage.value = 'No se pudo cargar el producto.'
  } else {
    product.value = data
  }

  isLoading.value = false
}

const addToCart = () => {
  cartMessage.value = ''

  if (!product.value) {
    cartMessage.value = 'No se pudo agregar el producto.'
    return
  }

  const result = cartStore.addProduct(product.value)

  cartMessage.value = result.message
}

onMounted(() => {
  loadProduct()
})
</script>

<template>
  <section>
    <p v-if="isLoading">
      Cargando producto...
    </p>

    <p v-else-if="errorMessage">
      {{ errorMessage }}
    </p>

    <article v-else-if="product">
      <img
        v-if="product.image_url"
        :src="product.image_url"
        :alt="product.name"
        width="300"
      >

      <h1>{{ product.name }}</h1>

      <p>{{ product.description }}</p>

      <p>
        Precio: ${{ product.price }}
      </p>

      <p>
        Stock: {{ product.stock }}
      </p>

      <p v-if="cartMessage">
        {{ cartMessage }}
      </p>

      <button
        type="button"
        :disabled="isOutOfStock"
        @click="addToCart"
      >
        {{ isOutOfStock ? 'Sin stock' : 'Agregar al carrito' }}
      </button>

      <RouterLink to="/productos">
        Volver a productos
      </RouterLink>
    </article>
  </section>
</template>