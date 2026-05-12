"use client";

import { useRef, useState } from "react";
import { Upload, X, FileText, Check, Loader2 } from "lucide-react";
import { uploadSyllabus } from "@/app/actions";

export default function SyllabusUploadModal() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<'idle' | 'uploading' | 'parsing' | 'success'>('idle');
  const [result, setResult] = useState<{ count?: number, error?: string } | null>(null);

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
    } catch (error: any) {
      console.error("Upload error:", error);
      setStatus('idle');
      alert(`Unexpected Error: ${error.message || "Please check your internet connection and try again."}`);
    }
  };

  return (
    <>
      <button 
        onClick={openModal}
        className="flex items-center gap-2 px-4 py-2 bg-brand-600 text-white rounded-lg text-xs font-bold hover:bg-brand-700 transition-colors shadow-sm"
      >
        <Upload size={14} /> Upload Syllabus
      </button>

      <dialog 
        ref={dialogRef}
        className="backdrop:bg-black/50 p-0 rounded-2xl shadow-2xl border-none w-[450px] fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        <div className="bg-white p-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-gray-900">AI Syllabus Parser</h3>
            <button onClick={closeModal} className="text-gray-400 hover:text-gray-600">
              <X size={20} />
            </button>
          </div>

          {status === 'idle' && (
            <div className="space-y-6">
              <div className="border-2 border-dashed border-gray-200 rounded-2xl p-10 text-center hover:border-brand-300 transition-colors cursor-pointer relative">
                <input 
                  type="file" 
                  accept=".pdf" 
                  onChange={handleFileChange}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
                <Upload size={40} className="mx-auto mb-4 text-gray-300" />
                <p className="text-sm font-medium text-gray-600">
                  {file ? file.name : "Click or drag your PDF syllabus here"}
                </p>
                <p className="text-[10px] text-gray-400 mt-2 uppercase tracking-widest">Supports PDF up to 10MB</p>
              </div>
              <button 
                disabled={!file}
                onClick={handleUpload}
                className="w-full bg-brand-600 text-white py-3 rounded-xl font-bold text-sm hover:bg-brand-700 transition-colors disabled:opacity-50 shadow-lg shadow-brand-100"
              >
                Analyze with AI
              </button>
            </div>
          )}

          {status === 'uploading' && (
            <div className="py-12 text-center">
              <Loader2 size={48} className="animate-spin text-brand-600 mx-auto mb-6" />
              <h4 className="font-bold text-gray-900 text-lg">AI is Extracting Topics...</h4>
              <p className="text-sm text-gray-500 mt-2 italic">
                "Our AI is reading your syllabus to build your study plan."
              </p>
            </div>
          )}

          {status === 'success' && (
            <div className="py-12 text-center animate-in zoom-in-95">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check size={32} />
              </div>
              <h4 className="font-bold text-gray-900 text-lg">Successfully Parsed!</h4>
              <p className="text-sm text-gray-500 mt-2">
                I've identified {result?.count || 0} subjects. Your dashboard has been updated.
              </p>
            </div>
          )}
        </div>
      </dialog>
    </>
  );
}
