"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Zap, Sparkles } from "lucide-react";

interface Message {
  id: string;
  role: "bot" | "user";
  text: string;
  time: string;
}

const BOT_RESPONSES: Record<string, string> = {
  default: "Great question! Our AI automation experts will craft a custom solution tailored to your business. Would you like to book a free 15-minute discovery call?",
  pricing: "Our services start from $199 for Workflow Automation, $249 for Data Pipelines, and $299 for AI Chatbots. We also offer custom enterprise packages. Want a detailed quote?",
  timeline: "Most projects are delivered within 7–14 business days. Complex enterprise solutions may take 3–4 weeks. We keep you updated every step of the way!",
  automation: "We specialize in n8n-based automations connecting CRM, email, invoicing, Google Sheets, and more. We can save you 20+ hours per week on repetitive tasks!",
  chatbot: "Our RAG-powered chatbots handle customer support 24/7, qualify leads automatically, and integrate with WhatsApp, your website, and CRM — all in one.",
};

function getResponse(input: string): string {
  const lower = input.toLowerCase();
  if (lower.includes("price") || lower.includes("cost") || lower.includes("how much")) return BOT_RESPONSES.pricing;
  if (lower.includes("time") || lower.includes("long") || lower.includes("days") || lower.includes("week")) return BOT_RESPONSES.timeline;
  if (lower.includes("automat") || lower.includes("workflow") || lower.includes("n8n")) return BOT_RESPONSES.automation;
  if (lower.includes("chatbot") || lower.includes("chat") || lower.includes("bot") || lower.includes("support")) return BOT_RESPONSES.chatbot;
  return BOT_RESPONSES.default;
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: "1",
    role: "bot",
    text: "👋 Hi! I'm the AutomateAI assistant. I can answer questions about our services, pricing, or timelines. What would you like to know?",
    time: "just now",
  },
];

const QUICK_PROMPTS = [
  "What services do you offer?",
  "How much does it cost?",
  "How long does it take?",
  "Tell me about chatbots",
];

export default function ChatbotDemoWidget() {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTo({
        top: messagesContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages, isTyping]);

  const now = () => new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  const sendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = { id: Date.now().toString(), role: "user", text: text.trim(), time: now() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "bot",
        text: getResponse(text),
        time: now(),
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <section id="chatbot-demo" style={{ padding: "5rem 1.5rem", backgroundColor: "var(--bg-subtle)" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>

        {/* Two-column layout */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "4rem",
          alignItems: "center",
        }}
        className="chatbot-grid"
        >
          {/* Left: copy */}
          <div>
            <span style={{
              display: "inline-flex", alignItems: "center", gap: "0.5rem",
              fontFamily: "var(--font-heading)", fontSize: "0.8125rem", fontWeight: 600,
              textTransform: "uppercase", letterSpacing: "0.08em", color: "#F56962", marginBottom: "1rem",
            }}>
              <Sparkles size={14} />
              Live Demo
            </span>
            <h2 style={{
              fontFamily: "var(--font-heading)", fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
              fontWeight: 800, color: "var(--navy-deep)", marginBottom: "1rem", lineHeight: 1.2,
            }}>
              See Our AI Bot{" "}
              <span style={{
                background: "linear-gradient(135deg, #F56962 0%, #FCB816 100%)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
              }}>
                In Action
              </span>
            </h2>
            <p style={{ fontSize: "1rem", color: "var(--text-muted)", lineHeight: 1.75, marginBottom: "1.5rem" }}>
              This is a live preview of what we build for your customers — a RAG-powered assistant that answers questions 24/7, qualifies leads, and connects to your CRM automatically.
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.625rem" }}>
              {[
                "Responds in under 2 seconds",
                "Trained on your business data",
                "Integrates with WhatsApp, Website & CRM",
                "Handles 500+ queries per day",
              ].map((feat) => (
                <li key={feat} style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.9375rem", color: "var(--text-body)" }}>
                  <Zap size={15} color="#F56962" strokeWidth={2.5} />
                  {feat}
                </li>
              ))}
            </ul>
          </div>

          {/* Right: chat widget */}
          <div
            id="chat-widget"
            style={{
              backgroundColor: "#fff",
              borderRadius: "20px",
              border: "1px solid var(--border-clean)",
              boxShadow: "0 16px 40px -8px rgba(12, 52, 74, 0.12)",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              height: "480px",
            }}
          >
            {/* Header */}
            <div style={{
              padding: "1rem 1.25rem",
              background: "linear-gradient(135deg, #6347FB 0%, #9E77E0 100%)",
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
            }}>
              <div style={{
                width: "40px", height: "40px", borderRadius: "50%",
                backgroundColor: "rgba(255,255,255,0.2)",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <Bot size={22} color="#fff" />
              </div>
              <div>
                <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.9375rem", color: "#fff" }}>
                  AutomateAI Assistant
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.375rem" }}>
                  <span style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#34d399" }} />
                  <span style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.85)", fontWeight: 500 }}>Online · Typically replies instantly</span>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div ref={messagesContainerRef} style={{ flex: 1, overflowY: "auto", padding: "1rem", display: "flex", flexDirection: "column", gap: "0.875rem" }}>
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  style={{
                    display: "flex",
                    flexDirection: msg.role === "user" ? "row-reverse" : "row",
                    alignItems: "flex-end",
                    gap: "0.5rem",
                  }}
                >
                  {/* Avatar */}
                  <div style={{
                    width: "30px", height: "30px", borderRadius: "50%", flexShrink: 0,
                    backgroundColor: msg.role === "bot" ? "#EEF2FF" : "#FDEEE9",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    {msg.role === "bot"
                      ? <Bot size={16} color="#6347FB" />
                      : <User size={16} color="#F56962" />
                    }
                  </div>
                  {/* Bubble */}
                  <div style={{ maxWidth: "75%" }}>
                    <div style={{
                      padding: "0.625rem 0.875rem",
                      borderRadius: msg.role === "user" ? "14px 14px 4px 14px" : "14px 14px 14px 4px",
                      backgroundColor: msg.role === "user" ? "#6347FB" : "#F8FAFC",
                      color: msg.role === "user" ? "#fff" : "var(--text-body)",
                      fontSize: "0.875rem",
                      lineHeight: 1.6,
                      border: msg.role === "bot" ? "1px solid var(--border-clean)" : "none",
                    }}>
                      {msg.text}
                    </div>
                    <div style={{
                      fontSize: "0.7rem", color: "var(--text-placeholder)",
                      marginTop: "0.25rem",
                      textAlign: msg.role === "user" ? "right" : "left",
                    }}>
                      {msg.time}
                    </div>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div style={{ display: "flex", alignItems: "flex-end", gap: "0.5rem" }}>
                  <div style={{
                    width: "30px", height: "30px", borderRadius: "50%",
                    backgroundColor: "#EEF2FF", display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <Bot size={16} color="#6347FB" />
                  </div>
                  <div style={{
                    padding: "0.625rem 0.875rem",
                    borderRadius: "14px 14px 14px 4px",
                    backgroundColor: "#F8FAFC",
                    border: "1px solid var(--border-clean)",
                    display: "flex", gap: "4px", alignItems: "center",
                  }}>
                    {[0,1,2].map((i) => (
                      <span key={i} style={{
                        width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "#94A3B8",
                        animation: `typingBounce 1s ease-in-out ${i * 0.15}s infinite`,
                      }} />
                    ))}
                  </div>
                </div>
              )}
              {/* Auto-scroll anchor removed */}
            </div>

            {/* Quick prompts */}
            <div style={{ padding: "0.5rem 1rem", display: "flex", gap: "0.375rem", flexWrap: "wrap", borderTop: "1px solid var(--border-clean)" }}>
              {QUICK_PROMPTS.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => sendMessage(prompt)}
                  style={{
                    padding: "0.25rem 0.75rem",
                    backgroundColor: "#EEF2FF", color: "#6347FB",
                    border: "1px solid #D8D0FE",
                    borderRadius: "9999px",
                    fontSize: "0.75rem",
                    fontFamily: "var(--font-heading)", fontWeight: 500,
                    cursor: "pointer", transition: "all 0.15s ease",
                    whiteSpace: "nowrap",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.backgroundColor = "#6347FB";
                    el.style.color = "#fff";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.backgroundColor = "#EEF2FF";
                    el.style.color = "#6347FB";
                  }}
                >
                  {prompt}
                </button>
              ))}
            </div>

            {/* Input */}
            <div style={{
              padding: "0.75rem 1rem",
              borderTop: "1px solid var(--border-clean)",
              display: "flex",
              gap: "0.5rem",
              alignItems: "center",
            }}>
              <input
                id="chat-input"
                type="text"
                placeholder="Type your question..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
                style={{
                  flex: 1, border: "1.5px solid var(--border-clean)", borderRadius: "9999px",
                  padding: "0.5rem 1rem",
                  fontFamily: "var(--font-body)", fontSize: "0.875rem", color: "var(--text-body)",
                  outline: "none", backgroundColor: "#F8FAFC",
                  transition: "border-color 0.2s ease",
                }}
                onFocus={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "#6347FB"; }}
                onBlur={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border-clean)"; }}
              />
              <button
                id="chat-send-btn"
                onClick={() => sendMessage(input)}
                style={{
                  width: "38px", height: "38px", borderRadius: "50%",
                  background: "linear-gradient(135deg, #6347FB 0%, #9E77E0 100%)",
                  border: "none", cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  transition: "all 0.2s ease",
                  flexShrink: 0,
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(1.08)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(1)"; }}
              >
                <Send size={16} color="#fff" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes typingBounce {
          0%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-4px); }
        }
        @media (max-width: 767px) {
          .chatbot-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
