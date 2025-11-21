import React from 'react';
import { Sparkles } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 glass-panel border-b border-white/20 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-tr from-indigo-600 to-violet-600 p-2 rounded-xl shadow-lg shadow-indigo-200">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-800">
            Ash <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">Job Scout</span>
          </h1>
        </div>
        <div className="hidden sm:flex items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-medium tracking-wide">
            AI Powered Engine
          </span>
        </div>
      </div>
    </header>
  );
};