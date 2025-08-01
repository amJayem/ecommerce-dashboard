// src/components/logout-button.tsx
'use client'

import { useAuth } from '@/contexts/auth-context'
import { Button } from '@/components/ui/button'

export function LogoutButton() {
  const { logout } = useAuth()

  const handleLogout = async () => {
    try {
      await logout()
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  return (
    <Button onClick={handleLogout} variant="destructive">
      Logout
    </Button>
  )
} 