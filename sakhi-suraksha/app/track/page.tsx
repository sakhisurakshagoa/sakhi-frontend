"use client";

import { useState } from "react";

export default function TrackComplaintPage() {
  const [complaintId, setComplaintId] = useState("");
  const [pin, setPin] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleTrack = async () => {
    setLoading(true);
    setError(null);
    setStatus(null);

    try {
      const res = await fetch("http://localhost:4000/api/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ complaintId, pin }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus(data.status || "Open");
      } else {
        setError("Invalid Complaint ID or PIN. Please check and try again.");
      }
    } catch (e) {
      setError("Unable to connect to server. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-2 text-center">
          Track Your Complaint
        </h1>
        <p className="text-sm text-gray-600 mb-6 text-center">
          Enter your Complaint ID and PIN to check the current status.
        </p>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Complaint ID
          </label>
          <input
            type="text"
            placeholder="e.g. abcd1234"
            value={complaintId}
            onChange={(e) => setComplaintId(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tracking PIN
          </label>
          <input
            type="password"
            placeholder="6-digit PIN"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <button
          onClick={handleTrack}
          disabled={loading || !complaintId || !pin}
          className="w-full py-2 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition disabled:opacity-60"
        >
          {loading ? "Checking..." : "Track Complaint"}
        </button>

        {status && (
          <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg text-center">
            <p className="text-green-800 font-medium">
              Current Status: {status}
            </p>
          </div>
        )}

        {error && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-center">
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        <p className="mt-6 text-xs text-gray-500 text-center">
          Keep your Complaint ID and PIN safe. Do not share with anyone.
        </p>
      </div>
    </div>
  );
}