import React, { useMemo } from 'react';
import { Company } from '../types';
import { getJobStats, JobCategory } from '../utils';
import { PieChart, Code, Paintbrush, Megaphone, Database, Briefcase, Box, Layers } from 'lucide-react';

interface JobStatsProps {
  companies: Company[];
}

const CATEGORY_CONFIG: Record<JobCategory, { color: string; icon: React.ElementType }> = {
  'Engineering': { color: 'bg-blue-500', icon: Code },
  'AI/Data': { color: 'bg-purple-500', icon: Database },
  'Sales/Marketing': { color: 'bg-green-500', icon: Megaphone },
  'Product': { color: 'bg-orange-500', icon: Box },
  'Design': { color: 'bg-pink-500', icon: Paintbrush },
  'Operations': { color: 'bg-slate-500', icon: Briefcase },
  'Other': { color: 'bg-gray-400', icon: Layers },
};

export const JobStats: React.FC<JobStatsProps> = ({ companies }) => {
  const { stats, totalJobs } = useMemo(() => getJobStats(companies), [companies]);

  if (totalJobs === 0) return null;

  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-6 mb-10 shadow-lg shadow-slate-200/50">
      <div className="flex items-center justify-between mb-6">
         <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
            <PieChart className="w-4 h-4 text-indigo-500" />
            Market Intelligence
         </h3>
         <span className="text-xs font-medium bg-slate-100 px-2 py-1 rounded text-slate-500">
            Based on {totalJobs} roles
         </span>
      </div>
      
      {/* Visual Bar */}
      <div className="h-3 w-full rounded-full overflow-hidden flex mb-8 bg-slate-100">
        {(Object.keys(stats) as JobCategory[]).map(cat => {
          const count = stats[cat];
          if (count === 0) return null;
          const width = (count / totalJobs) * 100;
          return (
            <div 
              key={cat}
              className={`${CATEGORY_CONFIG[cat].color} h-full`}
              style={{ width: `${width}%` }}
            />
          );
        })}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
        {(Object.keys(stats) as JobCategory[]).map(cat => {
          const count = stats[cat];
          const Icon = CATEGORY_CONFIG[cat].icon;
          if (count === 0) return null;
          
          return (
            <div key={cat} className="flex flex-col items-center text-center p-3 rounded-xl bg-slate-50 hover:bg-indigo-50 transition-colors group">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${CATEGORY_CONFIG[cat].color} bg-opacity-10 mb-2 group-hover:bg-opacity-20 transition-all`}>
                 <Icon className={`w-4 h-4 ${CATEGORY_CONFIG[cat].color.replace('bg-', 'text-')}`} />
              </div>
              <div className="text-xl font-bold text-slate-800">{count}</div>
              <div className="text-[10px] text-slate-500 font-semibold uppercase tracking-tight truncate w-full">{cat}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};