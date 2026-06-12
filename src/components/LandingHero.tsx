import { ArrowRight, Sparkles, Trophy, Flame, Play, LayoutGrid } from "lucide-react";

interface LandingHeroProps {
  onStartLearning: () => void;
  onExploreTracks: () => void;
  studentName?: string;
}

export default function LandingHero({ onStartLearning, onExploreTracks, studentName }: LandingHeroProps) {
  return (
    <div className="relative overflow-hidden py-14 md:py-20 px-6 bg-slate-950/40 rounded-3xl border border-violet-500/10 mb-10">
      {/* Radiant ambient shadows */}
      <div className="absolute top-10 right-10 w-72 h-72 bg-gradient-to-tr from-cyan-500/10 to-violet-500/10 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-10 left-10 w-72 h-72 bg-gradient-to-tr from-purple-500/10 to-pink-500/10 rounded-full blur-3xl -z-10" />
      
      <div className="max-w-4xl mx-auto text-center space-y-6 relative z-10">
        
        {/* Sparkly badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-violet-600/10 border border-violet-500/20 rounded-full text-xs text-violet-300 font-mono">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>PORTAL PLATFORM</span>
        </div>

        {/* Dynamic welcome section */}
        {studentName && (
          <div className="text-sm font-mono text-cyan-400 tracking-wide uppercase">
            Welcome back, <span className="font-extrabold text-white">{studentName}</span>
          </div>
        )}

        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-display text-white max-w-3xl mx-auto leading-[1.15]">
          Your Learning Journey Starts Here
        </h1>

        <p className="text-gray-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          Choose a learning path, complete lessons, track your progress, and achieve your goals step by step.
        </p>

        {/* Main Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <button
            onClick={onStartLearning}
            className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-cyan-500 to-violet-600 hover:from-cyan-400 hover:to-violet-500 text-white rounded-xl text-xs font-bold tracking-wider font-mono shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(139,92,246,0.4)] transition-all flex items-center justify-center gap-2 group cursor-pointer hover:scale-[1.02]"
          >
            <Play className="w-3.5 h-3.5 text-cyan-300 fill-cyan-300 group-hover:scale-110 transition-transform" />
            <span>START LEARNING PATH</span>
            <ArrowRight className="w-3.5 h-3.5 text-white group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={onExploreTracks}
            className="w-full sm:w-auto px-8 py-3 border border-slate-800 hover:border-violet-500/40 bg-slate-900/40 hover:bg-slate-900/80 text-violet-300 hover:text-white rounded-xl text-xs font-bold tracking-wider font-mono transition-all flex items-center justify-center gap-2 hover:scale-[1.02] cursor-pointer"
          >
            <LayoutGrid className="w-3.5 h-3.5 text-violet-400" />
            <span>EXPLORE TRACKS</span>
          </button>
        </div>

        {/* Global statistics block */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-5 bg-slate-900/30 border border-slate-800/80 rounded-2xl mt-12 max-w-3xl mx-auto">
          <div className="text-center p-2">
            <div className="text-lg sm:text-xl font-bold text-cyan-400 font-mono">150+</div>
            <div className="text-[9px] uppercase tracking-wider text-gray-500 font-mono mt-1">Study Lessons</div>
          </div>
          <div className="text-center p-2 border-l border-slate-800/60">
            <div className="text-lg sm:text-xl font-bold text-violet-400 font-mono">15,000+</div>
            <div className="text-[9px] uppercase tracking-wider text-gray-500 font-mono mt-1">Active Students</div>
          </div>
          <div className="text-center p-2 border-l border-slate-800/60">
            <div className="text-lg sm:text-xl font-bold text-emerald-400 font-mono">94.2%</div>
            <div className="text-[9px] uppercase tracking-wider text-gray-500 font-mono mt-1">Passing Grade</div>
          </div>
          <div className="text-center p-2 border-l border-slate-800/60">
            <div className="text-lg sm:text-xl font-bold text-pink-400 font-mono">24/7 Support</div>
            <div className="text-[9px] uppercase tracking-wider text-gray-500 font-mono mt-1">Study Mentor</div>
          </div>
        </div>

        {/* Student-friendly tips */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-[10px] text-slate-500 font-mono pt-4 select-none">
          <span className="flex items-center gap-1.5"><Trophy className="w-3.5 h-3.5 text-amber-500" /> Unlock learning units</span>
          <span className="hidden sm:inline">•</span>
          <span className="flex items-center gap-1.5"><Flame className="w-3.5 h-3.5 text-orange-500" /> Maintain learning streaks</span>
          <span className="hidden sm:inline">•</span>
          <span className="flex items-center gap-1.5"><Sparkles className="w-3.5 h-3.5 text-cyan-400" /> Learn with your study mentor</span>
        </div>

      </div>
    </div>
  );
}
