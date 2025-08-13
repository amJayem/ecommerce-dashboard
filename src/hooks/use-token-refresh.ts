// src/hooks/use-token-refresh.ts
'use client'

import { api } from '@/lib/axios'
import { useEffect, useRef } from 'react'
import { useAuth } from '@/contexts/auth-context'

export function useTokenRefresh() {
  const { isLoggedIn } = useAuth()
  const refreshTimerRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    // Clear any existing timer
    if (refreshTimerRef.current) {
      clearTimeout(refreshTimerRef.current)
    }

    // Only set up refresh if user is logged in
    if (isLoggedIn) {
      // Refresh token 10 minutes before expiry (access token lasts 15 minutes)
      const REFRESH_INTERVAL = 5 * 60 * 1000 // 5 minutes

      const refreshToken = async () => {
        try {
          console.log('🔄 Proactively refreshing token')
          await api.post('/auth/refresh')
          console.log('✅ Token refreshed successfully')

          // Schedule next refresh
          refreshTimerRef.current = setTimeout(refreshToken, REFRESH_INTERVAL)
        } catch (error) {
          console.error('❌ Token refresh failed:', error)
        }
      }

      // Start the refresh cycle
      refreshTimerRef.current = setTimeout(refreshToken, REFRESH_INTERVAL)
    }

    // Cleanup on unmount
    return () => {
      if (refreshTimerRef.current) {
        clearTimeout(refreshTimerRef.current)
      }
    }
  }, [isLoggedIn])
}
