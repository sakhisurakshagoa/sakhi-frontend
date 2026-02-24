"use client";
 
import { useState } from "react";
import dynamic from "next/dynamic";

const LocationMap = dynamic(
  () => import("../components/essential-locations/LocationMap"),
  { ssr: false }
);

type Location = {
  id: number;
  name: string;
  lat: number;
  lng: number;
  category: string;
};

const dummyLocations: Location[] = [
  {
    id: 1,
    name: "City Hospital",
    lat: 18.5204,
    lng: 73.8567,
    category: "Hospital",
  },
  {
    id: 2,
    name: "Women Police Station",
    lat: 18.5314,
    lng: 73.8446,
    category: "Police",
  },
  {
    id: 3,
    name: "Public Washroom - Metro Mall",
    lat: 18.5679,
    lng: 73.9143,
    category: "Washroom",
  },
  {
    id: 4,
    name: "24x7 Pharmacy",
    lat: 18.5100,
    lng: 73.8600,
    category: "Pharmacy",
  },
];

const categories = [
  "All",
  "Hospital",
  "Police",
  "Washroom",
  "Pharmacy",
];

export default function EssentialLocationsPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredLocations =
    activeCategory === "All"
      ? dummyLocations
      : dummyLocations.filter(
          (loc) => loc.category === activeCategory
        );

  return (
    <div className="min-h-screen bg-purple-50 p-6">
      {/* Heading */}
      <h1 className="text-3xl font-bold text-purple-700 text-center mb-6">
        Essential Locations
      </h1>

      {/* Tabs */}
      <div className="flex flex-wrap justify-center gap-3 mb-6">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
              activeCategory === category
                ? "bg-purple-600 text-white"
                : "bg-white text-purple-600 border border-purple-600"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Map */}
      <div className="mb-8">
        <LocationMap locations={filteredLocations} />
      </div>

      {/* List Below Map */}
      <div className="grid gap-4 md:grid-cols-2">
        {filteredLocations.map((loc) => (
          <div
            key={loc.id}
            className="bg-white p-4 rounded-xl shadow hover:shadow-md transition"
          >
            <h3 className="font-semibold text-purple-700">
              {loc.name}
            </h3>
            <p className="text-sm text-gray-500">
              Category: {loc.category}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}