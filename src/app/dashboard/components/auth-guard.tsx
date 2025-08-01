// src/app/dashboard/components/auth-guard.tsx
'use client'

import { useAuth } from '@/contexts/auth-context'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { Skeleton } from '@/components/ui/skeleton'

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { isLoggedIn, loading } = useAuth()
  const router = useRouter()

  // Redirect if not logged in
  useEffect(() => {
    console.log('🛡️ AuthGuard: State changed - loading:', loading, 'isLoggedIn:', isLoggedIn)
    if (!loading && !isLoggedIn) {
      console.log('🛡️ Redirecting to login')
      router.replace('/login')
    }
  }, [isLoggedIn, loading, router])

  // Show loading while checking
  if (loading) {
    return (
      <div className="p-6 space-y-4">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </div>
    )
  }

  // Don't render if not logged in
  if (!isLoggedIn) {
    return null
  }

  return <>{children}</>
}


