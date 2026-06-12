import { Trophy, Clock, Milestone, Activity, TrendingUp, Calendar, Zap, AlertCircle } from "lucide-react";
import { motion } from "motion/react";

interface ProgressDashboardProps {
  xp: number;
  level: number;
  streak: number;
  completedLessonsCount: number;
  completedModulesCount: number;
  trackTitle: string;
  quizScores: Record<string, number>;
}

export default function ProgressDashboard({
  xp,
  level,
  streak,
  completedLessonsCount,
  completedModulesCount,
  trackTitle,
  quizScores
}: ProgressDashboardProps) {

  // Calculate course completion % ratio based on 3 standard modules limit in mock
  const totalModulesInTrackEstimate = 3;
  const courseCompletionPercent = Math.min(
    Math.round((completedModulesCount / totalModulesInTrackEstimate) * 100),
    100
  );

  // Simulated scores overview
  const totalScoreEntries = Object.values(quizScores);
  const averageQuizScore = totalScoreEntries.length > 0 
    ? Math.round(totalScoreEntries.reduce((a, b) => a + b, 0) / totalScoreEntries.length)
    : 0;

  // Study hours data for the week
  const weeklyEngagementHours = [1.2, 2.5, 3.8, 1.9, 4.2, 3.1, 5.0];
  const chartLabels = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
  const maxVal = 6.0;

  return (
    <div className="space-y-8">
      
      {/* Top statistics indicators strip */}
      <div className="grid grid-[#id-stats-grid] grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Metric 1: LEVEL */}
        <div className="glass-card rounded-2xl p-5 border border-purple-500/10 relative overflow-hidden flex items-center justify-between group hover:border-purple-500/30 transition-all shadow-[0_4px_24px_rgba(0,0,0,0.2)]">
          <div className="absolute top-0 left-0 h-1 bg-gradient-to-r from-violet-500 to-fuchsia-500 w-full" />
          <div className="space-y-1">
            <span className="text-[10px] tracking-wider text-gray-500 font-mono block uppercase">Student Level</span>
            <div className="text-3xl font-extrabold text-white font-display">LEVEL {level}</div>
            <div className="text-[10px] text-gray-400 font-mono flex items-center gap-1">
              <Zap className="w-3 h-3 text-violet-400" />
              <span>Keep study points active</span>
            </div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-violet-600/10 border border-violet-500/20 flex items-center justify-center">
            <Trophy className="w-6 h-6 text-violet-400 group-hover:scale-110 transition-transform" />
          </div>
        </div>

        {/* Metric 2: XP */}
        <div className="glass-card rounded-2xl p-5 border border-cyan-500/10 relative overflow-hidden flex items-center justify-between group hover:border-cyan-500/30 transition-all shadow-[0_4px_24px_rgba(0,0,0,0.2)]">
          <div className="absolute top-0 left-0 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 w-full" />
          <div className="space-y-1">
            <span className="text-[10px] tracking-wider text-gray-500 font-mono block uppercase">Study Points</span>
            <div className="text-3xl font-extrabold text-white font-display">{xp} <span className="text-xs text-cyan-400">XP</span></div>
            <div className="text-[10px] text-gray-400 font-mono">
              Next level: <span className="text-cyan-400">{level * 1000} XP</span>
            </div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-cyan-600/10 border border-cyan-500/20 flex items-center justify-center">
            <Zap className="w-6 h-6 text-cyan-400 group-hover:scale-110 transition-transform animate-pulse" />
          </div>
        </div>

        {/* Metric 3: STREAK */}
        <div className="glass-card rounded-2xl p-5 border border-orange-500/10 relative overflow-hidden flex items-center justify-between group hover:border-orange-500/30 transition-all shadow-[0_4px_24px_rgba(0,0,0,0.2)]">
          <div className="absolute top-0 left-0 h-1 bg-gradient-to-r from-orange-500 to-amber-500 w-full" />
          <div className="space-y-1">
            <span className="text-[10px] tracking-wider text-gray-500 font-mono block uppercase">Daily Streak</span>
            <div className="text-3xl font-extrabold text-white font-display">{streak} <span className="text-xs text-orange-400">DAYS</span></div>
            <div className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              <span>Great consistency!</span>
            </div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-orange-600/10 border border-orange-500/20 flex items-center justify-center">
            <Calendar className="w-6 h-6 text-orange-400 group-hover:scale-110 transition-transform" />
          </div>
        </div>

        {/* Metric 4: MODULES FILLED */}
        <div className="glass-card rounded-2xl p-5 border border-emerald-500/10 relative overflow-hidden flex items-center justify-between group hover:border-emerald-500/30 transition-all shadow-[0_4px_24px_rgba(0,0,0,0.2)]">
          <div className="absolute top-0 left-0 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 w-full" />
          <div className="space-y-1">
            <span className="text-[10px] tracking-wider text-gray-500 font-mono block uppercase">Modules Completed</span>
            <div className="text-3xl font-extrabold text-white font-display">{completedModulesCount}</div>
            <div className="text-[10px] text-gray-400 font-mono">
              Unlocked: <span className="text-emerald-400">{completedModulesCount + 1} sections</span>
            </div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-600/10 border border-emerald-500/20 flex items-center justify-center">
            <Milestone className="w-6 h-6 text-emerald-400 group-hover:scale-110 transition-transform" />
          </div>
        </div>

      </div>

      {/* Main progress row and weekly visual SVG diagnostics chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Side: Circular completion widget and module scopes */}
        <div className="lg:col-span-1 glass-card rounded-2xl p-6 border border-violet-500/10 space-y-6 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider flex items-center gap-2">
              <Activity className="w-4 h-4 text-violet-400" />
              <span>Overall Progress</span>
            </h3>
            <p className="text-xs text-gray-500 mt-1">Completion percentage of your active learning path.</p>
          </div>

          {/* Large interactive circular progress */}
          <div className="flex flex-col items-center justify-center py-4 relative">
            <svg className="w-40 h-40 transform -rotate-90">
              {/* background circle */}
              <circle
                cx="80"
                cy="80"
                r="70"
                stroke="rgba(15, 23, 42, 0.8)"
                strokeWidth="10"
                fill="transparent"
                className="stroke-slate-900"
              />
              {/* foreground circle */}
              <circle
                cx="80"
                cy="80"
                r="70"
                stroke="url(#progressNeon)"
                strokeWidth="10"
                fill="transparent"
                strokeDasharray={2 * Math.PI * 70}
                strokeDashoffset={2 * Math.PI * 70 * (1 - courseCompletionPercent / 100)}
                strokeLinecap="round"
                className="transition-all duration-1000 ease-out"
              />
              <defs>
                <linearGradient id="progressNeon" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#06b6d4" />
                  <stop offset="100%" stopColor="#8b5cf6" />
                </linearGradient>
              </defs>
            </svg>
            
            <div className="absolute text-center">
              <div className="text-4xl font-extrabold text-white font-display">{courseCompletionPercent}%</div>
              <div className="text-[10px] text-cyan-400 tracking-widest font-mono uppercase mt-0.5">COMPLETED</div>
            </div>
          </div>

          {/* Module scopes */}
          <div className="space-y-3 font-mono text-xs">
            <div className="flex justify-between border-b border-slate-900 pb-2">
              <span className="text-gray-500">ACTIVE PATH:</span>
              <span className="text-white font-bold truncate max-w-[180px]">{trackTitle}</span>
            </div>
            <div className="flex justify-between border-b border-slate-900 pb-2">
              <span className="text-gray-500">COMPLETED LESSONS:</span>
              <span className="text-white font-bold">{completedLessonsCount} lessons</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">AVERAGE QUIZ SCORE:</span>
              <span className="text-cyan-400 font-bold">{averageQuizScore}% score</span>
            </div>
          </div>
        </div>

        {/* Right Side: WEEKLY HOURS ENGAGEMENT DATA CHART */}
        <div className="lg:col-span-2 glass-card rounded-2xl p-6 border border-cyan-500/10 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-cyan-400" />
                  <span>Weekly Progress</span>
                </h3>
                <p className="text-xs text-gray-500 mt-1">Study hours tracked day-by-day this week.</p>
              </div>
              <span className="text-xs text-cyan-400 font-mono bg-cyan-950/30 px-2 py-0.5 rounded border border-cyan-500/20">PROGRESS CHART</span>
            </div>
          </div>

          {/* Custom SVG Bar Chart */}
          <div className="h-48 flex items-end justify-between gap-2 sm:gap-4 px-2 pt-6 relative border-b border-slate-800">
            {/* Visual background lines */}
            <div className="absolute inset-x-0 bottom-1/4 border-t border-slate-900/40 border-dashed" />
            <div className="absolute inset-x-0 bottom-2/4 border-t border-slate-900/40 border-dashed" />
            <div className="absolute inset-x-0 bottom-3/4 border-t border-slate-900/40 border-dashed" />
            
            {weeklyEngagementHours.map((val, idx) => {
              const heightPct = (val / maxVal) * 100;
              return (
                <div key={idx} className="flex-1 flex flex-col items-center group relative cursor-pointer">
                  
                  {/* Floating tooltip */}
                  <div className="absolute -top-8 px-2 py-0.5 bg-slate-950 border border-slate-800 rounded text-[9px] font-mono text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                    {val} hrs study
                  </div>

                  {/* Visual Bar */}
                  <div className="w-full bg-slate-900 rounded-t-md overflow-hidden h-36 flex items-end">
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${heightPct}%` }}
                      transition={{ duration: 1, delay: idx * 0.05 }}
                      className="w-full bg-gradient-to-t from-violet-600 via-indigo-500 to-cyan-400 group-hover:to-white rounded-t-md transition-all shadow-[0_0_10px_rgba(6,182,212,0.15)]"
                    />
                  </div>

                  <span className="text-[10px] text-gray-500 font-mono mt-2 block">{chartLabels[idx]}</span>
                </div>
              );
            })}
          </div>

          <div className="flex items-center gap-2 text-xs text-gray-500 bg-slate-950 p-3 rounded-lg border border-slate-800 mt-4 leading-relaxed font-mono">
            <AlertCircle className="w-4 h-4 text-cyan-400 flex-shrink-0" />
            <span>Your study progress is updated automatically as you complete lessons and submit quizzes. Keep going!</span>
          </div>
        </div>

      </div>

      {/* Quiz details list */}
      <div className="glass-card rounded-2xl p-6 border border-slate-800">
        <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider mb-4">Quiz Scores History</h3>

        {totalScoreEntries.length === 0 ? (
          <div className="text-center py-6 text-gray-500 text-xs font-mono">
            No quizzes completed yet. Finish lessons on your roadmap to take quizzes!
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {Object.entries(quizScores).map(([mId, score]) => (
              <div key={mId} className="p-3.5 bg-slate-950 border border-slate-900 rounded-xl flex items-center justify-between font-mono text-xs">
                <div>
                  <span className="text-gray-500 block text-[10px] uppercase font-semibold">Quiz Module</span>
                  <span className="text-white font-semibold truncate max-w-[130px] block">{mId}</span>
                </div>
                <div className="text-right">
                  <span className="text-gray-400 block text-[10px] uppercase">SCORE</span>
                  <span className={`font-bold ${score >= 90 ? "text-emerald-400" : "text-cyan-400"}`}>{score}%</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
