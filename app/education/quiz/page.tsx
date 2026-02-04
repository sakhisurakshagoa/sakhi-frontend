"use client";

import { useState } from "react";

const question = {
  text: "Which act protects women at workplace?",
  options: ["IPC Act", "POSH Act", "RTI Act"],
  correct: 1,
};

export default function QuizPage() {
  const [selected, setSelected] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const isCorrect = selected === question.correct;

  return (
    <main className="min-h-screen px-6 py-12 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Quick Quiz</h1>

      <p className="text-lg mb-4">{question.text}</p>

      {question.options.map((option, index) => (
        <button
          key={index}
          onClick={() => setSelected(index)}
          className={`block w-full text-left p-3 mb-3 rounded-lg border
            ${selected === index ? "bg-blue-100 border-blue-500" : "bg-white"}
          `}
        >
          {option}
        </button>
      ))}

      {!submitted && (
        <button
          onClick={() => setSubmitted(true)}
          className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg"
        >
          Submit
        </button>
      )}

      {submitted && (
        <div className="mt-6 p-4 rounded-xl bg-gray-100 text-center">
          <h2 className="text-xl font-semibold">
            {isCorrect ? "🎉 Correct Answer!" : "❌ Incorrect Answer"}
          </h2>
          <p className="mt-2">
            Score: {isCorrect ? "1 / 1" : "0 / 1"}
          </p>
        </div>
      )}
    </main>
  );
}
