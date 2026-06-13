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
    async createOrder(cartItems, total) {
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

      const { data: userData, error: userError } = await supabase.auth.getUser()

      if (userError || !userData.user) {
        this.errorMessage = 'Necesitás iniciar sesión para finalizar la compra.'
        this.isLoading = false

        return {
          data: null,
          error: userError || new Error('Usuario no logueado.'),
        }
      }

      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          user_id: userData.user.id,
          total: Number(total),
          status: 'completed',
        })
        .select('id')
        .single()

      if (orderError) {
        this.errorMessage = orderError.message
        this.isLoading = false

        return {
          data: null,
          error: orderError,
        }
      }

      const orderItems = cartItems.map((item) => {
        const unitPrice = Number(item.price)
        const quantity = Number(item.quantity)

        return {
          order_id: order.id,
          product_id: item.id,
          product_name: item.name,
          quantity,
          unit_price: unitPrice,
          subtotal: unitPrice * quantity,
        }
      })

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems)

      if (itemsError) {
        this.errorMessage = itemsError.message
        this.isLoading = false

        return {
          data: null,
          error: itemsError,
        }
      }

      this.successMessage = 'Compra registrada correctamente.'
      this.isLoading = false

      return {
        data: order,
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