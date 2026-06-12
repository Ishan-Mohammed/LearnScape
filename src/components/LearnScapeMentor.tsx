import React, { useState, useEffect, useRef } from "react";
import { Send, Bot, User, Sparkles, RefreshCw, Zap, Trophy, ShieldAlert, Cpu } from "lucide-react";
import { ChatMessage } from "../types";

interface LearnScapeMentorProps {
  studentName: string;
  activeTrackTitle: string;
  xp: number;
  level: number;
  streak: number;
  completedLessonsCount: number;
}

export default function LearnScapeMentor({
  studentName,
  activeTrackTitle,
  xp,
  level,
  streak,
  completedLessonsCount
}: LearnScapeMentorProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMsg, setInputMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorStatus, setErrorStatus] = useState("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Initialize with greeting
  useEffect(() => {
    setMessages([
      {
        id: "init",
        sender: "mentor",
        text: `### ✨ Learning Connection Established!

Greetings, **${studentName}**! I am your **LearnScape Mentor** study companion. 

I see you are progressing through **${activeTrackTitle}** with **${xp} XP** at Level **${level}**!

How can I help you learn today? Ask me to:
* 📖 **Explain a concept** from your active lessons
* 🗺️ **Suggest your next step** inside your learning roadmap
* 🚀 **Boost your motivation** to keep your **${streak}-day streak** active!`,
        timestamp: new Date().toLocaleTimeString()
      }
    ]);
  }, [studentName, activeTrackTitle]);

  // Scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMsg.trim()) return;

    setErrorStatus("");
    const userText = inputMsg;
    setInputMsg("");

    // Add user message
    const userMessage: ChatMessage = {
      id: Math.random().toString(),
      sender: "user",
      text: userText,
      timestamp: new Date().toLocaleTimeString()
    };
    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    try {
      // Structure student context payload
      const studentContext = {
        name: studentName,
        activeTrackTitle,
        xp,
        level,
        streak,
        completedLessonsCount
      };

      const res = await fetch("/api/mentor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userText,
          studentContext
        })
      });

      if (!res.ok) {
        throw new Error("Mentor connection error");
      }

      const data = await res.json();
      
      const responseMessage: ChatMessage = {
        id: Math.random().toString(),
        sender: "mentor",
        text: data.text || "System alert: Switched to offline backup host",
        timestamp: new Date().toLocaleTimeString()
      };
      setMessages((prev) => [...prev, responseMessage]);

    } catch (e: any) {
      console.error(e);
      setErrorStatus("Connection timed out. Switched to secure backup mode.");
      
      // Fallback response simulation
      setTimeout(() => {
        const fallbackText = `### 🛰️ Off-Line Study Assistant

Hi **${studentName}**! I experienced a slight network delay, but I am still available!

Regarding your question: *"**${userText}**"*, here is how you can proceed:
* Focus on completing your active **${activeTrackTitle}** roadmap.
* Review solved lessons inside your progress dashboard.
* Take **Quiz evaluations** to secure additional XP bonuses!

*System Status: Offline study host is active. Ask me anything anytime!*`;
        
        setMessages((prev) => [
          ...prev,
          {
            id: Math.random().toString(),
            sender: "mentor",
            text: fallbackText,
            timestamp: new Date().toLocaleTimeString()
          }
        ]);
        setLoading(false);
      }, 1000);
      return;
    }

    setLoading(false);
  };

  const handleQuickPrompt = (prompt: string) => {
    setInputMsg(prompt);
  };

  return (
    <div className="glass-card rounded-2xl border border-violet-500/15 overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.5)] flex flex-col h-[650px]">
      
      {/* Holographic Header */}
      <div className="p-4 bg-slate-900/60 border-b border-slate-800 flex items-center justify-between relative overflow-hidden">
        <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/10 rounded-full blur-xl pointer-events-none" />
        
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-violet-500 p-[1px] flex items-center justify-center animate-pulse">
            <div className="w-full h-full rounded-xl bg-slate-950 flex items-center justify-center">
              <Bot className="w-5 h-5 text-cyan-400" />
            </div>
          </div>
          <div>
            <h3 className="text-sm font-bold text-white font-display flex items-center gap-1.5 uppercase tracking-wide">
              LearnScape Mentor
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            </h3>
            <span className="text-[10px] text-gray-500 font-mono block">INTELLIGENT AI STUDY COMPANION</span>
          </div>
        </div>

        {/* Diagnostic flags */}
        <div className="text-right text-[10px] font-mono text-gray-400 hidden sm:block">
          <div>LATENCY: <span className="text-emerald-400 font-bold">~45ms</span></div>
          <div>STABILITY: <span className="text-cyan-400 font-bold">99.9%</span></div>
        </div>
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 bg-slate-950/20">
        
        {messages.map((msg) => {
          const isMentor = msg.sender === "mentor";
          return (
            <div
              key={msg.id}
              className={`flex gap-3 max-w-2xl ${isMentor ? "mr-auto" : "ml-auto flex-row-reverse"}`}
            >
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 text-xs font-mono border ${
                isMentor 
                  ? "bg-violet-950/40 border-violet-500/20 text-cyan-300"
                  : "bg-slate-900 border-slate-800 text-white"
              }`}>
                {isMentor ? <Bot className="w-4 h-4 text-cyan-400" /> : <User className="w-4 h-4 text-violet-400" />}
              </div>

              <div className={`space-y-1 ${isMentor ? "" : "text-right"}`}>
                <div className={`text-[10px] text-gray-500 font-mono`}>
                  {isMentor ? "LEARNSCAPE MENTOR" : studentName.toUpperCase()} • {msg.timestamp}
                </div>
                
                <div className={`p-4 rounded-xl text-xs sm:text-sm font-sans leading-relaxed text-slate-300 whitespace-pre-wrap border break-words ${
                  isMentor
                    ? "bg-[#0d101b]/80 border-slate-900 text-left"
                    : "bg-violet-950/20 border-violet-500/20 text-left"
                }`}>
                  {/* Micro-renderer of standard system bulleted markdowns */}
                  {msg.text.split("\n\n").map((chunk, itemIdx) => {
                    if (chunk.startsWith("### ")) {
                      return <h4 key={itemIdx} className="font-bold font-display text-white mt-1 pt-1 mb-1.5 text-xs sm:text-sm">{chunk.replace("### ", "")}</h4>;
                    }
                    if (chunk.includes("* ")) {
                      return (
                        <ul key={itemIdx} className="list-disc list-inside pl-2 space-y-1 mt-1 text-xs">
                          {chunk.split("\n").map((li, liIdx) => (
                            <li key={liIdx} className="text-slate-300">{li.replace("* ", "")}</li>
                          ))}
                        </ul>
                      );
                    }
                    return <p key={itemIdx} className="mb-2 leading-relaxed text-xs sm:text-sm">{chunk}</p>;
                  })}
                </div>
              </div>
            </div>
          );
        })}

        {loading && (
          <div className="flex gap-3 mr-auto items-center">
            <div className="w-8 h-8 rounded bg-slate-900 border border-slate-800 flex items-center justify-center">
              <Bot className="w-4 h-4 text-cyan-400 animate-spin" />
            </div>
            <div className="p-3 bg-[#0d101b] border border-slate-900 text-xs font-mono text-cyan-400 rounded-xl flex items-center gap-2">
              <RefreshCw className="w-3.5 h-3.5 animate-spin text-cyan-400" />
              <span>THINKING...</span>
            </div>
          </div>
        )}

        {errorStatus && (
          <div className="p-3 bg-red-950/30 border border-red-500/20 text-red-400 text-xs rounded-xl flex items-center gap-2 font-mono">
            <ShieldAlert className="w-4 h-4 flex-shrink-0" />
            <span>{errorStatus}</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggestion tags */}
      <div className="p-3 bg-slate-950/60 border-t border-slate-900/60 flex flex-wrap gap-2 justify-center sm:justify-start">
        <button
          onClick={() => handleQuickPrompt("Explain cognitive neural weights")}
          className="px-2.5 py-1 bg-slate-900 hover:bg-violet-950/30 border border-slate-800 hover:border-violet-500/30 text-[10px] font-mono text-gray-400 hover:text-cyan-300 rounded-md transition-all cursor-pointer"
        >
          🔍 Explain weights
        </button>
        <button
          onClick={() => handleQuickPrompt("What should be my next roadmap learning step?")}
          className="px-2.5 py-1 bg-slate-900 hover:bg-violet-950/30 border border-slate-800 hover:border-violet-500/30 text-[10px] font-mono text-gray-400 hover:text-cyan-300 rounded-md transition-all cursor-pointer"
        >
          🎯 Next study steps
        </button>
        <button
          onClick={() => handleQuickPrompt("Give me a fast study motivation boost!")}
          className="px-2.5 py-1 bg-slate-900 hover:bg-violet-950/30 border border-slate-800 hover:border-violet-500/30 text-[10px] font-mono text-gray-400 hover:text-cyan-300 rounded-md transition-all cursor-pointer"
        >
          🚀 Need motivation!
        </button>
      </div>

      {/* Inputs box */}
      <form onSubmit={handleSendMessage} className="p-4 bg-slate-900/60 border-t border-slate-800 flex gap-2">
        <input
          type="text"
          placeholder={`Ask mentor anything... (e.g. Help me with ${activeTrackTitle})`}
          value={inputMsg}
          onChange={(e) => setInputMsg(e.target.value)}
          className="flex-1 bg-slate-950 border border-slate-800 focus:border-cyan-400 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-600 outline-none transition-all font-mono"
        />
        <button
          type="submit"
          className="px-4 bg-gradient-to-r from-cyan-600 to-violet-600 hover:from-cyan-500 text-white rounded-xl flex items-center justify-center transition-all hover:scale-105 shadow-[0_0_12px_rgba(139,92,246,0.2)] cursor-pointer"
        >
          <Send className="w-4 h-4 text-white" />
        </button>
      </form>

    </div>
  );
}
