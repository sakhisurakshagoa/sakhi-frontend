"use client";

import "./globals.css";
import { ReactNode, useState } from "react";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import ChatbotButton from "./components/ChatbotButton";

export default function RootLayout({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isLoggedIn = true; // replace later with real auth

  return (
    <html lang="en">
      <body className="bg-gray-50">
        <div className="flex h-screen overflow-hidden">

          <Sidebar
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
            isLoggedIn={isLoggedIn}
          />

          {/* Main Area */}
          <div className="flex flex-col flex-1">

            {/* Mobile Header */}
            <header className="md:hidden sticky top-0 z-20 bg-white border-b px-6 py-4 flex items-center justify-between w-full">
  <div className="flex items-center gap-3">
    <img src="/logo.png" className="w-10 h-10" />
    <span className="font-bold text-lg text-black">
      Sakhi Suraksha
    </span>
  </div>

  <button
    onClick={() => setSidebarOpen(true)}
    className="text-3xl font-bold text-gray-900"
  >
    ☰
  </button>
</header>


            <main className="flex-1 overflow-y-auto">
              {children}
              <Footer/>
            </main>

          </div>
          
        </div>
        <ChatbotButton />
      </body>
    </html>
  );
}
