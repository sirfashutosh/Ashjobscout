import React from 'react';
import { Company } from '../types';
import { ArrowLeft, Globe, Calendar, Users, MapPin, CheckCircle2, ExternalLink, Building2, Briefcase } from 'lucide-react';

interface CompanyDetailProps {
  company: Company;
  onBack: () => void;
  onComplete: () => void;
}

export const CompanyDetail: React.FC<CompanyDetailProps> = ({ company, onBack, onComplete }) => {
  const isLinkedIn = company.batch === 'LinkedIn';
  const initials = company.name.slice(0, 2).toUpperCase();
  
  const gradients = [
    'from-blue-600 to-indigo-700',
    'from-purple-600 to-pink-700',
    'from-emerald-600 to-teal-700',
    'from-orange-500 to-amber-600',
  ];
  const gradient = gradients[company.name.length % gradients.length];

  return (
    <div className="max-w-6xl mx-auto animate-in slide-in-from-right-8 duration-300">
      {/* Navigation Bar */}
      <div className="flex items-center justify-between mb-8">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 font-semibold transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Board
        </button>
        
        <button
          onClick={onComplete}
          className="flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold shadow-lg shadow-emerald-200 transition-all hover:-translate-y-0.5"
        >
          <CheckCircle2 className="w-5 h-5" />
          <span>Mark as Worked</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT COLUMN - Main Content */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Header Section */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 relative overflow-hidden">
             <div className={`absolute top-0 left-0 w-full h-2 bg-gradient-to-r ${gradient}`}></div>
             
             <div className="flex flex-col sm:flex-row gap-6 items-start">
                <div className={`w-24 h-24 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white font-black text-3xl shadow-xl shrink-0`}>
                   {initials}
                </div>
                <div className="flex-1">
                   <h1 className="text-4xl font-black text-slate-900 mb-3 tracking-tight">{company.name}</h1>
                   <p className="text-xl text-slate-600 leading-relaxed">
                     {company.description}
                   </p>
                </div>
             </div>
          </div>

          {/* About Section */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
            <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-indigo-500" />
              About
            </h3>
            <div className="prose prose-slate max-w-none">
              <p className="text-slate-600 leading-loose">
                {company.description} 
                {/* Since we don't have a long-form description from the API, we simulate the UI structure where it would go. */}
                <br /><br />
                <span className="italic text-slate-400 text-sm">
                  (Full detailed description would appear here based on extended data extraction.)
                </span>
              </p>
            </div>
            
            {company.tags && (
              <div className="mt-8 flex flex-wrap gap-2">
                {company.tags.map((tag, i) => (
                   <span key={i} className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-600 text-sm font-bold">
                     {tag}
                   </span>
                ))}
              </div>
            )}
          </div>

          {/* Jobs Section */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
             <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-indigo-500" />
                  Active Roles
                </h3>
                <span className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-xs font-bold">
                  {company.jobs.length} Openings
                </span>
             </div>

             <div className="space-y-4">
               {company.jobs.map((job, idx) => (
                 <div key={idx} className="group border border-slate-100 rounded-xl p-5 hover:border-indigo-200 hover:shadow-md transition-all bg-slate-50/50 hover:bg-white">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <div className="font-bold text-lg text-slate-800 group-hover:text-indigo-600 transition-colors">
                          {job.title}
                        </div>
                        <div className="flex items-center gap-4 text-sm text-slate-500 mt-1">
                           {job.location && (
                             <span className="flex items-center gap-1">
                               <MapPin className="w-3.5 h-3.5" /> {job.location}
                             </span>
                           )}
                           {job.salary && (
                             <span className="flex items-center gap-1">
                               <span className="font-semibold text-emerald-600">{job.salary}</span>
                             </span>
                           )}
                           {job.type && (
                             <span className="px-2 py-0.5 bg-white border rounded text-xs">
                               {job.type}
                             </span>
                           )}
                        </div>
                      </div>
                      
                      {job.link && (
                        <a 
                          href={job.link} 
                          target="_blank" 
                          rel="noreferrer"
                          className="px-5 py-2.5 bg-slate-900 text-white text-sm font-bold rounded-lg hover:bg-indigo-600 transition-colors flex items-center justify-center gap-2 whitespace-nowrap"
                        >
                          Apply Now <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                 </div>
               ))}
               {company.jobs.length === 0 && (
                 <div className="text-center py-8 text-slate-400 italic">
                   No specific job listings detected for this company.
                 </div>
               )}
             </div>
          </div>
        </div>

        {/* RIGHT COLUMN - Meta Details */}
        <div className="space-y-6">
           <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 sticky top-24">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-6">Company Facts</h4>
              
              <div className="space-y-6">
                 {company.website && (
                   <div>
                     <div className="text-sm font-semibold text-slate-500 mb-1 flex items-center gap-2">
                       <Globe className="w-4 h-4" /> Website
                     </div>
                     <a 
                       href={company.website} 
                       target="_blank" 
                       rel="noreferrer"
                       className="text-indigo-600 font-bold hover:underline truncate block"
                     >
                       {company.website.replace(/^https?:\/\//, '')}
                     </a>
                   </div>
                 )}

                 <div>
                    <div className="text-sm font-semibold text-slate-500 mb-1 flex items-center gap-2">
                      <Calendar className="w-4 h-4" /> Batch / Source
                    </div>
                    <div className="text-slate-900 font-bold">
                      {isLinkedIn ? 'LinkedIn Recruiter' : (company.batch || 'N/A')}
                    </div>
                 </div>

                 <div>
                    <div className="text-sm font-semibold text-slate-500 mb-1 flex items-center gap-2">
                      <Users className="w-4 h-4" /> Company Size
                    </div>
                    <div className="text-slate-900 font-bold">
                      {/* Simulated Data - In a real app, we'd extract this */}
                      11-50 Employees
                    </div>
                 </div>

                 <div>
                    <div className="text-sm font-semibold text-slate-500 mb-1 flex items-center gap-2">
                      <MapPin className="w-4 h-4" /> Headquarters
                    </div>
                    <div className="text-slate-900 font-bold">
                      {/* Inferring from first job or default */}
                      {company.jobs[0]?.location || 'Remote / Unspecified'}
                    </div>
                 </div>
              </div>

              <div className="mt-8 pt-8 border-t border-slate-100">
                <button className="w-full py-3 bg-slate-50 hover:bg-slate-100 text-slate-600 font-bold rounded-xl transition-colors text-sm">
                   View on Crunchbase
                </button>
              </div>
           </div>
        </div>

      </div>
    </div>
  );
};
