import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center min-h-screen bg-white">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="w-10 h-10 text-brand-600 animate-spin" />
        <div className="flex flex-col items-center">
          <h2 className="text-sm font-bold text-gray-900 uppercase tracking-widest">Academic OS</h2>
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em] mt-1 animate-pulse">Syncing your workspace...</p>
        </div>
      </div>
    </div>
  );
}
