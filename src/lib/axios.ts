// src/lib/axios.ts
import axios from "axios";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
console.log('🔧 Axios config - API URL:', apiUrl);

if (!apiUrl) {
  console.error('❌ NEXT_PUBLIC_API_URL is not defined!');
}

export const api = axios.create({
  baseURL: apiUrl,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    console.log('🚀 Making request to:', config.url);
    console.log('🚀 Base URL:', config.baseURL);
    console.log('🚀 With credentials:', config.withCredentials);
    return config;
  },
  (error) => {
    console.error('❌ Request error:', error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    console.log('✅ Response received:', response.status, response.config.url);
    return response;
  },
  (error) => {
    console.log('❌ API Error:', error.response?.status, error.message);
    console.log('❌ Error URL:', error.config?.url);
    console.log('❌ Error baseURL:', error.config?.baseURL);
    return Promise.reject(error);
  }
);
