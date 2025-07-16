// app/layout.tsx
import { AuthProvider } from '@/contexts/auth-context'
import QueryClientProviderWrapper from '@/providers/query-client-provider'
import { Toaster } from 'react-hot-toast'
import './globals.css'

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body>
        <Toaster />
        <AuthProvider>
          <QueryClientProviderWrapper>{children}</QueryClientProviderWrapper>
        </AuthProvider>
      </body>
    </html>
  )
}
