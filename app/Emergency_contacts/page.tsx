"use client";

import { useState } from "react";
import {
  Phone,
  ShieldAlert,
  HeartPulse,
  Scale,
  Users,
  Brain,
  Building2,
} from "lucide-react";

const contactsData = [
  {
    id: 1,
    category: "Police",
    title: "Emergency Police",
    number: "100",
    icon: ShieldAlert,
    gradient: "from-red-500 to-pink-500",
    description: [
      "Crime in progress",
      "Threat to life",
      "Immediate police assistance",
    ],
  },
  {
    id: 2,
    category: "Medical",
    title: "Ambulance",
    number: "108",
    icon: HeartPulse,
    gradient: "from-rose-500 to-orange-400",
    description: [
      "Medical emergency",
      "Accident or injury",
      "Unconscious person",
    ],
  },
  {
    id: 3,
    category: "Helpline",
    title: "Women's Helpline",
    number: "1091",
    icon: Users,
    gradient: "from-purple-500 to-indigo-500",
    description: [
      "Harassment or stalking",
      "Domestic violence",
      "Immediate safety concern",
    ],
  },
  {
    id: 4,
    category: "Mental",
    title: "Mental Health Support",
    number: "9152987821",
    icon: Brain,
    gradient: "from-blue-500 to-cyan-500",
    description: [
      "Emotional distress",
      "Anxiety or panic",
      "Mental health crisis",
    ],
  },
  {
    id: 5,
    category: "Legal",
    title: "Legal Aid",
    number: "15100",
    icon: Scale,
    gradient: "from-emerald-500 to-teal-500",
    description: [
      "Legal guidance",
      "Women legal protection",
      "Domestic violence legal help",
    ],
  },
  {
    id: 6,
    category: "Government",
    title: "Women Support 181",
    number: "181",
    icon: Building2,
    gradient: "from-yellow-500 to-orange-500",
    description: [
      "Government support",
      "Women crisis intervention",
      "Counselling services",
    ],
  },
];

const categories = [
  { name: "All", icon: null },
  { name: "Police", icon: ShieldAlert },
  { name: "Medical", icon: HeartPulse },
  { name: "Helpline", icon: Users },
  { name: "Mental", icon: Brain },
  { name: "Legal", icon: Scale },
  { name: "Government", icon: Building2 },
];

export default function EmergencyContacts() {
  const [activeTab, setActiveTab] = useState("All");

  const filtered =
    activeTab === "All"
      ? contactsData
      : contactsData.filter((c) => c.category === activeTab);

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="bg-gradient-to-r from-pink-500 to-red-500 p-4 rounded-2xl shadow-lg">
              <Phone className="text-white w-8 h-8" />
            </div>
          </div>

          <h1 className="text-4xl font-bold text-gray-800">
            Emergency Contacts
          </h1>
          <p className="text-gray-600 mt-2">
            Immediate help is available. Tap any number to call directly.
          </p>
        </div>

{/* EMERGENCY BANNER */}
<div className="mb-12">
  <div className="bg-gradient-to-r from-red-600 to-pink-600 text-white rounded-3xl p-6 md:p-8 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">

    {/* LEFT CONTENT */}
    <div className="flex items-start gap-4">
      <div className="bg-white/20 p-3 rounded-xl">
        <ShieldAlert className="w-6 h-6" />
      </div>

      <div>
        <h2 className="text-xl md:text-2xl font-bold">
          In Immediate Danger?
        </h2>
        <p className="text-sm md:text-base opacity-90 mt-1">
          Call emergency services immediately. These contacts are for support
          and follow-up help.
        </p>
      </div>
    </div>

    {/* RIGHT BUTTON */}
    <a
      href="tel:112"
      className="bg-white text-red-600 font-semibold px-6 py-3 rounded-xl hover:scale-105 transition-transform duration-300 shadow-md"
    >
      Call 112
    </a>
  </div>
</div>

        {/* TABS */}
        <div className="flex flex-wrap gap-3 justify-center mb-10">
          {categories.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.name}
                onClick={() => setActiveTab(tab.name)}
                className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium transition-all duration-300
                ${
                  activeTab === tab.name
                    ? "bg-gradient-to-r from-pink-500 to-red-500 text-white shadow-md"
                    : "bg-white border text-gray-700 hover:bg-gray-100"
                }`}
              >
                {Icon && <Icon size={16} />}
                {tab.name}
              </button>
            );
          })}
        </div>

        {/* CARDS */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((contact) => {
            const Icon = contact.icon;
            return (
              <div
                key={contact.id}
                className="bg-white rounded-3xl p-8 shadow-md hover:shadow-2xl transition duration-300"
              >
                {/* ICON */}
                <div
                  className={`w-14 h-14 flex items-center justify-center rounded-xl bg-gradient-to-r ${contact.gradient} mb-5`}
                >
                  <Icon className="text-white w-6 h-6" />
                </div>

                {/* TITLE */}
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  {contact.title}
                </h3>

                {/* DESCRIPTION */}
                <ul className="text-sm text-gray-600 space-y-1 mb-6">
                  {contact.description.map((point, i) => (
                    <li key={i}>• {point}</li>
                  ))}
                </ul>

                {/* CALL BUTTON */}
                <a
                  href={`tel:${contact.number}`}
                  className={`inline-block w-full text-center py-3 rounded-xl font-semibold text-white bg-gradient-to-r ${contact.gradient} hover:scale-105 transition-transform duration-300`}
                >
                  Call {contact.number}
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
