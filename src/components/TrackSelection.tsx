import { useState } from "react";
import { Track } from "../types";
import { 
  Sparkles, 
  Trophy, 
  Clock, 
  Cpu, 
  Code, 
  BrainCircuit, 
  Eye, 
  BookmarkCheck, 
  ArrowLeft, 
  ArrowRight,
  ShieldCheck,
  Zap,
  Target,
  Layers
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface TrackSelectionProps {
  tracks: Track[];
  selectedTrackId: string | null;
  onSelectTrack: (trackId: string) => void;
}

// Static objectives mapping for each course
const TRACK_OBJECTIVES: Record<string, string[]> = {
  "software-dev": [
    "Master advanced and robust full-stack React patterns (hooks, context, state optimization)",
    "Implement type-safe database architectures and custom schema transitions using Drizzle ORM",
    "Build and deploy production-ready serverless edge web architectures with minimal latency",
    "Engage deep competence in AI-assisted semantic prompting and automated test generation"
  ],
  "ai-automation": [
    "Design advanced persistent prompt contexts and strategic few-shot pattern arrays",
    "Architect and sequence autonomous agent swarms utilizing reasoning & action (ReAct) frameworks",
    "Integrate and orchestrate multi-agent workflow systems with self-correcting mechanisms",
    "Enforce strict JSON schema validation, bias variables, and deterministic output bounds"
  ],
  "ai-foundations": [
    "Understand artificial neural network logic, silicon synapses, weights, and biases",
    "Deconstruct mathematical backpropagation pipelines and advanced gradient descent loops",
    "Detect and mitigate overfitting through dropout, validation metrics, and regularization variables",
    "Define custom deep neural topologies, activation functions (e.g. ReLU), and loss boundaries"
  ],
  "ai-content-creation": [
    "Understand the micro-mechanics of Latent Diffusion Models (LDMs) and noise removal vectors",
    "Control generated media structures precisely using ControlNet conditioning and positional maps",
    "Utilize professional AI upscalers, inpainting brushes, and canvas expansion detailing utilities",
    "Navigate synthetic media copyrights, commercial alignment, and algorithmic licensing rules"
  ]
};

// Static expected outcomes mapping for each course
const TRACK_OUTCOMES: Record<string, string[]> = {
  "software-dev": [
    "Design and deploy responsive, secure, full-stack enterprise web platforms independently",
    "Scale PostgreSQL databases and relational schema configurations with compile-time proofing",
    "Unlock a 10x multiplier in development speed and code quality using AI-augmented workflows",
    "Fully utilize edge computing layers to serve rich personalized media without server overhead"
  ],
  "ai-automation": [
    "Deploy highly autonomous web agents capable of calling APIs and self-correcting errors",
    "Enforce robust, structured data extractions from unstructured natural text with zero friction",
    "Automate enterprise pipelines, customer assistance swarms, and data mining protocols",
    "Sequence complex multi-actor decision networks without infinite execution traps"
  ],
  "ai-foundations": [
    "Acknowledge modern LLM and neural network structures at a rigorous math and logic level",
    "Diagnose and solve regularization anomalies for complex real-world database forecasts",
    "Compile custom neural layers effortlessly using state-of-the-art silicon learning blocks",
    "Design high-performance hyperparameter tuning frameworks avoiding data leakage and bias"
  ],
  "ai-content-creation": [
    "Generate and upscale production-quality synthetic graphic assets and visual frameworks",
    "Maintain complete granular control over generated characters and scene-by-scene continuity",
    "Orchestrate professional AI restoration pipelines to retouch old or broken assets",
    "Navigate intellectual property constraints for frictionless distribution in competitive sectors"
  ]
};

export default function TrackSelection({ tracks, selectedTrackId, onSelectTrack }: TrackSelectionProps) {
  // State to handle which track is selected for Details. Null means Selection Page is shown.
  const [selectedTrackForDetails, setSelectedTrackForDetails] = useState<Track | null>(null);

  // Map track IDs to specific neon indicators
  const getTrackIcon = (id: string) => {
    switch (id) {
      case "software-dev":
        return <Code className="w-7 h-7 text-cyan-400" />;
      case "ai-automation":
        return <Cpu className="w-7 h-7 text-purple-400" />;
      case "ai-foundations":
        return <BrainCircuit className="w-7 h-7 text-pink-400" />;
      case "ai-content-creation":
        return <Eye className="w-7 h-7 text-violet-400" />;
      default:
        return <Sparkles className="w-7 h-7 text-indigo-400" />;
    }
  };

  const getStyleTheme = (id: string) => {
    switch (id) {
      case "software-dev":
        return {
          glow: "group-hover:border-cyan-500/50 shadow-[0_0_20px_rgba(6,182,212,0.05)]",
          border: "border-cyan-500/20",
          text: "text-cyan-400",
          bg: "bg-cyan-500/10",
          accent: "from-cyan-500 to-blue-600"
        };
      case "ai-automation":
        return {
          glow: "group-hover:border-purple-500/50 shadow-[0_0_20px_rgba(168,85,247,0.05)]",
          border: "border-purple-500/20",
          text: "text-purple-400",
          bg: "bg-purple-500/10",
          accent: "from-purple-500 to-indigo-600"
        };
      case "ai-foundations":
        return {
          glow: "group-hover:border-pink-500/50 shadow-[0_0_20px_rgba(236,72,153,0.05)]",
          border: "border-pink-500/20",
          text: "text-pink-400",
          bg: "bg-pink-500/10",
          accent: "from-pink-500 to-rose-600"
        };
      case "ai-content-creation":
        return {
          glow: "group-hover:border-violet-500/50 shadow-[0_0_20px_rgba(139,92,246,0.05)]",
          border: "border-violet-500/20",
          text: "text-violet-400",
          bg: "bg-violet-500/10",
          accent: "from-violet-500 to-fuchsia-600"
        };
      default:
        return {
          glow: "group-hover:border-violet-500/50",
          border: "border-violet-500/20",
          text: "text-violet-400",
          bg: "bg-violet-500/10",
          accent: "from-violet-500 to-indigo-600"
        };
    }
  };

  return (
    <div id="track-selection-module" className="space-y-6">
      <AnimatePresence mode="wait">
        {selectedTrackForDetails === null ? (
          
          /* =========================================================================
             1. CHOOSE LEARNING PATHS (SELECTION PAGE)
             ========================================================================= */
          <motion.div
            key="selection-list-view"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div>
              <h2 className="text-2xl font-bold text-white tracking-tight font-display flex items-center gap-2">
                Choose Learning Path
                <span className="text-xs text-cyan-400 font-mono bg-cyan-900/20 px-2.5 py-0.5 rounded border border-cyan-400/20">4 PATHWAYS LOADED</span>
              </h2>
              <p className="text-slate-400 text-sm mt-1">
                Select a direct learning trajectory below to inspect its syllabi structures, objectives, and outcomes before launching.
              </p>
            </div>

            {/* Responsive Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {tracks.map((track) => {
                const isSelected = selectedTrackId === track.id;
                const theme = getStyleTheme(track.id);

                return (
                  <div
                    key={track.id}
                    onClick={() => setSelectedTrackForDetails(track)}
                    className={`group glass-card rounded-2xl p-5 border ${theme.border} transition-all duration-300 relative flex flex-col justify-between cursor-pointer overflow-hidden hover:scale-[1.02] ${theme.glow} ${
                      isSelected ? "border-violet-500 ring-2 ring-violet-500/30 bg-[#0c0919]" : "hover:bg-slate-900/40"
                    }`}
                  >
                    {/* Active pathway ribbon indicator */}
                    {isSelected && (
                      <div className="absolute top-0 right-0 bg-gradient-to-l from-violet-600 to-indigo-600 text-[9px] font-mono text-white px-3 py-1 rounded-bl-xl flex items-center gap-1 font-bold">
                        <BookmarkCheck className="w-3 h-3" />
                        <span>ACTIVE TARGET</span>
                      </div>
                    )}

                    {/* Ambient Grid overlay patterns */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none -z-10" />

                    <div className="space-y-4">
                      {/* Course iconography + level of difficulty */}
                      <div className="flex items-center justify-between">
                        <div className={`p-2.5 rounded-xl ${theme.bg} border border-white/5`}>
                          {getTrackIcon(track.id)}
                        </div>
                        <span className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${
                          track.difficulty === "Advanced" ? "text-rose-400 bg-rose-950/20 border-rose-500/20" :
                          track.difficulty === "Intermediate" ? "text-cyan-400 bg-cyan-950/20 border-cyan-500/20" :
                          "text-emerald-400 bg-emerald-950/20 border-emerald-500/20"
                        }`}>
                          {track.difficulty}
                        </span>
                      </div>

                      {/* Path title and short descriptive summary */}
                      <div>
                        <h3 className="text-base font-bold text-white font-display leading-tight group-hover:text-violet-300 transition-colors">
                          {track.title}
                        </h3>
                        <p className="text-slate-400 text-xs leading-relaxed mt-2 line-clamp-3 min-h-[48px]">
                          {track.description}
                        </p>
                      </div>

                      {/* Course details: difficulty level, duration and reward points */}
                      <div className="grid grid-cols-2 gap-2 bg-slate-950/60 p-2.5 rounded-xl border border-slate-900 font-mono text-xs">
                        <div className="space-y-0.5">
                          <span className="text-[9px] text-gray-500 uppercase block">Duration</span>
                          <span className="text-slate-300 font-semibold">{track.duration}</span>
                        </div>
                        <div className="space-y-0.5 text-right">
                          <span className="text-[9px] text-gray-500 uppercase block">XP Reward</span>
                          <span className="text-amber-400 font-bold">+{track.xpReward} XP</span>
                        </div>
                      </div>

                      {/* Calibrated skill badges */}
                      <div className="space-y-1.5">
                        <span className="text-[10px] font-mono tracking-wider text-gray-400 block uppercase font-bold">Skills Covered</span>
                        <div className="flex flex-wrap gap-1 min-h-[40px]">
                          {track.skillsCovered.map((skill) => (
                            <span key={skill} className="px-1.5 py-0.5 bg-slate-900 text-slate-300 rounded text-[9px] font-mono border border-slate-800">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Start Path Button */}
                    <button
                      type="button"
                      className="w-full mt-5 py-2.5 rounded-xl text-xs font-mono font-bold tracking-wider transition-all duration-200 cursor-pointer text-center bg-slate-900 hover:bg-violet-950/30 text-slate-300 hover:text-white border border-slate-800 hover:border-violet-500/30 group-hover:scale-[1.01] flex items-center justify-center gap-1.5"
                    >
                      <span>Start Path</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </button>
                    
                  </div>
                );
              })}
            </div>
          </motion.div>
        ) : (
          
          /* =========================================================================
             2. VIEW LEARNING PATH DETAILS (DETAILS PAGE)
             ========================================================================= */
          <motion.div
            key="selection-detail-view"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="space-y-8"
          >
            {/* Navigational buttons and header aspect */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-950 pb-5">
              <button
                type="button"
                onClick={() => setSelectedTrackForDetails(null)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white text-xs font-mono tracking-wider hover:bg-slate-950 transition-all cursor-pointer self-start md:self-auto"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Learning Paths</span>
              </button>

              <div className="flex items-center gap-2 px-3 py-1 bg-violet-600/10 border border-violet-500/20 rounded-full text-xs text-violet-300 font-mono self-start md:self-auto">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>SYLLABUS BLUEPRINT</span>
              </div>
            </div>

            {/* Core details layout container */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Left Aspect: Course information, Objectives and Expected outcomes */}
              <div className="lg:col-span-2 space-y-6">
                
                {/* Hero Title and Description block */}
                <div className="glass-card p-6 md:p-8 rounded-2xl border border-violet-500/10 relative overflow-hidden space-y-4">
                  <div className="absolute top-0 left-0 bg-gradient-to-r from-cyan-400 to-violet-500 h-1 w-full" />
                  
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#06b6d4]">GEN-AI PATHWAY</span>
                    <span className={`text-[9px] font-mono font-extrabold uppercase px-2 py-0.5 rounded border ${
                      selectedTrackForDetails.difficulty === "Advanced" ? "text-rose-400 bg-rose-950/20 border-rose-500/20" :
                      selectedTrackForDetails.difficulty === "Intermediate" ? "text-cyan-400 bg-cyan-950/20 border-cyan-500/20" :
                      "text-emerald-400 bg-emerald-950/20 border-emerald-500/20"
                    }`}>
                      {selectedTrackForDetails.difficulty}
                    </span>
                  </div>

                  <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight font-display">
                    {selectedTrackForDetails.title}
                  </h1>

                  <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
                    {selectedTrackForDetails.description}
                  </p>

                  <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-900 font-mono text-xs text-gray-400">
                    <div>
                      <span className="text-gray-500 block text-[9px] uppercase tracking-wider">Estimated Time</span>
                      <span className="text-white font-bold text-sm sm:text-base">{selectedTrackForDetails.duration}</span>
                    </div>
                    <div>
                      <span className="text-gray-500 block text-[9px] uppercase tracking-wider">Lessons Included</span>
                      <span className="text-white font-bold text-sm sm:text-base">
                        {selectedTrackForDetails.modules.reduce((acc, m) => acc + m.lessons.length, 0)} Units
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-500 block text-[9px] uppercase tracking-wider">Study Points</span>
                      <span className="text-cyan-400 font-bold text-sm sm:text-base">+{selectedTrackForDetails.xpReward} XP</span>
                    </div>
                  </div>
                </div>

                {/* Objectives Card */}
                <div className="glass-card p-6 md:p-8 rounded-2xl border border-slate-800 space-y-4">
                  <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider flex items-center gap-2">
                    <Target className="w-4.5 h-4.5 text-cyan-400" />
                    <span>Learning Objectives</span>
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {(TRACK_OBJECTIVES[selectedTrackForDetails.id] || [
                      "Gain solid fundamental understanding and strategic concepts in this field.",
                      "Develop practical hands-on experience through structured modules.",
                      "Understand best-practice methodologies and modern industry workflows.",
                      "Acquire a critical mindset to continuously evaluate and enhance skills."
                    ]).map((obj, index) => (
                      <div key={index} className="flex gap-3 text-xs leading-relaxed text-gray-400 bg-slate-950/40 p-3 rounded-xl border border-slate-900/60">
                        <span className="text-cyan-400 font-bold font-mono">0{index + 1}.</span>
                        <span>{obj}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Outcomes Card */}
                <div className="glass-card p-6 md:p-8 rounded-2xl border border-slate-800 space-y-4">
                  <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider flex items-center gap-2">
                    <ShieldCheck className="w-4.5 h-4.5 text-emerald-400" />
                    <span>Expected Outcomes</span>
                  </h3>

                  <div className="space-y-3">
                    {(TRACK_OUTCOMES[selectedTrackForDetails.id] || [
                      "Ability to build, test, and deploy real-world implementations in this domain.",
                      "Complete ownership of core design mechanisms and execution paradigms.",
                      "Accelerate productivity and strategic competence by up to 5x.",
                      "Earn dynamic study points and unlock advanced micro-credentials."
                    ]).map((out, index) => (
                      <div key={index} className="flex items-start gap-3 text-xs leading-relaxed text-gray-400">
                        <div className="w-5 h-5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center font-mono font-bold text-[10px] mt-0.5 flex-shrink-0">
                          ✓
                        </div>
                        <span className="pt-0.5">{out}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Right Aspect: Modules Included & Journey Trigger buttons */}
              <div className="lg:col-span-1 space-y-6">
                
                {/* Modules timeline card container */}
                <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-5">
                  <h3 className="text-xs font-bold text-gray-400 font-mono uppercase tracking-wider flex items-center gap-2">
                    <Layers className="w-4 h-4 text-violet-400" />
                    <span>Modules Included</span>
                  </h3>

                  <div className="space-y-4 relative before:absolute before:left-3.5 before:top-4 before:bottom-4 before:w-[1.5px] before:bg-slate-900">
                    {selectedTrackForDetails.modules.map((mod, index) => (
                      <div key={mod.id} className="relative pl-8 group/item">
                        {/* Timeline bubble */}
                        <div className="absolute left-0 top-1.5 w-7.5 h-7.5 rounded-lg bg-slate-950 border border-slate-800 group-hover/item:border-violet-500 transition-colors flex items-center justify-center text-[10px] font-mono font-extrabold text-slate-400">
                          0{index + 1}
                        </div>

                        {/* Module overview */}
                        <div className="space-y-1">
                          <h4 className="text-xs font-extrabold text-white font-mono uppercase tracking-wider truncate">
                            {mod.title}
                          </h4>
                          <p className="text-[11px] text-gray-500 leading-normal line-clamp-2">
                            {mod.description}
                          </p>
                          <span className="text-[9px] text-cyan-400 font-mono block uppercase">
                            {mod.lessons.length} study topics Included
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Giant Action Panel triggers */}
                <div className="glass-card p-6 rounded-2xl border border-violet-500/20 bg-gradient-to-br from-violet-950/20 to-indigo-950/20 space-y-5 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-1 text-xs text-violet-300 font-mono">
                      <Zap className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                      <span>SEQUENCE ENCRYPTION INCLUDED</span>
                    </div>
                    <h3 className="text-base font-bold text-white font-display">Begin Learning Journey</h3>
                    <p className="text-xs text-gray-400 leading-relaxed">
                      Launching this path generates your personalized roadmap. This unlocks Module 1 automatically while securely locking downstream syllabus levels.
                    </p>
                  </div>

                  <div className="space-y-3 pt-2">
                    <button
                      type="button"
                      onClick={() => onSelectTrack(selectedTrackForDetails.id)}
                      className="w-full py-3 bg-gradient-to-r from-cyan-500 to-violet-600 hover:from-cyan-400 hover:to-violet-500 text-white font-bold font-mono text-xs uppercase tracking-widest rounded-xl hover:shadow-[0_0_20px_rgba(139,92,246,0.3)] transition-all flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.02]"
                    >
                      <span>Start Journey</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    <button
                      type="button"
                      onClick={() => setSelectedTrackForDetails(null)}
                      className="w-full py-3 bg-slate-950/60 hover:bg-slate-950/90 border border-slate-800 hover:border-slate-700 text-gray-400 hover:text-white font-bold font-mono text-xs uppercase tracking-widest rounded-xl transition-all cursor-pointer text-center"
                    >
                      Cancel Selection
                    </button>
                  </div>
                </div>

              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
