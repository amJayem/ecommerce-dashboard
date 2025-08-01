// src/hooks/use-auth.ts
import { useAuth } from '@/contexts/auth-context'
import { useCallback } from 'react'
import toast from 'react-hot-toast'

export function useAuthActions() {
  const { login, logout } = useAuth()

  const handleLogin = useCallback(async (email: string, password: string) => {
    try {
      console.log('🔐 Auth hook: Starting login process')
      await login(email, password)
      console.log('✅ Auth hook: Login completed successfully')
      toast.success('Login successful!')
    } catch (error: unknown) {
      console.error('❌ Auth hook: Login failed:', error)
      if (error && typeof error === 'object' && 'response' in error) {
        const apiError = error as { response?: { data?: { message?: string } } }
        toast.error(apiError.response?.data?.message || 'Login failed')
      } else {
        toast.error('Login failed')
      }
      throw error
    }
  }, [login])

  const handleLogout = useCallback(async () => {
    try {
      await logout()
      toast.success('Logged out successfully')
    } catch (error) {
      console.error('Logout error:', error)
      toast.error('Logout failed')
    }
  }, [logout])

  return {
    handleLogin,
    handleLogout
  }
} 