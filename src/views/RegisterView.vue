<template>
  <section class="page">
    <div class="page__header">
      <p class="page__eyebrow">Registro</p>

      <h1>Crear cuenta</h1>

      <p class="page__description">
        Registrate para guardar tus compras y acceder a las funciones de usuario.
      </p>
    </div>

    <form class="page-card form-card">
      <div class="form-group">
        <label for="register-name">Nombre</label>
        <input id="register-name" type="text" placeholder="Tu nombre" />
      </div>

      <div class="form-group">
        <label for="register-email">Email</label>
        <input id="register-email" type="email" placeholder="tuemail@mail.com" />
      </div>

      <div class="form-group">
        <label for="register-password">Contraseña</label>
        <input id="register-password" type="password" placeholder="********" />
      </div>

      <div class="form-actions">
        <button class="button" type="button">
          Crear cuenta
        </button>

        <RouterLink class="button button--secondary" to="/login">
          Ya tengo cuenta
        </RouterLink>
      </div>
    </form>
  </section>
</template>