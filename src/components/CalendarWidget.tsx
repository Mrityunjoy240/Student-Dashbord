"use client";

import { ChevronLeft, ChevronRight, Plus, X, Calendar as CalendarIcon, MapPin, Clock, Info, Check, Shield, Zap, Sparkles } from "lucide-react";
import { useState, useRef } from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { addEvent } from "@/app/actions";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface EventItem {
  id: string;
  title: string;
  type: string;
  date: Date;
  color: string;
}

export default function CalendarWidget({ initialEvents = [] }: { initialEvents?: EventItem[] }) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [events, setEvents] = useState<EventItem[]>(initialEvents);
  const dialogRef = useRef<HTMLDialogElement>(null);
  
  const [title, setTitle] = useState("");
  const [type, setType] = useState("Study");
  const [selectedColor, setSelectedColor] = useState("brand");
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationDir, setAnimationDir] = useState<"left" | "right">("right");

  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  
  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const daysInMonth = lastDayOfMonth.getDate();
  const startingDay = (firstDayOfMonth.getDay() + 6) % 7;
  const daysInPrevMonth = new Date(year, month, 0).getDate();
  
  const calendarDays = [];
  for (let i = startingDay - 1; i >= 0; i--) {
    calendarDays.push({ day: daysInPrevMonth - i, type: 'prev', date: new Date(year, month - 1, daysInPrevMonth - i) });
  }
  for (let i = 1; i <= daysInMonth; i++) {
    const date = new Date(year, month, i);
    const dayEvents = events.filter(e => {
        const eDate = new Date(e.date);
        return eDate.getDate() === i && eDate.getMonth() === month && eDate.getFullYear() === year;
    });
    const markerColor = dayEvents.length > 0 ? dayEvents[0].color : null;
    const isToday = new Date().toDateString() === date.toDateString();
    calendarDays.push({ day: i, type: isToday ? 'active' : 'current', marker: markerColor, date });
  }
  const remainingSlots = 42 - calendarDays.length;
  for (let i = 1; i <= remainingSlots; i++) {
    calendarDays.push({ day: i, type: 'next', date: new Date(year, month + 1, i) });
  }

  const changeMonth = (offset: number) => {
    setAnimationDir(offset > 0 ? "right" : "left");
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentMonth(new Date(year, month + offset, 1));
      setIsAnimating(false);
    }, 300);
  };

  const handleDayClick = (date: Date) => {
    setSelectedDate(date);
    dialogRef.current?.showModal();
  };

  const handleAddEvent = async () => {
    if (!title) return;
    const newEvent = {
      id: Date.now().toString(),
      title,
      type: type || "Event",
      date: selectedDate,
      color: selectedColor
    };
    setEvents([...events, newEvent]);
    dialogRef.current?.close();
    setTitle("");
    setType("Study");
    await addEvent(title, newEvent.type, selectedDate, selectedColor);
  };

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const colors = [
    { id: 'brand', bg: 'bg-brand-500', ring: 'ring-brand-100' },
    { id: 'green', bg: 'bg-emerald-500', ring: 'ring-emerald-100' },
    { id: 'orange', bg: 'bg-orange-500', ring: 'ring-orange-100' },
    { id: 'red', bg: 'bg-red-500', ring: 'ring-red-100' },
    { id: 'blue', bg: 'bg-blue-500', ring: 'ring-blue-100' }
  ];

  return (
    <div className="bg-white border-2 border-gray-50 rounded-[4.5rem] p-12 shadow-2xl shadow-gray-100/50 flex flex-col h-full relative overflow-hidden group">
      {/* Tactical Grid Background */}
      <div className="absolute inset-0 bg-[radial-gradient(#f3f3f3_1.5px,transparent_1.5px)] [background-size:40px_40px] opacity-50 pointer-events-none"></div>

      <div className="relative z-10 flex-1 flex flex-col">
        <div className="flex justify-between items-center mb-16">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 bg-gray-900 rounded-[2.5rem] flex items-center justify-center shadow-2xl shadow-gray-200 group-hover:rotate-6 transition-transform duration-700">
              <CalendarIcon size={28} className="text-white" />
            </div>
            <div>
              <h2 className="text-[12px] font-black text-gray-900 uppercase tracking-[0.4em] leading-none">Temporal Hub</h2>
              <div className="flex items-center gap-3 mt-3">
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Logic Stream v2.8</span>
                <div className="w-1.5 h-1.5 bg-brand-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(124,58,237,0.5)]"></div>
              </div>
            </div>
          </div>
          <button 
            onClick={() => { setSelectedDate(new Date()); dialogRef.current?.showModal(); }}
            className="w-16 h-16 rounded-[2.5rem] bg-white border-2 border-gray-50 flex items-center justify-center hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-all shadow-xl shadow-gray-100/50 active:scale-90 group/add"
          >
            <Plus size={28} className="group-hover/add:rotate-90 transition-transform duration-500" />
          </button>
        </div>
        
        <div className="flex justify-between items-center mb-12 bg-gray-50/50 p-6 rounded-[2.5rem] border-2 border-gray-50 backdrop-blur-sm">
          <button onClick={() => changeMonth(-1)} className="text-gray-400 hover:text-gray-900 transition-all p-3 rounded-2xl hover:bg-white hover:shadow-xl hover:shadow-gray-100/50 active:scale-90"><ChevronLeft size={28} strokeWidth={2.5} /></button>
          <div className="flex flex-col items-center">
             <span className="font-black text-sm uppercase tracking-[0.4em] text-gray-900">{monthNames[month]}</span>
             <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest mt-1">{year}</span>
          </div>
          <button onClick={() => changeMonth(1)} className="text-gray-400 hover:text-gray-900 transition-all p-3 rounded-2xl hover:bg-white hover:shadow-xl hover:shadow-gray-100/50 active:scale-90"><ChevronRight size={28} strokeWidth={2.5} /></button>
        </div>
        
        <div className="grid grid-cols-7 text-center text-[10px] font-black text-gray-300 uppercase tracking-[0.3em] mb-10">
          {days.map(d => <div key={d}>{d}</div>)}
        </div>
        
        <div className={cn(
          "grid grid-cols-7 text-center gap-y-8 flex-1 items-start transition-all duration-700 ease-in-out",
          isAnimating && animationDir === "right" && "opacity-0 -translate-x-12",
          isAnimating && animationDir === "left" && "opacity-0 translate-x-12",
          !isAnimating && "opacity-100 translate-x-0"
        )}>
          {calendarDays.map((item, i) => (
            <button 
              key={i} 
              onClick={() => handleDayClick(item.date)}
              className={cn(
                "relative group h-14 w-14 mx-auto flex items-center justify-center rounded-[1.5rem] transition-all duration-500",
                item.type === 'prev' || item.type === 'next' ? "text-gray-200" : "text-gray-800 font-black text-[15px]",
                item.type === 'active' ? "bg-gray-900 text-white shadow-2xl shadow-gray-300 scale-125 z-10" : "hover:bg-brand-50 hover:text-brand-600 hover:scale-110"
              )}>
              <span className="relative z-10">{item.day}</span>
              {item.marker && (
                <div className={cn(
                  "absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-0.5",
                  item.type === 'active' ? "opacity-100" : "opacity-60 group-hover:opacity-100"
                )}>
                   <div className={cn(
                    "w-1.5 h-1.5 rounded-full shadow-sm",
                    item.type === 'active' ? "bg-brand-400" : cn(
                      item.marker === 'green' && "bg-emerald-500",
                      item.marker === 'orange' && "bg-orange-500",
                      item.marker === 'brand' && "bg-brand-500",
                      item.marker === 'red' && "bg-red-500",
                      item.marker === 'blue' && "bg-blue-500"
                    )
                  )}></div>
                </div>
              )}
              {/* Interaction Glow */}
              <div className="absolute inset-0 bg-brand-500/5 rounded-[1.5rem] opacity-0 group-hover:opacity-100 blur-md transition-opacity"></div>
            </button>
          ))}
        </div>

        <div className="mt-16 pt-12 border-t-2 border-gray-50 flex items-center justify-between">
          <div className="flex gap-10">
            <div className="flex items-center gap-3 group cursor-help">
              <div className="w-2.5 h-2.5 rounded-full bg-brand-500 shadow-[0_0_12px_rgba(124,58,237,0.8)]"></div>
              <span className="text-[11px] font-black text-gray-400 uppercase tracking-widest group-hover:text-gray-900 transition-colors">Tactical Vectors</span>
            </div>
            <div className="flex items-center gap-3 group cursor-help">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.8)]"></div>
              <span className="text-[11px] font-black text-gray-400 uppercase tracking-widest group-hover:text-gray-900 transition-colors">Nominal Routine</span>
            </div>
          </div>
          <div className="flex items-center gap-3 text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] bg-gray-50/80 px-6 py-3 rounded-2xl border border-gray-100 shadow-sm">
            <MapPin size={12} className="text-brand-500" /> UTC+5:30
          </div>
        </div>
      </div>

      {/* Event Creation Interface */}
      <dialog 
        ref={dialogRef}
        className="backdrop:bg-gray-950/80 backdrop:backdrop-blur-3xl p-0 rounded-[4.5rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] border-2 border-white/10 w-[500px] outline-none m-auto overflow-hidden animate-in fade-in zoom-in duration-500"
      >
        <div className="bg-white p-16">
          <div className="flex justify-between items-center mb-16">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 bg-brand-600 rounded-[2.5rem] flex items-center justify-center shadow-2xl shadow-brand-100">
                 <Sparkles size={28} className="text-white" />
              </div>
              <div>
                <h3 className="text-xl font-black text-gray-900 uppercase tracking-tight">Temporal Injection</h3>
                <p className="text-[11px] text-gray-400 font-black uppercase tracking-[0.2em] mt-2 flex items-center gap-3">
                  <Clock size={12} className="text-brand-500" /> {selectedDate.toLocaleDateString(undefined, { day: 'numeric', month: 'long', year: 'numeric' })}
                </p>
              </div>
            </div>
            <button onClick={() => dialogRef.current?.close()} className="w-16 h-16 rounded-[2.5rem] hover:bg-gray-50 flex items-center justify-center text-gray-300 hover:text-gray-900 transition-all hover:rotate-90 duration-500">
              <X size={32} />
            </button>
          </div>
          
          <div className="space-y-12">
            <div>
              <label className="block text-[11px] font-black text-gray-400 uppercase tracking-[0.3em] mb-5">Objective Identifier</label>
              <input 
                type="text" 
                placeholder="Initialize primary objective..." 
                value={title}
                onChange={e => setTitle(e.target.value)}
                className="w-full text-xl font-black px-10 py-7 bg-gray-50 border-2 border-gray-50 rounded-[2.5rem] focus:outline-none focus:ring-8 focus:ring-brand-500/5 focus:border-brand-200 transition-all placeholder:text-gray-200 shadow-inner uppercase tracking-tight"
                autoFocus
              />
            </div>
            
            <div>
              <label className="block text-[11px] font-black text-gray-400 uppercase tracking-[0.3em] mb-6">Tactical Protocol</label>
              <div className="grid grid-cols-3 gap-5">
                {[
                  { label: "Study", icon: BookOpen },
                  { label: "Exam", icon: Shield },
                  { label: "Personal", icon: Zap }
                ].map(t => (
                  <button
                    key={t.label}
                    onClick={() => setType(t.label)}
                    className={cn(
                      "py-5 rounded-[2rem] text-[11px] font-black uppercase tracking-[0.2em] border-2 transition-all flex flex-col items-center gap-3",
                      type === t.label ? "bg-gray-900 text-white border-gray-900 shadow-2xl scale-105" : "bg-white text-gray-400 border-gray-50 hover:bg-gray-50 hover:border-gray-200"
                    )}
                  >
                    <t.icon size={18} />
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-gray-50/50 p-8 rounded-[3rem] border-2 border-gray-50">
              <div className="flex flex-col gap-6">
                <span className="text-[11px] font-black text-gray-400 uppercase tracking-[0.3em]">Neural Marker Signal</span>
                <div className="flex justify-between items-center bg-white p-4 rounded-[2rem] shadow-sm border border-gray-50">
                  {colors.map(c => (
                    <button
                      key={c.id}
                      onClick={() => setSelectedColor(c.id)}
                      className={cn(
                        "w-12 h-12 rounded-full transition-all duration-500 relative flex items-center justify-center",
                        c.bg,
                        selectedColor === c.id ? cn("ring-8 scale-110 shadow-2xl", c.ring) : "opacity-30 hover:opacity-60 scale-90"
                      )}
                    >
                       {selectedColor === c.id && <Check size={20} className="text-white" strokeWidth={3} />}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            <button 
              onClick={handleAddEvent}
              disabled={!title.trim()}
              className="w-full py-8 bg-gray-900 text-white rounded-[3rem] text-[12px] font-black uppercase tracking-[0.4em] hover:bg-brand-600 disabled:opacity-10 transition-all shadow-2xl shadow-gray-200 mt-10 active:scale-95 group flex items-center justify-center gap-4"
            >
              Commit to Temporal Stream <ChevronRight size={24} className="group-hover:translate-x-2 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}




