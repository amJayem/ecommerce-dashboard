// src/contexts/auth-context.tsx
'use client'

import { api } from '@/lib/axios'
import { createContext, useContext, useCallback, useState, useEffect } from 'react'
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
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  // Check if user is authenticated
  const checkAuth = useCallback(async () => {
    try {
      const response = await api.get('/me')
      console.log('✅ User authenticated:', response.data)
      setUser(response.data)
    } catch (error: unknown) {
      // Only log non-401 errors to reduce noise
      const apiError = error as { response?: { status?: number } }
      if (apiError?.response?.status !== 401) {
        console.log('❌ Auth check failed:', apiError?.response?.status || 'Unknown error')
      }
      setUser(null)
    } finally {
      setLoading(false)
    }
  }, [])

  // Login function
  const login = useCallback(async (email: string, password: string) => {
    try {
      console.log('🔐 Logging in...')
      setLoading(true)
      
      const response = await api.post('/auth/login', { email, password })
      console.log('✅ Login successful:', response.data)
      
      if (response.data.user) {
        setUser(response.data.user)
        console.log('🔐 Setting user and redirecting to dashboard...')
        
        // Force a small delay to ensure state is updated
        setTimeout(() => {
          router.push('/dashboard')
        }, 100)
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

  // Logout function
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

  // Check auth on mount
  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  const value = {
    user,
    isLoggedIn: !!user,
    loading,
    login,
    logout
  }

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
