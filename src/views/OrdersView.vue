<template>
  <section class="page">
    <div class="page__header">
      <p class="page__eyebrow">Mis compras</p>

      <h1>Historial de compras</h1>

      <p class="page__description">
        Consultá las compras realizadas con tu cuenta en Luma Beauty.
      </p>
    </div>

    <div class="empty-state">
      <p>No hay compras registradas.</p>

      <RouterLink class="button" to="/productos">
        Explorar productos
      </RouterLink>
    </div>
  </section>
</template>