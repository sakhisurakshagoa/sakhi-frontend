"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect } from "react";

// 🔥 Fix marker icon issue in Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

type Location = {
  id: number;
  name: string;
  lat: number;
  lng: number;
  category: string;
};

interface LocationMapProps {
  locations: Location[];
}

export default function LocationMap({ locations }: LocationMapProps) {
  return (
    <div className="w-full h-[500px] rounded-xl overflow-hidden shadow">
      <MapContainer
        center={[18.5204, 73.8567]} // Default center (change to your city)
        zoom={12}
        scrollWheelZoom={true}
        className="w-full h-full"
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {locations.map((loc) => (
          <Marker key={loc.id} position={[loc.lat, loc.lng]}>
            <Popup>
              <div>
                <h3 className="font-semibold">{loc.name}</h3>
                <p className="text-sm text-gray-500">
                  {loc.category}
                </p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}