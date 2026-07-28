"use client";

import { use } from "react";
import Link from "next/link";
import { CheckCircle2, Download, Printer, Calendar as CalendarIcon, MapPin, ChevronRight, Copy } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function ConfirmationPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      
      {/* Success Banner */}
      <div className="flex flex-col items-center text-center mb-10 animate-in zoom-in duration-500">
        <div className="h-20 w-20 bg-green-100 dark:bg-green-900/30 text-green-600 rounded-full flex items-center justify-center mb-6">
          <CheckCircle2 className="h-10 w-10" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Booking Confirmed!</h1>
        <p className="text-muted-foreground text-lg mb-6">
          Thank you for choosing HRS Engine. A confirmation email has been sent to john@example.com.
        </p>
        
        <div className="inline-flex items-center gap-4 bg-muted/50 px-6 py-3 rounded-full border border-border">
          <span className="text-sm text-muted-foreground">Booking Reference:</span>
          <span className="font-mono font-bold text-lg tracking-wider">{id}</span>
          <button className="text-primary hover:text-primary/80 transition-colors">
            <Copy className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Stay Details */}
        <div className="md:col-span-2 space-y-6">
          <div className="rounded-2xl border bg-card p-6 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -z-10" />
            
            <h2 className="text-xl font-bold mb-6">Your Stay Information</h2>
            
            <div className="flex flex-col sm:flex-row gap-6 mb-8">
              <img 
                src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=400&q=80" 
                alt="The Azure Retreat" 
                className="w-full sm:w-40 h-32 object-cover rounded-xl shrink-0"
              />
              <div>
                <h3 className="text-xl font-semibold mb-1">The Azure Retreat & Spa</h3>
                <div className="flex items-center gap-1.5 text-muted-foreground text-sm mb-3">
                  <MapPin className="h-4 w-4 shrink-0" />
                  12 Oia Cliffside, Santorini, Greece
                </div>
                <div className="inline-flex items-center gap-1 bg-primary/10 text-primary px-2.5 py-1 rounded-md text-xs font-semibold">
                  Classic Ocean View
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 border-t pt-6">
              <div>
                <div className="text-sm text-muted-foreground mb-1">Check-in</div>
                <div className="font-semibold text-lg">Oct 12, 2026</div>
                <div className="text-sm text-muted-foreground mt-1">From 15:00</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground mb-1">Check-out</div>
                <div className="font-semibold text-lg">Oct 16, 2026</div>
                <div className="text-sm text-muted-foreground mt-1">Until 11:00</div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 border-t mt-6 pt-6">
              <div>
                <div className="text-sm text-muted-foreground mb-1">Guests</div>
                <div className="font-medium">2 Adults</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground mb-1">Total Paid</div>
                <div className="font-bold text-xl text-primary">$1,960.00</div>
              </div>
            </div>
          </div>
          
          <div className="rounded-2xl border bg-card p-6 shadow-sm">
            <h2 className="text-xl font-bold mb-4">Map & Directions</h2>
            <div className="relative h-64 w-full rounded-xl overflow-hidden bg-muted group cursor-pointer border">
              <img 
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=800&q=80" 
                alt="Map view" 
                className="absolute inset-0 h-full w-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-background/90 backdrop-blur px-4 py-2 rounded-lg font-medium text-sm shadow-lg flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary" /> View on Google Maps
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Actions Sidebar */}
        <div className="space-y-4">
          <Button variant="default" size="lg" className="w-full justify-start shadow-md h-12">
            <Download className="mr-2 h-5 w-5" /> Download PDF Receipt
          </Button>
          <Button variant="outline" size="lg" className="w-full justify-start bg-card h-12">
            <Printer className="mr-2 h-5 w-5" /> Print Confirmation
          </Button>
          <Button variant="outline" size="lg" className="w-full justify-start bg-card h-12">
            <CalendarIcon className="mr-2 h-5 w-5" /> Add to Calendar
          </Button>

          <div className="mt-8 pt-8 border-t">
            <Link href="/account" className="flex items-center justify-between p-4 rounded-xl border bg-muted/50 hover:bg-muted transition-colors group">
              <div>
                <div className="font-semibold mb-1">Manage Booking</div>
                <div className="text-sm text-muted-foreground">View details or cancel</div>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors" />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
