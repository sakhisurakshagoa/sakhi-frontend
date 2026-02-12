// app/anonymous_complaint/track/page.tsx
"use client";

import { useState } from "react";
import { useReadContract } from "wagmi";
import { polygonAmoy } from "wagmi/chains";
import { Loader2 } from "lucide-react"; // Optional: install lucide-react for spinner

// Same contract address as submission page
const CONTRACT_ADDRESS = "0x7edC15Aca9632F7092B21Dd31dA222440aa4E9d7" as const;

// Minimal ABI for getComplaint function
const ABI = [
  {
    name: "getComplaint",
    type: "function",
    inputs: [{ name: "_id", type: "bytes32" }],
    outputs: [
      {
        components: [
          { name: "encryptedContent", type: "string" },
          { name: "ipfsEvidence", type: "string[]" },
          { name: "submitter", type: "address" },
          { name: "timestamp", type: "uint256" },
          { name: "reviewed", type: "bool" },
        ],
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
  },
] as const;

export default function TrackComplaintPage() {
  const [complaintId, setComplaintId] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [complaint, setComplaint] = useState<any>(null);

  const { data, refetch, isFetching } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: ABI,
    functionName: "getComplaint",
    args: complaintId ? [complaintId as `0x${string}`] : undefined,
    chainId: polygonAmoy.id,
    query: { enabled: false },
  });

  const handleTrack = async () => {
    // Basic validation
    if (!complaintId.trim()) {
      setError("Please enter a Complaint ID.");
      return;
    }
    if (!complaintId.startsWith("0x") || complaintId.length !== 66) {
      setError("Invalid format. Complaint ID must be a 66-character hex string starting with 0x.");
      return;
    }

    setLoading(true);
    setError(null);
    setComplaint(null);

    try {
      const result = await refetch();
      if (result.data && result.data.timestamp > 0n) {
        setComplaint(result.data);
      } else {
        setError("No complaint found for this ID. Please check and try again.");
      }
    } catch (err: any) {
      setError(err.message || "Failed to fetch complaint details.");
      console.error("Track error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full bg-gray-50 py-12 px-6 md:px-20 min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Track Your Complaint</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Enter your <strong>Complaint ID</strong> (Transaction Hash) to check status and details.
          </p>
          <p className="text-sm text-gray-500 mt-3">
            Example: <code className="bg-gray-200 px-2 py-1 rounded">0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef</code>
          </p>
        </div>

        {/* Input + Button */}
        <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-lg">
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <input
              type="text"
              value={complaintId}
              onChange={(e) => setComplaintId(e.target.value.trim())}
              placeholder="Enter your Complaint ID (Tx Hash)"
              className="flex-1 p-4 text-lg rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder:text-gray-400"
            />
            <button
              onClick={handleTrack}
              disabled={loading || isFetching}
              className="px-10 py-4 bg-gradient-to-r from-purple-600 to-purple-700 text-white font-semibold text-lg rounded-xl hover:from-purple-700 hover:to-purple-800 transition disabled:opacity-60 flex items-center gap-2"
            >
              {loading || isFetching ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Checking...
                </>
              ) : (
                "Track Complaint"
              )}
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <p className="text-red-600 text-center font-medium mb-6 bg-red-50 p-4 rounded-xl border border-red-200">
              {error}
            </p>
          )}

          {/* Complaint Details */}
          {complaint && (
            <div className="bg-purple-50 rounded-2xl p-8 border border-purple-200 shadow-sm">
              <h2 className="text-2xl font-semibold text-purple-900 mb-6">Complaint Details</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-800">
                <div>
                  <strong className="block text-gray-700">Submitted on:</strong>
                  {new Date(Number(complaint.timestamp) * 1000).toLocaleString("en-IN", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </div>

                <div>
                  <strong className="block text-gray-700">Status:</strong>
                  <span
                    className={`font-medium ${
                      complaint.reviewed ? "text-green-700" : "text-orange-700"
                    }`}
                  >
                    {complaint.reviewed ? "Reviewed / In Process" : "Pending"}
                  </span>
                </div>

                <div className="md:col-span-2">
                  <strong className="block text-gray-700">Evidence Files:</strong>
                  {complaint.ipfsEvidence.length > 0 ? (
                    <ul className="list-disc pl-6 mt-2 space-y-2">
                      {complaint.ipfsEvidence.map((hash: string, idx: number) => (
                        <li key={idx}>
                          <a
                            href={`https://ipfs.io/ipfs/${hash}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-purple-700 hover:underline hover:text-purple-900"
                          >
                            View Encrypted File {idx + 1} (IPFS)
                          </a>
                          <span className="text-sm text-gray-500 ml-2">
                            (Encrypted – only authorized personnel can view)
                          </span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-600 mt-2">No evidence files attached.</p>
                  )}
                </div>

                <div className="md:col-span-2 mt-4 text-sm text-gray-600 bg-white p-4 rounded-xl border border-gray-200">
                  <strong className="text-gray-800">Important Privacy Note:</strong>
                  <p className="mt-1">
                    All detailed descriptions and evidence files are **encrypted** for your privacy.
                    Only authorized police/administrators with the decryption key can view the full content.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Default Message */}
          {!complaint && !error && !loading && (
            <div className="text-center text-gray-600 mt-8">
              <p className="text-lg">Enter your Complaint ID above to view status and details.</p>
              <p className="text-sm mt-2">
                <strong>Tip:</strong> Save your Complaint ID immediately after submission.
              </p>
            </div>
          )}
        </div>

        {/* Footer Note */}
        <div className="text-center mt-10 text-sm text-gray-500">
          <p>Keep your Complaint ID safe – it’s the only way to track your complaint privately.</p>
          <p className="mt-2">
            For help: Contact support at <strong>9307402403</strong> (if you provided optional contact info).
          </p>
        </div>
      </div>
    </section>
  );
}