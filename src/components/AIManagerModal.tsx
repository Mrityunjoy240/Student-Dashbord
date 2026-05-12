"use client";

import { useRef, useState } from "react";
import { Bot, Send, X, Loader2 } from "lucide-react";

export default function AIManagerModal() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [messages, setMessages] = useState<{ role: 'user' | 'ai', content: string }[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const openModal = () => dialogRef.current?.showModal();
  const closeModal = () => dialogRef.current?.close();

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
    <>
      <button 
        onClick={openModal}
        className="text-brand-600 border border-brand-200 hover:bg-brand-50 font-medium text-xs px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
      >
        <Bot size={16} /> Open Manager
      </button>

      <dialog 
        ref={dialogRef}
        className="backdrop:bg-black/50 p-0 rounded-2xl shadow-2xl border-none w-[400px] h-[500px] fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        <div className="flex flex-col h-full bg-white">
          <div className="p-4 border-b flex justify-between items-center bg-brand-600 text-white rounded-t-2xl">
            <div className="flex items-center gap-2">
              <Bot size={20} />
              <h3 className="font-bold">Academic Manager AI</h3>
            </div>
            <button onClick={closeModal} className="hover:bg-brand-700 p-1 rounded transition-colors">
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 text-sm">
            {messages.length === 0 && (
              <div className="text-center text-gray-500 mt-10">
                <Bot size={40} className="mx-auto mb-2 opacity-20" />
                <p>Hello! I'm your AI Academic Manager. How can I help you today?</p>
              </div>
            )}
            {messages.map((m, i) => (
              <div key={i} className={m.role === 'user' ? "flex justify-end" : "flex justify-start"}>
                <div className={`max-w-[80%] p-3 rounded-2xl ${
                  m.role === 'user' 
                    ? "bg-brand-600 text-white rounded-tr-none" 
                    : "bg-gray-100 text-gray-800 rounded-tl-none"
                }`}>
                  {m.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 p-3 rounded-2xl rounded-tl-none flex items-center gap-2">
                  <Loader2 size={16} className="animate-spin text-brand-600" />
                  <span className="text-gray-500">Thinking...</span>
                </div>
              </div>
            )}
          </div>

          <form onSubmit={handleSend} className="p-4 border-t flex gap-2">
            <input 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 border rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
            <button 
              type="submit"
              disabled={isLoading}
              className="bg-brand-600 text-white p-2 rounded-xl hover:bg-brand-700 transition-colors disabled:opacity-50"
            >
              <Send size={20} />
            </button>
          </form>
        </div>
      </dialog>
    </>
  );
}
