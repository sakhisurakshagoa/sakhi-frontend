"use client";

import Link from "next/link";
import { UsersIcon } from "@heroicons/react/24/solid";

export default function ForumCTA() {
  return (
    <section
      className="w-full py-20
                 bg-gradient-to-r from-purple-900 via-purple-800 to-purple-700
                 text-white"
    >
      <div className="max-w-6xl mx-auto px-6 text-center">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <UsersIcon className="w-12 h-12 text-purple-200" />
        </div>

        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-semibold mb-4">
          Join a Supportive Community
        </h2>

        {/* Description */}
        <p className="text-purple-100 text-base md:text-lg max-w-2xl mx-auto mb-8">
          Connect with women who understand. Share your stories, ask questions,
          and find strength in a safe, moderated community built on trust and
          support.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            href="/forum"
            className="px-8 py-3 font-semibold
                       bg-white text-purple-800
                       rounded-lg
                       hover:bg-purple-100 transition"
          >
            Join the Forum
          </Link>

          <Link
            href="/forum/create"
            className="px-8 py-3 font-semibold
                       border border-white/60
                       rounded-lg
                       hover:bg-white/10 transition"
          >
            Share Your Story
          </Link>
        </div>
      </div>
    </section>
  );
}
