// src/lib/axios.ts
import axios from "axios";

console.log('🔧 Axios config - API URL:', process.env.NEXT_PUBLIC_API_URL)

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true, // Important: This sends cookies with requests
  headers: {
    "Content-Type": "application/json",
  },
});

// Simple request logging
api.interceptors.request.use(
  (config) => {
    console.log('🚀 Making request to:', config.url);
    console.log('🚀 With credentials:', config.withCredentials);
    return config;
  },
  (error) => {
    console.error('❌ Request error:', error);
    return Promise.reject(error);
  }
);

// Simple response logging
api.interceptors.response.use(
  (response) => {
    console.log('✅ Response received:', response.status, response.config.url);
    return response;
  },
  (error) => {
    console.log('❌ API Error:', error.response?.status, error.message);
    return Promise.reject(error);
  }
);
