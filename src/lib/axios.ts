// src/lib/axios.ts
import axios from 'axios'

export const api = axios.create({
  baseURL: 'http://localhost:3000', // process.env.NEXT_PUBLIC_API_URL ||
  headers: {
    'Content-Type': 'application/json'
  }
})

// Optional: add auth token automatically
api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
  }
  return config
})

// Optional: global error handler
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.message || 'Something went wrong'
    return Promise.reject(new Error(message))
  }
)
