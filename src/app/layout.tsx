import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";

import { FocusProvider } from "@/components/FocusMode";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Academic OS | AI-Powered Student Productivity Dashboard",
  description: "Organize your studies, track your syllabus, and achieve your career goals with the help of AI. Personalized roadmap for tier-3 college students aiming high.",
  keywords: ["student dashboard", "study tracker", "AI syllabus parser", "academic roadmap", "career goal tracker"],
  authors: [{ name: "Academic OS Team" }],
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-white flex h-screen w-full overflow-hidden text-sm antialiased selection:bg-brand-100 selection:text-brand-900`}>
        <FocusProvider>
          <div className="flex w-full h-full overflow-hidden">
            <Sidebar />
            <div className="flex-1 min-w-0 flex flex-col h-full overflow-hidden relative">
              {children}
            </div>
          </div>
        </FocusProvider>
      </body>
    </html>
  );
}

