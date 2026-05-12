import Header from "@/components/Header";
import CalendarWidget from "@/components/CalendarWidget";
import prisma from "@/lib/prisma";
import { Calendar as CalendarIcon, Clock } from "lucide-react";
import { clsx } from "clsx";

export default async function CalendarPage() {
  const events = await prisma.event.findMany({ orderBy: { date: 'asc' } });

  return (
    <main className="flex-1 overflow-y-auto p-8 bg-white">
      <Header />
      <div className="flex flex-col xl:flex-row gap-8">
        <div className="flex-1 min-w-[350px]">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Study Calendar</h2>
          <div className="bg-white border card-border rounded-2xl shadow-sm p-8 h-[600px]">
             <CalendarWidget initialEvents={events} />
          </div>
        </div>

        <div className="w-full xl:w-96">
          <h2 className="text-xl font-bold text-gray-900 mb-6">All Events</h2>
          <div className="space-y-4">
            {events.map((event) => (
              <div key={event.id} className="bg-white border card-border rounded-xl p-4 shadow-sm flex items-center gap-4">
                <div className={clsx(
                  "w-12 h-12 rounded-lg flex items-center justify-center",
                  event.color === 'green' && "bg-green-50 text-green-500",
                  event.color === 'orange' && "bg-orange-50 text-orange-400",
                  event.color === 'brand' && "bg-brand-50 text-brand-500",
                  event.color === 'red' && "bg-red-50 text-red-500",
                )}>
                  <CalendarIcon size={24} />
                </div>
                <div className="flex-1">
                  <h3 className={clsx(
                    "font-bold text-sm",
                    event.color === 'green' && "text-green-600",
                    event.color === 'orange' && "text-orange-600",
                    event.color === 'brand' && "text-brand-600",
                    event.color === 'red' && "text-red-600",
                  )}>{event.title}</h3>
                  <div className="flex items-center gap-2 text-xs text-gray-400 mt-1">
                    <Clock size={12} />
                    <span>{event.date.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                  </div>
                </div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-gray-300 px-2 py-1 border border-gray-100 rounded">
                  {event.type}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
