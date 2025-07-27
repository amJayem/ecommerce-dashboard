import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Get tokens from cookies
  const accessToken = request.cookies.get('access_token')?.value
  const refreshToken = request.cookies.get('refresh_token')?.value

  // Public routes that don't require authentication
  const publicRoutes = ['/login', '/register', '/forgot-password']
  const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route))

  // Dashboard routes that require authentication
  const isDashboardRoute = pathname.startsWith('/dashboard')

  // If accessing dashboard without tokens, redirect to login
  if (isDashboardRoute && !accessToken && !refreshToken) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // If accessing login/register while having tokens, redirect to dashboard
  if (isPublicRoute && (accessToken || refreshToken)) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  // Allow all other requests to proceed
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/login',
    '/register',
    '/forgot-password'
  ]
}
