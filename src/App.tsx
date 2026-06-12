import { useState, useEffect } from "react";
import { Track, User, StudentActivityLog } from "./types";
import { DEFAULT_TRACKS } from "./mockData";

// Components
import WelcomeScreen from "./components/WelcomeScreen";
import LoginSignup from "./components/LoginSignup";
import LandingHero from "./components/LandingHero";
import TrackSelection from "./components/TrackSelection";
import DuolingoRoadmap from "./components/DuolingoRoadmap";
import ProgressDashboard from "./components/ProgressDashboard";
import WorkflowVisualization from "./components/WorkflowVisualization";
import DatabaseERD from "./components/DatabaseERD";
import AdminPanel from "./components/AdminPanel";

// Icons
import {
  Sparkles,
  Compass,
  Trophy,
  Flame,
  Bot,
  Shuffle,
  ShieldCheck,
  Disc3,
  Database,
  Terminal,
  Settings,
  LogOut,
  Moon,
  Menu,
  X,
  User as UserIcon,
  HelpCircle
} from "lucide-react";

export default function App() {
  const [showIntro, setShowIntro] = useState<boolean>(true);
  const [user, setUser] = useState<User | null>(null);
  const [tracks, setTracks] = useState<Track[]>(DEFAULT_TRACKS);
  const [activeTab, setActiveTab] = useState<string>("dashboard");
  const [activityLogs, setActivityLogs] = useState<StudentActivityLog[]>([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  // Initialize and load state from localStorage if available
  useEffect(() => {
    const savedUser = localStorage.getItem("pf_user_session");
    const rememberMe = localStorage.getItem("pf_remember_me") === "true";
    const savedTracks = localStorage.getItem("pf_custom_tracks_v2");
    const savedLogs = localStorage.getItem("pf_activity_logs");

    if (savedUser && rememberMe) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        console.error("Failed loading user", e);
      }
    } else {
      localStorage.removeItem("pf_user_session");
    }

    if (savedTracks) {
      try {
        setTracks(JSON.parse(savedTracks));
      } catch (e) {
        console.error("Failed loading custom tracks", e);
      }
    }

    if (savedLogs) {
      try {
        setActivityLogs(JSON.parse(savedLogs));
      } catch (e) {
        console.error("Failed loading logs", e);
      }
    } else {
      // Seed initial mock logs
      const initialLogs: StudentActivityLog[] = [
        { id: "log-init-1", studentName: "SYSTEM_CORE", action: "Active LearnScape study system initialized", timestamp: "03:45:00" },
        { id: "log-init-2", studentName: "ALGO_ORCHESTRATOR", action: "Dynamic learning paths compiled successfully", timestamp: "03:45:10" }
      ];
      setActivityLogs(initialLogs);
    }
  }, []);

  // Save changes to localStorage helper
  const saveUserState = (updatedUser: User | null) => {
    setUser(updatedUser);
    if (updatedUser) {
      localStorage.setItem("pf_user_session", JSON.stringify(updatedUser));
      try {
        const usersStr = localStorage.getItem("learnscape_users_list");
        let users: any[] = [];
        if (usersStr) {
          users = JSON.parse(usersStr);
        }
        const idx = users.findIndex(u => u.email.toLowerCase() === updatedUser.email.toLowerCase());
        if (idx !== -1) {
          users[idx].userState = updatedUser;
          users[idx].name = updatedUser.name;
        } else {
          users.push({
            name: updatedUser.name,
            email: updatedUser.email,
            userState: updatedUser
          });
        }
        localStorage.setItem("learnscape_users_list", JSON.stringify(users));
      } catch (e) {
        console.error("Failed saving state to users list", e);
      }
    } else {
      localStorage.removeItem("pf_user_session");
    }
  };

  const handleAuthSuccess = (userData: { name: string; email: string; learningInterest: string; preferredTrack: string; userState?: User }, rememberMe?: boolean) => {
    let newUser: User;
    if (userData.userState) {
      newUser = userData.userState;
    } else {
      newUser = {
        id: `student-${Date.now()}`,
        name: userData.name,
        email: userData.email,
        learningInterest: userData.learningInterest,
        preferredTrack: userData.preferredTrack,
        xp: 0,
        level: 1,
        streak: 3, // Seeding a realistic beginner streak!
        lastActive: new Date().toISOString(),
        completedLessons: [],
        completedModules: [],
        quizScores: {},
        joinedAt: new Date().toLocaleDateString()
      };
    }

    if (rememberMe) {
      localStorage.setItem("pf_remember_me", "true");
    } else {
      localStorage.removeItem("pf_remember_me");
    }

    saveUserState(newUser);
    handleAddActivityLog(`Cadet initialized cognitive profile for "${userData.name}"`, 0);
    setActiveTab("dashboard");
  };

  const handleAddTrack = (newTrack: Track) => {
    const updatedTracks = [...tracks, newTrack];
    setTracks(updatedTracks);
    localStorage.setItem("pf_custom_tracks_v2", JSON.stringify(updatedTracks));
  };

  const handleAddActivityLog = (action: string, xpAwarded?: number) => {
    const currentStudentName = user ? user.name : "ANONYMOUS_CADET";
    const logItem: StudentActivityLog = {
      id: `log-${Date.now()}-${Math.random()}`,
      studentName: currentStudentName,
      action: action,
      timestamp: new Date().toLocaleTimeString(),
      xpAwarded: xpAwarded
    };

    const updatedLogs = [logItem, ...activityLogs].slice(0, 50); // limit logs count to 50
    setActivityLogs(updatedLogs);
    localStorage.setItem("pf_activity_logs", JSON.stringify(updatedLogs));
  };

  const handleSelectTrack = (trackId: string) => {
    if (!user) return;

    // AUTOMATION ENGINE:
    // Generate a personalized roadmap
    // Automatically unlock Module 1 (unlocked by index in ui, and module ID mapped as unlocked state)
    // Lock all remaining ones
    // Clear previously completed nodes for that track
    const updatedUser: User = {
      ...user,
      preferredTrack: trackId,
      completedLessons: user.completedLessons.filter((lId) => !lId.startsWith(trackId)),
      completedModules: user.completedModules.filter((mId) => {
        const findMod = tracks.find((t) => t.id === trackId)?.modules.some((m) => m.id === mId);
        return !findMod;
      })
    };

    saveUserState(updatedUser);
    handleAddActivityLog(`Switched syllabus trajectory to track "${trackId}"`, 0);
    setActiveTab("roadmap");

    // Success alert
    alert(`⚡| LearnScape path initialized! Loading personalized roadmap lessons for "${tracks.find(t => t.id === trackId)?.title || "Your Path"}".`);
  };

  const handleCompleteLesson = (lessonId: string, xpReward: number) => {
    if (!user) return;

    // Prevent double reward logic
    if (user.completedLessons.includes(lessonId)) return;

    const newCompletedLessons = [...user.completedLessons, lessonId];
    let newXp = user.xp + xpReward;
    let newLevel = user.level;

    // Level up calculation logic (1000 XP increments)
    const xpThreshold = newLevel * 1000;
    if (newXp >= xpThreshold) {
      newLevel += 1;
      handleAddActivityLog(`LEVELED UP! Cadet achieved Cognitive Grade ${newLevel}!`, 200);
      newXp += 200; // level up bonus reward
      alert(`🎉 COGNITIVE LEVEL UP! You achieved Level ${newLevel}. Your brain synapses are tuned at higher frequencies!`);
    }

    const updatedUser: User = {
      ...user,
      xp: newXp,
      level: newLevel,
      completedLessons: newCompletedLessons,
      lastActive: new Date().toISOString()
    };

    saveUserState(updatedUser);
    handleAddActivityLog(`Calibrated lesson node: ${lessonId}`, xpReward);
  };

  const handleCompleteModule = (moduleId: string, scorePercent: number, xpReward: number) => {
    if (!user) return;

    const isFirstTime = !user.completedModules.includes(moduleId);
    const newCompletedModules = isFirstTime 
      ? [...user.completedModules, moduleId]
      : user.completedModules;

    const updatedQuizScores = {
      ...user.quizScores,
      [moduleId]: Math.max(user.quizScores[moduleId] || 0, scorePercent)
    };

    let newXp = user.xp + xpReward;
    let newLevel = user.level;

    // Level check
    const xpThreshold = newLevel * 1000;
    if (newXp >= xpThreshold) {
      newLevel += 1;
      alert(`🎉 COGNITIVE LEVEL UP! You achieved Level ${newLevel}.`);
      newXp += 200;
    }

    const updatedUser: User = {
      ...user,
      xp: newXp,
      level: newLevel,
      completedModules: newCompletedModules,
      quizScores: updatedQuizScores,
      lastActive: new Date().toISOString()
    };

    saveUserState(updatedUser);
    handleAddActivityLog(`Subsequent sectors cleared: Module "${moduleId}" completed. Score: ${scorePercent}%`, xpReward);
  };

  const handleLogout = () => {
    if (confirm("Disconnect synaptic identity link and clear local telemetry?")) {
      localStorage.removeItem("pf_user_session");
      localStorage.removeItem("pf_remember_me");
      setUser(null);
      setActiveTab("dashboard");
    }
  };

  const activeTrack = tracks.find((t) => t.id === (user?.preferredTrack || "software-dev")) || tracks[0];

  if (showIntro) {
    return <WelcomeScreen onComplete={() => setShowIntro(false)} />;
  }

  return (
    <div className="min-h-screen bg-[#05070d] text-slate-200 font-sans flex flex-col relative">
      
      {/* Dynamic ambient galaxy spots */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-900/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-900/10 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* RENDER AUTH SCREEN IF NOT LOGGED IN */}
      {!user ? (
        <LoginSignup onAuthSuccess={handleAuthSuccess} />
      ) : (
        /* CORE DASHBOARD SHELL LAYOUT */
        <div className="flex-1 flex flex-col md:flex-row h-screen overflow-hidden">
          
          {/* STATIC SIDEBAR (DESKTOP) */}
          <aside className="w-64 bg-[#0d101b] border-r border-violet-500/10 flex-col justify-between hidden md:flex h-full select-none">
            
            {/* Sidebar Header and Profile */}
            <div className="space-y-6 p-5">
              
              {/* Branding */}
              <div className="flex items-center gap-2 pb-4 border-b border-slate-900">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-400 to-violet-600 flex items-center justify-center p-[1px]">
                  <div className="w-full h-full rounded-lg bg-slate-950 flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-cyan-400" />
                  </div>
                </div>
                <div>
                  <h1 className="text-sm font-black font-display tracking-tight text-white uppercase">LearnScape</h1>
                  <span className="text-[9px] text-violet-400 font-mono tracking-widest block uppercase font-bold">STUDENT PORTAL</span>
                </div>
              </div>

              {/* Profile card metrics */}
              <div className="p-3.5 bg-[#070911] border border-slate-900 rounded-xl space-y-3 relative overflow-hidden">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-violet-600/20 border border-violet-500/30 flex items-center justify-center text-xs text-white font-mono font-bold">
                    ST
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-white tracking-tight truncate max-w-[120px]">{user.name}</h3>
                    <span className="text-[10px] text-cyan-400 font-mono font-bold block">LEVEL {user.level}</span>
                  </div>
                </div>

                {/* mini bars */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[9px] font-mono text-gray-500">
                    <span>XP progress:</span>
                    <span>{user.xp} / {user.level * 1000}</span>
                  </div>
                  <div className="w-full h-1 bg-slate-900 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-cyan-400 to-violet-500" 
                      style={{ width: `${(user.xp / (user.level * 1000)) * 100}%` }}
                    />
                  </div>
                </div>

                {/* stats inline strip */}
                <div className="flex justify-between pt-1 border-t border-slate-900/80 font-mono text-[9px] text-gray-400">
                  <span className="flex items-center gap-1.5"><Flame className="w-3 h-3 text-orange-500" /> {user.streak} Days</span>
                  <span className="flex items-center gap-1.5"><Trophy className="w-3 h-3 text-amber-500" /> {user.completedModules.length} Cleared</span>
                </div>
              </div>

              {/* Navlinks elements */}
              <nav className="space-y-1">
                <span className="text-[9px] uppercase tracking-wider text-gray-500 font-mono font-bold block mb-2 px-2">Study Menu</span>
                
                {[
                  { id: "dashboard", label: "Overview", icon: <Compass className="w-4 h-4" /> },
                  { id: "tracks", label: "Learning Paths", icon: <Shuffle className="w-4 h-4" /> },
                  { id: "roadmap", label: "Learning Roadmap", icon: <Disc3 className="w-4 h-4 text-cyan-400" /> },
                  { id: "analytics", label: "Progress Dashboard", icon: <Trophy className="w-4 h-4 text-amber-500" /> },
                  { id: "database", label: "Database Schema", icon: <Database className="w-4 h-4 text-cyan-400" /> }
                ].map((item) => {
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => { setActiveTab(item.id); setMobileMenuOpen(false); }}
                      className={`w-full text-left py-2 px-3 text-xs font-mono rounded-lg transition-all flex items-center justify-between group cursor-pointer ${
                        isActive 
                          ? "bg-violet-600/10 text-white font-bold border-l-2 border-violet-500" 
                          : "text-gray-400 hover:text-white hover:bg-slate-950"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        {item.icon}
                        <span>{item.label}</span>
                      </div>
                      
                      {isActive && <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-ping" />}
                    </button>
                  );
                })}
              </nav>

            </div>

            {/* Logout sector footer */}
            <div className="p-4 border-t border-slate-900 bg-[#070911]/40 flex justify-between items-center">
              <button
                onClick={handleLogout}
                className="py-1.5 px-3 bg-red-950/20 hover:bg-red-950/40 border border-red-500/10 hover:border-red-500/30 text-rose-400 text-[10px] font-mono rounded flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>LOG OUT</span>
              </button>
              
              <span className="text-[9px] font-mono text-gray-500">v1.2.0</span>
            </div>

          </aside>

          {/* MOBILE NAVIGATION BAR HEADER */}
          <header className="md:hidden bg-[#0d101b] border-b border-slate-900 p-4 flex items-center justify-between select-none">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded bg-gradient-to-tr from-cyan-400 to-violet-600 flex items-center justify-center">
                <Sparkles className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="text-xs font-black font-display tracking-wider text-white uppercase">LearnScape</span>
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1 text-slate-400 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </header>

          {/* MOBILE NAV OVERLAY */}
          {mobileMenuOpen && (
            <div className="fixed inset-0 top-[53px] bg-[#05070d] z-40 p-5 flex flex-col justify-between font-mono md:hidden animate-none">
              <div className="space-y-6">
                
                {/* profile stats */}
                <div className="flex items-center justify-between p-3 bg-[#0d101b] rounded-lg">
                  <div>
                    <div className="text-white font-bold">{user.name}</div>
                    <div className="text-[10px] text-cyan-400">LEVEL {user.level}</div>
                  </div>
                  <div className="text-right text-[10px] text-gray-500">
                    <div>{user.xp} XP</div>
                    <div className="text-orange-400 font-bold">{user.streak} Days active</div>
                  </div>
                </div>

                <div className="space-y-1">
                  {[
                    { id: "dashboard", label: "Overview", icon: <Compass className="w-4 h-4" /> },
                    { id: "tracks", label: "Learning Paths", icon: <Shuffle className="w-4 h-4" /> },
                    { id: "roadmap", label: "Learning Roadmap", icon: <Disc3 className="w-4 h-4 text-cyan-400" /> },
                    { id: "analytics", label: "Progress Dashboard", icon: <Trophy className="w-4 h-4" /> },
                    { id: "database", label: "Database Schema", icon: <Database className="w-4 h-4" /> }
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => { setActiveTab(item.id); setMobileMenuOpen(false); }}
                      className={`w-full text-left py-2.5 px-3 text-xs rounded transition-all flex items-center gap-3 ${
                        activeTab === item.id ? "bg-violet-600 text-white font-bold" : "text-gray-400 hover:text-white"
                      }`}
                    >
                      {item.icon}
                      <span>{item.label}</span>
                    </button>
                  ))}
                </div>

              </div>

              <button
                onClick={handleLogout}
                className="w-full py-2 bg-red-950/20 hover:bg-red-950/40 border border-red-500/15 text-rose-400 text-xs rounded flex items-center justify-center gap-1.5 transition-all"
              >
                <LogOut className="w-4 h-4" />
                <span>LOG OUT</span>
              </button>
            </div>
          )}

          {/* MAIN PAGE VIEWPORTS CONTAINER */}
          <main className="flex-1 overflow-y-auto p-4 md:p-8 space-y-8 bg-[#05070d]">
            
            {/* View A: Dashboard overview hub */}
            {activeTab === "dashboard" && (() => {
              const completedLessonsCount = user.completedLessons.length;
              const completedModulesCount = user.completedModules.length;
              const quizScoresList = Object.values(user.quizScores || {}) as number[];
              const averageQuizScore = quizScoresList.length > 0
                ? Math.round(quizScoresList.reduce((a, b) => a + b, 0) / quizScoresList.length)
                : 0;

              // Identify current active module
              const currentModule = activeTrack.modules.find(m => !user.completedModules.includes(m.id)) 
                || activeTrack.modules[activeTrack.modules.length - 1];
              
              const currentModuleIndex = activeTrack.modules.findIndex(m => m.id === currentModule?.id);
              const nextModule = activeTrack.modules[currentModuleIndex + 1];

              // Calculate track progress
              const progressPercent = Math.min(
                Math.round((completedModulesCount / activeTrack.modules.length) * 100),
                100
              );

              // Extract pending lessons for current module
              const pendingLessons = currentModule 
                ? currentModule.lessons.filter(l => !user.completedLessons.includes(l.id))
                : [];

              return (
                <div className="space-y-8">
                  {/* Visual Welcoming Header element */}
                  <LandingHero
                    studentName={user.name}
                    onStartLearning={() => setActiveTab("tracks")}
                    onExploreTracks={() => setActiveTab("tracks")}
                  />

                  {/* 1. Welcome Section & General Metrics */}
                  <div className="glass-card rounded-2xl p-6 border border-slate-800/80 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="space-y-1">
                      <h2 className="text-2xl font-extrabold text-white font-display tracking-tight flex items-center gap-2">
                        Welcome back, {user.name}
                        <span className="inline-block w-2.5 h-2.5 bg-emerald-400 rounded-full animate-pulse" />
                      </h2>
                      <p className="text-gray-400 text-xs">Your personalized learning dashboard is active and up to date.</p>
                    </div>
                    
                    <div className="flex flex-wrap gap-4 items-center bg-slate-950/40 p-4 border border-slate-900 rounded-xl font-mono text-xs">
                      <div>
                        <span className="text-gray-500 block text-[9px] uppercase">Current Learning Path</span>
                        <span className="text-cyan-400 font-bold">{activeTrack.title}</span>
                      </div>
                      <div className="w-[1px] h-8 bg-slate-800 hidden sm:block" />
                      <div>
                        <span className="text-gray-500 block text-[9px] uppercase">Learning Progress</span>
                        <span className="text-violet-400 font-bold">{progressPercent}% Completed</span>
                      </div>
                    </div>
                  </div>

                  {/* 2. Progress Summary Cards */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                    {/* Card 1: Lessons Completed */}
                    <div className="glass-card rounded-2xl p-5 border border-slate-800 hover:border-slate-700 transition-all">
                      <span className="text-[10px] text-gray-500 font-mono tracking-wider block uppercase mb-1">Lessons Completed</span>
                      <div className="text-2xl sm:text-3xl font-extrabold text-white font-display">{completedLessonsCount}</div>
                      <p className="text-[10px] text-gray-400 font-mono mt-1">study units finalized</p>
                    </div>

                    {/* Card 2: Modules Completed */}
                    <div className="glass-card rounded-2xl p-5 border border-slate-800 hover:border-slate-700 transition-all">
                      <span className="text-[10px] text-gray-500 font-mono tracking-wider block uppercase mb-1">Modules Completed</span>
                      <div className="text-2xl sm:text-3xl font-extrabold text-white font-display">{completedModulesCount} <span className="text-xs text-gray-500">/ {activeTrack.modules.length}</span></div>
                      <p className="text-[10px] text-gray-400 font-mono mt-1">roadmaps completed</p>
                    </div>

                    {/* Card 3: Quiz Scores */}
                    <div className="glass-card rounded-2xl p-5 border border-slate-800 hover:border-slate-700 transition-all">
                      <span className="text-[10px] text-gray-500 font-mono tracking-wider block uppercase mb-1">Quiz Scores</span>
                      <div className="text-2xl sm:text-3xl font-extrabold text-white font-display">{averageQuizScore}%</div>
                      <p className="text-[10px] text-gray-400 font-mono mt-1">passing grade average</p>
                    </div>

                    {/* Card 4: Learning Streak */}
                    <div className="glass-card rounded-2xl p-5 border border-slate-800 hover:border-slate-700 transition-all">
                      <span className="text-[10px] text-gray-500 font-mono tracking-wider block uppercase mb-1">Learning Streak</span>
                      <div className="text-2xl sm:text-3xl font-extrabold text-white font-display">{user.streak} <span className="text-xs text-gray-500">DAYS</span></div>
                      <p className="text-[10px] text-gray-400 font-mono mt-1">consistency streak</p>
                    </div>
                  </div>

                  {/* Two-column detailed layout */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    
                    {/* 3. Current Learning Path and 4. Upcoming Tasks (Left aspect) */}
                    <div className="lg:col-span-2 space-y-6">
                      
                      {/* Current Learning Path Card */}
                      <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4">
                        <div className="flex justify-between items-center pb-2 border-b border-slate-900">
                          <div>
                            <span className="text-[9px] text-cyan-400 font-mono tracking-wider uppercase block font-bold">Selected Learning Path</span>
                            <h3 className="text-lg font-bold text-white font-display">{activeTrack.title}</h3>
                          </div>
                          <span className="text-[10px] font-mono text-gray-500 bg-slate-950 px-2 py-0.5 rounded border border-slate-900">ACTIVE TRACK</span>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4 pt-1 font-mono text-xs">
                          <div>
                            <span className="text-gray-500 block uppercase text-[10px] mb-0.5">CURRENT MODULE</span>
                            <span className="text-white font-bold block">{currentModule ? currentModule.title : "Course Completed"}</span>
                          </div>
                          <div>
                            <span className="text-gray-500 block uppercase text-[10px] mb-0.5">COMPLETION STATUS</span>
                            <span className="text-violet-400 font-bold block">{progressPercent}% Complete</span>
                          </div>
                        </div>

                        {/* progress line */}
                        <div className="space-y-1 pt-2">
                          <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-900">
                            <div 
                              className="h-full bg-gradient-to-r from-cyan-400 to-violet-500 transition-all duration-300"
                              style={{ width: `${progressPercent}%` }}
                            />
                          </div>
                        </div>

                        <div className="pt-2">
                          <button
                            onClick={() => setActiveTab("roadmap")}
                            className="w-full md:w-auto px-6 py-2 bg-gradient-to-r from-cyan-500 to-violet-600 hover:from-cyan-400 hover:to-violet-500 text-white font-bold font-mono text-[11px] uppercase tracking-wider rounded-lg cursor-pointer transition-all hover:scale-[1.01]"
                          >
                            Continue Learning
                          </button>
                        </div>
                      </div>

                      {/* Upcoming Tasks block */}
                      <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4">
                        <div className="pb-2 border-b border-slate-900">
                          <h4 className="text-xs font-bold text-gray-400 font-mono text-left uppercase tracking-wider">Upcoming Tasks</h4>
                        </div>

                        <div className="grid md:grid-cols-3 gap-4">
                          {/* Pending Lessons */}
                          <div className="bg-slate-950/60 p-4 border border-slate-900 rounded-xl space-y-2">
                            <span className="text-[9px] text-gray-500 font-mono uppercase block font-bold">Pending Lessons</span>
                            {pendingLessons.length > 0 ? (
                              <div className="space-y-1.5 text-[11px] font-mono text-gray-400">
                                {pendingLessons.slice(0, 2).map((lesson, idx) => (
                                  <div key={idx} className="flex items-center gap-1.5 truncate">
                                    <span className="inline-block w-1.5 h-1.5 bg-cyan-400 rounded-full" />
                                    <span className="truncate">{lesson.title}</span>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <div className="text-[11px] text-emerald-400 font-mono">All lessons completed!</div>
                            )}
                          </div>

                          {/* Upcoming Quiz */}
                          <div className="bg-slate-950/60 p-4 border border-slate-900 rounded-xl space-y-2">
                            <span className="text-[9px] text-gray-500 font-mono uppercase block font-bold">Upcoming Quiz</span>
                            <div className="text-[11px] font-mono text-gray-400 truncate">
                              {currentModule ? `${currentModule.title} Quiz` : "No pending quizzes"}
                            </div>
                            <span className="text-[10px] text-violet-400 font-mono block">Evaluates core metrics</span>
                          </div>

                          {/* Next Module */}
                          <div className="bg-slate-950/60 p-4 border border-slate-900 rounded-xl space-y-2">
                            <span className="text-[9px] text-gray-500 font-mono uppercase block font-bold">Next Module to Unlock</span>
                            <div className="text-[11px] font-mono text-gray-300 truncate font-semibold">
                              {nextModule ? nextModule.title : "All modules completed"}
                            </div>
                            <span className="text-[10px] text-gray-500 font-mono block">Sequence locked until ready</span>
                          </div>
                        </div>
                      </div>

                    </div>

                    {/* 5. Overall Progress container (Right aspect) */}
                    <div className="space-y-6">
                      
                      {/* Quick analytics reference (Progress Dashboard redirect) */}
                      <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4 flex flex-col justify-between">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 pb-2 border-b border-slate-900">
                            <Trophy className="w-5 h-5 text-amber-500" />
                            <h4 className="text-sm font-bold text-white font-mono uppercase tracking-wider">Overall Progress</h4>
                          </div>
                          <p className="text-xs text-gray-400 leading-relaxed">
                            View overall progress, weekly study hours charts, and complete historical quiz results.
                          </p>
                        </div>
                        <div className="pt-4">
                          <button
                            onClick={() => setActiveTab("analytics")}
                            className="w-full text-center py-2 border border-amber-500/20 hover:border-amber-400/50 bg-amber-950/10 text-amber-300 hover:text-white font-mono text-[10px] font-bold uppercase tracking-wider rounded-lg transition-all cursor-pointer"
                          >
                            View Progress Dashboard
                          </button>
                        </div>
                      </div>

                    </div>

                  </div>

                </div>
              );
            })()}

            {/* View B: Duolingo style progression tree */}
            {activeTab === "roadmap" && (
              <DuolingoRoadmap
                trackTitle={activeTrack.title}
                modules={activeTrack.modules}
                completedLessons={user.completedLessons}
                completedModules={user.completedModules}
                quizScores={user.quizScores}
                onCompleteLesson={handleCompleteLesson}
                onCompleteModule={handleCompleteModule}
                onAddActivityLog={handleAddActivityLog}
              />
            )}

            {/* View C: Track selection screen */}
            {activeTab === "tracks" && (
              <TrackSelection
                tracks={tracks}
                selectedTrackId={user.preferredTrack}
                onSelectTrack={handleSelectTrack}
              />
            )}

            {/* View D: Analytics progress circles and logs */}
            {activeTab === "analytics" && (
              <ProgressDashboard
                xp={user.xp}
                level={user.level}
                streak={user.streak}
                completedLessonsCount={user.completedLessons.length}
                completedModulesCount={user.completedModules.length}
                trackTitle={activeTrack.title}
                quizScores={user.quizScores}
              />
            )}

            {/* View F: State Workflow visualization page */}
            {activeTab === "workflow" && (
              <WorkflowVisualization />
            )}

            {/* View G: Schema layout diagrams page */}
            {activeTab === "database" && (
              <DatabaseERD />
            )}

            {/* View H: Admin portal custom course builders */}
            {activeTab === "admin" && (
              <AdminPanel
                tracks={tracks}
                activityLogs={activityLogs}
                onAddTrack={handleAddTrack}
                onAddActivityLog={handleAddActivityLog}
              />
            )}

          </main>

        </div>
      )}

    </div>
  );
}
