<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

import { supabase } from '../services/supabase'
import { useCartStore } from '../stores/cartStore'

const cartStore = useCartStore()

const addToCart = () => {
  cartStore.addProduct(product.value)
}

const route = useRoute()

const product = ref(null)
const isLoading = ref(false)
const errorMessage = ref('')

const loadProduct = async () => {
  isLoading.value = true
  errorMessage.value = ''

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

onMounted(() => {
  loadProduct()
})
</script>
<!-- NOTA: creo que hay que hacer un componente xq repetirmos html aca y en productView -->
<template>
  <section>
    <p v-if="isLoading">
      Cargando producto...
    </p>

    <p v-else-if="errorMessage">
      {{ errorMessage }}
    </p>

    <article v-else-if="product">
      <img v-if="product.image_url" :src="product.image_url" :alt="product.name" width="300">

      <h1>{{ product.name }}</h1>

      <p>{{ product.description }}</p>

      <p>
        Precio: ${{ product.price }}
      </p>

      <p>
        Stock: {{ product.stock }}
      </p>

      <button @click="addToCart">
        Agregar al carrito
      </button>
      
    </article>
  </section>
</template>