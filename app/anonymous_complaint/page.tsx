"use client";

import { useState } from "react";

export default function AnonymousComplaintPage() {
  const [files, setFiles] = useState<File[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Complaint submitted successfully!");
  };

  return (
    <section className="w-full bg-gray-50 py-10 px-6 md:px-20">
      {/* Header */}
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-semibold text-gray-900 mb-2">
          File a Complaint
        </h1>
        <p className="text-gray-600 max-w-3xl mx-auto">
          Report your incident safely and confidentially.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-8">
        {/* Privacy Notice */}
        <div className="bg-purple-50 rounded-3xl p-6 border border-purple-200 shadow-sm">
          <h2 className="text-lg font-semibold text-purple-800 mb-2">
            Your Privacy is Protected
          </h2>
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
              placeholder="Brief description of what happened"
              required
              className="mt-1 p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder:text-gray-500 w-full"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700">Category *</label>
            <select
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
              placeholder="Where did this happen?"
              className="mt-1 p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder:text-gray-500 w-full"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700">Date of Incident</label>
            <input
              type="date"
              className="mt-1 p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder:text-gray-500 w-full"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700">Detailed Description *</label>
            <textarea
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
            You can upload images or videos related to your incident.
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
            className="px-8 py-3 bg-gradient-to-r from-purple-500 to-purple-700
                       text-white font-semibold rounded-xl hover:from-purple-600 hover:to-purple-800 transition w-full md:w-auto"
          >
            Submit Complaint
          </button>
        </div>
      </form>
    </section>
  );
}
