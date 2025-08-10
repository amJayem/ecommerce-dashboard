// Test page for password input component
"use client";

import { PasswordInput } from "@/components/ui/password-input";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function PasswordInputTestPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="w-full max-w-md space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Password Input Test</CardTitle>
            <CardDescription>
              Test the password visibility toggle functionality
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="test@example.com" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password (with toggle)</Label>
              <PasswordInput 
                id="password" 
                placeholder="Enter your password"
                showToggle={true}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password2">Password (without toggle)</Label>
              <PasswordInput 
                id="password2" 
                placeholder="Enter your password"
                showToggle={false}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
