"use client";

import { ReactNode } from "react";

interface SafetyFeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  points: string[];
}

export default function SafetyFeatureCard({
  icon,
  title,
  description,
  points,
}: SafetyFeatureCardProps) {
  return (
    <div
      className="group bg-white rounded-2xl p-6 flex flex-col gap-4
                 shadow-md transition-all duration-300
                 hover:-translate-y-2 hover:shadow-2xl"
    >
      {/* Icon */}
      <div className="w-14 h-14 flex items-center justify-center rounded-xl
                      bg-purple-100 text-purple-700
                      group-hover:bg-purple-200 transition">
        {icon}
      </div>

      {/* Title */}
      <h3 className="text-xl font-semibold text-gray-800">
        {title}
      </h3>

      {/* Description */}
      <p className="text-gray-600 text-sm">
        {description}
      </p>

      {/* Bullet Points */}
      <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
        {points.map((point, idx) => (
          <li key={idx}>{point}</li>
        ))}
      </ul>

      {/* Button */}
      <button
        className="mt-auto w-fit px-5 py-2 rounded-lg text-sm font-semibold text-white
                   bg-gradient-to-r from-purple-600 to-teal-500
                   hover:from-purple-700 hover:to-teal-600 transition"
      >
        Explore Feature →
      </button>
    </div>
  );
}
