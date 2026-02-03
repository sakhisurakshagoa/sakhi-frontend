"use client";

export default function HowSakhiSurakshaWorks() {
  const steps = [
    {
      step: "1",
      title: "Access Safely",
      description:
        "Log in securely to your private dashboard. No personal information is required for anonymous features.",
    },
    {
      step: "2",
      title: "Get Help",
      description:
        "File complaints anonymously, find emergency contacts, locate safe spaces, or access support resources.",
    },
    {
      step: "3",
      title: "Stay Empowered",
      description:
        "Track your reports, access educational content, and connect with support resources whenever needed.",
    },
  ];

  return (
    <section className="w-full bg-white py-20">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-12">
        
        {/* Section Heading */}
        <h2 className="text-4xl md:text-5xl font-semibold text-gray-900 text-center mb-4 tracking-tight">
          How Sakhi Suraksha Works
        </h2>

        <p className="text-center text-gray-500 text-base md:text-lg max-w-2xl mx-auto mb-16">
          Simple steps designed to keep you safe, supported, and empowered at every stage
        </p>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {steps.map((item) => (
            <div
              key={item.step}
              className="relative bg-gray-50 rounded-2xl p-8 text-center
                         shadow-sm transition-all duration-300
                         hover:-translate-y-2 hover:shadow-xl"
            >
              {/* Number Circle */}
              <div
                className="absolute -top-6 left-1/2 -translate-x-1/2
                           w-12 h-12 rounded-full flex items-center justify-center
                           text-white font-bold text-lg
                           bg-gradient-to-r from-purple-600 to-teal-500"
              >
                {item.step}
              </div>

              {/* Content */}
              <h3 className="mt-6 text-xl font-semibold text-gray-800">
                {item.title}
              </h3>

              <p className="mt-3 text-gray-600 text-sm leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
