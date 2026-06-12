import { useState, useEffect } from "react";
import { Module, Lesson, Quiz } from "../types";
import { Lock, Unlock, CheckCircle, Award, Play, ChevronRight, Zap, Target, HelpCircle, Flame, Star, Sparkles, BookOpen, Trophy } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface DuolingoRoadmapProps {
  trackTitle: string;
  modules: Module[];
  completedLessons: string[]; // lesson IDs
  completedModules: string[]; // module IDs
  quizScores: Record<string, number>;
  onCompleteLesson: (lessonId: string, xpReward: number) => void;
  onCompleteModule: (moduleId: string, scorePercent: number, xpReward: number) => void;
  onAddActivityLog: (action: string, xp?: number) => void;
}

export default function DuolingoRoadmap({
  trackTitle,
  modules,
  completedLessons,
  completedModules,
  quizScores,
  onCompleteLesson,
  onCompleteModule,
  onAddActivityLog
}: DuolingoRoadmapProps) {
  const [selectedModule, setSelectedModule] = useState<Module | null>(null);
  const [activeLessonIndex, setActiveLessonIndex] = useState<number | null>(null);
  const [activeQuiz, setActiveQuiz] = useState<Quiz | null>(null);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState<number>(0);
  const [showCelebration, setShowCelebration] = useState(false);
  const [celebrationMessage, setCelebrationMessage] = useState("");

  // Determine module status
  const getModuleStatus = (module: Module, index: number) => {
    if (completedModules.includes(module.id)) {
      return "completed";
    }
    // Module 1 is unlocked naturally
    if (index === 0) {
      return "unlocked";
    }
    // A module is unlocked if the prior one is completed
    const priorModule = modules[index - 1];
    if (priorModule && completedModules.includes(priorModule.id)) {
      return "unlocked";
    }
    return "locked";
  };

  // Lessons completed in a module
  const getCompletedLessonsInModule = (module: Module) => {
    return module.lessons.filter((l) => completedLessons.includes(l.id));
  };

  const handleOpenModule = (module: Module, status: string) => {
    if (status === "locked") {
      alert("⚠️ Encryption Grid Active. Complete prior module evaluations to bypass blockade!");
      return;
    }
    setSelectedModule(module);
    setActiveLessonIndex(null);
    setActiveQuiz(null);
    setQuizSubmitted(false);
    setSelectedAnswers({});
  };

  const startLessons = (module: Module) => {
    // Find first uncompleted lesson, or default to 0
    const uncompletedIdx = module.lessons.findIndex((l) => !completedLessons.includes(l.id));
    setActiveLessonIndex(uncompletedIdx !== -1 ? uncompletedIdx : 0);
  };

  const nextLesson = () => {
    if (!selectedModule || activeLessonIndex === null) return;
    
    const currentLesson = selectedModule.lessons[activeLessonIndex];
    const isNewCompletion = !completedLessons.includes(currentLesson.id);

    if (isNewCompletion) {
      onCompleteLesson(currentLesson.id, currentLesson.xpReward);
    }

    if (activeLessonIndex < selectedModule.lessons.length - 1) {
      setActiveLessonIndex(activeLessonIndex + 1);
    } else {
      // 5 lessons completed. Automatically transition to Quiz module evaluate!
      // Add a small modal log first
      onAddActivityLog(`Completed system syllabus nodes in "${selectedModule.title}"`, 125);
      
      // Auto launch Quiz
      setActiveLessonIndex(null);
      setActiveQuiz(selectedModule.quiz);
    }
  };

  const handleSelectOption = (questionId: string, optionIndex: number) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex
    }));
  };

  const handleSubmitQuiz = () => {
    if (!activeQuiz || !selectedModule) return;

    let correctCount = 0;
    activeQuiz.questions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctAnswerIndex) {
        correctCount++;
      }
    });

    const percentage = Math.round((correctCount / activeQuiz.questions.length) * 100);
    setQuizScore(percentage);
    setQuizSubmitted(true);

    // If passed or complete
    if (percentage >= 50) {
      const isFirstTime = !completedModules.includes(selectedModule.id);
      const totalXp = selectedModule.xpReward + activeQuiz.xpBonus;
      
      onCompleteModule(selectedModule.id, percentage, isFirstTime ? totalXp : 20);
      
      onAddActivityLog(`Passed Quiz for "${selectedModule.title}" with score ${percentage}%!`, isFirstTime ? totalXp : 20);

      // Trigger Celebration
      setCelebrationMessage(`Sector node "${selectedModule.title}" synchronized at ${percentage}% metrics! +${totalXp} XP secured.`);
      setShowCelebration(true);
    }
  };

  return (
    <div className="space-y-12">
      
      {/* Track info banner */}
      <div className="p-6 bg-gradient-to-r from-slate-900 to-indigo-950/80 rounded-2xl border border-violet-500/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl" />
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <span className="text-[10px] uppercase font-mono tracking-widest text-cyan-400 font-bold block mb-1">DURABLE PROGRESS TRANSITMAP</span>
            <h2 className="text-xl sm:text-2xl font-bold font-display text-white">{trackTitle}</h2>
            <p className="text-xs text-slate-400 mt-1">
              Click active glowing nodes to study. Synchronizing all 5 lessons within a node launches its quiz, unlocking the subsequent pathway.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <span className="text-[10px] text-gray-500 font-mono block">STABILITY ENGINE</span>
              <span className="text-xs font-mono font-extrabold text-emerald-400">SYNCED : {completedModules.length} / {modules.length} SECTORS</span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-violet-600/20 border border-violet-500/30 flex items-center justify-center">
              <Zap className="w-5 h-5 text-violet-400 animate-pulse" />
            </div>
          </div>
        </div>
      </div>

      {/* DUOLINGO MAP VERTICAL NODE CONNECTORS SCHEME */}
      <div className="flex flex-col items-center justify-center py-10 relative">
        <div className="absolute inset-y-0 w-1.5 bg-slate-900 border-l border-r border-slate-800 -z-10" />

        <div className="space-y-20 w-full max-w-lg relative z-10">
          {modules.map((mod, index) => {
            const status = getModuleStatus(mod, index);
            const compLessons = getCompletedLessonsInModule(mod);
            const isCompleted = status === "completed";
            const isUnlocked = status === "unlocked";
            
            // Zig-zag offset class
            const horizontalOffsetClass = index % 2 === 0 
              ? "sm:translate-x-12" 
              : "sm:-translate-x-12";

            return (
              <div 
                key={mod.id} 
                className={`flex flex-col items-center transition-all ${horizontalOffsetClass}`}
              >
                
                {/* Visual Connector Line helper for SVG */}
                <div className="relative group">
                  
                  {/* Outer Glowing pulses */}
                  {isUnlocked && (
                    <span className="absolute -inset-4 rounded-full bg-cyan-400/20 blur-md glow-active-node pointer-events-none" />
                  )}
                  {isCompleted && (
                    <span className="absolute -inset-2 rounded-full bg-emerald-500/10 blur-xs pointer-events-none" />
                  )}

                  {/* Circular Button */}
                  <button
                    onClick={() => handleOpenModule(mod, status)}
                    className={`w-20 h-20 rounded-full flex flex-col items-center justify-center relative transition-all duration-300 border-3 cursor-pointer ${
                      isCompleted 
                        ? "bg-slate-900 border-emerald-500 text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:scale-105" 
                        : isUnlocked 
                          ? "bg-gradient-to-br from-cyan-900 to-indigo-950 border-cyan-400 text-cyan-300 shadow-[0_0_25px_rgba(6,182,212,0.5)] hover:scale-105"
                          : "bg-slate-950 border-slate-800 text-gray-600 shadow-inner"
                    }`}
                  >
                    
                    {isCompleted ? (
                      <CheckCircle className="w-8 h-8 text-emerald-400" />
                    ) : isUnlocked ? (
                      <Unlock className="w-8 h-8 text-cyan-300 animate-pulse" />
                    ) : (
                      <Lock className="w-6 h-6 text-gray-600" />
                    )}

                    <span className="absolute -bottom-6 bg-slate-950/90 border border-slate-800 px-2.5 py-0.5 rounded text-[10px] font-mono whitespace-nowrap text-white font-semibold">
                      SEC {index + 1}
                    </span>
                  </button>
                  
                  {/* Minichart on side of nodes */}
                  <div className="absolute left-24 top-5 w-48 hidden md:block opacity-85 group-hover:opacity-100 transition-opacity">
                    <div className="bg-slate-950/95 border border-slate-800 p-2.5 rounded-lg font-mono">
                      <div className="text-xs text-white font-bold tracking-tight truncate">{mod.title}</div>
                      <div className="flex items-center justify-between text-[9px] text-gray-500 mt-1">
                        <span>XP REWARD: {mod.xpReward}</span>
                        <span className="text-cyan-400 font-bold">{compLessons.length}/5 NODES</span>
                      </div>
                      
                      {/* progress line */}
                      <div className="w-full h-1 bg-slate-900 rounded-full mt-1.5 overflow-hidden">
                        <div 
                          className="h-full bg-cyan-400 transition-all duration-300" 
                          style={{ width: `${(compLessons.length / 5) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>

                </div>

                {/* Micro info on touch for mobile view */}
                <div className="mt-8 text-center md:hidden bg-slate-950/60 p-2 rounded-lg border border-slate-900 max-w-xs">
                  <div className="text-xs font-bold text-white">{mod.title}</div>
                  <div className="text-[10px] text-slate-500 font-mono mt-0.5">
                    Progress: {compLessons.length}/5 • Status: {status.toUpperCase()}
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      </div>

      {/* IMMERSIVE MODULE DRAWER / DRAWER COMPONENT */}
      <AnimatePresence>
        {selectedModule && (
          <div className="fixed inset-0 bg-slate-950/80 backdrop-filter backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-2xl bg-[#090b11] border border-violet-500/20 rounded-2xl overflow-hidden shadow-[0_10px_50px_rgba(0,0,0,0.8)] flex flex-col max-h-[90vh]"
            >
              
              {/* Header */}
              <div className="p-6 border-b border-slate-900 flex justify-between items-center bg-slate-900/40">
                <div>
                  <h3 className="text-lg font-extrabold text-white font-display uppercase tracking-wider">{selectedModule.title}</h3>
                  <p className="text-xs text-slate-400 mt-0.5">{selectedModule.description}</p>
                </div>
                <button
                  onClick={() => setSelectedModule(null)}
                  className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-xs text-gray-300 rounded font-mono transition-colors"
                >
                  SYSTEM DISCONNECT [X]
                </button>
              </div>

              {/* Dynamic Modal Panels: Lessons Selection, Active Slides, or Quiz View */}
              <div className="p-6 overflow-y-auto flex-1 space-y-6">

                {activeLessonIndex === null && !activeQuiz && (
                  /* PANEL A: MODULE DIRECTORY INDEX */
                  <div className="space-y-6">
                    <div className="flex items-center justify-between text-xs font-mono bg-slate-950 p-3 rounded-lg border border-slate-900">
                      <div className="flex items-center gap-1.5">
                        <BookOpen className="w-4 h-4 text-cyan-400" />
                        <span className="text-cyan-400 font-bold">5 MICRO LESSON NODES</span>
                      </div>
                      <div>
                        <span>Completed: {getCompletedLessonsInModule(selectedModule).length}/5</span>
                      </div>
                    </div>

                    <div className="space-y-3">
                      {selectedModule.lessons.map((lesson, idx) => {
                        const isCompleted = completedLessons.includes(lesson.id);
                        return (
                          <div 
                            key={lesson.id}
                            className={`p-3.5 rounded-lg border flex items-center justify-between transition-all ${
                              isCompleted 
                                ? "bg-emerald-950/10 border-emerald-500/20" 
                                : "bg-slate-950/60 border-slate-800"
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <span className="w-6 h-6 rounded bg-slate-900 border border-slate-800 flex items-center justify-center text-xs font-mono text-cyan-400">
                                0{idx + 1}
                              </span>
                              <div>
                                <h4 className="text-xs font-bold text-white">{lesson.title}</h4>
                                <span className="text-[10px] text-gray-500 font-mono">EST TIME: {lesson.durationMin} MIN • REWARD: +{lesson.xpReward} XP</span>
                              </div>
                            </div>
                            {isCompleted ? (
                              <span className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-900/10 px-2.5 py-0.5 rounded border border-emerald-500/20 flex items-center gap-1">
                                <CheckCircle className="w-3 h-3" /> SYNCHRONIZED
                              </span>
                            ) : (
                              <span className="text-[10px] font-mono text-gray-500">PENDING ACCLIMATION</span>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {/* Progress feedback block */}
                    <div className="p-4 bg-slate-950 border border-slate-900 rounded-xl">
                      <div className="flex justify-between items-center text-xs font-mono mb-2">
                        <span className="text-gray-400">Total Core Calibrations:</span>
                        <span className="text-cyan-400 font-bold">{getCompletedLessonsInModule(selectedModule).length * 20}%</span>
                      </div>
                      <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-cyan-400 to-violet-500 transition-all duration-300"
                          style={{ width: `${(getCompletedLessonsInModule(selectedModule).length / 5) * 100}%` }}
                        />
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <button
                        onClick={() => startLessons(selectedModule)}
                        className="flex-1 py-3 bg-gradient-to-r from-cyan-600 to-violet-600 hover:from-cyan-500 hover:to-violet-500 text-white rounded-lg text-xs font-mono font-bold tracking-wider hover:scale-[1.01] transition-all flex items-center justify-center gap-2"
                      >
                        <Play className="w-3.5 h-3.5 text-white animate-pulse" />
                        <span>INITIALIZE DECK SEQUENCE</span>
                      </button>

                      {getCompletedLessonsInModule(selectedModule).length === 5 && (
                        <button
                          onClick={() => {
                            setActiveQuiz(selectedModule.quiz);
                          }}
                          className="py-3 px-6 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white rounded-lg text-xs font-mono font-bold tracking-wider flex items-center justify-center gap-1.5"
                        >
                          <Target className="w-4 h-4 text-orange-200" />
                          <span>EVALUATE [QUIZ]</span>
                        </button>
                      )}
                    </div>
                  </div>
                )}

                {/* PANEL B: ACTIVE IMMERSIVE LESSON SLIDES */}
                {activeLessonIndex !== null && (
                  <div className="space-y-6">
                    <div className="flex justify-between items-center text-xs font-mono text-gray-500">
                      <span>SLIDE NODE 0{activeLessonIndex + 1} / 05</span>
                      <span className="text-cyan-400">COGNITIVE ENGAGEMENT IN PROGRESS</span>
                    </div>

                    <div className="w-full h-1 bg-slate-950 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-cyan-400 transition-all duration-300"
                        style={{ width: `${((activeLessonIndex + 1) / 5) * 100}%` }}
                      />
                    </div>

                    <div className="p-6 bg-slate-950 border border-slate-900 rounded-xl space-y-4">
                      <div className="flex items-center gap-2 pb-3 border-b border-slate-900">
                        <span className="px-2 py-0.5 bg-cyan-900/20 text-cyan-400 border border-cyan-400/20 rounded font-mono text-[9px] font-bold">TOPIC LAYER 0{activeLessonIndex + 1}</span>
                        <h4 className="text-sm font-bold text-white">{selectedModule.lessons[activeLessonIndex].title}</h4>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans mt-2 whitespace-pre-wrap">
                        {selectedModule.lessons[activeLessonIndex].content}
                      </p>
                    </div>

                    <div className="p-4 bg-violet-950/20 border border-violet-500/10 rounded-lg flex items-center justify-between text-xs font-mono">
                      <div className="flex items-center gap-2 text-violet-300">
                        <Zap className="w-4 h-4 text-violet-400" />
                        <span>Completion Awards: +{selectedModule.lessons[activeLessonIndex].xpReward} XP</span>
                      </div>
                      <span className="text-gray-500">Node Secure encryption: Active</span>
                    </div>

                    <div className="flex justify-between items-center gap-4">
                      <button
                        onClick={() => {
                          if (activeLessonIndex > 0) setActiveLessonIndex(activeLessonIndex - 1);
                        }}
                        disabled={activeLessonIndex === 0}
                        className="px-4 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 disabled:opacity-40 text-xs font-mono text-white rounded transition-all"
                      >
                        PREV CONTEXT
                      </button>

                      <button
                        onClick={nextLesson}
                        className="px-5 py-2.5 bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-500 text-white font-mono text-xs font-bold rounded flex items-center gap-1.5 hover:scale-[1.01] transition-all"
                      >
                        <span>{activeLessonIndex === 4 ? "COMPLETE & INIT QUIZ" : "SYNAPSE & CONTINUE"}</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* PANEL C: DETAILED INTERACTIVE QUIZ */}
                {activeQuiz && (
                  <div className="space-y-6">
                    <div className="flex justify-between items-center text-xs font-mono bg-slate-950 p-3 rounded-lg border border-slate-950">
                      <div className="flex items-center gap-1.5 text-amber-400">
                        <Award className="w-4 h-4 text-amber-400 animate-pulse" />
                        <span className="font-bold uppercase">Critical Evaluation Node</span>
                      </div>
                      <span>QUESTIONS: {activeQuiz.questions.length}</span>
                    </div>

                    {!quizSubmitted ? (
                      /* ACTIVE ASSESSMENT QUESTIONS */
                      <div className="space-y-6">
                        {activeQuiz.questions.map((q, qIdx) => (
                          <div key={q.id} className="p-5 bg-slate-950 border border-slate-900 rounded-xl space-y-4">
                            <h4 className="text-sm font-bold text-white flex items-start gap-2">
                              <span className="text-xs font-mono text-violet-400 mt-0.5">0{qIdx + 1}.</span>
                              <span>{q.question}</span>
                            </h4>
                            <div className="grid grid-cols-1 gap-2 pt-2">
                              {q.options.map((opt, oIdx) => {
                                const isSelected = selectedAnswers[q.id] === oIdx;
                                return (
                                  <button
                                    key={oIdx}
                                    type="button"
                                    onClick={() => handleSelectOption(q.id, oIdx)}
                                    className={`p-3 text-left text-xs rounded-lg border transition-all cursor-pointer ${
                                      isSelected
                                        ? "bg-violet-950/40 border-violet-500 text-white font-semibold shadow-[0_0_10px_rgba(139,92,246,0.15)]"
                                        : "bg-[#05070d]/80 border-slate-900 hover:border-slate-800 text-slate-300 hover:text-white"
                                    }`}
                                  >
                                    <span className="font-mono text-[10px] text-gray-500 inline-block mr-2 uppercase">OPTION {String.fromCharCode(65 + oIdx)}:</span>
                                    {opt}
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        ))}

                        <div className="p-3 bg-indigo-950/20 border border-indigo-500/10 rounded-lg text-center text-xs text-indigo-300 font-mono">
                          ⚠️ Verifying incorrect responses will require re-attempt of evaluation sequence.
                        </div>

                        <button
                          onClick={handleSubmitQuiz}
                          disabled={Object.keys(selectedAnswers).length < activeQuiz.questions.length}
                          className="w-full py-3 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white rounded-lg text-xs font-mono font-bold tracking-widest disabled:opacity-50 transition-all flex items-center justify-center gap-1.5"
                        >
                          <CheckCircle className="w-4 h-4" />
                          <span>TRANSMIT RESPONSES TO MATRIX EVALUATOR</span>
                        </button>
                      </div>
                    ) : (
                      /* ASSESSMENT COMPLETED DISCLOSURES */
                      <div className="space-y-6 text-center py-6">
                        <div className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center ${
                          quizScore >= 50 ? "bg-emerald-950 border border-emerald-500 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.3)]" : "bg-rose-950 border border-rose-500 text-rose-400"
                        }`}>
                          {quizScore >= 50 ? (
                            <Trophy className="w-8 h-8 text-emerald-400" />
                          ) : (
                            <HelpCircle className="w-8 h-8 text-rose-400" />
                          )}
                        </div>

                        <div>
                          <h3 className="text-xl font-bold text-white font-display">
                            {quizScore >= 50 ? "Evaluation Succeeded!" : "Synaptic Lock Engaged"}
                          </h3>
                          <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                            {quizScore >= 50 
                              ? "Cadet evaluation complete. Cognitive metrics passed. Synchronizing next roadmap nodes." 
                              : "Did not clear metrics threshold (50%). Matrix limits require absolute re-calibration."}
                          </p>
                        </div>

                        <div className="bg-slate-950 border border-slate-900 p-4 rounded-xl max-w-xs mx-auto font-mono text-sm space-y-2">
                          <div className="flex justify-between">
                            <span className="text-gray-500">METRIC RATING:</span>
                            <span className={quizScore >= 50 ? "text-emerald-400 font-bold" : "text-rose-400 font-bold"}>
                              {quizScore}% Score
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">XP SECURED:</span>
                            <span className="text-yellow-400">+{quizScore >= 50 ? selectedModule.xpReward + activeQuiz.xpBonus : 0} XP</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">STATUS:</span>
                            <span className={quizScore >= 50 ? "text-emerald-400 font-bold" : "text-rose-400 font-bold"}>
                              {quizScore >= 50 ? "PASSED" : "FAILED"}
                            </span>
                          </div>
                        </div>

                        <div className="flex gap-4 max-w-sm mx-auto justify-center">
                          <button
                            onClick={() => {
                              setSelectedAnswers({});
                              setQuizSubmitted(false);
                            }}
                            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-xs font-mono text-white rounded border border-slate-800 transition-all"
                          >
                            RE-EVALUATE LAYER
                          </button>
                          
                          {quizScore >= 50 && (
                            <button
                              onClick={() => {
                                setSelectedModule(null);
                                setActiveQuiz(null);
                                setQuizSubmitted(false);
                              }}
                              className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-emerald-500 text-xs font-mono text-white rounded font-bold transition-all"
                            >
                              SECURE SYSTEM STATE & CLOSE
                            </button>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                )}

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* DYNAMIC CELEBRATION FLOATING LAYERS */}
      <AnimatePresence>
        {showCelebration && (
          <div className="fixed inset-0 pointer-events-none flex items-center justify-center p-4 z-50 overflow-hidden">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-slate-900 border border-cyan-400 p-8 rounded-2xl max-w-sm text-center shadow-[0_0_30px_rgba(6,182,212,0.8)] pointer-events-auto"
            >
              <div className="relative inline-flex items-center justify-center mb-4">
                <Star className="w-12 h-12 text-yellow-300 animate-spin" />
                <Sparkles className="w-6 h-6 text-cyan-400 absolute animate-pulse" />
              </div>
              <h4 className="text-xl font-bold font-display text-white">COGNITIVE SYNC COMPLETE</h4>
              <p className="text-xs text-slate-300 mt-2 font-mono">
                {celebrationMessage}
              </p>
              
              <div className="flex justify-center gap-1.5 mt-4 text-[10px] text-gray-500 font-mono">
                <span>UNLOCK SYSTEM DETECTED</span>
                <span>•</span>
                <span className="text-emerald-400">STATE: UPDATED</span>
              </div>
              
              <button
                onClick={() => setShowCelebration(false)}
                className="mt-6 w-full py-2 bg-gradient-to-r from-cyan-600 to-violet-600 hover:from-cyan-500 text-white text-xs font-mono font-bold rounded cursor-pointer"
              >
                ENGAGE NEXT SYNAPTIC NODE
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
