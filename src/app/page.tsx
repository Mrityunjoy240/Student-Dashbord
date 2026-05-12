import Header from "@/components/Header";
import DashboardContent from "@/components/DashboardContent";

export default function Home() {
  return (
    <main className="flex-1 overflow-y-auto p-8 bg-white scrollbar-hide">
      <Header />
      <DashboardContent />
    </main>
  );
}
