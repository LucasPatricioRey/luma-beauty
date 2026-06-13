import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [],
  }),

  getters: {
    totalItems: (state) => {
      return state.items.reduce(
        (total, item) => total + item.quantity,
        0
      )
    },

    totalPrice: (state) => {
      return state.items.reduce(
        (total, item) => total + Number(item.price) * item.quantity,
        0
      )
    },
  },

  actions: {
    addProduct(product) {
      const stock = Number(product.stock)

      if (stock <= 0) {
        return {
          success: false,
          message: 'No hay stock disponible.',
        }
      }

      const existingProduct = this.items.find(
        (item) => item.id === product.id
      )

      if (existingProduct) {
        if (existingProduct.quantity >= stock) {
          return {
            success: false,
            message: 'No hay más stock disponible para este producto.',
          }
        }

        existingProduct.quantity++
      } else {
        this.items.push({
          id: product.id,
          name: product.name,
          description: product.description,
          price: Number(product.price),
          stock,
          image_url: product.image_url,
          category_id: product.category_id,
          quantity: 1,
        })
      }

      this.saveCart()

      return {
        success: true,
        message: 'Producto agregado al carrito.',
      }
    },

    increaseQuantity(productId) {
      const product = this.items.find(
        (item) => item.id === productId
      )

      if (!product) {
        return {
          success: false,
          message: 'El producto no está en el carrito.',
        }
      }

      if (product.quantity >= Number(product.stock)) {
        return {
          success: false,
          message: 'No hay más stock disponible para este producto.',
        }
      }

      product.quantity++

      this.saveCart()

      return {
        success: true,
        message: 'Cantidad actualizada.',
      }
    },

    decreaseQuantity(productId) {
      const product = this.items.find(
        (item) => item.id === productId
      )

      if (!product) {
        return {
          success: false,
          message: 'El producto no está en el carrito.',
        }
      }

      if (product.quantity <= 1) {
        this.removeProduct(productId)

        return {
          success: true,
          message: 'Producto eliminado del carrito.',
        }
      }

      product.quantity--

      this.saveCart()

      return {
        success: true,
        message: 'Cantidad actualizada.',
      }
    },

    removeProduct(productId) {
      this.items = this.items.filter(
        (item) => item.id !== productId
      )

      this.saveCart()

      return {
        success: true,
        message: 'Producto eliminado del carrito.',
      }
    },

    clearCart() {
      this.items = []

      localStorage.removeItem('cart')

      return {
        success: true,
        message: 'Carrito vaciado.',
      }
    },

    saveCart() {
      localStorage.setItem(
        'cart',
        JSON.stringify(this.items)
      )
    },

    loadCart() {
      const savedCart = localStorage.getItem('cart')

      if (savedCart) {
        try {
          const parsedCart = JSON.parse(savedCart)

          this.items = parsedCart.map((item) => ({
            ...item,
            price: Number(item.price),
            stock: Number(item.stock) || 0,
            quantity: Number(item.quantity) || 1,
          }))
        } catch (error) {
          console.error('Error cargando carrito:', error)

          this.items = []
          localStorage.removeItem('cart')
        }
      }
    },
  },
})