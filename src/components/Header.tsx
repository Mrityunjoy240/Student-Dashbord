import { Bell, Search, Command, Zap, Wifi, ShieldCheck, Cpu } from "lucide-react";
import SyllabusUploadModal from "./SyllabusUploadModal";

export default function Header() {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Operational: AM Phase";
    if (hour < 18) return "Operational: PM Phase";
    return "Operational: Nocturnal";
  };

  return (
    <header className="flex flex-col md:flex-row md:items-center justify-between gap-8 px-10 py-8 border-b border-gray-100 bg-white/70 backdrop-blur-3xl sticky top-0 z-40">
      <div className="flex items-center gap-10">
        <div>
          <div className="flex items-center gap-3 mb-1.5">
            <h1 className="text-2xl font-black text-gray-900 tracking-tighter uppercase">
              {getGreeting()}
            </h1>
            <div className="h-4 w-[1px] bg-gray-200"></div>
            <span className="text-gray-400 font-black text-[13px] tracking-widest uppercase">User: RA-7741</span>
          </div>
          <div className="flex items-center gap-4">
             <div className="flex items-center gap-1.5">
                <ShieldCheck size={10} className="text-green-500" />
                <p className="text-[9px] text-gray-400 font-black uppercase tracking-[0.2em]">Data integrity verified</p>
             </div>
             <div className="w-1 h-1 bg-gray-200 rounded-full"></div>
             <div className="flex items-center gap-1.5">
                <Wifi size={10} className="text-blue-500" />
                <p className="text-[9px] text-gray-400 font-black uppercase tracking-[0.2em]">Neural link stable</p>
             </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="hidden lg:flex items-center gap-4 px-6 py-3 bg-gray-50 border border-gray-100 rounded-2xl text-gray-400 group hover:border-brand-200 hover:bg-white hover:shadow-xl hover:shadow-gray-100/50 transition-all cursor-pointer">
          <Search size={16} className="group-hover:text-brand-600 transition-colors" />
          <span className="text-[11px] font-black uppercase tracking-widest mr-12 text-gray-400 group-hover:text-gray-900 transition-colors">Global Search Interface</span>
          <div className="flex items-center gap-2 bg-white px-2 py-1 rounded-lg border border-gray-100 shadow-sm opacity-60">
            <Command size={10} className="text-gray-400" />
            <span className="text-[10px] font-black text-gray-900">K</span>
          </div>
        </div>

        <div className="h-10 w-[1px] bg-gray-100 hidden md:block mx-2"></div>

        <div className="flex items-center gap-4">
          <SyllabusUploadModal />
          <button 
            className="relative w-12 h-12 rounded-2xl bg-white border border-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-900 hover:border-gray-900 transition-all shadow-sm active:scale-90 group"
            aria-label="Notifications"
          >
            <Bell size={20} className="group-hover:rotate-12 transition-transform" />
            <span className="absolute top-3.5 right-3.5 w-2.5 h-2.5 bg-brand-500 rounded-full border-4 border-white animate-pulse"></span>
          </button>
          <div className="w-12 h-12 rounded-2xl bg-gray-900 flex items-center justify-center shadow-xl shadow-gray-200 cursor-pointer hover:scale-105 active:scale-95 transition-all">
             <Cpu size={20} className="text-white" />
          </div>
        </div>
      </div>
    </header>
  );
}



