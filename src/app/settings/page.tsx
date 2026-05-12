import Header from "@/components/Header";
import prisma from "@/lib/prisma";
import EditGoalModal from "@/components/EditGoalModal";
import { Settings as SettingsIcon, Shield, User, Globe, Bell } from "lucide-react";

export default async function SettingsPage() {
  const userGoal = await prisma.userGoal.findFirst();

  return (
    <main className="flex-1 overflow-y-auto p-8 bg-white">
      <Header />
      <div className="max-w-4xl">
        <h2 className="text-xl font-bold text-gray-900 mb-8 flex items-center gap-2">
          <SettingsIcon size={24} className="text-gray-400" /> System Settings
        </h2>

        <div className="space-y-6">
          {/* Profile Section */}
          <section className="bg-white border card-border rounded-2xl overflow-hidden shadow-sm">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-brand-600 text-white flex items-center justify-center font-bold text-xl">
                  R
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">User Profile</h3>
                  <p className="text-xs text-gray-500">Manage your personal information</p>
                </div>
              </div>
              <button className="text-xs font-bold text-brand-600 hover:underline">Edit Profile</button>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Full Name</label>
                <div className="text-sm font-medium text-gray-700 p-2 bg-gray-50 rounded-lg">Rajendra Prasad</div>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Email Address</label>
                <div className="text-sm font-medium text-gray-700 p-2 bg-gray-50 rounded-lg">rajendra.p@university.edu</div>
              </div>
            </div>
          </section>

          {/* Academic Goals Section */}
          <section className="bg-white border card-border rounded-2xl overflow-hidden shadow-sm">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center">
                  <Globe size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Academic Goals</h3>
                  <p className="text-xs text-gray-500">Target package and graduation dates</p>
                </div>
              </div>
              <EditGoalModal 
                initialPackage={userGoal?.targetPackage || ""} 
                initialDate={userGoal?.targetDate ? userGoal.targetDate.toISOString().split('T')[0] : ""} 
              />
            </div>
            <div className="p-6 space-y-4">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
                <div>
                  <div className="text-xs font-bold text-gray-400 uppercase">Target Package</div>
                  <div className="text-lg font-black text-brand-600">{userGoal?.targetPackage}</div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-bold text-gray-400 uppercase">Target Date</div>
                  <div className="text-sm font-bold text-gray-700">{userGoal?.targetDate.toLocaleDateString()}</div>
                </div>
              </div>
            </div>
          </section>

          {/* Preferences Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white border card-border rounded-2xl p-6 shadow-sm flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <Bell size={20} />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-sm text-gray-900">Notifications</h4>
                <p className="text-xs text-gray-500">Daily study reminders</p>
              </div>
              <div className="w-10 h-5 bg-brand-600 rounded-full relative shadow-inner">
                <div className="absolute right-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow-sm" />
              </div>
            </div>
            <div className="bg-white border card-border rounded-2xl p-6 shadow-sm flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-green-50 text-green-600 flex items-center justify-center">
                <Shield size={20} />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-sm text-gray-900">Privacy</h4>
                <p className="text-xs text-gray-500">Data sharing preferences</p>
              </div>
              <button className="text-xs font-bold text-gray-400 hover:text-gray-600">Manage</button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
