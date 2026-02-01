"use client";

import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="w-full bg-white flex flex-col pt-16 md:pt-8 overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

        {/* Text Content */}
        <div className="pt-0 text-center md:text-left">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-purple-800 leading-snug">
            Your Safe Space for <br />
            <span className="text-teal-500">Safety & Empowerment</span>
          </h1>

          <p className="mt-4 text-gray-600 text-base sm:text-lg leading-relaxed">
            Sakhi Suraksha is a trusted platform created to support women in
            times of distress. Report incidents anonymously, access legal and
            emotional support, locate essential services nearby, and get
            immediate help when it matters the most — all in one safe space.
          </p>

          {/* Buttons */}
          <div className="mt-6 flex flex-wrap justify-center md:justify-start gap-4">
            <Link
              href="/anonymous_complaint"
              className="px-6 py-3 rounded-lg bg-purple-700 text-white font-semibold
                         hover:bg-purple-800 transition"
            >
              File Complaint
            </Link>

            <Link
              href="/emergency"
              className="px-6 py-3 rounded-lg border border-purple-700 text-purple-700 font-semibold
                         hover:bg-purple-50 transition"
            >
              Get Help Now
            </Link>
          </div>
        </div>

        {/* Image */}
        <div className="relative flex justify-center md:justify-end">
          <img
            src="/hero1.png"
            alt="Women Safety Illustration"
            className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-2xl object-contain"
          />
        </div>

      </div>
    </section>
  );
}
