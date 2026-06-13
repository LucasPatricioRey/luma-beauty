<script setup>
import { onMounted, reactive, ref } from 'vue'
import { supabase } from '../services/supabase'

const products = ref([])
const categories = ref([])

const isLoading = ref(false)
const isSaving = ref(false)
const errorMessage = ref('')
const successMessage = ref('')
const editingProductId = ref(null)

const form = reactive({
  name: '',
  description: '',
  price: 0,
  stock: 0,
  image_url: '',
  category_id: '',
})

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
    products.value = []
  } else {
    products.value = data || []
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
    errorMessage.value = error.message
    categories.value = []
  } else {
    categories.value = data || []
  }
}

const resetForm = () => {
  editingProductId.value = null

  form.name = ''
  form.description = ''
  form.price = 0
  form.stock = 0
  form.image_url = ''
  form.category_id = ''
}

const startEdit = (product) => {
  editingProductId.value = product.id

  form.name = product.name
  form.description = product.description
  form.price = Number(product.price)
  form.stock = Number(product.stock)
  form.image_url = product.image_url || ''
  form.category_id = product.category_id ? String(product.category_id) : ''
}

const getCategoryName = (categoryId) => {
  const category = categories.value.find(
    (item) => String(item.id) === String(categoryId)
  )

  return category ? category.name : 'Sin categoría'
}

const saveProduct = async () => {
  errorMessage.value = ''
  successMessage.value = ''

  if (form.name.trim() === '') {
    errorMessage.value = 'El nombre del producto es obligatorio.'
    return
  }

  if (Number(form.price) < 0) {
    errorMessage.value = 'El precio no puede ser negativo.'
    return
  }

  if (Number(form.stock) < 0) {
    errorMessage.value = 'El stock no puede ser negativo.'
    return
  }

  isSaving.value = true

  const productData = {
    name: form.name.trim(),
    description: form.description.trim(),
    price: Number(form.price),
    stock: Number(form.stock),
    image_url: form.image_url.trim() || null,
    category_id: form.category_id ? Number(form.category_id) : null,
  }

  let response

  if (editingProductId.value) {
    response = await supabase
      .from('products')
      .update(productData)
      .eq('id', editingProductId.value)
  } else {
    response = await supabase
      .from('products')
      .insert(productData)
  }

  if (response.error) {
    console.error('Error guardando producto:', response.error)
    errorMessage.value = response.error.message
  } else {
    successMessage.value = editingProductId.value
      ? 'Producto actualizado correctamente.'
      : 'Producto creado correctamente.'

    resetForm()
    await loadProducts()
  }

  isSaving.value = false
}

const deleteProduct = async (product) => {
  const confirmed = confirm(`¿Eliminar el producto "${product.name}"?`)

  if (!confirmed) {
    return
  }

  errorMessage.value = ''
  successMessage.value = ''

  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', product.id)

  if (error) {
    console.error('Error eliminando producto:', error)
    errorMessage.value = error.message
  } else {
    successMessage.value = 'Producto eliminado correctamente.'

    if (editingProductId.value === product.id) {
      resetForm()
    }

    await loadProducts()
  }
}

onMounted(async () => {
  await loadCategories()
  await loadProducts()
})
</script>

<template>
  <section class="page">
    <div class="page__header">
      <p class="page__eyebrow">Administración</p>

      <h1>Panel de productos</h1>

      <p class="page__description">
        Desde esta sección se pueden crear, editar y eliminar productos de Luma Beauty.
      </p>
    </div>

    <p v-if="errorMessage">
      Error: {{ errorMessage }}
    </p>

    <p v-if="successMessage">
      {{ successMessage }}
    </p>

    <form @submit.prevent="saveProduct">
      <h2>
        {{ editingProductId ? 'Editar producto' : 'Nuevo producto' }}
      </h2>

      <div>
        <label for="product-name">Nombre</label>
        <input
          id="product-name"
          v-model="form.name"
          type="text"
          required
        >
      </div>

      <div>
        <label for="product-description">Descripción</label>
        <textarea
          id="product-description"
          v-model="form.description"
          rows="3"
        />
      </div>

      <div>
        <label for="product-price">Precio</label>
        <input
          id="product-price"
          v-model.number="form.price"
          type="number"
          min="0"
          step="0.01"
          required
        >
      </div>

      <div>
        <label for="product-stock">Stock</label>
        <input
          id="product-stock"
          v-model.number="form.stock"
          type="number"
          min="0"
          required
        >
      </div>

      <div>
        <label for="product-image">Imagen URL</label>
        <input
          id="product-image"
          v-model="form.image_url"
          type="url"
          placeholder="https://..."
        >
      </div>

      <div>
        <label for="product-category">Categoría</label>
        <select id="product-category" v-model="form.category_id">
          <option value="">Sin categoría</option>

          <option
            v-for="category in categories"
            :key="category.id"
            :value="String(category.id)"
          >
            {{ category.name }}
          </option>
        </select>
      </div>

      <button type="submit" :disabled="isSaving">
        {{ isSaving ? 'Guardando...' : editingProductId ? 'Guardar cambios' : 'Crear producto' }}
      </button>

      <button
        v-if="editingProductId"
        type="button"
        @click="resetForm"
      >
        Cancelar edición
      </button>
    </form>

    <hr>

    <h2>Productos cargados</h2>

    <p v-if="isLoading">
      Cargando productos...
    </p>

    <div v-else-if="products.length > 0">
      <article
        v-for="product in products"
        :key="product.id"
      >
        <img
          v-if="product.image_url"
          :src="product.image_url"
          :alt="product.name"
          width="160"
        >

        <h3>{{ product.name }}</h3>

        <p>{{ product.description }}</p>

        <p>
          Categoría: {{ getCategoryName(product.category_id) }}
        </p>

        <p>
          Precio: ${{ product.price }}
        </p>

        <p>
          Stock: {{ product.stock }}
        </p>

        <button type="button" @click="startEdit(product)">
          Editar
        </button>

        <button type="button" @click="deleteProduct(product)">
          Eliminar
        </button>
      </article>
    </div>

    <p v-else>
      No hay productos cargados.
    </p>
  </section>
</template>