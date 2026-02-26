"use client";

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";

type Complaint = {
  id: string;
  category: string;
  status: string;
};

type FullComplaint = {
  id: string;
  title: string;
  description: string;
  location: string;
  category: string;
  date: string;
  status: string;
  anonymous: boolean;
};

export default function AdminPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState<string | null>(null);
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [selected, setSelected] = useState<FullComplaint | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const login = async () => {
    setError("");
    setLoading(true);
    try {
      const cred = await signInWithEmailAndPassword(auth, email, password);
      const idToken = await cred.user.getIdToken();
      setToken(idToken);
      await loadComplaints(idToken);
    } catch {
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  const loadComplaints = async (jwt: string) => {
    const res = await fetch("http://localhost:4000/api/admin/complaints", {
      headers: { Authorization: `Bearer ${jwt}` },
    });
    const data = await res.json();
    setComplaints(data.data || []);
  };

  const updateStatus = async (id: string, status: string) => {
    if (!token) return;
    await fetch(`http://localhost:4000/api/admin/complaints/${id}/status`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status }),
    });
    await loadComplaints(token);
  };

  const viewDetails = async (id: string) => {
    if (!token) return;
    const res = await fetch(`http://localhost:4000/api/admin/complaints/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setSelected(data.data);
  };

  if (!token) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
          <h1 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
            Admin Login
          </h1>

          <input
            className="w-full px-4 py-2 border rounded mb-3"
            placeholder="Admin Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            className="w-full px-4 py-2 border rounded mb-4"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <p className="text-red-600 text-sm mb-3">{error}</p>}

          <button
            onClick={login}
            disabled={loading}
            className="w-full py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-semibold mb-4">Admin Dashboard</h1>

      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="min-w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 border">ID</th>
              <th className="p-3 border">Category</th>
              <th className="p-3 border">Status</th>
              <th className="p-3 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {complaints.map((c) => (
              <tr key={c.id}>
                <td className="p-3 border text-xs">{c.id}</td>
                <td className="p-3 border">{c.category}</td>
                <td className="p-3 border">{c.status}</td>
                <td className="p-3 border space-x-2">
                  <select
                    value={c.status}
                    onChange={(e) => updateStatus(c.id, e.target.value)}
                    className="border rounded px-2 py-1"
                  >
                    <option value="Open">Open</option>
                    <option value="In Review">In Review</option>
                    <option value="Resolved">Resolved</option>
                  </select>

                  <button
                    onClick={() => viewDetails(c.id)}
                    className="ml-2 px-3 py-1 bg-blue-600 text-white rounded"
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selected && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-6 max-w-xl w-full">
            <h2 className="text-xl font-semibold mb-2">Complaint Details</h2>
            <p><b>Title:</b> {selected.title}</p>
            <p><b>Description:</b> {selected.description}</p>
            <p><b>Location:</b> {selected.location}</p>
            <p><b>Category:</b> {selected.category}</p>
            <p><b>Date:</b> {selected.date}</p>
            <p><b>Status:</b> {selected.status}</p>

            <button
              onClick={() => setSelected(null)}
              className="mt-4 px-4 py-2 bg-gray-700 text-white rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}