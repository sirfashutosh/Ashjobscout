import React, { useState } from 'react';
import { X, Download } from 'lucide-react';
import { Company } from '../types';
import { downloadData } from '../utils';

interface DownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  companies: Company[];
}

export const DownloadModal: React.FC<DownloadModalProps> = ({ isOpen, onClose, companies }) => {
  const [start, setStart] = useState(1);
  const [end, setEnd] = useState(companies.length);

  if (!isOpen) return null;

  const handleDownload = () => {
    const startIndex = Math.max(0, start - 1);
    const endIndex = Math.min(companies.length, end);
    const subset = companies.slice(startIndex, endIndex);
    downloadData(subset, `ash-job-scout-export-${start}-to-${end}.csv`);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-slate-900/30 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all scale-100">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <h3 className="text-xl font-bold text-slate-800">Export Data</h3>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-8">
          <p className="text-slate-600 font-medium mb-6">
            Configure your CSV export range.
          </p>
          
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">From Row</label>
                <input 
                    type="number" 
                    min={1} 
                    max={companies.length}
                    value={start}
                    onChange={(e) => setStart(Number(e.target.value))}
                    className="w-full border border-slate-200 bg-slate-50 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 font-semibold text-slate-700 transition-all"
                />
            </div>
            <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">To Row</label>
                <input 
                    type="number" 
                    min={1} 
                    max={companies.length}
                    value={end}
                    onChange={(e) => setEnd(Number(e.target.value))}
                    className="w-full border border-slate-200 bg-slate-50 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 font-semibold text-slate-700 transition-all"
                />
            </div>
          </div>

          <div className="bg-indigo-50 border border-indigo-100 p-4 rounded-xl text-sm text-indigo-700 font-medium text-center mb-2">
             Ready to export {Math.max(0, Math.min(companies.length, end) - Math.max(0, start - 1))} companies
          </div>
        </div>

        <div className="p-6 bg-slate-50 flex justify-end gap-3">
          <button 
            onClick={onClose}
            className="px-6 py-3 text-slate-600 hover:text-slate-900 font-semibold text-sm transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={handleDownload}
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold text-sm flex items-center gap-2 shadow-lg shadow-indigo-200 transition-all hover:-translate-y-0.5"
          >
            <Download className="w-4 h-4" /> Download CSV
          </button>
        </div>
      </div>
    </div>
  );
};