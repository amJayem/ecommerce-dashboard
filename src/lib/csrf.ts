// src/lib/csrf.ts
import { api } from "./axios";

export class CSRFProtection {
  private static token: string | null = null;

  static async getToken(): Promise<string> {
    if (!this.token) {
      try {
        const response = await api.get("/csrf-token");
        this.token = response.data.token;
      } catch (error) {
        console.error("Failed to get CSRF token:", error);
        // Fallback to a simple token for development
        this.token = "dev-csrf-token";
      }
    }
    return this.token ?? "";
  }

  static getHeaders(): Record<string, string> {
    return {
      "X-CSRF-Token": this.token ?? "",
    } as Record<string, string>;
  }

  static clearToken(): void {
    this.token = null;
  }
}
