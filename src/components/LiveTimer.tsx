"use client";

import { useState, useEffect } from "react";
import { Clock, Zap } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface LiveTimerProps {
  targetDate: Date;
  variant?: "brand" | "red";
}

export default function LiveTimer({ targetDate, variant = "brand" }: LiveTimerProps) {
  const [isClient, setIsClient] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    setIsClient(true);
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const target = new Date(targetDate).getTime();
      const distance = target - now;

      if (distance < 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        clearInterval(timer);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  if (!isClient) {
    return (
      <div className="space-y-4 opacity-0">
        <div className="flex gap-2">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="flex-1 bg-gray-50 border border-gray-100 rounded-xl p-3 text-center h-16"></div>
          ))}
        </div>
      </div>
    );
  }

  const isExpired = new Date(targetDate).getTime() < new Date().getTime();


  return (
    <div className="space-y-4" suppressHydrationWarning>
      <div className="flex gap-2">
        <div className="flex-1 bg-gray-50 border border-gray-100 rounded-xl p-3 text-center">
          <div className="text-2xl font-black text-gray-900 tracking-tight" suppressHydrationWarning>{timeLeft.days}</div>
          <div className="text-[8px] font-bold text-gray-400 uppercase tracking-widest">Days</div>
        </div>
        <div className="flex-1 bg-gray-50 border border-gray-100 rounded-xl p-3 text-center">
          <div className="text-2xl font-black text-gray-900 tracking-tight" suppressHydrationWarning>{timeLeft.hours}</div>
          <div className="text-[8px] font-bold text-gray-400 uppercase tracking-widest">Hrs</div>
        </div>
        <div className="flex-1 bg-gray-50 border border-gray-100 rounded-xl p-3 text-center">
          <div className="text-2xl font-black text-gray-900 tracking-tight" suppressHydrationWarning>{timeLeft.minutes}</div>
          <div className="text-[8px] font-bold text-gray-400 uppercase tracking-widest">Min</div>
        </div>
        <div className={cn(
          "flex-1 border rounded-xl p-3 text-center group",
          variant === "brand" ? "bg-brand-50 border-brand-100" : "bg-red-50 border-red-100"
        )}>
          <div className={cn(
            "text-2xl font-black tracking-tight",
            variant === "brand" ? "text-brand-600" : "text-red-600",
            !isExpired && "animate-pulse"
          )} suppressHydrationWarning>{timeLeft.seconds}</div>
          <div className={cn(
            "text-[8px] font-bold uppercase tracking-widest",
            variant === "brand" ? "text-brand-400" : "text-red-400"
          )}>Sec</div>
        </div>
      </div>
      
      <div className={cn(
        "rounded-xl p-3 flex items-center justify-between text-white shadow-lg",
        variant === "brand" ? "bg-brand-600 shadow-brand-100" : "bg-red-600 shadow-red-100",
        isExpired && "grayscale opacity-50 shadow-none"
      )}>
        <div className="flex items-center gap-2">
          <Zap size={14} fill="currentColor" />
          <span className="text-[10px] font-bold uppercase tracking-widest">
            {isExpired ? "Event Passed" : variant === "brand" ? "Momentum Active" : "Final Countdown"}
          </span>
        </div>
        <span className="text-[10px] font-medium opacity-80 italic">
          {isExpired ? "No time left" : variant === "brand" ? "Don't stop now!" : "Gear up!"}
        </span>
      </div>
    </div>
  );
}
