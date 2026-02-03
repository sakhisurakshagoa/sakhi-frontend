"use client";

import SafetyFeatureCard from "./SafetyFeatureCard";
import {
  ExclamationTriangleIcon,
  MapPinIcon,
  ChatBubbleLeftRightIcon,
  LifebuoyIcon,
  AcademicCapIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import { ReactElement } from "react";

interface Feature {
  icon: ReactElement;
  title: string;
  description: string;
  points: string[];
}

export default function ComprehensiveSafetyFeatures() {
 const features: Feature[] = [
  {
    icon: <ExclamationTriangleIcon className="w-8 h-8 text-purple-700" />,
    title: "Anonymous Complaint",
    description: "Report incidents safely and confidentially.",
    points: ["No personal info required", "Secure submission", "Immediate acknowledgement"],
  },
  {
    icon: <MapPinIcon className="w-8 h-8  text-purple-700" />,
    title: "Essential Locations",
    description: "Find nearby hospitals, police, and shelters.",
    points: ["Hospitals & Clinics", "Police stations", "Safe shelters"],
  },
  {
    icon: <ChatBubbleLeftRightIcon className="w-8 h-8  text-purple-700" />,
    title: "Chatbot",
    description: "Get instant AI assistance for safety queries.",
    points: ["Quick responses", "Guidance on next steps", "24/7 availability"],
  },
  {
    icon: <LifebuoyIcon className="w-8 h-8  text-purple-700" />,
    title: "Support & Counselling",
    description: "Legal aid, counselling, and NGO support.",
    points: ["Legal aid", "Emotional counselling", "NGO assistance"],
  },
  {
    icon: <AcademicCapIcon className="w-8 h-8  text-purple-700" />,
    title: "Educational Content",
    description: "Learn about safety, rights, and empowerment.",
    points: ["Safety tips", "Self-defense guidance", "Awareness resources"],
  },
  {
    icon: <UsersIcon className="w-8 h-8  text-purple-700" />,
    title: "Forum",
    description: "Connect with a safe community for advice.",
    points: ["Share experiences", "Ask questions safely", "Peer support"],
  },
];


  return (
    <section className="w-full bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-12">
       <h2 className="text-4xl md:text-5xl font-semibold text-gray-900 text-center mb-4 tracking-tight">
  Comprehensive Safety Features
</h2>

<p className="text-center text-gray-500 text-base md:text-lg max-w-2xl mx-auto pb-8">
  Everything you need to feel safe, supported, and empowered in one secure platform
</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <SafetyFeatureCard
              key={idx}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              points={feature.points}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
