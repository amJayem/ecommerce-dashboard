'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Global error:', error)
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <div className="text-center space-y-6 max-w-md">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-red-600">Something went wrong!</h1>
          <p className="text-gray-600">
            {error.message || 'An unexpected error occurred'}
          </p>
        </div>
        
        <div className="space-y-4">
          <Button onClick={reset} className="w-full">
            Try again
          </Button>
          <Button 
            variant="outline" 
            onClick={() => window.location.href = '/login'}
            className="w-full"
          >
            Go to Login
          </Button>
        </div>
      </div>
    </div>
  )
} 