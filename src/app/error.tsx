"use client";

import { useEffect } from "react";
import { AlertCircle, RefreshCcw, Home } from "lucide-react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex-1 flex flex-col items-center justify-center min-h-screen bg-white p-6">
      <div className="max-w-md w-full bg-red-50 border border-red-100 rounded-2xl p-8 text-center shadow-xl shadow-red-100/50">
        <div className="w-16 h-16 bg-white border border-red-100 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm">
          <AlertCircle className="w-8 h-8 text-red-500" />
        </div>
        
        <h2 className="text-xl font-bold text-gray-900 mb-2">Something went wrong</h2>
        <p className="text-sm text-gray-500 mb-8 font-medium">
          {error.message || "An unexpected error occurred. We've been notified and are working to fix it."}
        </p>

        <div className="flex flex-col gap-3">
          <button
            onClick={() => reset()}
            className="w-full flex items-center justify-center gap-2 bg-gray-900 text-white py-3 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-gray-800 transition-all shadow-lg shadow-gray-200"
          >
            <RefreshCcw size={14} /> Try again
          </button>
          
          <Link
            href="/"
            className="w-full flex items-center justify-center gap-2 bg-white text-gray-700 border border-gray-200 py-3 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-gray-50 transition-all"
          >
            <Home size={14} /> Return to Dashboard
          </Link>
        </div>

        <div className="mt-8 pt-6 border-t border-red-100">
          <p className="text-[10px] text-red-400 font-bold uppercase tracking-widest">
            Error ID: {error.digest || "unknown_failure"}
          </p>
        </div>
      </div>
    </div>
  );
}
