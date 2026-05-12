import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";

import { FocusProvider } from "@/components/FocusMode";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Student Dashboard",
  description: "AI-Powered Student Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} flex h-screen overflow-hidden text-sm antialiased`}>
        <FocusProvider>
          <Sidebar />
          {children}
        </FocusProvider>
      </body>
    </html>
  );
}
