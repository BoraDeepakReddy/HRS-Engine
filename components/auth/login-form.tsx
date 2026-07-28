"use client";

import { useState } from "react";
import { Loader2, ArrowRight, Building, MapPin } from "lucide-react";
import { useAuth, Intent } from "@/context/auth-context";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { signIn } from "next-auth/react";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isChecking, setIsChecking] = useState(false);
  const [showIntent, setShowIntent] = useState(false);
  const [error, setError] = useState("");
  
  const { setIntent } = useAuth();
  const router = useRouter();

  const handleInitialSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    setIsChecking(true);
    setError("");
    
    try {
      const trimmedEmail = email.trim();
      const res = await signIn("credentials", {
        email: trimmedEmail,
        password: password.trim(),
        redirect: false,
      });

      if (res?.error) {
        console.error("NextAuth Error:", res.error);
        setError("Invalid email or password");
        setIsChecking(false);
        return;
      }

      setIsChecking(false);
      
      // If it's the admin, route directly
      if (trimmedEmail === "admin@hrs.com") {
        router.push("/admin");
      } else {
        // For any other user, show the intent selection
        setShowIntent(true);
      }
    } catch (err: any) {
      setError(err.message);
      setIsChecking(false);
    }
  };

  const handleIntentSelection = (selectedIntent: Intent) => {
    setIntent(selectedIntent);
  };

  if (showIntent) {
    return (
      <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
        <div className="text-center mb-6">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
            <span className="text-xl font-bold">Hi</span>
          </div>
          <h3 className="text-xl font-bold">Welcome back!</h3>
          <p className="text-sm text-muted-foreground mt-1">What would you like to do today?</p>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <Button 
            variant="outline" 
            className="h-24 flex flex-col items-center justify-center gap-2 rounded-2xl border-2 hover:border-primary hover:bg-primary/5 transition-all"
            onClick={() => handleIntentSelection("booking")}
          >
            <MapPin className="h-6 w-6 text-primary" />
            <span className="font-semibold text-base">Book a Room</span>
            <span className="text-xs text-muted-foreground font-normal">Explore and reserve hotels</span>
          </Button>

          <Button 
            variant="outline" 
            className="h-24 flex flex-col items-center justify-center gap-2 rounded-2xl border-2 hover:border-primary hover:bg-primary/5 transition-all"
            onClick={() => handleIntentSelection("hosting")}
          >
            <Building className="h-6 w-6 text-primary" />
            <span className="font-semibold text-base">Add a Hotel</span>
            <span className="text-xs text-muted-foreground font-normal">Manage your properties</span>
          </Button>
        </div>
        
        <button 
          onClick={() => setShowIntent(false)}
          className="w-full text-center text-sm text-muted-foreground hover:text-foreground mt-4"
        >
          Cancel
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleInitialSubmit} className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">Email</label>
        <Input 
          type="email" 
          placeholder="admin@hrs.com or user@example.com" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required 
          className="h-12 rounded-xl"
        />
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium">Password</label>
          <a href="#" className="text-xs text-primary hover:underline">Forgot password?</a>
        </div>
        <Input 
          type="password" 
          placeholder="••••••••" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required 
          className="h-12 rounded-xl"
        />
      </div>

      {error && <p className="text-sm text-red-500 font-medium">{error}</p>}
      
      <Button 
        type="submit"  
        className="w-full h-12 rounded-xl text-base shadow-md mt-6" 
        disabled={isChecking}
      >
        {isChecking ? (
          <Loader2 className="h-5 w-5 animate-spin" />
        ) : (
          <>Sign In <ArrowRight className="ml-2 h-4 w-4" /></>
        )}
      </Button>

      <div className="relative my-8">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t"></div>
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Button variant="outline" type="button" className="h-12 rounded-xl bg-card">
          Google
        </Button>
        <Button variant="outline" type="button" className="h-12 rounded-xl bg-card">
          Apple
        </Button>
      </div>
    </form>
  );
}
