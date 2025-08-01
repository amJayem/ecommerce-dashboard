// src/contexts/auth-context-clean.tsx
'use client'

import { api } from '@/lib/axios'
import { createContext, useContext, useCallback, useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'

type User = {
  id: string
  name: string
  email: string
  role: string
}

type AuthContextType = {
  user: User | null
  isLoggedIn: boolean
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  checkAuth: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoggedIn: false,
  loading: true,
  login: async () => {},
  logout: async () => {},
  checkAuth: async () => {}
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  // Clean checkAuth function
  const checkAuth = useCallback(async () => {
    try {
      console.log('🔐 Checking authentication...')
      const response = await api.get('/me')
      console.log('✅ User authenticated:', response.data)
      setUser(response.data)
    } catch (error) {
      console.log('❌ Not authenticated:', error)
      setUser(null)
      // Redirect to login if not authenticated
      if (typeof window !== 'undefined') {
        router.replace('/login')
      }
    } finally {
      setLoading(false)
    }
  }, [router])

  // Clean login function
  const login = useCallback(async (email: string, password: string) => {
    try {
      console.log('🔐 Logging in...')
      setLoading(true)
      
      const response = await api.post('/auth/login', { email, password })
      console.log('✅ Login successful:', response.data)
      
      if (response.data.user) {
        setUser(response.data.user)
        router.push('/dashboard')
      } else {
        throw new Error('No user data in response')
      }
    } catch (error) {
      console.error('❌ Login failed:', error)
      setUser(null)
      throw error
    } finally {
      setLoading(false)
    }
  }, [router])

  // Clean logout function
  const logout = useCallback(async () => {
    try {
      await api.post('/auth/logout')
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      setUser(null)
      router.push('/login')
    }
  }, [router])

  const value = useMemo(() => ({
    user,
    isLoggedIn: !!user,
    loading,
    login,
    logout,
    checkAuth
  }), [user, loading, login, logout, checkAuth])

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
} 