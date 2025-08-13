// src/lib/axios.ts
import axios from 'axios'

const apiUrl = process.env.NEXT_PUBLIC_API_URL
console.log('🔧 Axios config - API URL:', apiUrl)

if (!apiUrl) {
  console.error('❌ NEXT_PUBLIC_API_URL is not defined!')
}

export const api = axios.create({
  baseURL: apiUrl,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
})

api.interceptors.request.use(
  (config) => {
    console.log('🚀 Making request to:', config.url)
    console.log('🚀 Base URL:', config.baseURL)
    console.log('🚀 With credentials:', config.withCredentials)
    return config
  },
  (error) => {
    console.error('❌ Request error:', error)
    return Promise.reject(error)
  }
)

// api.interceptors.response.use(
//   (response) => {
//     console.log('✅ Response received:', response.status, response.config.url);
//     return response;
//   },
//   (error) => {
//     console.log('❌ API Error:', error.response?.status, error.message);
//     console.log('❌ Error URL:', error.config?.url);
//     console.log('❌ Error baseURL:', error.config?.baseURL);
//     return Promise.reject(error);
//   }
// );

api.interceptors.response.use(
  (response) => {
    console.log('✅ Response received:', response.status, response.config.url)
    return response
  },
  async (error) => {
    const originalRequest = error.config

    // If error is 401 and we haven't retried yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      // Don't retry refresh requests to avoid loops
      if (
        originalRequest.url &&
        originalRequest.url.endsWith('/auth/refresh')
      ) {
        return Promise.reject(error)
      }

      try {
        // Call refresh endpoint
        await api.post('/auth/refresh')
        // Retry the original request
        return api(originalRequest)
      } catch (refreshError) {
        // If refresh fails, redirect to login
        console.error('Token refresh failed:', refreshError)
        return Promise.reject(error)
      }
    }

    console.log('❌ API Error:', error.response?.status, error.message)
    console.log('❌ Error URL:', error.config?.url)
    console.log('❌ Error baseURL:', error.config?.baseURL)
    return Promise.reject(error)
  }
)
