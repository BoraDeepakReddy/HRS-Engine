"use client";

import Link from "next/link";
import { Search, Globe, User, LogIn, Menu, Building, MapPin, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ModeToggle } from "@/components/mode-toggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useAuth } from "@/context/auth-context";

export function Header() {
  const { user, intent, setIntent, logout, isLoading } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        
        {/* Logo */}
        <Link href={user ? (intent === "hosting" ? "/owner" : "/explore") : "/"} className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <span className="font-bold">H</span>
          </div>
          <span className="text-xl font-bold tracking-tight">HRS Engine</span>
        </Link>

        {/* Global Search (Desktop only) */}
        <div className="hidden md:flex flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              type="search" 
              placeholder="Search destinations, hotels..." 
              className="w-full bg-muted pl-9 rounded-full border-transparent focus-visible:ring-primary"
            />
          </div>
        </div>

        {/* Right Nav */}
        <div className="flex items-center gap-2 sm:gap-4">
          
          <ModeToggle />
          
          {/* Currency / Language */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground hidden sm:flex rounded-full px-3 h-10 cursor-pointer">
                <Globe className="h-4 w-4" />
                <span>USD</span>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>EUR (€)</DropdownMenuItem>
              <DropdownMenuItem>GBP (£)</DropdownMenuItem>
              <DropdownMenuItem>JPY (¥)</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Language: English</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Mode Switcher for logged in users (except admin) */}
          {user && user.role !== "admin" && (
            <div className="hidden lg:flex bg-muted p-1 rounded-full border">
              <button
                onClick={() => setIntent("booking")}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors flex items-center gap-1.5 ${
                  intent === "booking" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <MapPin className="h-4 w-4" /> Book
              </button>
              <button
                onClick={() => setIntent("hosting")}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors flex items-center gap-1.5 ${
                  intent === "hosting" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Building className="h-4 w-4" /> Host
              </button>
            </div>
          )}

          {/* User Profile */}
          {isLoading ? (
            <div className="h-10 w-10 flex items-center justify-center">
              <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
            </div>
          ) : user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground rounded-full overflow-hidden h-10 w-10 bg-muted border border-border shrink-0 cursor-pointer">
                  <Avatar className="h-full w-full">
                    <AvatarImage src={`https://ui-avatars.com/api/?name=${user.name}&background=random`} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="flex flex-col space-y-1 p-2 border-b mb-2">
                  <p className="text-sm font-medium leading-none">{user.name}</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {user.email}
                  </p>
                </div>
                
                {user.role === "admin" ? (
                  <>
                    {/* @ts-ignore */}
                    <DropdownMenuItem asChild>
                      <Link href="/admin">Admin Console</Link>
                    </DropdownMenuItem>
                  </>
                ) : (
                  <>
                    {/* @ts-ignore */}
                    <DropdownMenuItem asChild>
                      <Link href="/account">My Dashboard</Link>
                    </DropdownMenuItem>
                    {/* @ts-ignore */}
                    <DropdownMenuItem asChild>
                      <Link href="/account?tab=saved">Saved Hotels</Link>
                    </DropdownMenuItem>
                    {/* @ts-ignore */}
                    <DropdownMenuItem asChild>
                      <Link href="/account?tab=profile">Settings</Link>
                    </DropdownMenuItem>
                    
                    {/* Mobile Mode Switcher */}
                    <div className="lg:hidden">
                      <DropdownMenuSeparator />
                      <div className="p-2">
                        <p className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wider">Switch Mode</p>
                        <div className="grid grid-cols-2 gap-2">
                          <button
                            onClick={() => setIntent("booking")}
                            className={`px-2 py-1.5 rounded-md text-xs font-medium border ${intent === "booking" ? "bg-primary/10 border-primary text-primary" : "hover:bg-muted"}`}
                          >
                            Booking
                          </button>
                          <button
                            onClick={() => setIntent("hosting")}
                            className={`px-2 py-1.5 rounded-md text-xs font-medium border ${intent === "hosting" ? "bg-primary/10 border-primary text-primary" : "hover:bg-muted"}`}
                          >
                            Hosting
                          </button>
                        </div>
                      </div>
                    </div>
                  </>
                )}
                
                <DropdownMenuSeparator />
                {/* @ts-ignore */}
                <DropdownMenuItem asChild>
                  <button onClick={logout} className="w-full text-left text-red-500 font-medium">Sign out</button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="hidden sm:flex">
              <Link href="/">
                <Button variant="default" className="rounded-full shadow-md">
                  <LogIn className="mr-2 h-4 w-4" /> Sign In
                </Button>
              </Link>
            </div>
          )}

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <div className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 w-10 md:hidden cursor-pointer">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </div>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col gap-6 mt-8">
                <Link href="/" className="text-lg font-semibold border-b pb-4">Home</Link>
                <Link href="/explore" className="text-lg font-semibold border-b pb-4">Explore Hotels</Link>
                <Link href="/offers" className="text-lg font-semibold border-b pb-4">Special Offers</Link>
                <Link href="/contact" className="text-lg font-semibold border-b pb-4">Contact Us</Link>
              </div>
            </SheetContent>
          </Sheet>

        </div>
      </div>
    </header>
  );
}
