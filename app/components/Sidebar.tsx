"use client";

import {
  HomeIcon,
  Squares2X2Icon,
  ExclamationTriangleIcon,
  PhoneIcon,
  MapPinIcon,
  LifebuoyIcon,
  AcademicCapIcon,
  UserCircleIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  isLoggedIn: boolean;
}

export default function Sidebar({
  sidebarOpen,
  setSidebarOpen,
  isLoggedIn,
}: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Overlay (mobile only) */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed md:static z-40
          w-64 bg-white border-r border-gray-200
          flex flex-col
          h-screen
          transform transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        {/* Logo Section */}
        <div className="sticky top-0 bg-white z-10 p-1 border-b flex items-center gap-1">
          <img
            src="/logo.png"
            alt="Sakhi Suraksha Logo"
            className="w-20 h-20 object-contain flex-shrink-0"
          />

          <div className="whitespace-nowrap">
            <h1 className="text-lg font-bold text-black">
              Sakhi Suraksha
            </h1>
            <p className="text-xs text-purple-700">
              Women Safety Portal
            </p>
          </div>
        </div>

        {/* Menu */}
        <nav className="overflow-y-auto p-6 flex flex-col gap-2 text-sm font-medium text-gray-600">

          <Link href="/" className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all
            ${pathname === "/" ? "bg-gradient-to-r from-purple-500 to-teal-400 text-white" : "hover:text-purple-700"}`}>
            <HomeIcon className={`w-5 h-5 ${pathname === "/" ? "text-white" : "text-purple-700"}`} />
            Home
          </Link>

          

          <Link href="/anonymous_complaint" className={`flex items-center gap-3 px-3 py-2 rounded-lg
            ${pathname === "/anonymous_complaint" ? "bg-gradient-to-r from-purple-500 to-teal-400 text-white font-semibold" : "hover:text-purple-700"}`}>
            <ExclamationTriangleIcon className={`w-5 h-5 ${pathname === "/anonymous_complaint" ? "text-white" : "text-purple-700"}`} />
            File Complaint
          </Link>

          <Link href="/emergency" className={`flex items-center gap-3 px-3 py-2 rounded-lg
            ${pathname === "/emergency" ? "bg-gradient-to-r from-purple-500 to-teal-400 text-white font-semibold" : "hover:text-purple-700"}`}>
            <PhoneIcon className={`w-5 h-5 ${pathname === "/emergency" ? "text-white" : "text-purple-700"}`} />
            Emergency Contacts
          </Link>

          <Link href="/locations" className={`flex items-center gap-3 px-3 py-2 rounded-lg
            ${pathname === "/locations" ? "bg-gradient-to-r from-purple-500 to-teal-400 text-white font-semibold" : "hover:text-purple-700"}`}>
            <MapPinIcon className={`w-5 h-5 ${pathname === "/locations" ? "text-white" : "text-purple-700"}`} />
            Essential Locations
          </Link>

          <Link href="/support" className={`flex items-center gap-3 px-3 py-2 rounded-lg
            ${pathname === "/support" ? "bg-gradient-to-r from-purple-500 to-teal-400 text-white font-semibold" : "hover:text-purple-700"}`}>
            <LifebuoyIcon className={`w-5 h-5 ${pathname === "/support" ? "text-white" : "text-purple-700"}`} />
            Support Resources
          </Link>

          <Link href="/education" className={`flex items-center gap-3 px-3 py-2 rounded-lg
            ${pathname === "/education" ? "bg-gradient-to-r from-purple-500 to-teal-400 text-white font-semibold" : "hover:text-purple-700"}`}>
            <AcademicCapIcon className={`w-5 h-5 ${pathname === "/education" ? "text-white" : "text-purple-700"}`} />
            Educational Content
          </Link>

          {!isLoggedIn ? (
            <Link href="/login" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:text-purple-700">
              <ArrowRightOnRectangleIcon className="w-5 h-5 text-purple-700" />
              Login
            </Link>
          ) : (
            <Link href="/profile" className={`flex items-center gap-3 px-3 py-2 rounded-lg
              ${pathname === "/profile" ? "bg-gradient-to-r from-purple-500 to-teal-400 text-white font-semibold" : "hover:text-purple-700"}`}>
              <UserCircleIcon className={`w-5 h-5 ${pathname === "/profile" ? "text-white" : "text-purple-700"}`} />
              My Profile
            </Link>
          )}
        </nav>

        {/* Emergency Info */}
        <div className="p-4 space-y-3">
          <div className="flex justify-center gap-2 bg-gradient-to-r from-purple-600 to-purple-800 text-white py-2.5 rounded-lg font-semibold">
            <ExclamationTriangleIcon className="w-5 h-5" />
            Emergency Helpline: 112
          </div>

          <div className="flex justify-center gap-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white py-2.5 rounded-lg font-semibold">
            <PhoneIcon className="w-5 h-5" />
            Women Helpline: 181
          </div>
        </div>

        <div className="sticky bottom-0 border-t px-4 py-3 text-center bg-white">
          <p className="text-sm font-semibold text-purple-700">
            Stay Safe. Stay Strong.
          </p>
          <p className="text-xs text-gray-500 mt-1">
            You're not alone
          </p>
        </div>
      </aside>
    </>
  );
}
