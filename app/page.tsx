"use client";

import { useState } from "react";
import { Building2 } from "lucide-react";
import { LoginForm } from "@/components/auth/login-form";
import { SignUpForm } from "@/components/auth/signup-form";

export default function AuthGatewayPage() {
  const [activeTab, setActiveTab] = useState<"login" | "signup">("login");

  return (
    <div className="flex-1 flex flex-col lg:flex-row min-h-screen -mt-16">
      {/* Left Side - Visual/Branding */}
      <div className="hidden lg:flex flex-col justify-between w-1/2 p-12 bg-primary relative overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1542314831-c6a4d14cece2?auto=format&fit=crop&w=1200&q=80" 
            alt="Luxury Hotel" 
            className="w-full h-full object-cover opacity-30 mix-blend-overlay"
          />
        </div>
        
        <div className="relative z-10 flex items-center gap-2 text-primary-foreground font-bold text-3xl">
          <Building2 className="h-10 w-10" />
          <span>HRS Engine</span>
        </div>

        <div className="relative z-10 text-primary-foreground mt-auto mb-10">
          <h1 className="text-5xl font-bold leading-tight mb-6">
            The standard of <br /> luxury hospitality.
          </h1>
          <p className="text-xl opacity-90 max-w-md">
            Join the platform that connects discerning travelers with the world's most extraordinary properties.
          </p>
        </div>
      </div>

      {/* Right Side - Auth Forms */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 md:p-12 relative bg-background">
        <div className="w-full max-w-md">
          
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-2">Welcome</h2>
            <p className="text-muted-foreground">Sign in to your account or create a new one.</p>
          </div>

          <div className="flex p-1 bg-muted rounded-xl mb-8 relative">
            <div 
              className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-background rounded-lg shadow-sm transition-all duration-300 ease-in-out ${
                activeTab === "login" ? "left-1" : "left-[calc(50%+2px)]"
              }`} 
            />
            <button 
              onClick={() => setActiveTab("login")}
              className={`flex-1 py-3 text-sm font-semibold relative z-10 transition-colors ${
                activeTab === "login" ? "text-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Log In
            </button>
            <button 
              onClick={() => setActiveTab("signup")}
              className={`flex-1 py-3 text-sm font-semibold relative z-10 transition-colors ${
                activeTab === "signup" ? "text-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Sign Up
            </button>
          </div>

          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            {activeTab === "login" ? <LoginForm /> : <SignUpForm onSwitchToLogin={() => setActiveTab("login")} />}
          </div>
          
        </div>
      </div>
    </div>
  );
}
