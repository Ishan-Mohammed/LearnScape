import { ArrowDown, Cpu, ArrowRight, UserPlus, CheckSquare, Sparkles, Trophy, Shuffle, Disc3 } from "lucide-react";
import { motion } from "motion/react";

export default function WorkflowVisualization() {
  
  const workflowNodes = [
    {
      id: "wf-1",
      title: "Student Signup",
      desc: "Account registered; user specific study milestones set up.",
      icon: <UserPlus className="w-5 h-5 text-purple-400" />,
      color: "border-purple-500/30 text-purple-400 bg-purple-500/5",
    },
    {
      id: "wf-2",
      title: "Path Selection",
      desc: "Student chooses 1 of 4 specialized interactive study tracks.",
      icon: <Shuffle className="w-5 h-5 text-cyan-400" />,
      color: "border-cyan-500/30 text-cyan-400 bg-cyan-500/5",
    },
    {
      id: "wf-3",
      title: "Roadmap Generation",
      desc: "System compiles custom roadmap lessons and automatically unlocks Section 1.",
      icon: <Cpu className="w-5 h-5 text-indigo-400" />,
      color: "border-indigo-500/30 text-indigo-400 bg-indigo-500/5",
    },
    {
      id: "wf-4",
      title: "Sectors Unlocking",
      desc: "Upstream lessons unlock step-by-step as previous evaluations are passed.",
      icon: <Disc3 className="w-5 h-5 text-pink-400" />,
      color: "border-pink-500/30 text-pink-400 bg-pink-500/5",
    },
    {
      id: "wf-5",
      title: "Lesson Completion",
      desc: "Student completes custom lessons, securing +25 XP rewards.",
      icon: <CheckSquare className="w-5 h-5 text-emerald-400" />,
      color: "border-emerald-500/30 text-emerald-400 bg-emerald-500/5",
    },
    {
      id: "wf-6",
      title: "Quiz Evaluation",
      desc: "Student diagnostic quizzes are evaluated and graded instantly.",
      icon: <Sparkles className="w-5 h-5 text-amber-400" />,
      color: "border-amber-500/30 text-amber-400 bg-amber-500/5",
    },
    {
      id: "wf-7",
      title: "Progress Sync",
      desc: "System saves active streak days, aggregates cumulative XP, and updates level.",
      icon: <Trophy className="w-5 h-5 text-violet-400" />,
      color: "border-violet-500/30 text-violet-400 bg-violet-500/5",
    },
    {
      id: "wf-8",
      title: "Next Sector Open",
      desc: "Subsequent locked levels unlock instantly with fun achievement alerts.",
      icon: <Sparkles className="w-5 h-5 text-cyan-300 animate-spin" />,
      color: "border-cyan-300/30 text-cyan-300 bg-cyan-300/5",
    }
  ];

  return (
    <div className="space-y-8">
      
      <div>
        <h2 className="text-2xl font-bold text-white tracking-tight font-display flex items-center gap-2">
          Platform Workflow Lifecycle
          <span className="text-xs text-violet-400 font-mono bg-violet-950/30 px-2 py-0.5 rounded border border-violet-500/20">AUTOMATED WORKFLOWS</span>
        </h2>
        <p className="text-slate-400 text-sm mt-1">
          Visual guides mapping state lifecycle transitions on the LearnScape platform. Student roadmap study sequences.
        </p>
      </div>

      <div className="relative">
        
        {/* Connection line inside desktop grid */}
        <div className="absolute left-[50%] top-6 bottom-6 w-[2px] bg-slate-900 hidden lg:block border-l border-dashed border-slate-800" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
          {workflowNodes.map((node, index) => {
            return (
              <div key={node.id} className="relative">
                
                {/* Visual Glass Card */}
                <div className={`glass-card rounded-2xl p-5 border ${node.color} transition-all relative overflow-hidden group hover:scale-[1.01] h-48 flex flex-col justify-between`}>
                  
                  {/* Subtle Grid backing */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:12px_12px] opacity-20 pointer-events-none" />

                  <div className="space-y-4">
                    {/* Icon and numerical sequencing indicator */}
                    <div className="flex justify-between items-center">
                      <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-900">
                        {node.icon}
                      </div>
                      <span className="text-[10px] font-mono text-gray-500">STAGE 0{index + 1}</span>
                    </div>

                    <div>
                      <h3 className="text-sm font-bold text-white font-display uppercase tracking-wider">{node.title}</h3>
                      <p className="text-xs text-slate-400 leading-relaxed mt-1">{node.desc}</p>
                    </div>
                  </div>

                  {/* Flow vector representing the downstream transition */}
                  <div className="flex justify-end pt-2 text-[10px] font-mono text-gray-600 uppercase tracking-widest group-hover:text-cyan-400 transition-colors">
                    <span>STATE SYNC →</span>
                  </div>

                </div>

                {/* Vertical/Horizontal arrow indicator represent link step */}
                {index < workflowNodes.length - 1 && (
                  <div className="flex justify-center items-center py-2 md:hidden">
                    <ArrowDown className="w-5 h-5 text-gray-600 animate-bounce" />
                  </div>
                )}
                
              </div>
            );
          })}
        </div>

      </div>

      {/* Abstract flow overview widget */}
      <div className="glass-card rounded-2xl p-6 border border-slate-800 leading-relaxed space-y-4">
        <h3 className="text-xs font-bold text-white font-mono uppercase tracking-widest">Macro State Machine Logic</h3>
        <p className="text-xs text-gray-400">
          The platform operates on a single-source client state architecture, dynamically persisted to secure localized storage hashes. Upon track execution, the pipeline initializes an array container of unlocked sector identifiers. Completing a node triggers structural payload submissions to our client evaluator algorithms. In turn, these secure positive evaluation passes, increment XP counts, calculate cumulative streaks, and trigger downward locks releases. Let's study, level up, and forge the future!
        </p>
      </div>

    </div>
  );
}
