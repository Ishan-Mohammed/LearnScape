import React, { useState } from "react";
import { Track, Module, Lesson, StudentActivityLog } from "../types";
import { Settings, Plus, Users, Terminal, ClipboardList, Check, Sparkles, TrendingUp, Cpu, Server } from "lucide-react";
import { motion } from "motion/react";

interface AdminPanelProps {
  tracks: Track[];
  activityLogs: StudentActivityLog[];
  onAddTrack: (newTrack: Track) => void;
  onAddActivityLog: (action: string, xp?: number) => void;
}

export default function AdminPanel({ tracks, activityLogs, onAddTrack, onAddActivityLog }: AdminPanelProps) {
  const [activeTab, setActiveTab] = useState<"tracks" | "students" | "logs">("tracks");

  // Track Creation Inputs State
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [difficulty, setDifficulty] = useState<"Beginner" | "Intermediate" | "Advanced">("Beginner");
  const [duration, setDuration] = useState("");
  const [skills, setSkills] = useState("");
  const [xpReward, setXpReward] = useState(1000);
  const [successMsg, setSuccessMsg] = useState("");

  const handleCreateTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !desc || !duration) {
      alert("All parameters are required.");
      return;
    }

    const skillsArray = skills.split(",").map((s) => s.trim()).filter(Boolean);
    
    // Construct a beautiful mock track
    const newTrack: Track = {
      id: `custom-track-${Date.now()}`,
      title,
      description: desc,
      difficulty,
      duration,
      skillsCovered: skillsArray.length > 0 ? skillsArray : ["Machine Learning", "System Optimization"],
      xpReward: Number(xpReward),
      modules: [
        // Seed default Module 1 for the custom track!
        {
          id: `custom-mod-${Date.now()}-1`,
          trackId: `custom-track-${Date.now()}`,
          title: "Introduction to Custom Architecture",
          description: "Initialize your understanding of custom designed platforms, layouts, and algorithms.",
          order: 1,
          xpReward: 300,
          lessons: [
            { id: `c-l-${Date.now()}-1`, moduleId: `custom-mod-${Date.now()}-1`, title: "Syntax Foundations", content: "Learn the primitive elements of custom modules.", durationMin: 3, xpReward: 25 },
            { id: `c-l-${Date.now()}-2`, moduleId: `custom-mod-${Date.now()}-1`, title: "Logic Branches", content: "Optimize your decision-making structures code.", durationMin: 4, xpReward: 25 },
            { id: `c-l-${Date.now()}-3`, moduleId: `custom-mod-${Date.now()}-1`, title: "Loop Execution", content: "Build highly efficient recursive algorithms.", durationMin: 3, xpReward: 25 },
            { id: `c-l-${Date.now()}-4`, moduleId: `custom-mod-${Date.now()}-1`, title: "Diagnostic Checks", content: "Inspect runtime parameters inside complex arrays.", durationMin: 5, xpReward: 25 },
            { id: `c-l-${Date.now()}-5`, moduleId: `custom-mod-${Date.now()}-1`, title: "Production Compile", content: "Trigger standalone system distributions in memory.", durationMin: 4, xpReward: 25 }
          ],
          quiz: {
            moduleId: `custom-mod-${Date.now()}-1`,
            xpBonus: 80,
            questions: [
              { id: "cq-1", question: "What is the primary compilation model of custom logic?", options: ["Static variables injection", "Asynchronous loop resolution", "Null references ignore", "Dynamic interpretation"], correctAnswerIndex: 1 }
            ]
          }
        }
      ]
    };

    onAddTrack(newTrack);
    onAddActivityLog(`Admin created a new learning track: "${title}"`, 50);

    setSuccessMsg(`Pathway "${title}" compile diagnostics passed. Seeding Module 1.`);

    // Reset inputs
    setTitle("");
    setDesc("");
    setDuration("");
    setSkills("");
    
    setTimeout(() => {
      setSuccessMsg("");
    }, 4000);
  };

  // Pre-seed some mock students list
  const mockStudents = [
    { name: "Alyx Vance", track: "Software Development", xp: 1250, level: 2, streak: 5, activeNode: "SEC 1: AI-Augmented Dev" },
    { name: "James Holden", track: "AI Automation", xp: 2150, level: 3, streak: 12, activeNode: "SEC 2: Autonomous Agent Swarms" },
    { name: "Naomi Nagata", track: "Software Development", xp: 4200, level: 5, streak: 18, activeNode: "SEC 3: Serverless Compute" },
    { name: "Elvi Okoye", track: "AI Foundations", xp: 600, level: 1, streak: 2, activeNode: "SEC 1: Intro to Deep Learning" },
    { name: "Miller Ceres", track: "AI Content Creation", xp: 150, level: 1, streak: 1, activeNode: "SEC 1: Image Diffusion" }
  ];

  return (
    <div className="space-y-8">
      
      {/* Upper header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-900 pb-4">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight font-display flex items-center gap-2">
            Admin Command Gateway
            <span className="text-xs text-amber-400 font-mono bg-amber-950/20 px-2 py-0.5 rounded border border-amber-500/20">ROOT CREDENTIAL PRIVILEGES</span>
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            Re-architect tracks, audit active cadet accounts, monitor compile events log in real-time.
          </p>
        </div>

        {/* Console stats widgets */}
        <div className="flex gap-4 font-mono text-xs text-gray-400">
          <div className="flex items-center gap-1.5"><Server className="w-3.5 h-3.5 text-emerald-400" /> SERVER: <span className="text-emerald-400 font-bold">ONLINE</span></div>
          <span className="text-slate-800">|</span>
          <div className="flex items-center gap-1.5"><Cpu className="w-3.5 h-3.5 text-cyan-400" /> CORES: <span className="text-cyan-400 font-bold">8/8</span></div>
        </div>
      </div>

      {/* Mode selectors */}
      <div className="flex bg-slate-900/40 p-1 rounded-lg border border-slate-800/80 max-w-sm font-mono text-xs">
        <button
          onClick={() => setActiveTab("tracks")}
          className={`flex-1 py-2 text-center rounded transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            activeTab === "tracks" ? "bg-violet-600 text-white font-bold" : "text-gray-400 hover:text-white"
          }`}
        >
          <Plus className="w-3.5 h-3.5" />
          <span>CURRICULUM ARCHITECT</span>
        </button>
        <button
          onClick={() => setActiveTab("students")}
          className={`flex-1 py-2 text-center rounded transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            activeTab === "students" ? "bg-violet-600 text-white font-bold" : "text-gray-400 hover:text-white"
          }`}
        >
          <Users className="w-3.5 h-3.5" />
          <span>CADETS TELEMETRY</span>
        </button>
        <button
          onClick={() => setActiveTab("logs")}
          className={`flex-1 py-2 text-center rounded transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            activeTab === "logs" ? "bg-violet-600 text-white font-bold" : "text-gray-400 hover:text-white"
          }`}
        >
          <Terminal className="w-3.5 h-3.5" />
          <span>CYBER LOGS</span>
        </button>
      </div>

      {/* Tab A: Track Builder / Curriculum builder form */}
      {activeTab === "tracks" && (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3 glass-card rounded-2xl p-6 border border-slate-800 space-y-6">
            <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider">Forge Dynamic Learning Syllabus</h3>

            {successMsg && (
              <div className="p-3 bg-emerald-950/40 border border-emerald-500/30 rounded-lg text-emerald-400 text-xs font-mono flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 animate-bounce" />
                <span>{successMsg}</span>
              </div>
            )}

            <form onSubmit={handleCreateTrack} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-mono text-gray-500">Track Name / Title</label>
                <input
                  type="text"
                  placeholder="e.g. LLM Diagnostics & Fine Tuning"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-slate-950/80 border border-slate-800 rounded-lg p-2.5 text-xs text-white outline-none focus:border-violet-500 font-mono"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] uppercase font-mono text-gray-500">Track Estimated Duration</label>
                <input
                  type="text"
                  placeholder="e.g. 15 hours"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="w-full bg-slate-950/80 border border-slate-800 rounded-lg p-2.5 text-xs text-white outline-none focus:border-violet-500 font-mono"
                  required
                />
              </div>

              <div className="md:col-span-2 space-y-1">
                <label className="text-[10px] uppercase font-mono text-gray-500">Curriculum Objective Description</label>
                <textarea
                  placeholder="Disclose the primary trajectory goals of this dynamic learning custom pathway..."
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  className="w-full bg-slate-950/80 border border-slate-800 rounded-lg p-2.5 text-xs text-white outline-none focus:border-violet-500 font-mono h-20 resize-none animate-none"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] uppercase font-mono text-gray-500">Cognitive Difficulty Level</label>
                <select
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value as any)}
                  className="w-full bg-slate-950/80 border border-slate-800 rounded-lg p-2.5 text-xs text-white outline-none focus:border-violet-500 font-mono"
                >
                  <option value="Beginner">Beginner Tier</option>
                  <option value="Intermediate">Intermediate Tier</option>
                  <option value="Advanced">Advanced Tier</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] uppercase font-mono text-gray-500">XP Completion Bonus Reward</label>
                <input
                  type="number"
                  value={xpReward}
                  onChange={(e) => setXpReward(Number(e.target.value))}
                  className="w-full bg-slate-950/80 border border-slate-800 rounded-lg p-2.5 text-xs text-white outline-none focus:border-violet-500 font-mono"
                  required
                />
              </div>

              <div className="md:col-span-2 space-y-1">
                <label className="text-[10px] uppercase font-mono text-gray-500">Skills Covered (Comma Separated)</label>
                <input
                  type="text"
                  placeholder="e.g. Backpropagation, Embeddings, Hyperparameters, PyTorch"
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                  className="w-full bg-slate-950/80 border border-slate-800 rounded-lg p-2.5 text-xs text-white outline-none focus:border-violet-500 font-mono"
                />
              </div>

              <button
                type="submit"
                className="md:col-span-2 mt-4 py-3 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 text-white font-mono text-xs font-bold rounded-xl flex items-center justify-center gap-2 tracking-wider shadow-[0_0_15px_rgba(139,92,246,0.3)] cursor-pointer hover:scale-[1.01] transition-all"
              >
                <Plus className="w-4 h-4 text-white" />
                <span>COMPILE & PUBLISH SYLLABUS PATHWAY</span>
              </button>
            </form>
          </div>

          {/* Right quick stats */}
          <div className="lg:col-span-1 glass-card rounded-2xl p-5 border border-slate-800 space-y-4 font-mono text-xs">
            <h4 className="text-[11px] uppercase tracking-wider text-gray-500 font-bold block">Active Registries</h4>
            
            <div className="space-y-3">
              <div className="p-3 bg-slate-950 rounded border border-slate-900 flex justify-between">
                <span className="text-gray-500">SYS_PATHWAYS:</span>
                <span className="text-white font-bold">{tracks.length}</span>
              </div>
              <div className="p-3 bg-slate-950 rounded border border-slate-900 flex justify-between">
                <span className="text-gray-500">SYS_MODULES:</span>
                <span className="text-white font-bold">
                  {tracks.reduce((acc, t) => acc + t.modules.length, 0)}
                </span>
              </div>
              <div className="p-3 bg-slate-950 rounded border border-slate-900 flex justify-between">
                <span className="text-gray-500">SYS_LESSONS:</span>
                <span className="text-white font-bold">
                  {tracks.reduce((acc, t) => acc + t.modules.reduce((a, m) => a + m.lessons.length, 0), 0)}
                </span>
              </div>
            </div>

            <div className="p-3 bg-violet-950/20 border border-violet-500/10 text-violet-400 text-[10px] rounded leading-relaxed">
              *Compilation generates static syllabus nodes automatically, including 5 pre-assigned micro-lessons with a dummy evaluation check.
            </div>
          </div>
        </div>
      )}

      {/* Tab B: Student monitoring list (Telemetry Scanner) */}
      {activeTab === "students" && (
        <div className="glass-card rounded-2xl border border-slate-800 p-6 overflow-x-auto">
          <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider mb-4">Active Cadet Accounts Telemetry</h3>
          
          <table className="w-full font-mono text-xs text-left text-slate-300">
            <thead>
              <tr className="border-b border-slate-800 text-gray-500 text-[10px] uppercase">
                <th className="py-3 px-4">Cadet Student Name</th>
                <th className="py-3 px-4">Primary Track Scope</th>
                <th className="py-3 px-4 text-center">Cognitive Lvl</th>
                <th className="py-3 px-4 text-center">XP Secured</th>
                <th className="py-3 px-4 text-center">Persistence Streak</th>
                <th className="py-3 px-4">Current Active Node</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-900">
              {mockStudents.map((stud) => (
                <tr key={stud.name} className="hover:bg-slate-950/40">
                  <td className="py-3.5 px-4 font-bold text-white">{stud.name}</td>
                  <td className="py-3.5 px-4 text-cyan-400">{stud.track}</td>
                  <td className="py-3.5 px-4 text-center text-violet-400 font-extrabold">LV {stud.level}</td>
                  <td className="py-3.5 px-4 text-center text-amber-500">{stud.xp} XP</td>
                  <td className="py-3.5 px-4 text-center text-orange-400 font-bold">{stud.streak} Days</td>
                  <td className="py-3.5 px-4 text-gray-500">{stud.activeNode}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Tab C: Automated dynamic core event logs */}
      {activeTab === "logs" && (
        <div className="glass-card rounded-2xl border border-slate-800 p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider flex items-center gap-2">
              <Terminal className="w-4 h-4 text-cyan-400" />
              <span>Event telemetry logging stream</span>
            </h3>
            <span className="text-[10px] text-gray-500 font-mono animate-pulse">● POLLING_EVENTS</span>
          </div>

          <div className="bg-[#04060b] rounded-lg p-4 font-mono text-gray-400 text-xs space-y-2 h-[350px] overflow-y-auto border border-slate-950">
            {activityLogs.length === 0 ? (
              <div className="text-center py-10 text-gray-600">No telemetry logs tracked in this session bounds yet.</div>
            ) : (
              activityLogs.map((log) => (
                <div key={log.id} className="flex flex-col sm:flex-row justify-between border-b border-slate-950 pb-1.5 hover:text-white transition-colors">
                  <div className="flex items-start gap-1.5">
                    <span className="text-gray-600">[{log.timestamp}]</span>
                    <span className="text-violet-400 font-bold">[{log.studentName.toUpperCase()}]</span>
                    <span>{log.action}</span>
                  </div>
                  {log.xpAwarded && (
                    <span className="text-emerald-400 font-bold">+{log.xpAwarded} XP AWARDED</span>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      )}

    </div>
  );
}
