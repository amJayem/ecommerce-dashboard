// src/components/forms/login-form-clean.tsx
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginFormValues, loginSchema } from "@/lib/validations/auth";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useAuth } from "@/contexts/auth-context-clean";
import toast from "react-hot-toast";

export function LoginForm() {
  const { login } = useAuth();
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

    try {
      await login(data.email, data.password);
      toast.success("Login successful!");
    } catch (error: unknown) {
      console.error("Login error:", error);

      // Handle different error types
      //   if (error.response?.data?.message) {
      //     toast.error(error.response.data.message);
      //   } else if (error.message) {
      //     toast.error(error.message);
      //   } else {
      //     toast.error('Login failed. Please try again.');
      //   }
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
        type="email"
      />
      {form.formState.errors.email && (
        <p className="text-red-500 text-sm">
          {form.formState.errors.email.message}
        </p>
      )}

      <Input
        placeholder="Password"
        {...form.register("password")}
        disabled={loading}
        type="password"
      />
      {form.formState.errors.password && (
        <p className="text-red-500 text-sm">
          {form.formState.errors.password.message}
        </p>
      )}

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Logging in..." : "Login"}
      </Button>
    </form>
  );
}
