<script setup>
import { computed, onMounted, ref } from 'vue'
import { supabase } from '../services/supabase'

const products = ref([])
const categories = ref([])

const isLoading = ref(false)
const errorMessage = ref('')

const searchText = ref('')
const selectedCategoryId = ref('')

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

const loadCategories = async () => {
  const { data, error } = await supabase
    .from('categories')
    .select('id, name')
    .order('name', { ascending: true })

  if (error) {
    console.error('Error cargando categorias:', error)
  } else {
    categories.value = data
  }
}

const filteredProducts = computed(() => {
  let result = products.value

  if (searchText.value.trim() !== '') {
    const search = searchText.value.toLowerCase().trim()

    result = result.filter((product) =>
      product.name.toLowerCase().includes(search)
    )
  }

  if (selectedCategoryId.value !== '') {
    result = result.filter(
      (product) => String(product.category_id) === selectedCategoryId.value
    )
  }

  return result
})

const getCategoryName = (categoryId) => {
  const category = categories.value.find(
    (item) => item.id === categoryId
  )

  return category ? category.name : 'Sin categoría'
}

const clearFilters = () => {
  searchText.value = ''
  selectedCategoryId.value = ''
}

onMounted(() => {
  loadProducts()
  loadCategories()
})
</script>

<template>
  <section class="page">
    <h1>Productos</h1>

    <p>
      Explorá los productos disponibles en Luma Beauty.
    </p>

    <form @submit.prevent>
      <div>
        <label for="search">Buscar producto</label>
        <input
          id="search"
          v-model="searchText"
          type="text"
          placeholder="Ej: labial, base, paleta"
        >
      </div>

      <div>
        <label for="category">Categoría</label>
        <select id="category" v-model="selectedCategoryId">
          <option value="">Todas las categorías</option>

          <option
            v-for="category in categories"
            :key="category.id"
            :value="String(category.id)"
          >
            {{ category.name }}
          </option>
        </select>
      </div>

      <button type="button" @click="clearFilters">
        Limpiar filtros
      </button>
    </form>

    <p v-if="isLoading">
      Cargando productos...
    </p>

    <p v-else-if="errorMessage">
      Error: {{ errorMessage }}
    </p>

    <div v-else-if="filteredProducts.length > 0">
      <article v-for="product in filteredProducts" :key="product.id">
        <img
          v-if="product.image_url"
          :src="product.image_url"
          :alt="product.name"
          width="200"
        >

        <h2>{{ product.name }}</h2>

        <p>{{ product.description }}</p>

        <p>Categoría: {{ getCategoryName(product.category_id) }}</p>

        <p>Precio: ${{ product.price }}</p>

        <p>Stock: {{ product.stock }}</p>

        <RouterLink :to="`/productos/${product.id}`">
          Ver detalle
        </RouterLink>
      </article>
    </div>

    <p v-else>
      No se encontraron productos con esos filtros.
    </p>
  </section>
</template>