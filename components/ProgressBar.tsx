import React from 'react';
import { Loader2, CheckCircle2, Radio } from 'lucide-react';

interface ProgressBarProps {
  count: number;
  isSearching: boolean;
  statusMessage?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ count, isSearching, statusMessage }) => {
  const percentage = Math.min((count / 10) * 100, 100);

  return (
    <div className="max-w-2xl mx-auto mb-12">
        <div className="glass-panel rounded-2xl border border-white/40 shadow-xl shadow-indigo-100/50 overflow-hidden p-1">
            <div className="bg-white/80 rounded-xl p-5">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                        {isSearching ? (
                            <div className="relative">
                                <div className="w-3 h-3 bg-indigo-500 rounded-full animate-ping absolute opacity-75"></div>
                                <div className="w-3 h-3 bg-indigo-500 rounded-full relative"></div>
                            </div>
                        ) : (
                            <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                        )}
                        <span className="font-semibold text-slate-800 tracking-tight">
                            {isSearching ? "Scout Active" : "Mission Complete"}
                        </span>
                    </div>
                    <span className="text-xs font-bold px-2.5 py-1 bg-slate-100 text-slate-600 rounded-lg uppercase tracking-wider">
                        {count} / 10 Found
                    </span>
                </div>

                <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden mb-4">
                    <div 
                        className={`h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transition-all duration-700 ease-out rounded-full relative ${isSearching && count === 0 ? 'w-[10%]' : ''}`}
                        style={{ width: isSearching && count === 0 ? '10%' : `${percentage}%` }}
                    >
                        {isSearching && (
                             <div className="absolute inset-0 bg-white/30 animate-[shimmer_1s_infinite]"></div>
                        )}
                    </div>
                </div>

                <div className="flex items-center gap-2 text-xs font-mono text-slate-500 bg-slate-50 p-3 rounded-lg border border-slate-100">
                    <Radio className={`w-3 h-3 ${isSearching ? 'text-indigo-500 animate-pulse' : 'text-slate-400'}`} />
                    <span className="truncate">{statusMessage || "System ready."}</span>
                </div>
            </div>
        </div>
    </div>
  );
};