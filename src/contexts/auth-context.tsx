// src/contexts/auth-context.tsx
'use client'

import { api } from '@/lib/axios'
import { createContext, useContext, useEffect, useState } from 'react'
import { usePathname } from 'next/navigation';

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
  logout: () => void
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoggedIn: false,
  loading: true,
  logout: () => { }
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const pathname = usePathname();

  useEffect(() => {
    // Only fetch /me if not on the login page
    if (pathname !== '/login') {
      api
        .get(`/me`)
        .then((res) => {
          setUser(res.data)
        })
        .catch(() => {
          setUser(null)
        })
        .finally(() => setLoading(false))
    } else {
      setLoading(false)
    }
  }, [pathname])

  const logout = () => {
    setUser(null)
    window.location.href = '/login'
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: !!user,
        loading,
        logout
      }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
