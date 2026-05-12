"use client";

import { useRef, useTransition } from "react";
import { updateExam } from "@/app/actions";
import { Pen, X } from "lucide-react";

interface EditExamModalProps {
  initialName: string;
  initialDate: string;
}

export default function EditExamModal({ initialName, initialDate }: EditExamModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [isPending, startTransition] = useTransition();

  const openModal = () => dialogRef.current?.showModal();
  const closeModal = () => dialogRef.current?.close();

  const handleSubmit = (formData: FormData) => {
    const name = formData.get("name") as string;
    const date = new Date(formData.get("date") as string);
    
    startTransition(async () => {
      await updateExam(name, date);
      closeModal();
    });
  };

  return (
    <>
      <button 
        onClick={openModal}
        className="text-red-500 border border-red-100 hover:bg-red-50 font-medium text-xs px-3 py-1.5 rounded-lg flex items-center gap-1 transition-colors"
      >
        <Pen size={10} /> Edit Exam Date
      </button>

      <dialog 
        ref={dialogRef}
        className="backdrop:bg-black/50 p-0 rounded-xl shadow-2xl border-none fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 outline-none"
      >
        <div className="w-80 p-6 bg-white">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-gray-900">Edit Exam</h3>
            <button onClick={closeModal} className="text-gray-400 hover:text-gray-600">
              <X size={18} />
            </button>
          </div>
          
          <form action={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Exam Name</label>
              <input 
                name="name"
                defaultValue={initialName}
                className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="e.g. End Sem"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Target Date</label>
              <input 
                name="date"
                type="date"
                defaultValue={initialDate}
                className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              />
            </div>
            <button 
              type="submit"
              disabled={isPending}
              className="w-full bg-red-500 text-white py-2 rounded-lg font-medium hover:bg-red-600 transition-colors disabled:opacity-50"
            >
              {isPending ? "Saving..." : "Save Changes"}
            </button>
          </form>
        </div>
      </dialog>
    </>
  );
}
