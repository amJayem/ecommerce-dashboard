// src/components/forms/login-form.tsx
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginFormValues, loginSchema } from "@/lib/validations/auth";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useAuthActions } from "@/hooks/use-auth";
import { AlertCircle, Mail, Lock } from "lucide-react";

export function LoginForm() {
  const { handleLogin } = useAuthActions();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    setLoading(true);
    setError(null); // Clear previous errors
    console.log('🔐 Login form: Starting login process for:', data.email);
    
    try {
      await handleLogin(data.email, data.password);
      console.log('✅ Login form: Login process completed successfully');
    } catch (error) {
      console.error('❌ Login form: Login process failed:', error);
      // Set user-friendly error message
      setError(error instanceof Error ? error.message : 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-6 w-full max-w-sm mx-auto"
    >
      {/* Error Display */}
      {error && (
        <div className="flex items-center gap-2 p-3 text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-md">
          <AlertCircle className="h-4 w-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Email Field */}
      <div className="space-y-2">
        <Label htmlFor="email" className="text-sm font-medium">
          Email Address
        </Label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            id="email"
            placeholder="Enter your email"
            type="email"
            className="pl-10"
            {...form.register("email")}
            disabled={loading}
            aria-describedby={form.formState.errors.email ? "email-error" : undefined}
          />
        </div>
        {form.formState.errors.email && (
          <p id="email-error" className="text-sm text-destructive">
            {form.formState.errors.email.message}
          </p>
        )}
      </div>

      {/* Password Field */}
      <div className="space-y-2">
        <Label htmlFor="password" className="text-sm font-medium">
          Password
        </Label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <PasswordInput
            id="password"
            placeholder="Enter your password"
            className="pl-10"
            {...form.register("password")}
            disabled={loading}
            aria-describedby={form.formState.errors.password ? "password-error" : undefined}
          />
        </div>
        {form.formState.errors.password && (
          <p id="password-error" className="text-sm text-destructive">
            {form.formState.errors.password.message}
          </p>
        )}
      </div>

      {/* Submit Button */}
      <Button 
        type="submit" 
        className="w-full" 
        disabled={loading}
        size="lg"
      >
        {loading ? (
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
            Logging in...
          </div>
        ) : (
          "Sign In"
        )}
      </Button>

      {/* Additional Links */}
      <div className="text-center space-y-2">
        <p className="text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <a 
            href="/register" 
            className="text-primary hover:underline font-medium"
          >
            Sign up
          </a>
        </p>
        <p className="text-sm text-muted-foreground">
          <a 
            href="/forgot-password" 
            className="text-primary hover:underline"
          >
            Forgot your password?
          </a>
        </p>
      </div>
    </form>
  );
}
