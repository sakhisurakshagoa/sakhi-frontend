"use client";

import { StarIcon } from "@heroicons/react/24/solid";

interface Testimonial {
  quote: string;
  name: string;
  role: string;
}

export default function Testimonials() {
  const testimonials: Testimonial[] = [
    {
      quote:
        "This platform gave me the courage to report harassment at work. The anonymous feature made me feel safe to speak up.",
      name: "Anonymous User",
      role: "Working Professional",
    },
    {
      quote:
        "Having all emergency contacts in one place has been invaluable. I feel so much more prepared and confident.",
      name: "Anonymous User",
      role: "College Student",
    },
    {
      quote:
        "The educational content helped me understand my rights. Knowledge truly is empowering.",
      name: "Anonymous User",
      role: "Community Member",
    },
  ];

  return (
    <section className="w-full py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Heading */}
        <h2 className="text-4xl md:text-5xl font-semibold text-gray-900 text-center mb-4 tracking-tight">
          Trusted by Women Everywhere
        </h2>

        <p className="text-center text-gray-500 text-base md:text-lg max-w-2xl mx-auto mb-12">
          Real stories from women who found safety and support through our platform
        </p>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="bg-white border border-gray-200 p-6
                         rounded-xl transition hover:shadow-lg"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <StarIcon
                    key={i}
                    className="w-4 h-4 text-yellow-400"
                  />
                ))}
              </div>

              {/* Quote */}
              <p className="text-gray-700 text-sm leading-relaxed mb-6">
                “{t.quote}”
              </p>

              {/* User Info */}
              <div>
                <p className="font-semibold text-purple-700">
                  {t.name}
                </p>
                <p className="text-xs text-gray-500">
                  {t.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
