import { defineStore } from 'pinia'
import { supabase } from '../services/supabase'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    isLoading: false,
    errorMessage: '',
  }),

  getters: {
    isLoggedIn: (state) => {
      return Boolean(state.user)
    },

    userEmail: (state) => {
      return state.user?.email || ''
    },
  },

  actions: {
    async initAuth() {
      const { data } = await supabase.auth.getUser()

      this.user = data.user

      supabase.auth.onAuthStateChange((_event, session) => {
        this.user = session?.user || null
      })
    },

    async register({ fullName, email, password }) {
      this.isLoading = true
      this.errorMessage = ''

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      })

      if (error) {
        this.errorMessage = error.message
      } else {
        this.user = data.session?.user || null
      }

      this.isLoading = false

      return { data, error }
    },

    async login({ email, password }) {
      this.isLoading = true
      this.errorMessage = ''

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        this.errorMessage = error.message
      } else {
        this.user = data.user
      }

      this.isLoading = false

      return { data, error }
    },

    async logout() {
      await supabase.auth.signOut()

      this.user = null
    },
  },
})