"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ShieldAlert, Users, Building2, Banknote, Activity } from "lucide-react";
import { useAuth } from "@/context/auth-context";

export default function AdminDashboard() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        router.push("/");
      } else if (user.role !== "admin") {
        router.push("/explore");
      }
    }
  }, [user, isLoading, router]);

  if (isLoading || user?.role !== "admin") return null;

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="flex items-center gap-4 mb-8">
        <div className="h-12 w-12 bg-red-100 text-red-600 rounded-xl flex items-center justify-center">
          <ShieldAlert className="h-6 w-6" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">Admin Console</h1>
          <p className="text-muted-foreground">System overview and platform management.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        <div className="rounded-2xl border bg-card p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium text-muted-foreground">Total Users</h3>
            <Users className="h-5 w-5 text-blue-500" />
          </div>
          <div className="text-3xl font-bold">14,231</div>
          <p className="text-sm text-green-500 mt-2">+12% this month</p>
        </div>
        <div className="rounded-2xl border bg-card p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium text-muted-foreground">Total Hotels</h3>
            <Building2 className="h-5 w-5 text-orange-500" />
          </div>
          <div className="text-3xl font-bold">842</div>
          <p className="text-sm text-green-500 mt-2">+5% this month</p>
        </div>
        <div className="rounded-2xl border bg-card p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium text-muted-foreground">Platform Revenue</h3>
            <Banknote className="h-5 w-5 text-green-500" />
          </div>
          <div className="text-3xl font-bold">$2.4M</div>
          <p className="text-sm text-green-500 mt-2">+18% this month</p>
        </div>
        <div className="rounded-2xl border bg-card p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium text-muted-foreground">Active Sessions</h3>
            <Activity className="h-5 w-5 text-purple-500" />
          </div>
          <div className="text-3xl font-bold">1,024</div>
          <p className="text-sm text-muted-foreground mt-2">Live right now</p>
        </div>
      </div>

      <div className="rounded-2xl border bg-card p-6 shadow-sm min-h-[400px] flex items-center justify-center text-muted-foreground">
        Admin charts and detailed tables will be loaded here.
      </div>
    </div>
  );
}
