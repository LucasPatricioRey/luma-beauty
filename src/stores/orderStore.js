import { defineStore } from 'pinia'
import { supabase } from '../services/supabase'

export const useOrderStore = defineStore('orders', {
  state: () => ({
    orders: [],
    isLoading: false,
    errorMessage: '',
    successMessage: '',
  }),

  actions: {
    async createOrder(cartItems) {
      this.isLoading = true
      this.errorMessage = ''
      this.successMessage = ''

      if (cartItems.length === 0) {
        this.errorMessage = 'El carrito está vacío.'
        this.isLoading = false

        return {
          data: null,
          error: new Error('El carrito está vacío.'),
        }
      }

      const checkoutItems = cartItems.map((item) => ({
        product_id: item.id,
        quantity: item.quantity,
      }))

      const { data, error } = await supabase.rpc(
        'create_order_with_stock',
        {
          cart_items: checkoutItems,
        }
      )

      if (error) {
        console.error('Error finalizando compra:', error)
        this.errorMessage = error.message
        this.isLoading = false

        return {
          data: null,
          error,
        }
      }

      this.successMessage = 'Compra registrada correctamente.'
      this.isLoading = false

      return {
        data,
        error: null,
      }
    },

    async loadOrders() {
      this.isLoading = true
      this.errorMessage = ''

      const { data: userData, error: userError } = await supabase.auth.getUser()

      if (userError || !userData.user) {
        this.orders = []
        this.errorMessage = 'Necesitás iniciar sesión para ver tus compras.'
        this.isLoading = false
        return
      }

      const { data, error } = await supabase
        .from('orders')
        .select(`
          id,
          total,
          status,
          created_at,
          order_items (
            id,
            product_name,
            quantity,
            unit_price,
            subtotal
          )
        `)
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error cargando compras:', error)
        this.errorMessage = error.message
        this.orders = []
      } else {
        this.orders = data || []
      }

      this.isLoading = false
    },

    clearMessages() {
      this.errorMessage = ''
      this.successMessage = ''
    },
  },
})