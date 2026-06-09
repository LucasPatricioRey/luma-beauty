<script setup>
import { onMounted, ref } from 'vue'
import { supabase } from '../services/supabase'

const products = ref([])
const isLoading = ref(false)
const errorMessage = ref('')

const loadProducts = async () => {
  isLoading.value = true
  errorMessage.value = ''

  const { data, error } = await supabase
    .from('products')
    .select('id, name, description, price, stock, image_url, category_id')
    .order('id', { ascending: true })

  if (error) {
    console.error('Error cargando productos:', error)
    errorMessage.value = error.message
  } else {
    products.value = data
  }

  isLoading.value = false
}

onMounted(() => {
  loadProducts()
})
</script>

<template>
  <section class="page">
    <h1>Productos</h1>

    <p>
      Explorá los productos disponibles en Luma Beauty.
    </p>

    <p v-if="isLoading">
      Cargando productos...
    </p>

    <p v-else-if="errorMessage">
      Error: {{ errorMessage }}
    </p>

    <div v-else-if="products.length > 0">
      <article v-for="product in products" :key="product.id">

      <img :src="product.image_url" :alt="product.name" width="200">
  

        <h2>{{ product.name }}</h2>

        <p>{{ product.description }}</p>

        <p>Precio: ${{ product.price }}</p>

        <p>Stock: {{ product.stock }}</p>

        <RouterLink :to="`/productos/${product.id}`">
          Ver detalle
        </RouterLink>
      </article>
    </div>

    <p v-else>
      No hay productos cargados.
    </p>
  </section>
</template>