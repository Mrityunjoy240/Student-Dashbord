"use client";

import { useRef, useState } from "react";
import { Upload, X, Check, Loader2, FileText, Sparkles, Shield, Cpu } from "lucide-react";
import { uploadSyllabus } from "@/app/actions";
import { clsx } from "clsx";

export default function SyllabusUploadModal() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<'idle' | 'uploading' | 'parsing' | 'success'>('idle');
  const [result, setResult] = useState<{ error?: string } | null>(null);

  const openModal = () => dialogRef.current?.showModal();
  const closeModal = () => {
    dialogRef.current?.close();
    setFile(null);
    setStatus('idle');
    setResult(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.type !== "application/pdf") {
        alert("Please upload a PDF file.");
        return;
      }
      if (selectedFile.size > 10 * 1024 * 1024) {
        alert("File size exceeds 10MB limit.");
        return;
      }
      setFile(selectedFile);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    setStatus('uploading');
    setResult(null);
    
    try {
      const formData = new FormData();
      formData.append("file", file);
      
      const res = await uploadSyllabus(formData);
      
      if (res.success) {
        setResult({});
        setStatus('success');
        setTimeout(() => {
          closeModal();
        }, 3000);
      } else {
        setResult({ error: res.error });
        setStatus('idle');
        alert(`Analysis Error: ${res.error || "Failed to parse syllabus"}`);
      }
    } catch (error) {
      console.error("Upload error:", error);
      setStatus('idle');
      const errorMessage = error instanceof Error ? error.message : "Please check your internet connection and try again.";
      alert(`Unexpected Error: ${errorMessage}`);
    }
  };

  return (
    <>
      <button 
        onClick={openModal}
        className="flex items-center gap-3 px-6 py-3.5 bg-gray-900 text-white rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] hover:bg-brand-600 transition-all shadow-2xl shadow-gray-200 active:scale-95 group"
      >
        <Upload size={16} className="group-hover:-translate-y-1 transition-transform" /> Intake Protocol
      </button>

      <dialog 
        ref={dialogRef}
        className="backdrop:bg-gray-950/60 backdrop:backdrop-blur-xl p-0 rounded-[3rem] shadow-2xl border border-white/20 w-[480px] outline-none m-auto overflow-hidden animate-in fade-in zoom-in duration-500"
      >
        <div className="bg-white">
          <div className="flex justify-between items-center p-10 border-b border-gray-50 bg-gray-50/30">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <div className="w-2 h-2 bg-brand-500 rounded-full animate-pulse"></div>
                <h3 className="text-base font-black text-gray-900 tracking-tight uppercase">AI Ingestion Matrix</h3>
              </div>
              <p className="text-[10px] text-gray-400 font-black uppercase tracking-[0.25em]">Autonomous Syllabus Extraction</p>
            </div>
            <button onClick={closeModal} className="w-12 h-12 rounded-2xl hover:bg-white flex items-center justify-center text-gray-400 hover:text-gray-900 transition-all shadow-sm">
              <X size={24} />
            </button>
          </div>

          <div className="p-10">
            {status === 'idle' && (
              <div className="space-y-8">
                <div className={clsx(
                  "border-2 border-dashed rounded-[2.5rem] p-16 text-center transition-all cursor-pointer relative group overflow-hidden",
                  file ? "border-brand-500 bg-brand-50/20" : "border-gray-100 bg-gray-50/50 hover:border-brand-200 hover:bg-white"
                )}>
                  <div className="absolute inset-0 bg-[radial-gradient(#ddd_1px,transparent_1px)] [background-size:20px_20px] opacity-20 pointer-events-none"></div>
                  
                  <input 
                    type="file" 
                    accept=".pdf" 
                    onChange={handleFileChange}
                    className="absolute inset-0 opacity-0 cursor-pointer z-10"
                    aria-label="Upload PDF Syllabus"
                  />
                  
                  <div className="relative z-10">
                    <div className={clsx(
                      "w-20 h-20 rounded-[2rem] flex items-center justify-center mx-auto mb-6 shadow-xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-6",
                      file ? "bg-brand-600 text-white" : "bg-white text-brand-500"
                    )}>
                      {file ? <FileText size={32} /> : <Upload size={32} />}
                    </div>
                    <p className="text-sm font-black text-gray-800 uppercase tracking-widest">
                      {file ? file.name : "Transmit Syllabus PDF"}
                    </p>
                    <div className="flex items-center justify-center gap-3 mt-4">
                       <span className="text-[9px] text-gray-400 font-black uppercase tracking-widest bg-gray-100 px-2 py-1 rounded">Limit: 10MB</span>
                       <span className="text-[9px] text-gray-400 font-black uppercase tracking-widest bg-gray-100 px-2 py-1 rounded">Format: PDF</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                   <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 flex items-center gap-3">
                      <Shield size={16} className="text-gray-400" />
                      <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest leading-tight">Secure Neural Ingestion</p>
                   </div>
                   <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 flex items-center gap-3">
                      <Cpu size={16} className="text-gray-400" />
                      <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest leading-tight">Automatic Logic Mapping</p>
                   </div>
                </div>

                <button 
                  disabled={!file}
                  onClick={handleUpload}
                  className="w-full bg-gray-900 text-white py-6 rounded-[2.5rem] font-black text-[11px] uppercase tracking-[0.3em] hover:bg-brand-600 transition-all disabled:opacity-10 shadow-2xl shadow-gray-200 active:scale-95 flex items-center justify-center gap-4 group"
                >
                  <Sparkles size={16} className="group-hover:rotate-12 transition-transform" /> Synchronize Matrix
                </button>
              </div>
            )}

            {status === 'uploading' && (
              <div className="py-20 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(#eee_1px,transparent_1px)] [background-size:24px_24px] opacity-40"></div>
                <div className="relative z-10">
                  <div className="relative w-28 h-28 mx-auto mb-10">
                    <div className="absolute inset-0 border-[6px] border-gray-100 rounded-full"></div>
                    <div className="absolute inset-0 border-[6px] border-brand-600 rounded-full border-t-transparent animate-spin"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Loader2 size={32} className="text-brand-600 animate-pulse" />
                    </div>
                  </div>
                  <h4 className="font-black text-gray-900 text-base uppercase tracking-[0.3em] mb-4">Neural Processing...</h4>
                  <p className="text-[10px] text-gray-400 font-black uppercase tracking-[0.25em] leading-relaxed max-w-[280px] mx-auto">
                    Deconstructing syllabus hierarchy and mapping dependencies across the core matrix.
                  </p>
                </div>
              </div>
            )}

            {status === 'success' && (
              <div className="py-20 text-center animate-in zoom-in-95">
                <div className="w-28 h-28 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-10 shadow-inner border border-green-100 relative">
                  <Check size={56} strokeWidth={4} />
                  <div className="absolute inset-0 bg-green-500/20 rounded-full blur-2xl animate-pulse"></div>
                </div>
                <h4 className="font-black text-gray-900 text-base uppercase tracking-[0.3em] mb-4">Matrix Updated</h4>
                <p className="text-[10px] text-gray-400 font-black uppercase tracking-[0.25em] leading-relaxed">
                  Integration complete. Objective nodes have been successfully deployed to your roadmap.
                </p>
              </div>
            )}
          </div>
        </div>
      </dialog>
    </>
  );
}


