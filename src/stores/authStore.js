import { defineStore } from 'pinia'
import { supabase } from '../services/supabase'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    profile: null,
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

    userFullName: (state) => {
      return state.profile?.full_name || ''
    },

    isAdmin: (state) => {
      return state.profile?.role === 'admin'
    },
  },

  actions: {
    async initAuth() {
      const { data } = await supabase.auth.getUser()

      this.user = data.user

      if (this.user) {
        await this.loadProfile()
      }

      supabase.auth.onAuthStateChange(async (_event, session) => {
        this.user = session?.user || null

        if (this.user) {
          await this.loadProfile()
        } else {
          this.profile = null
        }
      })
    },

    async loadProfile() {
      if (!this.user) {
        this.profile = null
        return
      }

      const { data, error } = await supabase
        .from('profiles')
        .select('id, full_name, role')
        .eq('id', this.user.id)
        .single()

      if (error) {
        console.error('Error cargando perfil:', error)
        this.profile = null
      } else {
        this.profile = data
      }
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

        if (this.user) {
          await this.loadProfile()
        }
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
        await this.loadProfile()
      }

      this.isLoading = false

      return { data, error }
    },

    async logout() {
      await supabase.auth.signOut()

      this.user = null
      this.profile = null
    },
  },
})