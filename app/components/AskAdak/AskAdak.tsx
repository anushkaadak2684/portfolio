"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import styles from "./AskAdak.module.css";

/* --- KNOWLEDGE BASE — Anushka's curated answers --- */
const KNOWLEDGE: Record<string, string> = {
  default:
    "Hi! I'm Adak AI — an AI assistant built around Anushka's work and story. Try one of the quick prompts below, or ask me anything!",
  about:
    "Anushka Adak is a B.Tech student in Computer Science & Business Systems at Techno Main Salt Lake, Kolkata. She's a Software Developer, Public Speaker, and 2× Smart India Hackathon Finalist — driven by full-stack engineering, AI/ML, and building products that solve real-world problems. Her edge lies in bridging deep system-level thinking with business impact.",
  techstack:
    "Anushka's tech ecosystem spans:\n• **Frontend**: React, Next.js, Tailwind CSS, shadcn/ui, Material UI\n• **Backend**: Node.js, Express.js, Java\n• **Databases**: MongoDB, MySQL, Firebase, TiDB Cloud\n• **Languages**: TypeScript, JavaScript, Java, Python, C++, C\n• **Tools**: Git, Vercel, Railway, Render\n• **Core CS**: OOP, DSA, DBMS, OS, AI, ML",
  sih:
    "Anushka competed in the Smart India Hackathon twice — both times as **Solution Architect**. In 2024, she architected **LawAI**, an AI-powered legal assistant for the Madhya Pradesh Police. In 2025, she designed **Nayantra** — a blockchain-driven Direct Benefit Transfer system for PCR & POA Act victims. Both projects were validated at the national level as Finalists.",
  nayantra:
    "**Nayantra** is a secure, blockchain-driven Direct Benefit Transfer (DBT) platform designed to serve victims under the Protection of Civil Rights (PCR) and Protection of Atrocities (POA) Acts. Anushka was the **Solution Architect**, responsible for the entire lifecycle — from mapping systemic DBT leakage patterns to designing smart contract architecture for tamper-proof, transparent disbursement. Selected as a National Finalist at SIH 2025.",
  internships:
    "Yes! Anushka is actively open to internship opportunities — particularly in full-stack development, backend engineering, and AI/ML. She brings national hackathon experience, production-grade project work, and an execution mindset that bridges engineering with real-world impact. Feel free to reach out via the Contact section!",
  ghostproof:
    "**GhostProof** is Anushka's startup idea from **IDE Bootcamp 2026** under Keystone Ventures. It's an AI-powered browser extension that detects and flags fraudulent job listings in real time. The extension analyses salary anomalies, company legitimacy signals, posting patterns, and language markers to generate a **fraud confidence score** — protecting job seekers before they apply. The team was selected as pitch-ready at the bootcamp.",
};

function getResponse(input: string): string {
  const q = input.toLowerCase();
  if (q.includes("about") || q.includes("who") || q.includes("anushka")) return KNOWLEDGE.about;
  if (q.includes("tech") || q.includes("stack") || q.includes("skill") || q.includes("language")) return KNOWLEDGE.techstack;
  if (q.includes("sih") || q.includes("hackathon") || q.includes("smart india")) return KNOWLEDGE.sih;
  if (q.includes("nayantra") || q.includes("blockchain") || q.includes("dbt")) return KNOWLEDGE.nayantra;
  if (q.includes("intern") || q.includes("opportunity") || q.includes("hiring") || q.includes("looking")) return KNOWLEDGE.internships;
  if (q.includes("ghost") || q.includes("entrepreneur") || q.includes("startup") || q.includes("venture") || q.includes("keystone")) return KNOWLEDGE.ghostproof;
  return "That's a great question! For a deeper answer, feel free to reach out directly via the Contact section — Anushka would love to connect. 🚀";
}

const QUICK_PROMPTS = [
  { id: "about", label: "Tell me about Anushka", key: "about" },
  { id: "stack", label: "What is your tech stack?", key: "techstack" },
  { id: "sih", label: "Tell me about your SIH experience", key: "sih" },
  { id: "nayantra", label: "What is Nayantra?", key: "nayantra" },
  { id: "internships", label: "Are you looking for internships?", key: "internships" },
  { id: "ghostproof", label: "Share your entrepreneurship journey", key: "ghostproof" },
];

interface Message {
  id: string;
  role: "user" | "assistant";
  text: string;
  ts: number;
}

export default function AskAdak() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: "init", role: "assistant", text: KNOWLEDGE.default, ts: Date.now() },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  /* Auto-scroll to bottom on new messages */
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  /* Focus input when opened */
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 120);
  }, [open]);

  /* Close on Escape */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const sendMessage = useCallback((text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { id: crypto.randomUUID(), role: "user", text: text.trim(), ts: Date.now() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setTyping(true);
    // Simulated typing delay — feels natural, not instant
    setTimeout(() => {
      const reply = getResponse(text);
      setMessages((prev) => [...prev, { id: crypto.randomUUID(), role: "assistant", text: reply, ts: Date.now() }]);
      setTyping(false);
    }, 900 + Math.random() * 400);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  /* Format bold **text** in responses */
  const formatText = (text: string) =>
    text.split("\n").map((line, i) => (
      <span key={i}>
        {line.split(/(\*\*[^*]+\*\*)/).map((part, j) =>
          part.startsWith("**") && part.endsWith("**") ? (
            <strong key={j}>{part.slice(2, -2)}</strong>
          ) : (
            part
          )
        )}
        {i < text.split("\n").length - 1 && <br />}
      </span>
    ));

  return (
    <>
      {/* ——— FLOATING TRIGGER BUTTON ——— */}
      <button
        id="ask-adak-trigger"
        className={`${styles.trigger} ${open ? styles.triggerOpen : ""}`}
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close Ask Adak AI" : "Open Ask Adak AI"}
        aria-expanded={open}
        aria-controls="ask-adak-panel"
      >
        {open ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M12 2a10 10 0 1 1 0 20 10 10 0 0 1 0-20z" />
            <path d="M8 12h.01M12 12h.01M16 12h.01" strokeWidth="3" />
          </svg>
        )}
        <span className={styles.triggerLabel}>{open ? "Close" : "Ask Adak AI"}</span>
        {!open && <span className={styles.triggerPing} aria-hidden="true" />}
      </button>

      {/* ——— CHAT PANEL ——— */}
      <div
        id="ask-adak-panel"
        className={`${styles.panel} ${open ? styles.panelOpen : ""}`}
        role="dialog"
        aria-label="Ask Adak AI Chat"
        aria-modal="false"
      >
        {/* Panel header */}
        <div className={styles.panelHeader}>
          <div className={styles.headerAvatar} aria-hidden="true">
            <span>A</span>
            <span className={styles.avatarDot} />
          </div>
          <div className={styles.headerMeta}>
            <div className={styles.headerName}>Ask Adak AI</div>
            <div className={styles.headerSub}>Powered by Anushka&apos;s story</div>
          </div>
          <button
            className={styles.closeBtn}
            onClick={() => setOpen(false)}
            aria-label="Close chat"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Quick prompts */}
        <div className={styles.quickPrompts} aria-label="Quick prompts">
          {QUICK_PROMPTS.map((p) => (
            <button
              key={p.id}
              className={styles.quickBtn}
              onClick={() => sendMessage(p.label)}
              id={`quick-prompt-${p.id}`}
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* Messages */}
        <div className={styles.messages} role="log" aria-live="polite" aria-label="Chat messages">
          {messages.map((msg) => (
            <div key={msg.id} className={`${styles.msg} ${msg.role === "user" ? styles.msgUser : styles.msgBot}`}>
              {msg.role === "assistant" && (
                <div className={styles.botAvatar} aria-hidden="true">A</div>
              )}
              <div className={styles.msgBubble}>
                {formatText(msg.text)}
              </div>
            </div>
          ))}
          {typing && (
            <div className={`${styles.msg} ${styles.msgBot}`}>
              <div className={styles.botAvatar} aria-hidden="true">A</div>
              <div className={`${styles.msgBubble} ${styles.typingBubble}`} aria-label="Adak is typing">
                <span className={styles.typingDot} />
                <span className={styles.typingDot} />
                <span className={styles.typingDot} />
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <form className={styles.inputRow} onSubmit={handleSubmit} aria-label="Send a message">
          <input
            ref={inputRef}
            id="ask-adak-input"
            className={styles.input}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me anything about Anushka…"
            autoComplete="off"
            maxLength={300}
            aria-label="Message input"
            disabled={typing}
          />
          <button
            type="submit"
            className={styles.sendBtn}
            disabled={!input.trim() || typing}
            aria-label="Send message"
            id="ask-adak-send-btn"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </button>
        </form>
      </div>

      {/* Backdrop blur on mobile */}
      {open && (
        <div
          className={styles.backdrop}
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
}
