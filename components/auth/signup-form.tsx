"use client";

import { useState } from "react";
import { Loader2, ArrowRight } from "lucide-react";
import { useAuth } from "@/context/auth-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

import { signIn } from "next-auth/react";

export function SignUpForm({ onSwitchToLogin }: { onSwitchToLogin: () => void }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  
  const { setIntent } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) return;

    setIsLoading(true);
    setError("");
    
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Registration failed");
      }

      // Automatically sign them in
      const signInRes = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (signInRes?.error) {
        throw new Error(signInRes.error);
      }

      // Default to booking mode for new signups
      setIntent("booking");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">Full Name</label>
        <Input 
          placeholder="John Doe" 
          value={name}
          onChange={(e) => setName(e.target.value)}
          required 
          className="h-12 rounded-xl"
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">Email</label>
        <Input 
          type="email" 
          placeholder="john@example.com" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required 
          className="h-12 rounded-xl"
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">Password</label>
        <Input 
          type="password" 
          placeholder="Create a strong password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required 
          className="h-12 rounded-xl"
        />
      </div>
      
      <div className="flex items-center space-x-2 pt-2">
        <Checkbox id="terms" required />
        <label htmlFor="terms" className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          I accept the <a href="#" className="text-primary hover:underline">Terms & Conditions</a>
        </label>
      </div>

      {error && <p className="text-sm text-red-500 font-medium">{error}</p>}
      
      <Button 
        type="submit" 
        className="w-full h-12 rounded-xl text-base shadow-md mt-6" 
        disabled={isLoading}
      >
        {isLoading ? (
          <Loader2 className="h-5 w-5 animate-spin" />
        ) : (
          <>Create Account <ArrowRight className="ml-2 h-4 w-4" /></>
        )}
      </Button>

      <p className="text-center text-sm text-muted-foreground mt-6">
        Already have an account?{" "}
        <button type="button" onClick={onSwitchToLogin} className="text-primary font-semibold hover:underline">
          Log in
        </button>
      </p>
    </form>
  );
}
