// app/(dashboard)/_components/auth-guard.tsx
'use client'

import { useAuth } from '@/contexts/auth-context'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { isLoggedIn, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !isLoggedIn) {
      router.replace('/login')
    }
  }, [isLoggedIn, loading, router])

  if (loading) return <div className="p-4">Loading...</div>

  if (!isLoggedIn) return null

  return <>{children}</>
}


