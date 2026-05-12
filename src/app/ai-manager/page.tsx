"use client";

import Header from "@/components/Header";
import { useState, useRef, useEffect } from "react";
import { Bot, Send, Loader2, Sparkles, Brain, Zap } from "lucide-react";
import { clsx } from "clsx";

export default function AIManagerPage() {
  const [messages, setMessages] = useState<{ role: 'user' | 'ai', content: string }[]>([
    { role: 'ai', content: "Welcome to your Academic Control Center. I'm your AI Manager. How can I assist you with your studies today?" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg }),
      });
      const data = await res.json();
      if (data.text) {
        setMessages(prev => [...prev, { role: 'ai', content: data.text }]);
      } else if (data.error) {
        setMessages(prev => [...prev, { role: 'ai', content: `Error: ${data.error}` }]);
      }
    } catch (err) {
      setMessages(prev => [...prev, { role: 'ai', content: "Sorry, I'm having trouble connecting right now." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex-1 flex flex-col h-screen bg-gray-50">
      <div className="p-8 pb-4 bg-white border-b">
        <Header />
      </div>
      
      <div className="flex-1 flex overflow-hidden">
        {/* Chat Area */}
        <div className="flex-1 flex flex-col bg-white border-r shadow-inner">
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-8 space-y-6">
            {messages.map((m, i) => (
              <div key={i} className={clsx("flex", m.role === 'user' ? "justify-end" : "justify-start")}>
                <div className={clsx(
                  "max-w-[70%] p-4 rounded-2xl shadow-sm text-sm leading-relaxed",
                  m.role === 'user' 
                    ? "bg-brand-600 text-white rounded-tr-none" 
                    : "bg-white border card-border text-gray-800 rounded-tl-none"
                )}>
                  {m.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border card-border p-4 rounded-2xl rounded-tl-none flex items-center gap-3 shadow-sm">
                  <Loader2 size={18} className="animate-spin text-brand-600" />
                  <span className="text-gray-500 text-sm italic">Manager is thinking...</span>
                </div>
              </div>
            )}
          </div>

          <form onSubmit={handleSend} className="p-6 bg-gray-50 border-t flex gap-4">
            <input 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about your syllabus, exam dates, or study plan..."
              className="flex-1 border border-gray-200 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 shadow-sm bg-white"
            />
            <button 
              type="submit"
              disabled={isLoading}
              className="bg-brand-600 text-white px-6 rounded-2xl hover:bg-brand-700 transition-all flex items-center justify-center shadow-lg hover:shadow-brand-200 disabled:opacity-50"
            >
              <Send size={20} />
            </button>
          </form>
        </div>

        {/* AI Capabilities Sidebar */}
        <div className="w-80 p-8 hidden lg:block bg-gray-50">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">AI Capabilities</h3>
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-xl bg-brand-100 text-brand-600 flex items-center justify-center flex-shrink-0">
                <Sparkles size={20} />
              </div>
              <div>
                <h4 className="font-bold text-sm text-gray-900">Study Optimization</h4>
                <p className="text-xs text-gray-500 mt-1">Get custom study plans based on your exam dates.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-xl bg-green-100 text-green-600 flex items-center justify-center flex-shrink-0">
                <Brain size={20} />
              </div>
              <div>
                <h4 className="font-bold text-sm text-gray-900">Context Awareness</h4>
                <p className="text-xs text-gray-500 mt-1">I know your subjects and current progress automatically.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center flex-shrink-0">
                <Zap size={20} />
              </div>
              <div>
                <h4 className="font-bold text-sm text-gray-900">Quick Insights</h4>
                <p className="text-xs text-gray-500 mt-1">Instant answers about your academic workload.</p>
              </div>
            </div>
          </div>

          <div className="mt-12 p-6 bg-brand-600 rounded-2xl text-white">
            <h4 className="font-bold text-sm mb-2">Pro Tip</h4>
            <p className="text-xs text-brand-100 leading-relaxed">Try asking: "What should I focus on for my upcoming End Sem Exam?"</p>
          </div>
        </div>
      </div>
    </main>
  );
}
