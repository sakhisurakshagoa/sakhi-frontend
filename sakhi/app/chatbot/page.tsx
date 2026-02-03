"use client";

import { useState, useRef, useEffect, CSSProperties } from "react";

/* ---------------- TYPES ---------------- */

type Role = "system" | "user" | "assistant";

type Message = {
  role: Role;
  content: string;
};

type Chat = {
  id: number;
  title: string;
  messages: Message[];
};

/* ---------------- PANIC KEYWORDS ---------------- */

const PANIC_WORDS = [
  "help", "scared", "afraid", "panic", "crying", "harassed",
  "followed", "unsafe", "threatened", "attack", "stalking",
  "molested", "rape", "assault","emergency", "trapped", "danger", "kidnap"

];

/* ---------------- COMPONENT ---------------- */

export default function Home() {
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const recognitionRef = useRef<any>(null);
  const [networkError, setNetworkError] = useState(false);
  const [listening, setListening] = useState(false);
  const [search, setSearch] = useState("");
  const [showSidebar, setShowSidebar] = useState(true);
  const [menuOpenId, setMenuOpenId] = useState<number | null>(null);

  const [chats, setChats] = useState<Chat[]>([
    {
      id: 1,
      title: "New chat",
      messages: [
        {
          role: "system",
          content:
            "You are Sakhi, an AI assistant ONLY for women safety. You must guide, support, and protect women. Do NOT answer unrelated topics."
        },
      ],
    },
  ]);

  const [activeChatId, setActiveChatId] = useState(1);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
useEffect(() => {
  const checkMobile = () => setIsMobile(window.innerWidth < 480);
  checkMobile();
  window.addEventListener("resize", checkMobile);
  return () => window.removeEventListener("resize", checkMobile);
}, []);

  const activeChat = chats.find((c) => c.id === activeChatId) ?? chats[0];
  useEffect(() => {
  const handleOffline = () => setNetworkError(true);
  const handleOnline = () => setNetworkError(false);

  window.addEventListener("offline", handleOffline);
  window.addEventListener("online", handleOnline);

  return () => {
    window.removeEventListener("offline", handleOffline);
    window.removeEventListener("online", handleOnline);
  };
}, []);

  /* ---------------- AUTO SCROLL ---------------- */

  useEffect(() => {
  bottomRef.current?.scrollIntoView({ behavior: "smooth" });
}, [activeChat?.messages]);

  /* ---------------- RESPONSIVE SIDEBAR ---------------- */

  useEffect(() => {
    const resize = () => setShowSidebar(window.innerWidth >= 768);
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  /* ---------------- SPEECH RECOGNITION ---------------- */

  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) return;

    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.lang = "en-US";
    recognitionRef.current.interimResults = true;

    recognitionRef.current.onresult = (e: any) => {
      const transcript = Array.from(e.results)
        .map((r: any) => r[0].transcript)
        .join("");
      setInput(transcript);
    };

    recognitionRef.current.onend = () => setListening(false);
  }, []);

  const toggleMic = () => {
    if (!recognitionRef.current) return;
    listening ? recognitionRef.current.stop() : recognitionRef.current.start();
    setListening(!listening);
  };

  /* ---------------- CHAT ACTIONS ---------------- */

  const newChat = () => {
    const id = Date.now();
    setChats([
      {
        id,
        title: "New chat",
        messages: chats[0].messages.slice(0, 1),
      },
      ...chats,
    ]);
    setActiveChatId(id);
  };

  const deleteChat = (id: number) => {
  setChats((prev) => {
    const rest = prev.filter((c) => c.id !== id);
    if (rest.length === 0) return prev;

    setActiveChatId(rest[0].id);
    return rest;
  });
  setMenuOpenId(null);
};

  /* ---------------- SEND MESSAGE ---------------- */

  const sendMessage = async () => {
  if (!input.trim()) return;
  setLoading(true);

  const isPanic = PANIC_WORDS.some((w) =>
    input.toLowerCase().includes(w)
  );

  const userMessage: Message = {
    role: "user",
    content: input,
  };

  let updatedMessages: Message[] = [...activeChat.messages, userMessage];

  // 🚨 PANIC FLOW
  if (isPanic) {
    updatedMessages.push({
      role: "assistant",
      content:
        "🚨 I hear distress. You are not alone. Please move to a safe place if possible and contact local emergency services or a trusted person immediately.",
    });

    setChats((prev) =>
      prev.map((chat) =>
        chat.id === activeChatId
          ? {
              ...chat,
              messages: updatedMessages,
              title:
                chat.title === "New chat"
                  ? input.slice(0, 30)
                  : chat.title,
            }
          : chat
      )
    );

    setInput("");
    setLoading(false);
    return; // ⛔ stop here
  }

  // ✅ NORMAL CHAT: show user message immediately
  setChats((prev) =>
    prev.map((chat) =>
      chat.id === activeChatId
        ? {
            ...chat,
            messages: updatedMessages,
            title:
              chat.title === "New chat"
                ? input.slice(0, 30)
                : chat.title,
          }
        : chat
    )
  );

  setInput("");

  try {
  const res = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages: updatedMessages }),
  });

  // 🔴 RATE LIMIT / QUOTA
  if (res.status === 429) {
  setChats((prev) =>
    prev.map((chat) =>
      chat.id === activeChatId
        ? {
            ...chat,
            title:
              chat.title === "New chat"
                ? input.slice(0, 30)
                : chat.title,
            messages: [
              ...updatedMessages,
              {
                role: "assistant",
                content:
                  "⚠️ I'm temporarily unavailable due to service limits. Please try again later.",
              },
            ],
          }
        : chat
    )
  );
  return;
}

  // 🔴 ANY OTHER SERVER ERROR
  if (!res.ok) {
    throw new Error("Server error");
  }

  const data = await res.json();

  setChats((prev) =>
    prev.map((chat) =>
      chat.id === activeChatId
        ? {
            ...chat,
            messages: [
              ...updatedMessages,
              { role: "assistant", content: data.reply },
            ],
          }
        : chat
    )
  );
} catch (err) {
  // 🔴 SHOW network popup
  setNetworkError(true);

  setTimeout(() => setNetworkError(false), 3000);

  // 🌐 NETWORK ERROR / SERVER DOWN
  setChats((prev) =>
    prev.map((chat) =>
      chat.id === activeChatId
        ? {
            ...chat,
            messages: [
              ...updatedMessages,
              {
                role: "assistant",
                content:
                  "⚠️ Check your internet connection and try again later.",
              },
            ],
          }
        : chat
    )
  );
} finally {
  setLoading(false); // ✅ always stops spinner
}
  };


  const filteredChats = chats.filter((c) =>
    c.title.toLowerCase().includes(search.toLowerCase())
  );

  /* ---------------- UI ---------------- */
  return (
    <>
    {networkError && (
  <div
    style={{
      position: "fixed",
      top: 10,
      left: "50%",
      transform: "translateX(-50%)",
      background: "#f42d0a",
      color: "#fff",
      padding: "12px 20px",
      borderRadius: 10,
      boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
      zIndex: 9999,
      fontSize: 14,
      transition: "all 0.3s ease",
      opacity: networkError ? 1 : 0,

    }}
  >
    Check your internet connection and try again later.
  </div>
)}

    <div style={container}>
      {showSidebar && (
        <div
  style={{
    ...sidebar,
    width: isMobile ? 200 : 260,
    padding: isMobile ? 8 : 12,
  }}
>
          <button onClick={newChat} style={sidebarBtn}>＋ New chat</button>
          <input
            placeholder="Search chat..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ ...searchBox, fontSize: 17 }}
          />

          <p style={{ ...sidebarTitle, fontSize: 17, fontWeight: 500 }}>Your chats</p>

          {filteredChats.map((chat) => (
            <div
              key={chat.id}
              style={{
                ...chatItem,
                background:
                  chat.id === activeChatId ? "#343541" : "transparent",
              }}
              onClick={() => setActiveChatId(chat.id)}
            >
              {chat.title}
              <span
  style={{ padding: "0 6px", cursor: "pointer" }}
  onClick={(e) => {
    e.stopPropagation();
    setMenuOpenId(chat.id);
  }}
>
  ⋯
</span>

              {menuOpenId === chat.id && (
                <div style={menu}>
                  <div onClick={() => deleteChat(chat.id)}>Delete chat</div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <div style={main}>
        <button onClick={() => setShowSidebar(!showSidebar)}>☰</button>

        <h1
  style={{
    textAlign: "center",
    fontSize: "45px",
    fontWeight: 600,
    marginBottom: "20px",
  }}
>
  Hello, Sakhi!
</h1>


        <div style={chatBox}>
          {activeChat?.messages?.length ? (
  activeChat.messages
    .filter((m) => m.role !== "system")
    .map((m, i) =>  (
              <div
                key={i}
                style={{
                  alignSelf: m.role === "user" ? "flex-end" : "flex-start",
                  background: m.role === "user" ? "#d609a3" : "#e5e5e5",
                  color: m.role === "user" ? "#fff" : "#000",
                  padding: 10,
                  borderRadius: 14,
                  maxWidth: "75%",
                }}
              >
                {m.content}
              </div>
            ))
          ) : (
  <p style={{ opacity: 0.6, textAlign: "center" }}>
  Start a conversation with Sakhi...
</p>

)}
          {loading && <p>Thinking…</p>}
          <div ref={bottomRef} />
        </div>

        <div style={{ display: "flex", gap: 6 }}>
          <div style={{ position: "relative", flex: 1 }}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="How can I help you?"
              style={inputBox}
            />
            <span onClick={toggleMic} style={mic}>
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke={listening ? "#d609a3" : "#6b7280"}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="9" y="2" width="6" height="11" rx="3" />
    <path d="M5 10a7 7 0 0014 0" />
    <path d="M12 17v5" />
  </svg>
</span>

          </div>
          <button onClick={sendMessage} disabled={networkError || loading}>
  Ask
</button>

        </div>
      </div>
    </div>
    </>
  );
}

/* ---------------- STYLES ---------------- */

const container: CSSProperties = { display: "flex", height: "100vh" };
const sidebar: CSSProperties = {
  width: "260px",
  background: "#202123",
  color: "#fff",
  padding: 12,
};

const sidebarBtn: CSSProperties = {
  padding: "8px 10px",
  background: "#343541",
  border: "none",
  color: "#fff",
  marginBottom: 8,
  display: "flex",
  alignItems: "center",
  height: 36,
  fontSize: 14,
};
const searchBox: CSSProperties = { padding: 1, marginBottom: 10 };
const sidebarTitle: CSSProperties = { fontSize: 12, color: "#aaa" };
const chatItem: CSSProperties = {
  padding: "8px 10px",
  cursor: "pointer",
  position: "relative",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  height: 36,
  fontSize: 14,
};
const menu: CSSProperties = { position: "absolute", right: 0, background: "#343541", padding: 6 };
const main: CSSProperties = { flex: 1, padding: 16 };
const chatBox: CSSProperties = { height: 420, overflowY: "auto", display: "flex", flexDirection: "column", gap: 8 };
const inputBox: CSSProperties = { width: "100%", padding: "10px 40px 10px 10px" };
const mic: CSSProperties = {
  position: "absolute",
  right: 12,
  top: "50%",
  transform: "translateY(-50%)",
  cursor: "pointer",
  padding: 4,
};
const isMobile = typeof window !== "undefined" && window.innerWidth < 480;

