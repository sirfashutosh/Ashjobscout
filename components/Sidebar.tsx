import React from 'react';
import { LayoutDashboard, ListTodo, LogOut, Sparkles } from 'lucide-react';

interface SidebarProps {
  activeTab: 'working-board' | 'all-jobs';
  onTabChange: (tab: 'working-board' | 'all-jobs') => void;
  onLogout: () => void;
  pendingCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange, onLogout, pendingCount }) => {
  return (
    <div className="w-72 h-screen sticky top-0 bg-white/60 backdrop-blur-xl border-r border-white/20 shadow-xl z-50 flex flex-col p-6 hidden md:flex">
       <div className="flex items-center gap-3 mb-10 px-2">
          <div className="bg-gradient-to-tr from-indigo-600 to-violet-600 p-2 rounded-xl shadow-lg shadow-indigo-200">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-800 leading-tight">Ash Job Scout</h1>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Team Portal</p>
          </div>
        </div>

        <nav className="flex-1 space-y-2">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider px-4 mb-4">Menu</div>
          
          <button 
            onClick={() => onTabChange('working-board')}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold transition-all
              ${activeTab === 'working-board' 
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' 
                : 'text-slate-600 hover:bg-indigo-50 hover:text-indigo-700'}
            `}
          >
            <div className="flex items-center gap-3">
              <LayoutDashboard className="w-5 h-5" />
              <span>Working Board</span>
            </div>
            {pendingCount > 0 && (
              <span className={`text-[10px] px-2 py-0.5 rounded-full ${activeTab === 'working-board' ? 'bg-white/20 text-white' : 'bg-indigo-100 text-indigo-700'}`}>
                {pendingCount}
              </span>
            )}
          </button>

          <button 
            onClick={() => onTabChange('all-jobs')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all
              ${activeTab === 'all-jobs' 
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' 
                : 'text-slate-600 hover:bg-indigo-50 hover:text-indigo-700'}
            `}
          >
            <ListTodo className="w-5 h-5" />
            <span>All Jobs & Scout</span>
          </button>
        </nav>

        <div className="pt-6 border-t border-slate-200/50">
          <div className="flex items-center gap-3 px-4 mb-4">
             <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center font-bold text-slate-600 border border-white shadow-sm">
                TW
             </div>
             <div>
                <div className="text-sm font-bold text-slate-800">Thoughtwin</div>
                <div className="text-xs text-slate-500">Business Team</div>
             </div>
          </div>
          <button 
            onClick={onLogout}
            className="w-full flex items-center gap-2 px-4 py-2 text-xs font-bold text-slate-400 hover:text-red-500 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
    </div>
  );
};