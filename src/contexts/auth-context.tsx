// src/contexts/auth-context.tsx
'use client'

import { api } from '@/lib/axios'
import { createContext, useContext, useCallback, useState, useMemo, useEffect } from 'react'
import { useRouter } from 'next/navigation'

type User = {
  id: string
  name: string
  email: string
  role: string
}

type AuthContextType = {
  user: User | null
  isLoggedIn: boolean
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  checkAuth: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoggedIn: false,
  loading: true,
  login: async () => {},
  logout: async () => {},
  checkAuth: async () => {}
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [initialized, setInitialized] = useState(false)
  const [isCheckingAuth, setIsCheckingAuth] = useState(false)
  const router = useRouter()

  // Check authentication status
  const checkAuth = useCallback(async () => {
    if (isCheckingAuth) {
      console.log('🔐 Auth context: Already checking auth, skipping');
      return;
    }
    
    try {
      console.log('🔐 Auth context: checkAuth - Starting auth check');
      setIsCheckingAuth(true);
      setLoading(true);
      const response = await api.get('/me');
      console.log('🔐 Auth context: checkAuth - /me response:', response.data);
      setUser(response.data);
    } catch (error: unknown) {
      console.log('🔐 Auth context: checkAuth - Error occurred:', error);
      // If unauthorized, try to refresh token
      if (error && typeof error === 'object' && 'response' in error) {
        const apiError = error as { response?: { status?: number } };
        if (apiError.response?.status === 401) {
          console.log('🔐 Auth context: checkAuth - Got 401, trying refresh');
          try {
            await api.post('/auth/refresh', {});
            const response = await api.get('/me');
            console.log('🔐 Auth context: checkAuth - Refresh successful, user:', response.data);
            setUser(response.data);
          } catch (refreshError) {
            console.log('🔐 Auth context: checkAuth - Refresh failed:', refreshError);
            setUser(null);
            // Don't navigate here, let the auth guard handle it
          }
        } else {
          console.log('🔐 Auth context: checkAuth - Non-401 error, setting user to null');
          setUser(null);
        }
      } else {
        console.log('🔐 Auth context: checkAuth - Unknown error, setting user to null');
        setUser(null);
      }
    } finally {
      console.log('🔐 Auth context: checkAuth - Setting loading to false and initialized to true');
      setLoading(false);
      setInitialized(true);
      setIsCheckingAuth(false);
    }
  }, [isCheckingAuth]);

  // Login function
  const login = useCallback(async (email: string, password: string) => {
    try {
      console.log('🔐 Auth context: Starting login');
      setLoading(true);
      
      // Step 1: Login and get response
      const loginResponse = await api.post('/auth/login', { email, password });
      console.log('🔐 Auth context: Login API response:', loginResponse.data);
      
      // Step 2: Wait for cookies to be set (critical timing fix)
      await new Promise(resolve => setTimeout(resolve, 100));
      
      // Step 3: Set user from login response
      if (loginResponse.data.user) {
        console.log('🔐 Auth context: Setting user from response:', loginResponse.data.user);
        setUser(loginResponse.data.user);
      } else {
        console.log('🔐 Auth context: No user in response, fetching user data');
        // Fallback: fetch user data if not in response
        const userResponse = await api.get('/me');
        console.log('🔐 Auth context: User data from /me:', userResponse.data);
        setUser(userResponse.data);
      }
      
      console.log('🔐 Auth context: Navigating to dashboard');
      // Navigate to dashboard after successful login
      router.push('/dashboard');
    } catch (error: unknown) {
      console.error('❌ Auth context: Login error:', error);
      setUser(null);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [router]);

  // Logout function
  const logout = useCallback(async () => {
    try {
      // Call backend logout endpoint to invalidate tokens
      await api.post('/auth/logout')
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      setUser(null)
      router.push('/login')
    }
  }, [router])

  // Initialize auth check only once on mount, but skip on public pages
  useEffect(() => {
    const pathname = window.location.pathname;
    const publicPages = ['/login', '/register', '/forgot-password'];
    const isPublicPage = publicPages.some(page => pathname.startsWith(page));
    
    console.log('🔐 Auth context: Initializing auth check, initialized:', initialized, 'loading:', loading, 'user:', user, 'isPublicPage:', isPublicPage);
    
    if (!initialized && !isPublicPage) {
      console.log('🔐 Auth context: Starting initial auth check');
      checkAuth();
    } else if (isPublicPage) {
      console.log('🔐 Auth context: On public page, skipping auth check');
      setLoading(false);
      setInitialized(true);
    } else {
      console.log('🔐 Auth context: Already initialized, skipping auth check');
    }
  }, [checkAuth, initialized, loading, user]);

  // Memoized values to prevent unnecessary re-renders
  const value = useMemo(() => ({
    user,
    isLoggedIn: !!user,
    loading,
    login,
    logout,
    checkAuth
  }), [user, loading, login, logout, checkAuth])

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
