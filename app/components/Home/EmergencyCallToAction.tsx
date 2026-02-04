"use client";

import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";

export default function EmergencyCallToAction() {
  return (
    <section
      className="w-full py-20
                 bg-gradient-to-r from-pink-800 via-pink-700 to-pink-600
                 text-white"
    >
      <div className="max-w-6xl mx-auto px-6 text-center">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <ExclamationTriangleIcon className="w-12 h-12 text-white" />
        </div>

        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-semibold mb-4">
          In Immediate Danger?
        </h2>

        {/* Description */}
        <p className="text-pink-100 text-base md:text-lg max-w-2xl mx-auto mb-8">
          Don't wait — get help immediately. Emergency services and crisis
          support are available 24/7.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a
            href="tel:112"
            className="px-8 py-3 font-semibold
                       bg-white text-pink-700
                       hover:bg-pink-100 transition"
          >
            Call 112 Now
          </a>

          <button
            className="px-8 py-3 font-semibold
                       border border-white/60
                       hover:bg-white/10 transition"
          >
            View All Emergency Contacts
          </button>
        </div>
      </div>
    </section>
  );
}
