"use client";

import { ThumbsUp } from "lucide-react";
import { Review } from "@/lib/data/reviews";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function ReviewSection({ reviews, overallScore, reviewCount }: { reviews: Review[], overallScore: number, reviewCount: number }) {
  
  // Calculate average category scores (mock data approach)
  const categories = [
    { name: "Cleanliness", score: 9.6 },
    { name: "Location", score: 9.8 },
    { name: "Service", score: 9.5 },
    { name: "Value", score: 8.8 },
  ];

  return (
    <div className="py-8">
      
      {/* Overview Header */}
      <div className="flex flex-col md:flex-row gap-10 mb-12">
        <div className="flex flex-col items-center justify-center p-8 bg-primary text-primary-foreground rounded-2xl w-full md:w-64 shrink-0 text-center shadow-lg">
          <div className="text-5xl font-bold mb-2">{overallScore.toFixed(1)}</div>
          <div className="text-xl font-semibold mb-1">
            {overallScore >= 9.5 ? "Exceptional" : overallScore >= 9.0 ? "Superb" : "Fabulous"}
          </div>
          <div className="text-primary-foreground/80 text-sm">{reviewCount} verified reviews</div>
        </div>
        
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-6 self-center">
          {categories.map((category) => (
            <div key={category.name}>
              <div className="flex justify-between text-sm font-medium mb-2">
                <span>{category.name}</span>
                <span>{category.score.toFixed(1)}</span>
              </div>
              <Progress value={category.score * 10} className="h-2" />
            </div>
          ))}
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        {reviews.map((review) => (
          <div key={review.id} className="p-6 rounded-2xl border bg-card shadow-sm">
            <div className="flex flex-col sm:flex-row gap-6">
              
              {/* User Info */}
              <div className="flex items-center sm:items-start sm:flex-col gap-4 sm:w-48 shrink-0">
                <Avatar className="h-12 w-12 border">
                  <AvatarImage src={review.user.avatar} alt={review.user.name} />
                  <AvatarFallback>{review.user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-semibold text-sm">{review.user.name}</div>
                  <div className="text-xs text-muted-foreground">{review.user.country}</div>
                </div>
              </div>

              {/* Review Content */}
              <div className="flex-1">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="text-lg font-bold">"{review.title}"</h4>
                    <span className="text-xs text-muted-foreground">Reviewed on {review.date}</span>
                  </div>
                  <div className="flex h-8 w-8 items-center justify-center rounded bg-primary text-primary-foreground font-bold text-sm shrink-0">
                    {review.score.toFixed(1)}
                  </div>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  {review.text}
                </p>
                
                <button className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors">
                  <ThumbsUp className="h-3.5 w-3.5" /> Helpful
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
