// src/lib/axios.ts
import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true, // ✅ most important part
  headers: {
    "Content-Type": "application/json",
  },
});

type FailedQueueItem = {
  resolve: (value?: unknown) => void;
  reject: (reason?: unknown) => void;
};

let isRefreshing = false;
let failedQueue: FailedQueueItem[] = [];
let hasRedirected = false; // Prevent multiple redirects

function processQueue(error: unknown, token: string | null = null) {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
}

function redirectToLogin() {
  if (!hasRedirected && typeof window !== 'undefined') {
    const pathname = window.location.pathname;
    const publicPages = ['/login', '/register', '/forgot-password'];
    const isPublicPage = publicPages.some(page => pathname.startsWith(page));
    
    if (!isPublicPage) {
      hasRedirected = true;
      console.log('🔄 Redirecting to login from:', pathname);
      // Use Next.js router instead of window.location
      window.location.replace('/login');
    } else {
      console.log('🔄 Already on public page, not redirecting');
    }
  }
}

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // Reset redirect flag for new requests
    if (originalRequest.url && !originalRequest.url.includes('/auth/')) {
      hasRedirected = false;
    }
    
    // Handle 403 errors from refresh endpoint (no refresh token)
    if (error.response?.status === 403 && originalRequest.url?.endsWith('/auth/refresh')) {
      console.log('🚫 Refresh token missing, redirecting to login');
      redirectToLogin();
      return Promise.reject(error);
    }
    
    // Prevent infinite refresh loop: do not refresh if the failed request is to /auth/refresh
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry &&
      !(originalRequest.url && originalRequest.url.endsWith('/auth/refresh')) &&
      !(originalRequest.url && originalRequest.url.endsWith('/auth/login'))
    ) {
      if (isRefreshing) {
        return new Promise(function(resolve, reject) {
          failedQueue.push({resolve, reject});
        })
        .then(() => api(originalRequest))
        .catch((err) => Promise.reject(err));
      }
      
      originalRequest._retry = true;
      isRefreshing = true;
      
      try {
        console.log('🔄 Attempting token refresh...');
        await api.post('/auth/refresh', {}); // backend uses cookie
        console.log('✅ Token refresh successful');
        processQueue(null);
        return api(originalRequest);
      } catch (refreshError) {
        console.error('❌ Token refresh failed:', refreshError);
        processQueue(refreshError, null);
        
        // If refresh returns 403 (no refresh token), redirect to login immediately
        if (refreshError && typeof refreshError === 'object' && 'response' in refreshError) {
          const apiError = refreshError as { response?: { status?: number } };
          if (apiError.response?.status === 403) {
            console.log('🚫 No refresh token found, redirecting to login');
            redirectToLogin();
          }
        }
        
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }
    
    return Promise.reject(error);
  }
);
