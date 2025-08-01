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
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* Allow browser extensions to work without CSP conflicts */}
        <meta httpEquiv="Content-Security-Policy" content="script-src 'self' 'unsafe-inline' 'unsafe-eval' chrome-extension:; style-src 'self' 'unsafe-inline';" />
      </head>
      <body suppressHydrationWarning={true}>
        <Toaster />
        <AuthProvider>
          <QueryClientProviderWrapper>{children}</QueryClientProviderWrapper>
        </AuthProvider>
      </body>
    </html>
  )
}
