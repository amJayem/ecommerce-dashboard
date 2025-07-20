// src/components/forms/login-form.tsx
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginFormValues } from "@/lib/validations/auth";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { api } from "@/lib/axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export function LoginForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const react_hook_form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormValues) => {

    // router.push('/dashboard')
    setLoading(true)
    try {
      const res = await api.post('/auth/login', data)
      const { access_token } = res.data
      console.log('Login successful - login form', { access_token })
      localStorage.setItem('token', access_token)
      toast.success('Login successful!')
      // router.push('/dashboard')
      setTimeout(() => {
        router.push('/dashboard')
      }, 100)
    } catch (err: any) {
      console.log('login error -> login-form')
      toast.error(err.response?.data?.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form
      onSubmit={react_hook_form.handleSubmit(onSubmit)}
      className="space-y-4 max-w-sm mx-auto"
    >
      <Input
        placeholder="Email"
        {...react_hook_form.register("email")}
        disabled={loading}
      />
      <Input
        placeholder="Password"
        type="password"
        {...react_hook_form.register("password")}
        disabled={loading}
      />
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Logging in..." : "Login"}
      </Button>
    </form>
  );
}
