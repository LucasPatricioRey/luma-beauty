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
                (total, item) => total + item.price * item.quantity,
                0
            )
        },
    },

    actions: {
        addProduct(product) {
            const existingProduct = this.items.find(
                (item) => item.id === product.id
            )

            if (existingProduct) {
                existingProduct.quantity++
            } else {
                this.items.push({
                    ...product,
                    quantity: 1,
                })
            }

            this.saveCart()
        },

        
        removeProduct(productId) {
            this.items = this.items.filter(
                (item) => item.id !== productId
            )

            this.saveCart()
        },

        clearCart() {
            this.items = []

            this.saveCart()
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
                this.items = JSON.parse(savedCart)
            }
        },

    },
})