// app/anonymous_complaint/page.tsx
"use client";

import { useState } from "react";
import { usePrivy } from "@privy-io/react-auth";
import { useWriteContract } from "wagmi";
import { polygonAmoy } from "wagmi/chains"; // ← ADD THIS IMPORT (fixes "not defined")
import AES from "crypto-js/aes";

const CONTRACT_ADDRESS = "0x7edC15Aca9632F7092B21Dd31dA222440aa4E9d7" as const;

// Minimal ABI – only what writeContract needs
const ABI = [
  {
    name: "submitComplaint",
    type: "function",
    inputs: [
      { name: "_encryptedContent", type: "string" },
      { name: "_ipfsHashes", type: "string[]" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
] as const;

export default function AnonymousComplaintPage() {
  const { ready, authenticated, login } = usePrivy();
  const { writeContract } = useWriteContract();

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    location: "",
    date: "",
    description: "",
    anonymous: true,
  });
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked } = e.target as any;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!ready) {
      setError("Wallet system is loading... Please wait a moment and try again.");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      // Auto-login if not authenticated (creates embedded wallet)
      if (!authenticated) {
        await login();
      }

      // Encrypt form data (client-side only)
      const complaintData = JSON.stringify(formData);
      const encryptedContent = AES.encrypt(complaintData, "your-secret-key-123-test-only").toString();

      // For now: empty array (no IPFS upload yet)
      // Later: upload files → get CIDs → pass here
      const ipfsHashes: string[] = [];

      // Send transaction (must pass BOTH args)
      writeContract(
        {
          address: CONTRACT_ADDRESS,
          abi: ABI,
          functionName: "submitComplaint",
          args: [encryptedContent, ipfsHashes],
          chainId: polygonAmoy.id, // ← now works after import
        },
        {
          onSuccess: (hash) => {
            setSuccessMessage(`Complaint filed successfully! Transaction ID: ${hash}`);
            setLoading(false);
          },
          onError: (err: any) => {
            setError(err?.shortMessage || err.message || "Transaction failed. Check console.");
            setLoading(false);
          },
        }
      );
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred");
      setLoading(false);
      console.error("Submit error:", err);
    }
  };

  return (
    <section className="w-full bg-gray-50 py-10 px-6 md:px-20">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-semibold text-gray-900 mb-2">File a Complaint</h1>
        <p className="text-gray-600 max-w-3xl mx-auto">
          Report your incident safely and confidentially.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-8">
        {/* Privacy Notice */}
        <div className="bg-purple-50 rounded-3xl p-6 border border-purple-200 shadow-sm">
          <h2 className="text-lg font-semibold text-purple-800 mb-2">Your Privacy is Protected</h2>
          <p className="text-purple-700 text-sm">
            All reports are handled with complete confidentiality. You can choose to remain anonymous, and your personal information will never be shared without your consent.
          </p>
        </div>

        {/* Incident Details */}
        <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm space-y-4">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Incident Details</h2>

          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700">Incident Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Brief description of what happened"
              required
              className="mt-1 p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder:text-gray-500 w-full"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700">Category *</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="mt-1 p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder:text-gray-500 w-full text-gray-700"
            >
              <option value="" disabled>Select the type of incident</option>
              <option value="harassment">Harassment</option>
              <option value="assault">Assault</option>
              <option value="stalking">Stalking</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Where did this happen?"
              className="mt-1 p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder:text-gray-500 w-full"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700">Date of Incident</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="mt-1 p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder:text-gray-500 w-full"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700">Detailed Description *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              placeholder="Include what happened, when, where, and any other relevant information."
              rows={5}
              className="mt-1 p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none placeholder:text-gray-500 w-full"
            />
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="anonymous"
              name="anonymous"
              checked={formData.anonymous}
              onChange={handleChange}
              className="w-5 h-5 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
            />
            <label htmlFor="anonymous" className="text-gray-700 text-sm">
              File this complaint anonymously. You can still track your complaint with a generated ID.
            </label>
          </div>
        </div>

        {/* Evidence Upload */}
        <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm space-y-4">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Attach Evidence</h2>
          <p className="text-gray-600 text-sm">
            You can upload images or videos related to your incident (IPFS upload coming soon).
          </p>
          <input
            type="file"
            multiple
            accept="image/*,video/*"
            onChange={handleFileChange}
            className="mt-2"
          />

          {files.length > 0 && (
            <ul className="mt-2 text-gray-700 text-sm list-disc list-inside space-y-1">
              {files.map((file, idx) => (
                <li key={idx}>{file.name}</li>
              ))}
            </ul>
          )}
        </div>

        {/* Submit */}
        <div className="text-center">
          <button
            type="submit"
            disabled={loading || !ready}
            className="px-8 py-3 bg-gradient-to-r from-purple-500 to-purple-700 text-white font-semibold rounded-xl hover:from-purple-600 hover:to-purple-800 transition w-full md:w-auto disabled:opacity-50"
          >
            {loading ? "Submitting..." : "Submit Complaint"}
          </button>
        </div>
      </form>

      {error && <p className="text-red-600 text-center mt-4">{error}</p>}
      {successMessage && <p className="text-green-600 text-center mt-4">{successMessage}</p>}
    </section>
  );
}