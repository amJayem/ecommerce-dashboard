// src/app/dashboard/page.tsx
'use client'

import { useAuth } from '@/contexts/auth-context'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { LogoutButton } from '@/components/logout-button'
import { useRouter } from 'next/navigation'

export default function DashboardPage() {
  const { user, isLoggedIn, loading } = useAuth()
  const router = useRouter()

  const handleLogin = () => {
    router.push('/login')
  }

  if (loading) {
    return (
      <div className="p-6">
        <Card>
          <CardHeader>
            <CardTitle>Loading...</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Checking authentication...</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!isLoggedIn) {
    return (
      <div className="p-6">
        <Card>
          <CardHeader>
            <CardTitle>Not Authenticated</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>Please log in to access the dashboard.</p>
            <Button onClick={handleLogin} className="w-full sm:w-auto">
              Login
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="p-6">
      <Card>
        <CardHeader>
          <CardTitle>Dashboard</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold">Authentication Status</h3>
            <p className="text-sm text-gray-600">
              Logged in: Yes
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold">User Information</h3>
            <div className="text-sm text-gray-600 space-y-1">
              <p>Name: {user?.name}</p>
              <p>Email: {user?.email}</p>
              <p>Role: {user?.role}</p>
            </div>
          </div>
          
          <LogoutButton />
        </CardContent>
      </Card>
    </div>
  )
}
