import React, { useState } from "react";
import { Mail, Lock, User, Sparkles, ShieldAlert, ArrowRight, BookOpen } from "lucide-react";
import { User as UserType } from "../types";

interface LoginSignupProps {
  onAuthSuccess: (userData: { name: string; email: string; learningInterest: string; preferredTrack: string; userState?: UserType }, rememberMe?: boolean) => void;
}

export default function LoginSignup({ onAuthSuccess }: LoginSignupProps) {
  const [isLogin, setIsLogin] = useState(false); // Default to signup for new users
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const getUsersList = (): any[] => {
    const usersStr = localStorage.getItem("learnscape_users_list");
    if (usersStr) {
      try {
        return JSON.parse(usersStr);
      } catch (e) {
        console.error("Failed parsing users list", e);
      }
    }
    // Backwards compatibility for single user
    const singleUserStr = localStorage.getItem("learnscape_registered_user");
    if (singleUserStr) {
      try {
        const parsed = JSON.parse(singleUserStr);
        if (parsed && parsed.email) {
          return [parsed];
        }
      } catch (e) {
        console.error("Failed parsing legacy user", e);
      }
    }
    return [];
  };

  const handleAction = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (isLogin) {
      if (!email || !password) {
        setErrorMsg("Please enter your email and password.");
        return;
      }
      
      const users = getUsersList();
      const foundUser = users.find(u => u.email.toLowerCase() === email.toLowerCase());

      if (foundUser && foundUser.password === password) {
        onAuthSuccess({
          name: foundUser.name,
          email: foundUser.email,
          learningInterest: foundUser.learningInterest || "General Learning",
          preferredTrack: foundUser.preferredTrack || "software-dev",
          userState: foundUser.userState
        }, rememberMe);
        return;
      } else {
        setErrorMsg("Invalid email or password. Please try again.");
        return;
      }
    } else {
      if (!name || !email || !password || !confirmPassword) {
        setErrorMsg("All fields are required. Please fill in all details.");
        return;
      }
      if (password !== confirmPassword) {
        setErrorMsg("Passwords do not match. Please re-enter.");
        return;
      }

      const users = getUsersList();
      const duplicateExists = users.some(u => u.email.toLowerCase() === email.toLowerCase());
      if (duplicateExists) {
        setErrorMsg("An account with this email already exists. Please sign in.");
        return;
      }

      // Create new user account in list
      const newUserAccount = {
        name,
        email,
        password,
        learningInterest: "General Learning",
        preferredTrack: "software-dev"
      };
      
      const updatedList = [...users, newUserAccount];
      localStorage.setItem("learnscape_users_list", JSON.stringify(updatedList));
      localStorage.setItem("learnscape_registered_user", JSON.stringify(newUserAccount));

      alert(`🎉 Account created successfully for ${name}!\n\nPlease sign in with your new email and password.`);

      // Redirect to Login page as requested
      setIsLogin(true);
      setErrorMsg("");
      setPassword("");
      setConfirmPassword("");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#03050a] relative overflow-hidden">
      {/* Visual Ambient Background */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-900/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-900/10 rounded-full blur-3xl" />
      
      <div className="w-full max-w-5xl grid md:grid-cols-12 gap-8 items-center relative z-10">
        
        {/* Left Aspect: Brand presentation */}
        <div className="col-span-12 md:col-span-6 flex flex-col justify-center items-center md:items-start text-center md:text-left space-y-6 px-4">
          <div className="flex items-center gap-2 px-3 py-1 bg-violet-950/40 border border-violet-500/20 rounded-full text-xs text-violet-400 font-mono">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span>LEARNSCAPE PORTAL</span>
          </div>
          
          <h1 id="pf-brand-title" className="text-4xl md:text-5xl font-extrabold tracking-tight font-display bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
            LearnScape
          </h1>
          
          <p className="text-gray-400 max-w-sm text-sm leading-relaxed">
            Welcome to LearnScape. Learn. Grow. Unlock Your Future. Experience a personalized learning journey with custom roadmaps, quizzes, progress dashboards, and a dedicated study mentor.
          </p>

          {/* Clean Illustration/Visual representing modern education */}
          <div className="relative w-56 h-56 flex items-center justify-center my-6">
            <div className="absolute inset-0 border border-dashed border-violet-500/20 rounded-full animate-[spin_40s_linear_infinite]" />
            <div className="absolute inset-8 border border-cyan-500/20 rounded-full" />
            
            <div className="w-24 h-24 rounded-2xl bg-gradient-to-tr from-violet-600 to-cyan-500 flex items-center justify-center shadow-[0_0_40px_rgba(139,92,246,0.3)] relative overflow-hidden">
              <div className="absolute inset-1 bg-slate-950/80 rounded-xl flex flex-col items-center justify-center overflow-hidden">
                <BookOpen className="w-8 h-8 text-cyan-400 animate-pulse" />
                <span className="font-mono text-[9px] text-purple-400 mt-1 tracking-wider uppercase">LEARN & GROW</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Aspect: Authentication Screen form */}
        <div className="col-span-12 md:col-span-6">
          <div className="glass-card rounded-2xl p-6 md:p-8 relative border border-violet-500/20 shadow-[0_4px_30px_rgba(0,0,0,0.4)]">
            
            {/* Mode switch */}
            <div className="flex mb-8 bg-slate-900/60 p-1 rounded-lg border border-slate-800/80">
              <button
                type="button"
                onClick={() => { setIsLogin(false); setErrorMsg(""); }}
                className={`flex-1 py-1.5 text-center text-xs font-mono rounded-md transition-all ${
                  !isLogin ? "bg-violet-600 text-white shadow-lg shadow-violet-600/30 font-bold" : "text-gray-400 hover:text-white"
                }`}
              >
                CREATE ACCOUNT
              </button>
              <button
                type="button"
                onClick={() => { setIsLogin(true); setErrorMsg(""); }}
                className={`flex-1 py-2 text-center text-xs font-mono rounded-md transition-all ${
                  isLogin ? "bg-violet-600 text-white shadow-lg shadow-violet-600/30 font-bold" : "text-gray-400 hover:text-white"
                }`}
              >
                SIGN IN
              </button>
            </div>

            <h2 className="text-xl font-bold text-white mb-2 font-display flex items-center gap-2">
              {isLogin ? "Welcome Back" : "Create Account"}
              <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-ping" />
            </h2>
            <p className="text-gray-400 text-xs mb-6">
              {isLogin ? "Sign in to continue your learning journey." : "Create an account to start learning."}
            </p>

            {errorMsg && (
              <div className="mb-6 p-3 bg-red-950/40 border border-red-500/30 rounded-lg flex items-center gap-2.5 text-xs text-red-300">
                <ShieldAlert className="w-4 h-4 text-red-400 flex-shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleAction} className="space-y-4">
              
              {!isLogin && (
                <div id="signup-name-field" className="space-y-1.5">
                  <label className="text-[11px] uppercase tracking-wider font-mono text-gray-400 block pb-0.5">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-2.5 w-4 h-4 text-violet-400" />
                    <input
                      type="text"
                      placeholder="e.g. Alex Johnson"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-slate-950/60 border border-slate-800 focus:border-violet-500 hover:border-slate-700 rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder-slate-600 outline-none transition-all font-mono"
                    />
                  </div>
                </div>
              )}

              <div id="email-field" className="space-y-1.5">
                <label className="text-[11px] uppercase tracking-wider font-mono text-gray-400 block pb-0.5">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 w-4 h-4 text-violet-400" />
                  <input
                    type="email"
                    placeholder="e.g. student@learnscape.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full bg-slate-950/60 border border-slate-800 focus:border-violet-500 hover:border-slate-700 rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder-slate-600 outline-none transition-all font-mono"
                  />
                </div>
              </div>

              <div id="password-field" className="space-y-1.5">
                <label className="text-[11px] uppercase tracking-wider font-mono text-gray-400 block pb-0.5">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-2.5 w-4 h-4 text-violet-400" />
                  <input
                    type="password"
                    placeholder="••••••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full bg-slate-950/60 border border-slate-800 focus:border-violet-500 hover:border-slate-700 rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder-slate-600 outline-none transition-all font-mono"
                  />
                </div>
              </div>

              {!isLogin && (
                <div className="space-y-1.5">
                  <label className="text-[11px] uppercase tracking-wider font-mono text-gray-400 block pb-0.5">Confirm Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-2.5 w-4 h-4 text-violet-400" />
                    <input
                      type="password"
                      placeholder="••••••••••••"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      className="w-full bg-slate-950/60 border border-slate-800 focus:border-violet-500 hover:border-slate-700 rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder-slate-600 outline-none transition-all font-mono"
                    />
                  </div>
                </div>
              )}

              {isLogin && (
                <div className="flex items-center justify-between pt-1">
                  <label className="flex items-center gap-2 text-xs text-gray-400 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="accent-violet-600 rounded border-slate-800"
                    />
                    <span>Remember Me</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => alert("Password recovery instructions would be sent to your email address.")}
                    className="text-xs text-cyan-400 hover:text-cyan-300 hover:underline font-mono"
                  >
                    Forgot Password?
                  </button>
                </div>
              )}

              <button
                type="submit"
                className="w-full mt-4 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white py-2.5 rounded-lg text-sm font-semibold tracking-wider font-mono shadow-[0_0_15px_rgba(124,58,237,0.4)] flex items-center justify-center gap-2 hover:scale-[1.01] transition-all cursor-pointer"
              >
                <span>{isLogin ? "Sign In" : "Create Account"}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            <div className="mt-6 text-center text-xs">
              <span className="text-gray-500">
                {isLogin ? "New to LearnScape?" : "Already have an account?"}{" "}
              </span>
              <button
                type="button"
                onClick={() => { setIsLogin(!isLogin); setErrorMsg(""); }}
                className="text-violet-400 hover:text-violet-300 font-bold hover:underline"
              >
                {isLogin ? "Create Account" : "Sign In Here"}
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
