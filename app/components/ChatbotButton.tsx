"use client";

import { useRouter } from "next/navigation";
import { ChatBubbleLeftRightIcon } from "@heroicons/react/24/solid";

export default function ChatbotButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push("/chatbot")}
      className="
        fixed bottom-6 right-6 z-50
        w-14 h-14 rounded-full
        bg-gradient-to-br from-purple-500 to-pink-600
        hover:from-purple-600 hover:to-pink-700
        shadow-xl
        flex items-center justify-center
      "
      aria-label="Open Chatbot"
    >
      <ChatBubbleLeftRightIcon className="w-7 h-7 text-white" />
    </button>
  );
}
