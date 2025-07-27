// app/dashboard/components/auth-guard.tsx
'use client'

import { useAuth } from '@/contexts/auth-context'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { Skeleton } from '@/components/ui/skeleton'

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { isLoggedIn, loading, checkAuth } = useAuth()
  const router = useRouter()

  // Check auth on mount only if not already logged in and not loading
  useEffect(() => {
    if (!isLoggedIn && !loading) {
      console.log('🛡️ Auth guard: Checking auth status');
      checkAuth();
    } else if (loading) {
      console.log('🛡️ Auth guard: Still loading, not checking auth');
    } else if (isLoggedIn) {
      console.log('🛡️ Auth guard: Already logged in, not checking auth');
    }
  }, [checkAuth, isLoggedIn, loading]);

  // Redirect if not logged in (but only after loading is complete)
  useEffect(() => {
    if (!loading && !isLoggedIn) {
      console.log('🛡️ Auth guard: Redirecting to login');
      router.replace('/login');
    }
  }, [isLoggedIn, loading, router]);

  // Show loading skeleton while checking auth
  if (loading) {
    console.log('🛡️ Auth guard: Showing loading skeleton');
    return (
      <div className="p-6 space-y-4">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </div>
    )
  }

  // Don't render anything if not logged in (will redirect)
  if (!isLoggedIn) {
    console.log('🛡️ Auth guard: Not logged in, not rendering');
    return null
  }

  console.log('🛡️ Auth guard: Rendering children');
  return <>{children}</>
}


