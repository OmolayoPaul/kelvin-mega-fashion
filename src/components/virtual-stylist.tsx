import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { waLink } from "./site";

type ChatMsg = {
  role: "user" | "assistant";
  text?: string;
  image?: string; // data URL
};

const WELCOME: ChatMsg = {
  role: "assistant",
  text: "Welcome to Kelvin Mega Fashion House. I'm your private stylist — tell me the occasion you're dressing for, or share a photo (yourself, an outfit, or an inspiration). I'll guide you to the right piece.",
};

const QUICK_PROMPTS = [
  "Styling for a traditional wedding",
  "A charcoal suit for board meetings",
  "What should I wear to an owambe?",
];

export function VirtualStylist() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMsg[]>([WELCOME]);
  const [input, setInput] = useState("");
  const [pendingImage, setPendingImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  async function send() {
    const text = input.trim();
    if (!text && !pendingImage) return;
    if (loading) return;

    const userMsg: ChatMsg = { role: "user", text: text || undefined, image: pendingImage ?? undefined };
    const next = [...messages, userMsg];
    setMessages(next);
    setInput("");
    setPendingImage(null);
    setLoading(true);
    setError(null);

    try {
      const payload = next
        .filter((m) => m !== WELCOME || next.indexOf(m) !== 0)
        .map((m) => ({ role: m.role, text: m.text, image: m.image }));

      const res = await fetch("/api/stylist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: payload }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error ?? "The stylist is briefly unavailable.");
      }
      setMessages((m) => [...m, { role: "assistant", text: data.reply }]);
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Something went wrong.";
      setError(msg);
    } finally {
      setLoading(false);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }

  async function onPickImage(file: File) {
    if (!file.type.startsWith("image/")) return;
    if (file.size > 4 * 1024 * 1024) {
      setError("Please share an image under 4 MB.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => setPendingImage(reader.result as string);
    reader.readAsDataURL(file);
  }

  function lastAssistant(): string {
    for (let i = messages.length - 1; i >= 0; i--) {
      if (messages[i].role === "assistant" && messages[i].text) return messages[i].text!;
    }
    return "";
  }

  const showActions = messages.length > 2 && messages[messages.length - 1].role === "assistant" && !loading;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {open && (
        <div className="w-[min(94vw,400px)] h-[min(78vh,620px)] flex flex-col rounded-2xl border border-[var(--gold)]/30 bg-[#0A0A0A] shadow-[0_20px_70px_-10px_rgba(212,175,55,0.35)] overflow-hidden animate-fade-up">
          {/* Header */}
          <div className="px-5 py-4 border-b border-[var(--gold)]/15 bg-gradient-to-r from-[#1a1408] to-[#0A0A0A] flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#F1E2B3] to-[#AA7C11] grid place-items-center text-black font-display font-semibold">
              KM
            </div>
            <div className="flex-1">
              <div className="font-display text-[var(--cream)] tracking-wide">Kelvin's Virtual Stylist</div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-[var(--gold)]/70">Private Menswear Consultant</div>
            </div>
            <button onClick={() => setOpen(false)} aria-label="Close stylist" className="text-[var(--cream)]/60 hover:text-[var(--cream)] text-xl leading-none">×</button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3 text-sm">
            {messages.map((m, i) => (
              <div key={i} className={m.role === "user" ? "flex justify-end" : "flex justify-start"}>
                <div className={
                  m.role === "user"
                    ? "max-w-[80%] bg-gradient-to-br from-[#F1E2B3] to-[#AA7C11] text-black rounded-2xl rounded-br-sm px-3 py-2 shadow"
                    : "max-w-[85%] text-[var(--cream)]/90 leading-relaxed"
                }>
                  {m.image && (
                    <img src={m.image} alt="shared" className="rounded-lg mb-2 max-h-48 object-cover" />
                  )}
                  {m.text && <div className="whitespace-pre-wrap">{m.text}</div>}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex items-center gap-1 text-[var(--gold)]/70 text-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-current animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-1.5 h-1.5 rounded-full bg-current animate-bounce" style={{ animationDelay: "120ms" }} />
                <span className="w-1.5 h-1.5 rounded-full bg-current animate-bounce" style={{ animationDelay: "240ms" }} />
                <span className="ml-2 italic">styling your look…</span>
              </div>
            )}
            {error && <div className="text-xs text-red-300/80">{error}</div>}

            {messages.length === 1 && (
              <div className="pt-2 flex flex-wrap gap-2">
                {QUICK_PROMPTS.map((q) => (
                  <button
                    key={q}
                    onClick={() => setInput(q)}
                    className="text-[11px] uppercase tracking-wider border border-[var(--gold)]/30 text-[var(--cream)]/80 rounded-full px-3 py-1 hover:bg-[var(--gold)]/10"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            {showActions && (
              <div className="pt-2 flex flex-wrap gap-2">
                <Link
                  to="/contact"
                  onClick={() => setOpen(false)}
                  className="text-[11px] uppercase tracking-wider bg-gradient-to-r from-[#F1E2B3] to-[#AA7C11] text-black rounded-full px-3 py-1.5 font-medium"
                >
                  Book this look
                </Link>
                <a
                  href={waLink(`Hello Kelvin Mega Fashion, your stylist recommended:\n\n${lastAssistant().slice(0, 600)}\n\nI'd like to proceed.`)}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[11px] uppercase tracking-wider border border-[var(--gold)]/40 text-[var(--cream)] rounded-full px-3 py-1.5 hover:bg-[var(--gold)]/10"
                >
                  Continue on WhatsApp
                </a>
              </div>
            )}
          </div>

          {/* Composer */}
          <div className="border-t border-[var(--gold)]/15 p-3 bg-black/40">
            {pendingImage && (
              <div className="mb-2 flex items-center gap-2">
                <img src={pendingImage} alt="" className="w-12 h-12 rounded object-cover border border-[var(--gold)]/30" />
                <button onClick={() => setPendingImage(null)} className="text-xs text-[var(--cream)]/60 hover:text-[var(--cream)]">Remove</button>
              </div>
            )}
            <div className="flex items-end gap-2">
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) onPickImage(f);
                  e.target.value = "";
                }}
              />
              <button
                onClick={() => fileRef.current?.click()}
                aria-label="Upload photo"
                className="shrink-0 w-9 h-9 rounded-full border border-[var(--gold)]/30 text-[var(--gold)] grid place-items-center hover:bg-[var(--gold)]/10"
                title="Share a photo"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
              </button>
              <textarea
                ref={inputRef}
                rows={1}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    send();
                  }
                }}
                placeholder="Describe the occasion…"
                className="flex-1 resize-none bg-transparent border border-[var(--gold)]/20 rounded-xl px-3 py-2 text-sm text-[var(--cream)] placeholder:text-[var(--cream)]/40 focus:outline-none focus:border-[var(--gold)]/50 max-h-32"
              />
              <button
                onClick={send}
                disabled={loading || (!input.trim() && !pendingImage)}
                className="shrink-0 w-9 h-9 rounded-full bg-gradient-to-br from-[#F1E2B3] to-[#AA7C11] text-black grid place-items-center disabled:opacity-40"
                aria-label="Send"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M2 21l21-9L2 3v7l15 2-15 2z"/></svg>
              </button>
            </div>
          </div>
        </div>
      )}

      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="group w-16 h-16 rounded-full bg-gradient-to-br from-[#F1E2B3] to-[#AA7C11] grid place-items-center text-black shadow-[0_10px_40px_-10px_rgba(212,175,55,0.7)] hover:scale-110 transition relative"
          aria-label="Open virtual stylist"
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 7l-6-4-2 3-2-3-6 4 3 5v8h10v-8l3-5z"/>
          </svg>
          <span className="absolute -top-2 -right-2 bg-black border border-[var(--gold)]/40 text-[var(--gold)] text-[9px] uppercase tracking-widest px-1.5 py-0.5 rounded-full">AI</span>
        </button>
      )}
    </div>
  );
}
