import React from 'react';
import { Company } from '../types';
import { ArrowRight, X, Check, ExternalLink, MapPin, DollarSign, Building2, PlayCircle } from 'lucide-react';

interface WorkingBoardProps {
  companies: Company[];
  onProcess: (companyName: string, status: 'worked' | 'skipped') => void;
  onViewDetail: (company: Company) => void;
  onSwitchToScout: () => void;
}

export const WorkingBoard: React.FC<WorkingBoardProps> = ({ companies, onProcess, onViewDetail, onSwitchToScout }) => {
  // Find the first pending company
  const currentJob = companies.find(c => !c.status || c.status === 'pending');
  const pendingCount = companies.filter(c => !c.status || c.status === 'pending').length;
  const completedCount = companies.filter(c => c.status === 'worked' || c.status === 'skipped').length;

  const getGradient = (name: string) => {
    const gradients = [
      'from-blue-400 to-indigo-500',
      'from-purple-400 to-pink-500',
      'from-emerald-400 to-teal-500',
      'from-orange-400 to-amber-500',
    ];
    return gradients[name.length % gradients.length];
  };

  if (!currentJob) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-center p-8 animate-in fade-in">
        <div className="w-24 h-24 bg-indigo-50 rounded-full flex items-center justify-center mb-6 animate-bounce">
            <Check className="w-10 h-10 text-indigo-600" />
        </div>
        <h2 className="text-3xl font-bold text-slate-800 mb-2">All Caught Up!</h2>
        <p className="text-slate-500 max-w-md mb-8 text-lg">
          {companies.length === 0 
            ? "No jobs loaded yet. Go to the Scout tab to find opportunities." 
            : "You have processed all available jobs in the queue."}
        </p>
        <div className="flex gap-4">
            <button 
                onClick={onSwitchToScout}
                className="px-8 py-4 bg-slate-900 hover:bg-indigo-600 text-white font-bold rounded-xl shadow-xl transition-all flex items-center gap-2"
            >
                <PlayCircle className="w-5 h-5" />
                <span>Scout More Jobs</span>
            </button>
        </div>
        {companies.length > 0 && (
            <div className="mt-8 text-slate-400 text-sm font-medium">
            Total Processed: {completedCount}
            </div>
        )}
      </div>
    );
  }

  const gradient = getGradient(currentJob.name);
  const isLinkedIn = currentJob.batch === 'LinkedIn';

  return (
    <div className="max-w-4xl mx-auto animate-in slide-in-from-bottom-4 duration-500">
      
      <div className="flex items-center justify-between mb-8">
        <div>
            <h2 className="text-2xl font-bold text-slate-800">Working Board</h2>
            <p className="text-slate-500">Focus mode: Process one opportunity at a time.</p>
        </div>
        <div className="text-right">
            <div className="text-3xl font-black text-indigo-600">{pendingCount}</div>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Pending</div>
        </div>
      </div>

      {/* Main Card */}
      <div className="glass-panel bg-white rounded-3xl border border-slate-200 shadow-2xl shadow-indigo-100 overflow-hidden relative">
         <div className={`h-2 w-full bg-gradient-to-r ${isLinkedIn ? 'from-[#0077B5] to-blue-400' : 'from-indigo-500 to-pink-500'}`}></div>
         
         <div className="p-8 md:p-10">
            
            <div className="flex flex-col md:flex-row gap-6 mb-8">
                <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white font-bold text-3xl shadow-lg shrink-0`}>
                    {currentJob.name.slice(0, 2).toUpperCase()}
                </div>
                <div>
                    <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">{currentJob.name}</h1>
                    <p className="text-lg text-slate-600 leading-relaxed mb-4">{currentJob.description}</p>
                    <div className="flex flex-wrap gap-2">
                        {currentJob.tags?.map((tag, i) => (
                            <span key={i} className="px-3 py-1 rounded-lg bg-slate-100 text-slate-600 text-sm font-bold">{tag}</span>
                        ))}
                        {currentJob.website && (
                             <a href={currentJob.website} target="_blank" rel="noreferrer" className="px-3 py-1 rounded-lg bg-indigo-50 text-indigo-600 text-sm font-bold flex items-center gap-1 hover:bg-indigo-100 transition-colors">
                                Website <ExternalLink className="w-3 h-3" />
                             </a>
                        )}
                    </div>
                </div>
            </div>

            <div className="bg-slate-50/80 rounded-2xl border border-slate-100 p-6 mb-10">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <Building2 className="w-4 h-4" /> Open Roles detected
                </h3>
                <div className="space-y-3">
                    {currentJob.jobs && currentJob.jobs.length > 0 ? currentJob.jobs.slice(0, 3).map((job, idx) => (
                        <div key={idx} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
                             <div>
                                <div className="font-bold text-slate-800 text-lg">{job.title}</div>
                                <div className="flex items-center gap-4 text-sm text-slate-500 mt-1">
                                    {job.location && <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {job.location}</span>}
                                </div>
                             </div>
                        </div>
                    )) : (
                        <div className="text-slate-500 italic">No specific roles listed, but company is active.</div>
                    )}
                    {currentJob.jobs.length > 3 && (
                        <div className="text-center text-sm font-bold text-slate-500 pt-2">
                           + {currentJob.jobs.length - 3} more roles available
                        </div>
                    )}
                </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 border-t border-slate-100 pt-8">
                <button 
                    onClick={() => onProcess(currentJob.name, 'skipped')}
                    className="flex-1 py-4 px-6 rounded-xl border-2 border-slate-200 text-slate-500 font-bold hover:border-slate-300 hover:bg-slate-50 hover:text-slate-700 transition-all flex items-center justify-center gap-2 group"
                >
                    <X className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    Skip Opportunity
                </button>
                <button 
                    onClick={() => onViewDetail(currentJob)}
                    className="flex-1 py-4 px-6 rounded-xl bg-indigo-600 text-white font-bold hover:bg-indigo-700 shadow-xl shadow-indigo-200 transition-all flex items-center justify-center gap-2 group hover:-translate-y-1"
                >
                    <span>Continue & Work</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
            </div>

         </div>
      </div>
    </div>
  );
};