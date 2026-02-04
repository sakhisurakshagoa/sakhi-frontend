import Link from "next/link";

import {
  Video,
  FileText,
  Headphones,
  HelpCircle,
} from "lucide-react";

const modes = [
  {
    title: "Videos",
    description: "Watch awareness and educational videos",
    link: "/education/videos",
    icon: Video,
  },
  {
    title: "PDFs",
    description: "Read and download informative documents",
    link: "/education/pdfs",
    icon: FileText,
  },
  {
    title: "Podcasts",
    description: "Listen to expert talks and discussions",
    link: "/education/podcasts",
    icon: Headphones,
  },
  {
    title: "Quiz",
    description: "Test your knowledge and view your score",
    link: "/education/quiz",
    icon: HelpCircle,
  },
];

export default function EducationalContentHome() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#f5f3ff] to-[#ede9fe] px-4 py-14">
      {/* Heading */}
      <div className="text-center mb-14">
        <h1 className="text-4xl font-extrabold text-[#7c3aed] mb-4">
          Knowledge for Empowerment
        </h1>
        <p className="text-slate-600 text-lg max-w-xl mx-auto">
          Learn through videos, PDFs, podcasts, and interactive quizzes
        </p>
      </div>

      {/* Cards */}
      <div className="max-w-6xl mx-auto grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {modes.map((mode, index) => {
          const Icon = mode.icon;

          return (
            <Link key={index}
              href={mode.link}
              className="
                group
                bg-white
                rounded-2xl
                p-6
                text-center
                shadow-md
                border border-purple-100
                transition-all
                hover:-translate-y-2
                hover:shadow-2xl
                hover:border-purple-300
              "
              
            >
              {/* Icon */}
              <div className="flex justify-center mb-4">
                <div className="
                  bg-purple-100
                  text-[#7c3aed]
                  p-4
                  rounded-full
                  group-hover:bg-[#7c3aed]
                  group-hover:text-white
                  transition
                ">
                  <Icon size={28} />
                </div>
              </div>

              {/* Title */}
              <h2 className="text-xl font-semibold text-slate-800 mb-2 group-hover:text-[#7c3aed]">
                {mode.title}
              </h2>

              {/* Description */}
              <p className="text-slate-600 text-sm leading-relaxed">
                {mode.description}
              </p>
            </Link>
          );
        })}
      </div>
    </main>
  );
}
