"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check, CreditCard, Apple, Loader2, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockRooms } from "@/lib/data/rooms";

const addOns = [
  { id: "transfer", name: "Airport Transfer", price: 35, type: "per stay" },
  { id: "breakfast", name: "Daily Buffet Breakfast", price: 20, type: "per day" },
  { id: "spa", name: "Spa Pass", price: 50, type: "per person" },
  { id: "late-checkout", name: "Late Check-out", price: 25, type: "per stay" },
];

export default function CheckoutPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  
  // Hardcoded for demo
  const room = mockRooms[0];
  const nights = 4;
  const roomTotal = room.pricePerNight * nights;
  const addOnsTotal = selectedAddOns.reduce((acc, id) => {
    const addon = addOns.find(a => a.id === id);
    if (!addon) return acc;
    if (addon.type === "per day") return acc + (addon.price * nights);
    if (addon.type === "per person") return acc + (addon.price * 2); // assuming 2 pax
    return acc + addon.price;
  }, 0);
  
  const taxes = Math.round((roomTotal + addOnsTotal) * 0.12);
  const grandTotal = roomTotal + addOnsTotal + taxes;

  const handleNext = () => setStep(prev => prev + 1);
  
  const handleCheckout = () => {
    setIsProcessing(true);
    setTimeout(() => {
      router.push("/confirmation/HRS-99012-A");
    }, 1500);
  };

  const toggleAddOn = (id: string) => {
    setSelectedAddOns(prev => 
      prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]
    );
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <h1 className="text-3xl font-bold mb-8">Secure Checkout</h1>

      {/* Progress Indicator */}
      <div className="flex items-center justify-between mb-10 relative">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-muted -z-10 rounded-full" />
        <div 
          className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-primary -z-10 rounded-full transition-all duration-300"
          style={{ width: `${((step - 1) / 2) * 100}%` }}
        />
        
        {[
          { num: 1, label: "Guest Info" },
          { num: 2, label: "Add-ons" },
          { num: 3, label: "Payment" }
        ].map((s) => (
          <div key={s.num} className="flex flex-col items-center gap-2">
            <div className={`flex h-10 w-10 items-center justify-center rounded-full font-bold transition-colors shadow-sm ${
              step >= s.num ? "bg-primary text-primary-foreground" : "bg-card border-2 border-muted text-muted-foreground"
            }`}>
              {step > s.num ? <Check className="h-5 w-5" /> : s.num}
            </div>
            <span className={`text-sm font-medium ${step >= s.num ? "text-foreground" : "text-muted-foreground"}`}>
              {s.label}
            </span>
          </div>
        ))}
      </div>

      <div className="flex flex-col lg:flex-row gap-10">
        
        {/* Main Content Form */}
        <div className="flex-1">
          {/* Step 1: Guest Info */}
          {step === 1 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-2xl font-bold">Who is checking in?</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">First Name</label>
                  <Input placeholder="John" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Last Name</label>
                  <Input placeholder="Doe" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email Address</label>
                  <Input type="email" placeholder="john@example.com" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Phone Number</label>
                  <Input type="tel" placeholder="+1 (555) 000-0000" />
                </div>
              </div>
              
              <div className="space-y-2 pt-2">
                <label className="text-sm font-medium">Special Requests (Optional)</label>
                <Textarea placeholder="E.g., early check-in, high floor..." className="min-h-24" />
              </div>
              
              <div className="pt-4 flex justify-end">
                <Button size="lg" onClick={handleNext} className="w-full sm:w-auto px-8 rounded-full">
                  Continue to Add-ons <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 2: Add-ons */}
          {step === 2 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-2xl font-bold">Enhance your stay</h2>
              <p className="text-muted-foreground mb-6">Select extra services to make your trip more comfortable.</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {addOns.map((addon) => (
                  <Card 
                    key={addon.id} 
                    className={`cursor-pointer transition-all hover:border-primary ${
                      selectedAddOns.includes(addon.id) ? "border-primary bg-primary/5 ring-1 ring-primary" : ""
                    }`}
                    onClick={() => toggleAddOn(addon.id)}
                  >
                    <CardContent className="p-4 flex items-start gap-4">
                      <Checkbox 
                        checked={selectedAddOns.includes(addon.id)} 
                        onCheckedChange={() => toggleAddOn(addon.id)} 
                      />
                      <div className="flex-1">
                        <div className="font-semibold">{addon.name}</div>
                        <div className="text-sm text-muted-foreground">+${addon.price} {addon.type}</div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <div className="pt-8 flex justify-between">
                <Button variant="ghost" onClick={() => setStep(1)} className="rounded-full">Back</Button>
                <Button size="lg" onClick={handleNext} className="w-full sm:w-auto px-8 rounded-full">
                  Continue to Payment <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Payment */}
          {step === 3 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-2xl font-bold">How would you like to pay?</h2>
              
              <Tabs defaultValue="card" className="w-full">
                <TabsList className="grid w-full grid-cols-3 mb-6">
                  <TabsTrigger value="card">Credit Card</TabsTrigger>
                  <TabsTrigger value="digital">Digital Wallet</TabsTrigger>
                  <TabsTrigger value="property">Pay at Property</TabsTrigger>
                </TabsList>
                
                <TabsContent value="card" className="space-y-6">
                  <div className="p-6 rounded-2xl border bg-card">
                    <div className="flex items-center gap-2 mb-6 text-primary">
                      <CreditCard className="h-6 w-6" />
                      <span className="font-semibold">Credit or Debit Card</span>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Name on Card</label>
                        <Input placeholder="John Doe" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Card Number</label>
                        <Input placeholder="0000 0000 0000 0000" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Expiry Date</label>
                          <Input placeholder="MM/YY" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">CVC</label>
                          <Input placeholder="123" />
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="digital">
                  <div className="p-10 rounded-2xl border bg-card text-center flex flex-col items-center gap-4">
                    <Apple className="h-12 w-12 text-foreground" />
                    <h3 className="font-semibold">Pay with Apple Pay</h3>
                    <p className="text-sm text-muted-foreground">You will be redirected to complete the payment.</p>
                  </div>
                </TabsContent>

                <TabsContent value="property">
                  <div className="p-8 rounded-2xl border bg-card text-center">
                    <h3 className="font-semibold mb-2">No prepayment needed!</h3>
                    <p className="text-sm text-muted-foreground">
                      Your card will only be held for guarantee. You can pay when you arrive.
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
              
              <div className="flex items-center space-x-2 pt-4">
                <Checkbox id="terms" />
                <label htmlFor="terms" className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  I accept the <a href="#" className="text-primary hover:underline">Terms & Conditions</a> and <a href="#" className="text-primary hover:underline">Privacy Policy</a>.
                </label>
              </div>
              
              <div className="pt-6 flex justify-between">
                <Button variant="ghost" onClick={() => setStep(2)} className="rounded-full">Back</Button>
                <Button 
                  size="lg" 
                  onClick={handleCheckout} 
                  disabled={isProcessing}
                  className="w-full sm:w-auto px-8 rounded-full shadow-lg"
                >
                  {isProcessing ? (
                    <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Processing...</>
                  ) : (
                    `Complete Booking - $${grandTotal}`
                  )}
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Sticky Order Summary Sidebar */}
        <div className="w-full lg:w-96 shrink-0">
          <div className="sticky top-24 rounded-2xl border bg-card shadow-lg overflow-hidden">
            <div className="relative h-32 w-full">
              <img src={room.images[0]} alt={room.name} className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-4">
                <h3 className="text-white font-bold">{room.name}</h3>
              </div>
            </div>
            
            <div className="p-6">
              <div className="text-sm font-medium mb-4 pb-4 border-b">
                <div className="flex justify-between mb-2">
                  <span className="text-muted-foreground">Check-in</span>
                  <span>Oct 12, 2026</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-muted-foreground">Check-out</span>
                  <span>Oct 16, 2026</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Length of stay</span>
                  <span>{nights} Nights</span>
                </div>
              </div>

              <h4 className="font-semibold mb-4">Price Breakdown</h4>
              
              <div className="space-y-3 text-sm mb-4 pb-4 border-b">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">${room.pricePerNight} x {nights} nights</span>
                  <span>${roomTotal}</span>
                </div>
                {addOnsTotal > 0 && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Add-ons</span>
                    <span>${addOnsTotal}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Taxes & Fees (12%)</span>
                  <span>${taxes}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 mb-6">
                <Input placeholder="Promo code" className="h-9 text-sm" />
                <Button variant="secondary" size="sm">Apply</Button>
              </div>

              <div className="flex justify-between items-end">
                <div>
                  <div className="font-bold text-xl">Grand Total</div>
                  <div className="text-xs text-muted-foreground mt-1">Includes all taxes and fees</div>
                </div>
                <div className="font-extrabold text-3xl text-primary">${grandTotal}</div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
