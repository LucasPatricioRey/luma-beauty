<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import { useAuthStore } from '../stores/authStore'

const router = useRouter()
const authStore = useAuthStore()

const fullName = ref('')
const email = ref('')
const password = ref('')
const successMessage = ref('')

const handleRegister = async () => {
  successMessage.value = ''

  const { data, error } = await authStore.register({
    fullName: fullName.value,
    email: email.value,
    password: password.value,
  })

  if (!error) {
    if (data.session) {
      successMessage.value = 'Cuenta creada correctamente.'
      router.push('/productos')
    } else {
      successMessage.value = 'Cuenta creada. Revisá tu email para confirmar el registro.'
    }
  }
}
</script>

<template>
  <section class="page">
    <div class="page__header">
      <p class="page__eyebrow">Registro</p>

      <h1>Crear cuenta</h1>

      <p class="page__description">
        Registrate para guardar tus compras y acceder a las funciones de usuario.
      </p>
    </div>

    <form class="page-card form-card" @submit.prevent="handleRegister">
      <div class="form-group">
        <label for="register-name">Nombre</label>
        <input
          id="register-name"
          v-model="fullName"
          type="text"
          placeholder="Tu nombre"
          required
        >
      </div>

      <div class="form-group">
        <label for="register-email">Email</label>
        <input
          id="register-email"
          v-model="email"
          type="email"
          placeholder="tuemail@mail.com"
          required
        >
      </div>

      <div class="form-group">
        <label for="register-password">Contraseña</label>
        <input
          id="register-password"
          v-model="password"
          type="password"
          placeholder="********"
          required
          minlength="6"
        >
      </div>

      <p v-if="authStore.errorMessage">
        {{ authStore.errorMessage }}
      </p>

      <p v-if="successMessage">
        {{ successMessage }}
      </p>

      <div class="form-actions">
        <button class="button" type="submit" :disabled="authStore.isLoading">
          {{ authStore.isLoading ? 'Creando cuenta...' : 'Crear cuenta' }}
        </button>

        <RouterLink class="button button--secondary" to="/login">
          Ya tengo cuenta
        </RouterLink>
      </div>
    </form>
  </section>
</template>