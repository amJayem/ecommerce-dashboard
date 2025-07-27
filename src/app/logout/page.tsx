"use client";
import { useAuth } from "@/contexts/auth-context";
import { useEffect } from "react";
import { PageLoading } from "@/components/ui/loading";

export default function LogoutPage() {
  const { logout } = useAuth();

  useEffect(() => {
    // Call logout function which will handle backend logout and redirect
    logout().catch(console.error);
  }, [logout]);

  return <PageLoading />;
} 