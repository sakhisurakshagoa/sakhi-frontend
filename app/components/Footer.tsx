"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/logo.png"
                alt="Shakti Suraksha Logo"
                className="w-10 h-10"
              />
              <h3 className="text-lg font-semibold text-gray-900">
                Shakti Suraksha
              </h3>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed max-w-sm">
              Empowering women with safe spaces, anonymous reporting, and
              comprehensive support resources.
            </p>
          </div>

          {/* Quick Access */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-4">
              Quick Access
            </h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link href="/emergency" className="hover:text-purple-700">Emergency Contacts</Link></li>
              <li><Link href="/anonymous_complaint" className="hover:text-purple-700">File Report</Link></li>
              <li><Link href="/locations" className="hover:text-purple-700">Find Safe Places</Link></li>
              <li><Link href="/support" className="hover:text-purple-700">Get Support</Link></li>
            </ul>
          </div>

          {/* Emergency */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-4">
              Emergency
            </h4>
            <p className="text-sm text-gray-600 mb-3">
              If you're in immediate danger:
            </p>
            <a
              href="tel:112"
              className="inline-block px-6 py-2 text-sm font-semibold
                         bg-red-600 text-white
                         hover:bg-red-700 transition"
            >
              Call 112
            </a>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 pt-6 border-t border-gray-200 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Shakti Suraksha. Your safety and privacy are our priority.
        </div>
      </div>
    </footer>
  );
}
