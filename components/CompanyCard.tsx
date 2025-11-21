import React, { useState } from 'react';
import { Company } from '../types';
import { ExternalLink, MapPin, DollarSign, ChevronDown, ChevronUp, Building2, ArrowRight, Linkedin, CheckCircle2, XCircle, Clock } from 'lucide-react';

interface CompanyCardProps {
  company: Company;
  index: number;
}

export const CompanyCard: React.FC<CompanyCardProps> = ({ company, index }) => {
  const [isOpen, setIsOpen] = useState(false);

  const gradients = [
    'from-blue-400 to-indigo-500',
    'from-purple-400 to-pink-500',
    'from-emerald-400 to-teal-500',
    'from-orange-400 to-amber-500',
  ];
  const gradient = gradients[company.name.length % gradients.length];
  const initials = company.name.slice(0, 2).toUpperCase();
  
  const isLinkedIn = company.batch === 'LinkedIn';

  const status = company.status || 'pending';
  const StatusIcon = {
      'pending': Clock,
      'worked': CheckCircle2,
      'skipped': XCircle
  }[status];
  
  const statusColors = {
      'pending': 'bg-slate-100 text-slate-500 border-slate-200',
      'worked': 'bg-emerald-50 text-emerald-600 border-emerald-100',
      'skipped': 'bg-red-50 text-red-500 border-red-100'
  }[status];

  return (
    <div className={`group relative bg-white rounded-2xl border shadow-sm transition-all duration-300 overflow-hidden
        ${status === 'skipped' ? 'opacity-75 border-slate-100' : 'border-slate-100 hover:shadow-xl hover:shadow-indigo-100/50'}
    `}>
      
      <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left ${isLinkedIn ? 'from-[#0077B5] to-blue-400' : 'from-indigo-500 to-purple-500'}`}></div>

      <div className="p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row gap-6">
            
            <div className="flex sm:flex-col items-center sm:items-start gap-4 sm:gap-2 min-w-[60px]">
                <div className="text-3xl font-black text-slate-200 group-hover:text-indigo-100 transition-colors">
                    #{String(index + 1).padStart(2, '0')}
                </div>
                <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white font-bold text-lg shadow-md`}>
                    {initials}
                </div>
            </div>

            <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-3 flex-wrap">
                        <h3 className={`text-2xl font-bold text-slate-900 transition-colors ${isLinkedIn ? 'group-hover:text-[#0077B5]' : 'group-hover:text-indigo-600'}`}>
                            {company.name}
                        </h3>
                        
                        <span className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${statusColors}`}>
                            <StatusIcon className="w-3 h-3" />
                            {status}
                        </span>

                        {company.batch && (
                            <span className={`border text-[10px] font-bold px-2 py-1 rounded-lg uppercase tracking-wider flex items-center gap-1
                                ${isLinkedIn 
                                    ? 'bg-blue-50 border-blue-100 text-[#0077B5]' 
                                    : 'bg-slate-100 border-slate-200 text-slate-600'}
                            `}>
                                {isLinkedIn ? <Linkedin className="w-3 h-3" /> : company.batch}
                            </span>
                        )}
                    </div>
                    {company.website && (
                        <a 
                            href={company.website} 
                            target="_blank" 
                            rel="noreferrer"
                            className={`text-sm font-medium text-slate-400 flex items-center gap-1 transition-colors ${isLinkedIn ? 'hover:text-[#0077B5]' : 'hover:text-indigo-600'}`}
                        >
                            Visit Site <ExternalLink className="w-3 h-3" />
                        </a>
                    )}
                </div>
                
                <p className="text-slate-600 text-base leading-relaxed mb-4">
                    {company.description}
                </p>

                {company.tags && company.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-6">
                        {company.tags.slice(0, 4).map((tag, i) => (
                            <span key={i} className={`text-xs font-medium px-2.5 py-1 rounded-md border ${isLinkedIn ? 'bg-blue-50 text-[#0077B5] border-blue-100' : 'bg-indigo-50 text-indigo-700 border-indigo-100'}`}>
                                {tag}
                            </span>
                        ))}
                    </div>
                )}

                <button 
                    onClick={() => setIsOpen(!isOpen)}
                    className={`
                        w-full sm:w-auto flex items-center justify-between sm:justify-start gap-4 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-200
                        ${isOpen 
                            ? 'bg-slate-100 text-slate-900' 
                            : isLinkedIn 
                                ? 'bg-[#0077B5] text-white hover:bg-[#006097] shadow-lg shadow-blue-200 hover:shadow-blue-200'
                                : 'bg-slate-900 text-white hover:bg-indigo-600 shadow-lg shadow-slate-200 hover:shadow-indigo-200'
                        }
                    `}
                >
                    <span>{isOpen ? 'Close Roles' : `View ${company.jobs.length} Open Roles`}</span>
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
            </div>
        </div>
      </div>

      {isOpen && (
        <div className="border-t border-slate-100 bg-slate-50/50 p-4 sm:p-8 animate-in slide-in-from-top-2 fade-in duration-300">
            <div className="grid gap-4">
                {company.jobs.length === 0 ? (
                    <div className="text-center py-8">
                        <Building2 className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                        <p className="text-slate-500 font-medium">No specific roles detected currently.</p>
                    </div>
                ) : (
                    company.jobs.map((job, idx) => (
                        <div key={idx} className={`bg-white p-5 rounded-xl border border-slate-100 shadow-sm transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 group/job ${isLinkedIn ? 'hover:border-blue-200' : 'hover:border-indigo-200'}`}>
                            <div>
                                <div className={`font-bold text-slate-800 text-lg mb-1 transition-colors ${isLinkedIn ? 'group-hover/job:text-[#0077B5]' : 'group-hover/job:text-indigo-600'}`}>
                                    {job.title}
                                </div>
                                <div className="flex items-center gap-4 text-sm text-slate-500">
                                    {job.location && (
                                        <span className="flex items-center gap-1">
                                            <MapPin className="w-3.5 h-3.5" /> {job.location}
                                        </span>
                                    )}
                                    {job.salary && (
                                        <span className="flex items-center gap-1">
                                            <DollarSign className="w-3.5 h-3.5" /> {job.salary}
                                        </span>
                                    )}
                                </div>
                            </div>
                            
                            {job.link && (
                                <a
                                    href={job.link}
                                    target="_blank"
                                    rel="noreferrer"
                                    className={`flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-sm transition-colors
                                        ${isLinkedIn 
                                            ? 'bg-blue-50 text-[#0077B5] hover:bg-blue-100' 
                                            : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100'}
                                    `}
                                >
                                    Apply <ArrowRight className="w-4 h-4" />
                                </a>
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
      )}
    </div>
  );
};