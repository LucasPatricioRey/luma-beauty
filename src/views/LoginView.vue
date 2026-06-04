<template>
  <section class="page">
    <div class="page__header">
      <p class="page__eyebrow">Ingresar</p>

      <h1>Iniciar sesión</h1>

      <p class="page__description">
        Accedé a tu cuenta para continuar con tus compras y revisar tu historial.
      </p>
    </div>

    <form class="page-card form-card">
      <div class="form-group">
        <label for="login-email">Email</label>
        <input id="login-email" type="email" placeholder="tuemail@mail.com" />
      </div>

      <div class="form-group">
        <label for="login-password">Contraseña</label>
        <input id="login-password" type="password" placeholder="********" />
      </div>

      <div class="form-actions">
        <button class="button" type="button">
          Iniciar sesión
        </button>

        <RouterLink class="button button--secondary" to="/register">
          Crear cuenta
        </RouterLink>
      </div>
    </form>
  </section>
</template>