"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Sparkles, Bot, User, Leaf, Loader2, Trash2, Copy, Check, AlertCircle } from "lucide-react";

interface Message { role: "user" | "assistant"; content: string; timestamp: Date; }

const quickQuestions = [
  "Apa manfaat teh daun kelor?",
  "Bagaimana cara membuat wedang jahe?",
  "Herbal apa untuk masuk angin?",
  "Jelaskan jamu kunyit asam",
  "Dosis aman beras kencur?",
  "Wedang uwuh manfaatnya?",
];

export default function AIPage() {
  const [messages, setMessages] = useState<Message[]>([{
    role: "assistant",
    content: `Halo! 👋 Selamat datang di **Pojok Herbal Pintar**.\n\nSaya adalah **Herbal AI** — asisten herbal ahli didukung oleh Gemini LLM. Saya memiliki pengetahuan luas tentang herbal Indonesia, jamu tradisional, wedang herbal, dan tanaman obat.\n\nSilakan tanyakan apa saja:\n• Manfaat dan khasiat herbal\n• Cara membuat dan mengolah herbal\n• Dosis yang aman\n• Herbal untuk kondisi kesehatan\n• Kontraindikasi\n\nContoh: *"Apa manfaat teh daun kelor?"*\n\nApa yang ingin Anda ketahui? 🌿`,
    timestamp: new Date(),
  }]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;
    setError(null);

    const userMessage: Message = { role: "user", content: text.trim(), timestamp: new Date() };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("API Error:", data);
        setError(data.detail || data.error || "Gagal menghubungi AI");
        setMessages((prev) => [...prev, { role: "assistant", content: `⚠️ Error: ${data.detail || data.error || "Gagal menghubungi AI"}. Silakan coba lagi.`, timestamp: new Date() }]);
        return;
      }

      if (data.reply) {
        setMessages((prev) => [...prev, { role: "assistant", content: data.reply, timestamp: new Date() }]);
      } else {
        setMessages((prev) => [...prev, { role: "assistant", content: "Tidak ada respons dari AI. Silakan coba lagi.", timestamp: new Date() }]);
      }
    } catch (err) {
      console.error("Fetch error:", err);
      const errMsg = err instanceof Error ? err.message : "Network error";
      setError(errMsg);
      setMessages((prev) => [...prev, { role: "assistant", content: `⚠️ Gagal terhubung ke server: ${errMsg}`, timestamp: new Date() }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(input); }
  };

  const copyMessage = (content: string, index: number) => {
    navigator.clipboard.writeText(content);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const clearChat = () => {
    setError(null);
    setMessages([{ role: "assistant", content: "Chat direset. Ada yang bisa saya bantu tentang herbal? 🌿", timestamp: new Date() }]);
  };

  const renderMarkdown = (text: string) => {
    return text.split("\n").map((line, i) => {
      let processed = line.replace(/\*\*(.*?)\*\*/g, '<strong class="text-text font-semibold">$1</strong>');
      if (processed.match(/^[•✅❌⚠️💊🌿🍵📋]/)) return <div key={i} className="ml-2 my-0.5" dangerouslySetInnerHTML={{ __html: processed }} />;
      if (processed.trim() === "") return <br key={i} />;
      return <div key={i} dangerouslySetInnerHTML={{ __html: processed }} />;
    });
  };

  return (
    <div className="min-h-screen pt-20 pb-0 flex flex-col bg-nature">
      <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full px-4">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-6">
          <div className="inline-flex items-center gap-3 px-5 py-3 bg-white/70 backdrop-blur-xl rounded-2xl border border-border shadow-lg shadow-primary/5">
            <motion.div animate={{ rotate: [0, 5, -5, 0] }} transition={{ duration: 4, repeat: Infinity }} className="w-10 h-10 bg-gradient-to-br from-primary to-emerald rounded-xl flex items-center justify-center shadow-lg glow-green">
              <Sparkles className="w-5 h-5 text-white" />
            </motion.div>
            <div className="text-left">
              <h1 className="text-lg font-bold text-text">Herbal AI</h1>
              <p className="text-xs text-primary font-medium">Generative AI · Gemini LLM</p>
            </div>
            <button onClick={clearChat} className="ml-4 p-2 text-text-muted hover:text-rose hover:bg-rose/10 rounded-xl transition-colors" title="Reset"><Trash2 className="w-4 h-4" /></button>
          </div>
        </motion.div>

        {/* Error banner */}
        <AnimatePresence>
          {error && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="mb-4 px-4 py-3 bg-warm/10 border border-warm/20 rounded-xl flex items-center gap-2 text-sm text-warm">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
              <button onClick={() => setError(null)} className="ml-auto text-warm/60 hover:text-warm">✕</button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto space-y-4 py-4" style={{ maxHeight: "calc(100vh - 240px)" }}>
          <AnimatePresence>
            {messages.map((msg, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`flex items-start gap-3 max-w-[85%] ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
                  <motion.div whileHover={{ scale: 1.1 }} className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md ${msg.role === "user" ? "bg-gradient-to-br from-accent to-warm" : "bg-gradient-to-br from-primary to-emerald"}`}>
                    {msg.role === "user" ? <User className="w-4 h-4 text-white" /> : <Bot className="w-4 h-4 text-white" />}
                  </motion.div>
                  <div className={`relative px-4 py-3 ${msg.role === "user" ? "chat-bubble-user" : "chat-bubble-ai"}`}>
                    <div className="text-sm leading-relaxed space-y-1">{renderMarkdown(msg.content)}</div>
                    {msg.role === "assistant" && (
                      <button onClick={() => copyMessage(msg.content, index)} className="absolute -bottom-8 right-0 p-1 text-text-muted hover:text-primary transition-colors">
                        {copiedIndex === index ? <Check className="w-3.5 h-3.5 text-emerald" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          {isLoading && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-emerald text-white flex items-center justify-center shadow-md"><Bot className="w-4 h-4" /></div>
              <div className="chat-bubble-ai px-4 py-3"><div className="flex items-center gap-2"><Loader2 className="w-4 h-4 text-primary animate-spin" /><span className="text-sm text-text-secondary">Herbal AI sedang berpikir...</span></div></div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Questions */}
        {messages.length <= 1 && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="py-4">
            <p className="text-xs text-text-muted text-center mb-3 font-medium">💡 Coba tanyakan:</p>
            <div className="flex flex-wrap justify-center gap-2">
              {quickQuestions.map((q) => (
                <motion.button key={q} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={() => sendMessage(q)} className="px-4 py-2.5 bg-white/70 backdrop-blur-sm border border-border rounded-xl text-xs text-text-secondary hover:text-primary hover:border-primary/30 transition-all shadow-sm">{q}</motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Input */}
        <div className="sticky bottom-0 bg-bg/80 backdrop-blur-2xl pt-4 pb-6 border-t border-border">
          <div className="flex items-end gap-3 bg-white/80 backdrop-blur-sm border border-border rounded-2xl p-3 shadow-sm">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-accent text-white flex items-center justify-center flex-shrink-0 shadow-md"><Leaf className="w-4 h-4" /></div>
            <textarea value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={handleKeyDown} placeholder="Tanyakan tentang herbal, jamu, atau wedang..." rows={1} className="flex-1 resize-none bg-transparent text-sm text-text placeholder:text-text-muted focus:outline-none max-h-32 py-2" style={{ minHeight: "36px" }} />
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => sendMessage(input)} disabled={!input.trim() || isLoading} className={`p-3 rounded-xl transition-all ${input.trim() && !isLoading ? "bg-gradient-to-r from-primary to-emerald text-white shadow-lg shadow-primary/20" : "bg-bg border border-border text-text-muted"}`}>
              <Send className="w-4 h-4" />
            </motion.button>
          </div>
          <p className="text-[10px] text-text-muted text-center mt-2">Herbal AI menggunakan Gemini LLM. Informasi berdasarkan panduan Kemenkes RI.</p>
        </div>
      </div>
    </div>
  );
}
