// src/middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Skip middleware for static files, API routes, and auth pages
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/favicon.ico') ||
    pathname.startsWith('/.well-known') ||
    pathname === '/login' ||
    pathname === '/register' ||
    pathname === '/'
  ) {
    return NextResponse.next()
  }

  // Check for authentication tokens
  const accessToken = request.cookies.get('access_token')?.value
  const refreshToken = request.cookies.get('refresh_token')?.value

  // If accessing dashboard routes without tokens, redirect to login
  if (pathname.startsWith('/dashboard') && !accessToken && !refreshToken) {
    console.log('🛡️ Middleware: No tokens found, redirecting to login')
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // If accessing login/register while having tokens, redirect to dashboard
  if ((pathname === '/login' || pathname === '/register') && (accessToken || refreshToken)) {
    console.log('🛡️ Middleware: User has tokens, redirecting to dashboard')
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
} 