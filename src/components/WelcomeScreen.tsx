import { useEffect } from "react";
import { motion } from "motion/react";
import { GraduationCap, Brain, Trophy, BookOpen, Sparkles, Compass } from "lucide-react";

interface WelcomeScreenProps {
  onComplete: () => void;
}

export default function WelcomeScreen({ onComplete }: WelcomeScreenProps) {
  useEffect(() => {
    // Automatically transition after 2.8 seconds
    const timer = setTimeout(() => {
      onComplete();
    }, 2800);
    return () => clearTimeout(timer);
  }, [onComplete]);

  // Floating symbols position and delay configurations
  const floatingSymbols = [
    { icon: <GraduationCap className="w-8 h-8 text-cyan-400" />, x: "-180px", y: "-100px", delay: 0 },
    { icon: <Brain className="w-7 h-7 text-pink-400" />, x: "160px", y: "-140px", delay: 0.5 },
    { icon: <Trophy className="w-6.5 h-6.5 text-amber-400" />, x: "-150px", y: "120px", delay: 0.3 },
    { icon: <BookOpen className="w-6 h-6 text-violet-400" />, x: "180px", y: "100px", delay: 0.8 },
  ];

  return (
    <div id="welcome-screen" className="fixed inset-0 bg-[#03050a] flex flex-col items-center justify-center overflow-hidden z-50">
      {/* Background radial soft ambient lights */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Grid of fine laser coordinates on the floor/background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293708_1px,transparent_1px),linear-gradient(to_bottom,#1f293708_1px,transparent_1px)] bg-[size:30px_30px] opacity-20" />

      {/* Floating Educational Elements */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {floatingSymbols.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 0.75, 0.75, 0],
              scale: [0.5, 1, 1, 0.8],
              x: [0, parseFloat(item.x) * 1.1, parseFloat(item.x), parseFloat(item.x) * 0.95],
              y: [0, parseFloat(item.y) * 1.1, parseFloat(item.y), parseFloat(item.y) * 0.95],
            }}
            transition={{
              duration: 2.8,
              times: [0, 0.2, 0.8, 1],
              ease: "easeInOut",
              delay: item.delay,
            }}
            className="absolute p-4 bg-slate-900/40 border border-slate-800/60 rounded-2xl glass-card shadow-[0_4px_20px_rgba(0,0,0,0.3)] flex items-center justify-center"
          >
            {item.icon}
          </motion.div>
        ))}
      </div>

      {/* Central Animated Logo & Brand Container */}
      <div className="relative z-10 flex flex-col items-center text-center space-y-8 px-6">
        
        {/* Modern animated logo badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.1, rotate: -180 }}
          animate={{
            opacity: [0, 1, 1, 0],
            scale: [0.5, 1.1, 1, 0.9],
            rotate: [0, 10, 0, -5],
          }}
          transition={{
            duration: 2.8,
            times: [0, 0.2, 0.82, 1],
            ease: "easeOut",
          }}
          className="relative w-28 h-28 flex items-center justify-center"
        >
          {/* Pulsing ring outer light */}
          <div className="absolute inset-0 bg-gradient-to-tr from-cyan-400 via-pink-400 to-violet-600 rounded-3xl blur-md opacity-40 animate-pulse pointer-events-none" />
          
          {/* Solid card logo */}
          <div className="relative w-full h-full rounded-3xl bg-slate-950 border border-violet-500/20 p-[2px] flex items-center justify-center shadow-[0_0_35px_rgba(139,92,246,0.3)]">
            <div className="w-full h-full rounded-[22px] bg-gradient-to-br from-slate-900 to-slate-950 flex flex-col items-center justify-center relative overflow-hidden">
              {/* Inner ambient sparks */}
              <Sparkles className="w-12 h-12 text-cyan-400 animate-pulse" />
              <div className="absolute bottom-2 font-mono text-[9px] text-violet-400 tracking-widest font-black uppercase">LS v1.0</div>
            </div>
          </div>
        </motion.div>

        {/* Text Area (Brand Name and Tagline) with Smooth Zoom Transition */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{
            opacity: [0, 1, 1, 0],
            y: [20, 0, 0, -10],
            scale: [0.95, 1, 1, 0.98],
          }}
          transition={{
            duration: 2.8,
            times: [0, 0.25, 0.82, 1],
            ease: "easeInOut",
          }}
          className="space-y-4"
        >
          <h1 className="text-4xl sm:text-5xl font-black font-display tracking-tight text-white uppercase bg-gradient-to-r from-cyan-400 via-pink-400 to-violet-500 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(6,182,212,0.15)]">
            LearnScape
          </h1>
          <p className="text-gray-400 font-medium font-sans text-sm sm:text-base tracking-wide flex items-center justify-center gap-2">
            <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-ping" />
            Learn. Grow. Unlock Your Future.
          </p>
        </motion.div>

        {/* Futuristic bottom loading terminal indicator */}
        <motion.div
          initial={{ opacity: 0, width: "0px" }}
          animate={{
            opacity: [0, 1, 1, 0],
            width: ["0px", "180px", "180px", "100px"],
          }}
          transition={{
            duration: 2.8,
            times: [0, 0.2, 0.85, 1],
            ease: "easeInOut",
          }}
          className="h-[2px] bg-gradient-to-r from-cyan-400 via-pink-400 to-violet-500 rounded-full shadow-[0_0_8px_rgba(6,182,212,0.5)]"
        />
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 0.7, 0.7, 0]
          }}
          transition={{
            duration: 2.8,
            times: [0, 0.2, 0.85, 1],
            ease: "easeInOut",
          }}
          className="font-mono text-[9px] text-gray-500 tracking-widest uppercase"
        >
          calibrating student cognitive nodes...
        </motion.div>

      </div>
    </div>
  );
}
