"use client";

import { useState } from "react";
import { saveUserOnboarding } from "@/app/onboarding-actions";
import { Loader2, Rocket, Target, BookOpen, Briefcase } from "lucide-react";

export default function UserOnboarding() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    currentYear: "3rd Year",
    branch: "Computer Science",
    currentSkills: "",
    targetRole: "Software Engineer",
    targetPackage: "15-20 LPA",
    targetDate: new Date(new Date().getFullYear() + 1, 6, 1).toISOString().split('T')[0],
  });

  const handleSave = async () => {
    setLoading(true);
    const res = await saveUserOnboarding(formData);
    if (res.success) {
      window.location.reload();
    } else {
      alert("Error: " + res.error);
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-300">
        <div className="bg-brand-600 p-8 text-white">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-white/20 p-2 rounded-lg">
              <Rocket size={24} />
            </div>
            <h2 className="text-2xl font-bold">Personalize Your Path</h2>
          </div>
          <p className="text-brand-100 text-sm">Tell us where you are and where you want to go.</p>
        </div>

        <div className="p-8">
          {step === 1 && (
            <div className="space-y-5 animate-in slide-in-from-right-4 duration-300">
              <div className="flex items-center gap-2 text-brand-600 font-bold text-xs uppercase tracking-wider mb-2">
                <BookOpen size={14} /> Academic Status
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-2 uppercase">Current Year</label>
                <select 
                  value={formData.currentYear}
                  onChange={(e) => setFormData({...formData, currentYear: e.target.value})}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-brand-500 outline-none"
                >
                  <option>1st Year</option>
                  <option>2nd Year</option>
                  <option>3rd Year</option>
                  <option>4th Year</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-2 uppercase">Branch / Major</label>
                <input 
                  placeholder="e.g. Computer Science, ECE"
                  value={formData.branch}
                  onChange={(e) => setFormData({...formData, branch: e.target.value})}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-brand-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-2 uppercase">Current Skills</label>
                <input 
                  placeholder="e.g. Python, Java, Basics of DS"
                  value={formData.currentSkills}
                  onChange={(e) => setFormData({...formData, currentSkills: e.target.value})}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-brand-500 outline-none"
                />
              </div>
              <button 
                onClick={() => setStep(2)}
                className="w-full bg-brand-600 text-white font-bold py-4 rounded-2xl hover:bg-brand-700 transition-all shadow-lg shadow-brand-100"
              >
                Next Step
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-5 animate-in slide-in-from-right-4 duration-300">
              <div className="flex items-center gap-2 text-brand-600 font-bold text-xs uppercase tracking-wider mb-2">
                <Target size={14} /> Career Goals
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-2 uppercase">Target Role</label>
                <input 
                  placeholder="e.g. SDE at Google, Data Scientist"
                  value={formData.targetRole}
                  onChange={(e) => setFormData({...formData, targetRole: e.target.value})}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-brand-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-2 uppercase">Target Package</label>
                <input 
                  placeholder="e.g. 15-20 LPA"
                  value={formData.targetPackage}
                  onChange={(e) => setFormData({...formData, targetPackage: e.target.value})}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-brand-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-2 uppercase">Target Achievement Date</label>
                <input 
                  type="date"
                  value={formData.targetDate}
                  onChange={(e) => setFormData({...formData, targetDate: e.target.value})}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-brand-500 outline-none"
                />
              </div>
              <div className="flex gap-3">
                <button 
                  onClick={() => setStep(1)}
                  className="flex-1 bg-gray-100 text-gray-600 font-bold py-4 rounded-2xl hover:bg-gray-200 transition-all"
                >
                  Back
                </button>
                <button 
                  disabled={loading}
                  onClick={handleSave}
                  className="flex-[2] bg-brand-600 text-white font-bold py-4 rounded-2xl hover:bg-brand-700 transition-all shadow-lg shadow-brand-100 flex items-center justify-center gap-2"
                >
                  {loading ? <Loader2 className="animate-spin" size={20} /> : "Generate My Roadmap"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
