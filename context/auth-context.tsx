"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { SessionProvider, useSession, signOut } from "next-auth/react";

export type Intent = "booking" | "hosting" | null;

interface AuthContextType {
  intent: Intent;
  setIntent: (intent: Intent) => void;
  logout: () => void;
  // Expose user directly from session for convenience
  user: {
    name?: string | null;
    email?: string | null;
    role?: string;
  } | null;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function AuthProviderInner({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const [intent, setIntentState] = useState<Intent>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Load intent from localStorage on mount
    const storedIntent = localStorage.getItem("hrs_intent") as Intent;
    if (storedIntent) {
      setIntentState(storedIntent);
    }
  }, []);

  const logout = async () => {
    setIntentState(null);
    localStorage.removeItem("hrs_intent");
    await signOut({ callbackUrl: '/' });
  };

  const setIntent = (newIntent: Intent) => {
    setIntentState(newIntent);
    if (newIntent) {
      localStorage.setItem("hrs_intent", newIntent);
    }
    if (session?.user?.role !== "admin") {
      if (newIntent === "hosting") {
        router.push("/owner");
      } else {
        router.push("/explore");
      }
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user: session?.user || null, 
      intent, 
      logout, 
      setIntent, 
      isLoading: status === "loading" 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <AuthProviderInner>
        {children}
      </AuthProviderInner>
    </SessionProvider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
