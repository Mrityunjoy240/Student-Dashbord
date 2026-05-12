"use client";

import { ChevronLeft, ChevronRight, Plus, X } from "lucide-react";
import { useState, useEffect } from "react";
import { clsx } from "clsx";
import { addEvent } from "@/app/actions";

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
  
  // Modal state
  const [isAdding, setIsAdding] = useState(false);
  const [title, setTitle] = useState("");
  const [type, setType] = useState("Study");
  const [selectedColor, setSelectedColor] = useState("brand");
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationDir, setAnimationDir] = useState<"left" | "right">("right");

  const days = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
  
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
    }, 150);
  };

  const handleDayClick = (date: Date) => {
    setSelectedDate(date);
    setIsAdding(true);
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
    setIsAdding(false);
    setTitle("");
    setType("Study");
    
    await addEvent(title, newEvent.type, selectedDate, selectedColor);
  };

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const colors = [
    { id: 'brand', bg: 'bg-brand-500' },
    { id: 'green', bg: 'bg-green-500' },
    { id: 'orange', bg: 'bg-orange-500' },
    { id: 'red', bg: 'bg-red-500' },
    { id: 'blue', bg: 'bg-blue-500' }
  ];

  return (
    <div className="bg-white border card-border rounded-xl p-5 shadow-sm flex flex-col h-full relative overflow-hidden">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xs font-bold text-gray-800 uppercase tracking-wider">CALENDAR</h2>
      </div>
      <div className="flex justify-between items-center mb-4 px-2">
        <button onClick={() => changeMonth(-1)} className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-md hover:bg-gray-100"><ChevronLeft size={16} /></button>
        <span className="font-semibold text-sm w-32 text-center">{monthNames[month]} {year}</span>
        <button onClick={() => changeMonth(1)} className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-md hover:bg-gray-100"><ChevronRight size={16} /></button>
      </div>
      
      <div className="grid grid-cols-7 text-center text-xs text-gray-400 font-medium mb-2">
        {days.map(d => <div key={d}>{d}</div>)}
      </div>
      
      <div className={clsx(
        "grid grid-cols-7 text-center text-xs gap-y-3 flex-1 items-center transition-all duration-150",
        isAnimating && animationDir === "right" && "opacity-0 -translate-x-4",
        isAnimating && animationDir === "left" && "opacity-0 translate-x-4",
        !isAnimating && "opacity-100 translate-x-0"
      )}>
        {calendarDays.map((item, i) => (
          <div 
            key={i} 
            onClick={() => handleDayClick(item.date)}
            className={clsx(
              "relative h-6 flex items-center justify-center cursor-pointer rounded-md transition-all hover:bg-gray-100",
              item.type === 'prev' || item.type === 'next' ? "text-gray-300" : "text-gray-700",
              item.type === 'active' && "bg-brand-600 text-white w-6 h-6 rounded-full mx-auto shadow-md hover:bg-brand-700"
            )}>
            {item.day}
            {item.marker && item.type !== 'active' && (
              <span className={clsx(
                "absolute w-1 h-1 rounded-full bottom-[-6px] left-1/2 transform -translate-x-1/2",
                item.marker === 'green' && "bg-green-500",
                item.marker === 'orange' && "bg-orange-400",
                item.marker === 'brand' && "bg-brand-500",
                item.marker === 'red' && "bg-red-500",
                item.marker === 'blue' && "bg-blue-500"
              )}></span>
            )}
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100 text-[10px] text-gray-500">
        <div className="flex gap-2">
          <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> Study</span>
          <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-orange-400"></span> Assign.</span>
          <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-brand-600"></span> Exam</span>
        </div>
        <button 
          onClick={() => { setSelectedDate(new Date()); setIsAdding(true); }}
          className="text-brand-600 hover:text-brand-700 flex items-center gap-1 font-medium transition-colors p-1 rounded hover:bg-brand-50"
        >
          <Plus size={10} /> Add Event
        </button>
      </div>

      {/* Add Event Modal Overlay */}
      {isAdding && (
        <div className="absolute inset-0 bg-white/95 backdrop-blur-sm z-10 p-5 flex flex-col justify-center border card-border rounded-xl">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xs font-bold text-gray-800 uppercase tracking-wider">Add Event for {selectedDate.toLocaleDateString()}</h3>
            <button onClick={() => setIsAdding(false)} className="text-gray-400 hover:text-gray-600"><X size={16} /></button>
          </div>
          
          <input 
            type="text" 
            placeholder="Event Title" 
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="w-full text-sm p-2 border border-gray-200 rounded-md mb-3 focus:outline-none focus:border-brand-500"
            autoFocus
          />
          
          <input 
            type="text" 
            placeholder="Event Type (e.g. Study, Meeting)" 
            value={type}
            onChange={e => setType(e.target.value)}
            className="w-full text-sm p-2 border border-gray-200 rounded-md mb-4 focus:outline-none focus:border-brand-500"
            list="event-types"
          />
          <datalist id="event-types">
            <option value="Study Session" />
            <option value="Assignment Deadline" />
            <option value="Exam" />
            <option value="Meeting" />
          </datalist>

          <div className="flex items-center gap-3 mb-5">
            <span className="text-xs text-gray-500">Color:</span>
            <div className="flex gap-2">
              {colors.map(c => (
                <button
                  key={c.id}
                  onClick={() => setSelectedColor(c.id)}
                  className={clsx(
                    "w-6 h-6 rounded-full transition-all flex items-center justify-center",
                    c.bg,
                    selectedColor === c.id ? "ring-2 ring-offset-2 ring-gray-400 scale-110" : "hover:scale-110 opacity-80"
                  )}
                />
              ))}
            </div>
          </div>
          
          <button 
            onClick={handleAddEvent}
            disabled={!title.trim()}
            className="w-full py-2 bg-brand-600 text-white rounded-md text-xs font-bold uppercase tracking-wider hover:bg-brand-700 disabled:opacity-50 transition-colors"
          >
            Save Event
          </button>
        </div>
      )}
    </div>
  );
}
