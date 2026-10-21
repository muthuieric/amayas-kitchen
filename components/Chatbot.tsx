"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Bot,
  ChevronRight,
  MessageCircle,
  RotateCcw,
  Send,
  Sparkles,
  X,
} from "lucide-react";
import { useCart } from "@/lib/cart-context";
import {
  getChatbotResponse,
  type BotResponse,
  type CartContextSummary,
} from "@/lib/chatbot-engine";

interface Message {
  id: string;
  sender: "bot" | "user";
  text: string;
  action?: "open_reservations" | "open_whatsapp";
  actionLabel?: string;
  suggestions?: string[];
  timestamp: string;
}

const INITIAL_SUGGESTIONS = [
  "🕒 Opening hours",
  "📍 Where are you located?",
  "🛵 How does delivery work?",
  "📅 Book a table",
];

function formatTime(date: Date = new Date()): string {
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export function Chatbot() {
  const router = useRouter();
  const { items, subtotal, itemCount, whatsappUrl } = useCart();

  const [isOpen, setIsOpen] = useState(false);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showCallout, setShowCallout] = useState(true);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "initial-greeting",
      sender: "bot",
      text: "Jambo na Karibu Amayas Swahili Kitchen! 🍛\n\nI am **Amaya Assistant**. Need help with our location, opening hours, or table reservations? Ask me anything!",
      suggestions: INITIAL_SUGGESTIONS,
      timestamp: formatTime(),
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto scroll to bottom of messages
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping, isOpen]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setShowCallout(false);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 150);
    }
  }, [isOpen]);

  // Escape key closes chatbot
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const handleSendMessage = (textToSend?: string) => {
    const query = (textToSend ?? inputText).trim();
    if (!query) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: query,
      timestamp: formatTime(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText("");
    setIsTyping(true);

    const cartSummary: CartContextSummary = {
      itemCount,
      subtotal,
      items: items.map((i) => ({
        name: i.product.name,
        quantity: i.quantity,
        price: i.product.price,
      })),
    };

    setTimeout(() => {
      const response: BotResponse = getChatbotResponse(query, cartSummary);

      const botMessage: Message = {
        id: `bot-${Date.now()}`,
        sender: "bot",
        text: response.text,
        action: response.action as any,
        actionLabel: response.actionLabel,
        suggestions: response.suggestions,
        timestamp: formatTime(),
      };

      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 450);
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: `reset-${Date.now()}`,
        sender: "bot",
        text: "Conversation refreshed! How can I assist you today with Amayas restaurant details?",
        suggestions: INITIAL_SUGGESTIONS,
        timestamp: formatTime(),
      },
    ]);
  };

  const handleActionClick = (action?: string) => {
    if (!action) return;
    if (action === "open_reservations") {
      router.push("/reservations");
      setIsOpen(false);
    } else if (action === "open_whatsapp") {
      window.open(whatsappUrl, "_blank");
    }
  };

  const renderFormattedText = (text: string) => {
    return text.split("\n").map((line, lineIdx) => {
      if (!line.trim()) {
        return <div key={lineIdx} className="h-2" />;
      }
      const parts = line.split(/(\*\*.*?\*\*)/g);
      return (
        <p key={lineIdx} className="leading-relaxed">
          {parts.map((part, partIdx) => {
            if (part.startsWith("**") && part.endsWith("**")) {
              return (
                <strong key={partIdx} className="font-extrabold text-slate-900">
                  {part.slice(2, -2)}
                </strong>
              );
            }
            return part;
          })}
        </p>
      );
    });
  };

  const lastBotMessage = [...messages].reverse().find((m) => m.sender === "bot");
  const activeSuggestions = lastBotMessage?.suggestions ?? INITIAL_SUGGESTIONS;

  return (
    <>
      {/* Floating Launcher / Trigger */}
      <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40 flex items-end gap-3">
        {showCallout && !isOpen && (
          <div className="hidden sm:flex items-center gap-2 rounded-2xl bg-white px-3.5 py-2.5 shadow-xl border border-orange-100 text-xs font-semibold text-slate-800 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <span className="flex h-2 w-2 rounded-full bg-orange-500 animate-ping" />
            <span>Habari! Have a question about our restaurant? Ask me! 🍛</span>
            <button
              onClick={() => setShowCallout(false)}
              className="ml-1 text-slate-400 hover:text-slate-600"
              aria-label="Dismiss message"
            >
              <X size={14} />
            </button>
          </div>
        )}

        <button
          onClick={() => setIsOpen((prev) => !prev)}
          type="button"
          aria-label={isOpen ? "Close Amaya Assistant chat" : "Open Amaya Assistant chat"}
          aria-expanded={isOpen}
          className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-tr from-red-700 via-orange-600 to-orange-500 text-white shadow-lifted transition-all hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-orange-300"
        >
          {isOpen ? (
            <X size={26} className="transition-transform group-hover:rotate-90 duration-200" />
          ) : (
            <>
              <MessageCircle size={28} className="transition-transform group-hover:scale-110" />
              <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-4 w-4 bg-orange-500 border-2 border-white" />
              </span>
            </>
          )}
        </button>
      </div>

      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-xs sm:hidden"
          aria-hidden="true"
        />
      )}

      {isOpen && (
        <div
          role="dialog"
          aria-label="Amaya Assistant chat window"
          className="fixed inset-x-3 bottom-22 top-16 sm:top-auto sm:inset-auto sm:bottom-24 sm:right-6 z-50 flex flex-col w-auto sm:w-[410px] h-auto sm:h-[570px] max-h-[85vh] rounded-3xl bg-white shadow-2xl border border-gray-200/90 overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        >
          {/* Header */}
          <div className="flex h-16 shrink-0 items-center justify-between border-b border-gray-100 bg-gradient-to-r from-slate-900 to-slate-800 px-4 sm:px-5 text-white">
            <div className="flex items-center gap-3">
              <div className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full border border-white/20 bg-white shadow-sm ring-2 ring-white/20">
                <Image
                  src="/logo.png"
                  alt="Amayas Swahili Kitchen Logo"
                  fill
                  className="object-cover"
                />
                <span className="absolute bottom-0 right-0 z-10 h-2.5 w-2.5 rounded-full bg-emerald-400 ring-1 ring-slate-900" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-display text-sm sm:text-base font-bold tracking-tight">
                    Amaya Assistant
                  </h3>
                  <span className="rounded-full bg-orange-500/20 px-1.5 py-0.2 text-[10px] font-bold text-orange-300">
                    AI
                  </span>
                </div>
                <p className="text-[11px] text-slate-300">Online • Kilimani Kitchen</p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handleResetChat}
                type="button"
                title="Restart conversation"
                aria-label="Restart conversation"
                className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-300 transition-colors hover:bg-white/10 hover:text-white"
              >
                <RotateCcw size={15} />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                type="button"
                title="Close chat"
                aria-label="Close chat"
                className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-300 transition-colors hover:bg-white/10 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Messages Stream */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/60">
            {messages.map((message) => {
              const isBot = message.sender === "bot";
              return (
                <div
                  key={message.id}
                  className={`flex flex-col ${isBot ? "items-start" : "items-end"} gap-1.5`}
                >
                  <div
                    className={`rounded-2xl px-4 py-3 text-xs sm:text-sm shadow-xs ${
                      isBot
                        ? "bg-white text-slate-800 rounded-bl-xs border border-gray-200/80 max-w-[90%]"
                        : "bg-orange-500 text-white rounded-br-xs max-w-[85%]"
                    }`}
                  >
                    <div className="space-y-1">{renderFormattedText(message.text)}</div>

                    {message.action && message.actionLabel && (
                      <div className="mt-3 pt-2 border-t border-gray-100">
                        <button
                          onClick={() => handleActionClick(message.action)}
                          type="button"
                          className="inline-flex w-full items-center justify-center gap-1.5 rounded-xl bg-slate-900 px-3.5 py-2 text-xs font-bold text-white transition-all hover:bg-slate-800 active:scale-98"
                        >
                          <span>{message.actionLabel}</span>
                          <ChevronRight size={14} />
                        </button>
                      </div>
                    )}
                  </div>
                  <span className="px-1 text-[10px] text-slate-400">{message.timestamp}</span>
                </div>
              );
            })}

            {isTyping && (
              <div className="flex items-center gap-2 rounded-2xl rounded-bl-xs bg-white border border-gray-200/80 px-4 py-3 w-fit shadow-xs">
                <span className="flex h-2 w-2 rounded-full bg-orange-400 animate-bounce [animation-delay:-0.3s]" />
                <span className="flex h-2 w-2 rounded-full bg-orange-400 animate-bounce [animation-delay:-0.15s]" />
                <span className="flex h-2 w-2 rounded-full bg-orange-400 animate-bounce" />
                <span className="text-xs text-slate-400 ml-1">Amaya is typing...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestions Chips */}
          <div className="border-t border-gray-100 bg-white px-3 py-2">
            <div className="flex gap-1.5 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {activeSuggestions.slice(0, 5).map((chip, idx) => (
                <button
                  key={`${chip}-${idx}`}
                  onClick={() => handleSendMessage(chip)}
                  type="button"
                  className="shrink-0 rounded-full border border-orange-200 bg-orange-50/60 px-3 py-1 text-xs font-semibold text-slate-700 transition-all hover:bg-orange-100 hover:text-orange-900 active:scale-95"
                >
                  {chip}
                </button>
              ))}
            </div>
          </div>

          {/* Input Footer */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2 border-t border-gray-100 bg-white p-3 sm:p-3.5"
          >
            <input
              ref={inputRef}
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask about hours, location, reservations..."
              className="flex-1 rounded-xl border border-gray-200 bg-gray-50/80 px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:border-orange-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-200"
            />
            <button
              type="submit"
              disabled={!inputText.trim()}
              aria-label="Send message"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-500 text-white shadow-sm transition-all hover:bg-orange-600 disabled:opacity-40 disabled:hover:bg-orange-500 active:scale-95"
            >
              <Send size={16} />
            </button>
          </form>
        </div>
      )}
    </>
  );
}