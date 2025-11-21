import React, { useState } from 'react';
import { Sparkles, Lock, User, ArrowRight } from 'lucide-react';

interface LoginProps {
  onLogin: () => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Accepts "User" and "Thoughtwin_777" (handles spaces if copied with them)
    if (username.trim() === 'User' && password.trim() === 'Thoughtwin_777') {
      onLogin();
    } else {
      setError('Invalid credentials. Access denied.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-slate-50">
       <div className="absolute -top-[40%] -left-[20%] w-[70%] h-[70%] rounded-full bg-purple-100 blur-3xl opacity-60 mix-blend-multiply animate-blob"></div>
       <div className="absolute -top-[40%] -right-[20%] w-[70%] h-[70%] rounded-full bg-indigo-100 blur-3xl opacity-60 mix-blend-multiply animate-blob animation-delay-2000"></div>
       
       <div className="w-full max-w-md p-8 relative z-10">
          <div className="glass-panel rounded-3xl border border-white/40 shadow-2xl shadow-indigo-100 p-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-600 mb-4 shadow-lg shadow-indigo-200">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-slate-800">Ash Job Scout</h1>
              <p className="text-slate-500 text-sm mt-2">Business Team Portal</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Username</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input 
                    type="text" 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none text-slate-700 font-medium"
                    placeholder="Enter username"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none text-slate-700 font-medium"
                    placeholder="Enter password"
                  />
                </div>
              </div>

              {error && (
                <div className="text-red-500 text-sm font-medium text-center bg-red-50 py-2 rounded-lg">
                  {error}
                </div>
              )}

              <button 
                type="submit"
                className="w-full py-4 bg-slate-900 hover:bg-indigo-600 text-white font-bold rounded-xl shadow-xl shadow-slate-200 hover:shadow-indigo-200 transition-all flex items-center justify-center gap-2 group"
              >
                <span>Login to Workspace</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </div>
       </div>
    </div>
  );
};