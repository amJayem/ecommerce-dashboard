// src/components/forms/login-form.tsx
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginFormValues, loginSchema } from "@/lib/validations/auth";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useAuthActions } from "@/hooks/use-auth";

export function LoginForm() {
  const { handleLogin } = useAuthActions();
  const [loading, setLoading] = useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    setLoading(true);
    console.log('🔐 Login form: Starting login process for:', data.email);
    
    try {
      await handleLogin(data.email, data.password);
      console.log('✅ Login form: Login process completed successfully');
    } catch (error) {
      console.error('❌ Login form: Login process failed:', error);
      // Error is already handled in the hook
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-4 max-w-sm mx-auto"
    >
      <Input
        placeholder="Email"
        {...form.register("email")}
        disabled={loading}
      />
      <Input
        placeholder="Password"
        type="password"
        {...form.register("password")}
        disabled={loading}
      />
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Logging in..." : "Login"}
      </Button>
    </form>
  );
}
