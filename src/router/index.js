import { createRouter, createWebHistory } from 'vue-router'

import { supabase } from '../services/supabase'

import AdminProductsView from '../views/AdminProductsView.vue'
import CartView from '../views/CartView.vue'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import NotFoundView from '../views/NotFoundView.vue'
import OrdersView from '../views/OrdersView.vue'
import ProductDetailView from '../views/ProductDetailView.vue'
import ProductsView from '../views/ProductsView.vue'
import RegisterView from '../views/RegisterView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/productos',
    name: 'products',
    component: ProductsView,
  },
  {
    path: '/productos/:id',
    name: 'product-detail',
    component: ProductDetailView,
  },
  {
    path: '/carrito',
    name: 'cart',
    component: CartView,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView,
  },
  {
    path: '/mis-compras',
    name: 'orders',
    component: OrdersView,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/admin',
    name: 'admin-products',
    component: AdminProductsView,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: NotFoundView,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach(async (to) => {
  if (!to.meta.requiresAuth) {
    return true
  }

  const { data } = await supabase.auth.getUser()

  if (data.user) {
    return true
  }

  return {
    name: 'login',
    query: {
      redirect: to.fullPath,
    },
  }
})

export default router