<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import { useAuthStore } from '../stores/authStore'

const router = useRouter()
const authStore = useAuthStore()

const email = ref('')
const password = ref('')

const handleLogin = async () => {
  const { error } = await authStore.login({
    email: email.value,
    password: password.value,
  })

  if (!error) {
    router.push('/productos')
  }
}
</script>

<template>
  <section class="page">
    <div class="page__header">
      <p class="page__eyebrow">Ingresar</p>

      <h1>Iniciar sesión</h1>

      <p class="page__description">
        Accedé a tu cuenta para continuar con tus compras y revisar tu historial.
      </p>
    </div>

    <form class="page-card form-card" @submit.prevent="handleLogin">
      <div class="form-group">
        <label for="login-email">Email</label>
        <input
          id="login-email"
          v-model="email"
          type="email"
          placeholder="tuemail@mail.com"
          required
        >
      </div>

      <div class="form-group">
        <label for="login-password">Contraseña</label>
        <input
          id="login-password"
          v-model="password"
          type="password"
          placeholder="********"
          required
        >
      </div>

      <p v-if="authStore.errorMessage">
        {{ authStore.errorMessage }}
      </p>


      <div class="form-actions">
        <button class="button" type="submit" :disabled="authStore.isLoading">
          {{ authStore.isLoading ? 'Ingresando...' : 'Iniciar sesión' }}
        </button>

        <RouterLink class="button button--secondary" to="/register">
          Crear cuenta
        </RouterLink>
      </div>
    </form>
  </section>
</template>